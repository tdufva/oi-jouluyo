"""Local-only preview with fresh source files on every reload."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

class PreviewHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(Path(__file__).resolve().parent), **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, max-age=0')
        super().end_headers()

    def log_message(self, *_):
        pass

if __name__ == '__main__':
    print('Kalenteri: http://localhost:4173/', flush=True)
    ThreadingHTTPServer(('127.0.0.1', 4173), PreviewHandler).serve_forever()
