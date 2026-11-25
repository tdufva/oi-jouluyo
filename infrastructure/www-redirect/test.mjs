import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('./worker.mjs', import.meta.url), 'utf8');
const { default: worker } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const feed = 'https://feeds.redcircle.com/84f56904-c061-4877-be4c-c527ec8fa5a5';
const cases = [
  ['/', 'https://ohelga.blog/'],
  ['/?luukku=12&lang=sv', 'https://ohelga.blog/?luukku=12&lang=sv'],
  ['/avsnitt', 'https://ohelga.blog/avsnitt'],
  ['/avsnitt/', 'https://ohelga.blog/avsnitt/'],
  ['/avsnitt?year=2022', 'https://ohelga.blog/avsnitt?year=2022'],
  ['/avsnitt?format=rss', feed],
  ['/avsnitt/?format=rss', feed],
  ['/avsnitt?format=RSS&tracking=123', feed],
  ['/avsnitt?format=atom', feed],
  ['/avsnitt/lucka1/', 'https://ohelga.blog/avsnitt/lucka1/'],
  ['/om-oss/', 'https://ohelga.blog/om-oss/']
];
for (const [path, expected] of cases) {
  for (const method of ['GET', 'HEAD']) {
    const response = worker.fetch(new Request('https://www.ohelga.blog' + path, { method }));
    assert.equal(response.status, 301, path);
    assert.equal(response.headers.get('Location'), expected, path);
    assert.equal(await response.text(), '', path);
  }
}
assert.equal(worker.fetch(new Request('https://www.ohelga.blog/', { method: 'OPTIONS' })).status, 204);
assert.equal(worker.fetch(new Request('https://www.ohelga.blog/', { method: 'POST' })).status, 405);
console.log('Verified 22 website/RSS redirects, query preservation, HEAD requests, and supported methods.');
