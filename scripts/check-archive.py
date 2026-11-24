#!/usr/bin/env python3
"""Check migration completeness, local links and omission of private export fields."""
import importlib.util
import json
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
data = json.loads((ROOT / 'assets/archive/episodes.json').read_text())
episodes = data['episodes']
assert len(episodes) == 77
assert len({p['guid'] for p in episodes}) == len(episodes)
assert {y: sum(e['year'] == y for e in episodes) for y in {2022, 2023, 2024, 2025}} == {2022: 25, 2023: 26, 2024: 1, 2025: 25}
assert all(e['audio'].startswith('https://') for e in episodes)

class Links(HTMLParser):
    def __init__(self):
        super().__init__(); self.links = []; self.audio = []; self.embeds = 0
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        assert not any(k.startswith('on') for k in attrs), attrs
        if tag == 'script':
            assert attrs.get('src', '').endswith('archive.js?v=20261124-1'), attrs
        if tag in {'img', 'script', 'source', 'iframe'}:
            self.links.append(attrs.get('src', ''))
        if tag in {'a', 'link'}:
            self.links.append(attrs.get('href', ''))
        if tag == 'source':
            self.audio.append(attrs.get('src'))
        assert tag != 'iframe', 'Embeds must be opt-in on initial load'
        if tag == 'button' and 'embed-launch' in attrs.get('class', ''):
            self.embeds += 1

pages = list((ROOT / 'avsnitt').glob('*/index.html'))
pages += [ROOT / p / 'index.html' for p in ['avsnitt', 'om-oss', 'subscribe', 'ranking', 'vilken-o-helga', 'kommer-snart', 'home']]
players = embeds = 0
for page in pages:
    source = page.read_text()
    assert 'comment_author_email' not in source and 'comment_author_IP' not in source
    assert '.migration/' not in source
    parser = Links(); parser.feed(source)
    players += len(parser.audio); embeds += parser.embeds
    for ref in parser.links:
        parts = urlsplit(ref)
        if parts.scheme or parts.netloc or not parts.path:
            continue
        target = (page.parent / unquote(parts.path)).resolve()
        assert target.is_relative_to(ROOT), (page, ref)
        if target.is_dir():
            target /= 'index.html'
        assert target.is_file(), (page.relative_to(ROOT), ref)
assert players == 77, players
assert embeds == 72, embeds
for episode in episodes:
    page = ROOT / episode['path'].lstrip('/') / 'index.html'
    parser = Links(); parser.feed(page.read_text())
    assert parser.audio == [episode['audio']], episode['path']

private_feed = ROOT / '.migration/ohelga/original-feed.xml'
if private_feed.exists():
    old_guids = {e.findtext('guid') for e in ET.parse(private_feed).findall('./channel/item')}
    assert old_guids == {e['guid'] for e in episodes}, 'Original podcast identifiers changed'
    manifest = json.loads((ROOT / '.migration/ohelga/backup-manifest.json').read_text())
    audio = [m for m in manifest if m['kind'] == 'audio']
    assert len(audio) == 77
    assert all((ROOT / m['file']).stat().st_size == m['bytes'] for m in audio)

spec = importlib.util.spec_from_file_location('migration', ROOT / 'scripts/migrate-squarespace.py')
module = importlib.util.module_from_spec(spec); spec.loader.exec_module(module)
safe = module.Content({}, '../', set()).render('<script>bad()</script><p onclick="bad()">Safe</p><a href="javascript:bad()">Link</a><iframe src="https://evil.example/a"></iframe>')
assert 'bad()' not in safe and 'evil.example' not in safe and '<p>Safe</p>' in safe
print(f'Archive verified: {len(episodes)} stable episode GUIDs, {len(pages)} pages, {players} players, {embeds} opt-in embeds; all local links resolve.')
