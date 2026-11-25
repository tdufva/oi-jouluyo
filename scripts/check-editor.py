"""Local editor regression checks; no real translations or GitHub writes."""
import base64
import copy
from http.server import ThreadingHTTPServer
import json
from pathlib import Path
import sys
import tempfile
import threading
import unittest
from unittest.mock import patch
from urllib.error import HTTPError
from urllib.request import Request, urlopen

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import editor_server as app

ENTRY = json.loads((app.ROOT / 'luukut/01.json').read_text())
PNG = base64.b64decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aYt8AAAAASUVORK5CYII=')

class EditorChecks(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.data = patch.object(app, 'DATA', Path(self.temp.name)); self.data.start()
    def tearDown(self):
        self.data.stop(); self.temp.cleanup()
    def test_drafts_recover_and_conflicting_tabs_do_not_overwrite(self):
        first = app.save_draft(1, {'entry': ENTRY}, None)
        self.assertEqual(json.loads(app.draft_path(1).read_text()), first)
        with self.assertRaises(app.EditorError) as error:
            app.save_draft(1, {'entry': {}}, None)
        self.assertEqual(error.exception.status, 409)
        second = app.save_draft(1, {'entry': ENTRY}, first['version'])
        self.assertNotEqual(first['version'], second['version'])
    def test_only_raster_images_and_safe_paths(self):
        image = app.store_image({'data': base64.b64encode(PNG).decode()})
        self.assertTrue(image['path'].startswith('assets/luukut/'))
        self.assertEqual((app.DATA / 'images' / Path(image['path']).name).read_bytes(), PNG)
        with self.assertRaises(app.EditorError):
            app.store_image({'data': base64.b64encode(b'<svg onload="alert(1)"/>').decode()})
        for value in ['assets/../.env', 'assets/%2e%2e/.env', 'file:///tmp/a', 'http://example.com/a', 'https://user:pass@example.com/a']:
            entry = copy.deepcopy(ENTRY); entry['kuva'] = value
            with self.assertRaises(app.EditorError): app.valid_entry(entry)
    def test_restore_keeps_a_recoverable_backup(self):
        first = app.save_draft(1, {'entry': ENTRY, 'language': 'sv'}, None)
        with patch.object(app, 'remote_entry', return_value={'entry':ENTRY,'sha':'a'*40}):
            restored = app.restore_draft(1, first['version'])
        backup = list((app.DATA / 'backups').glob('*.json'))
        self.assertEqual(len(backup), 1)
        self.assertEqual(json.loads(backup[0].read_text()), first)
        self.assertEqual(restored['state']['language'], 'fi')
        self.assertEqual(json.loads(restored['state']['translatedFrom']), [ENTRY['fi'][key] for key in app.FIELDS])
    def test_publication_is_one_commit_for_json_and_image(self):
        image = app.store_image({'data': base64.b64encode(PNG).decode()})
        entry = copy.deepcopy(ENTRY); entry['kuva'] = image['path']
        calls = []
        def github(route, method='GET', data=None):
            calls.append((route, method, data))
            if '/git/ref/' in route: return {'object': {'sha': 'head'}}
            if '/contents/' in route:
                self.assertTrue(route.endswith('?ref=head'), 'Read content from the exact branch head being updated')
                return {'sha':'a'*40, 'content':base64.b64encode(json.dumps(ENTRY).encode()).decode()}
            if '/git/commits/' in route: return {'tree':{'sha':'base-tree'}}
            if route.endswith('/git/blobs'): return {'sha': 'b'*40}
            if route.endswith('/git/trees'): return {'sha':'new-tree'}
            if route.endswith('/git/commits'): return {'sha':'new-commit'}
            if '/git/refs/' in route: return {}
            self.fail(route)
        with patch.object(app, 'github', github):
            result = app.publish(1, entry, 'a'*40)
        tree = next(data for route, method, data in calls if route.endswith('/git/trees'))
        self.assertEqual({e['path'] for e in tree['tree']}, {'luukut/01.json', image['path']})
        updates = [data for route, method, data in calls if method == 'PATCH']
        self.assertEqual(updates, [{'sha':'new-commit','force':False}])
        self.assertEqual(result['sha'], 'b'*40)
    def test_remote_edit_blocks_publication_before_any_write(self):
        def github(route, method='GET', data=None):
            self.assertEqual(method, 'GET')
            if '/git/ref/' in route: return {'object':{'sha':'head'}}
            return {'sha':'b'*40, 'content':base64.b64encode(json.dumps(ENTRY).encode()).decode()}
        with patch.object(app, 'github', github), self.assertRaises(app.EditorError) as error:
            app.publish(1, ENTRY, 'a'*40)
        self.assertEqual(error.exception.status, 409)
    def test_host_origin_token_and_private_file_protection(self):
        server = ThreadingHTTPServer(('127.0.0.1', 0), app.EditorHandler)
        port = server.server_address[1]
        server.allowed_hosts = {f'127.0.0.1:{port}'}
        server.allowed_origins = {f'http://127.0.0.1:{port}'}
        thread = threading.Thread(target=server.serve_forever, daemon=True); thread.start()
        root = f'http://127.0.0.1:{port}'
        try:
            for path in ['/.git/config', '/.editor-data/drafts/01.json', '/%2eeditor-data/drafts/01.json']:
                with self.assertRaises(HTTPError) as error: urlopen(root+path)
                self.assertEqual(error.exception.code, 404)
            with self.assertRaises(HTTPError) as error:
                urlopen(Request(root+'/editor-api/status', headers={'Host':'evil.example'}))
            self.assertEqual(error.exception.code, 403)
            status = json.load(urlopen(root+'/editor-api/status'))
            body = json.dumps({'day':1,'version':None,'state':{'entry':ENTRY}}).encode()
            for origin, token in [('https://evil.example',status['token']), (root,'wrong')]:
                with self.assertRaises(HTTPError) as error:
                    urlopen(Request(root+'/editor-api/draft',data=body,headers={'Content-Type':'application/json','Origin':origin,'X-Editor-Token':token}))
                self.assertEqual(error.exception.code, 403)
            response = json.load(urlopen(Request(root+'/editor-api/draft',data=body,headers={'Content-Type':'application/json','Origin':root,'X-Editor-Token':status['token']})))
            self.assertIn('version',response)
        finally: server.shutdown(); server.server_close(); thread.join()

unittest.main()
