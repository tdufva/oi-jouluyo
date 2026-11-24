#!/usr/bin/env python3
"""Import the public Squarespace archive; keep source exports and audio out of Git.

No feed redirects, DNS changes or podcast-directory submissions are performed.
Rerun with --host-feed after importing the original RSS into a podcast host.
"""
import argparse
import concurrent.futures
import hashlib
import html
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import shutil
import struct
import subprocess
import time
import urllib.parse as url
import urllib.request
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]
PRIVATE = ROOT / '.migration/ohelga'
IMAGES = ROOT / 'assets/archive/images'
NS = {'wp': 'http://wordpress.org/export/1.2/',
      'content': 'http://purl.org/rss/1.0/modules/content/',
      'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd'}
OLD_FEED = 'https://www.ohelga.blog/avsnitt?format=rss'
APPLE = 'https://podcasts.apple.com/podcast/id1655826352'


def esc(value):
    return html.escape(str(value), quote=True)


def image_url(value):
    value = url.urljoin('https://www.ohelga.blog/', html.unescape(value))
    parts = url.urlsplit(value)
    if parts.hostname in {'images.squarespace-cdn.com', 'static1.squarespace.com'}:
        return url.urlunsplit(('https', parts.netloc, parts.path, 'format=1500w', ''))
    return value


class ImageFinder(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.urls = set()
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'img':
            src = a.get('data-src') or a.get('src', '')
            if src and not src.startswith('data:'):
                self.urls.add(image_url(src))


def transfer(job):
    """Atomic, bounded-concurrency downloads with a resumable local manifest."""
    source, target, kind = job
    target.parent.mkdir(parents=True, exist_ok=True)
    if not target.exists():
        part = target.with_name(target.name + '.part')
        for attempt in range(3):
            try:
                request = urllib.request.Request(source, headers={'User-Agent': 'OHelgaArchiveMigration/1.0'})
                with urllib.request.urlopen(request, timeout=90) as response, part.open('wb') as out:
                    if response.status != 200:
                        raise ValueError(f'Unexpected HTTP {response.status}')
                    shutil.copyfileobj(response, out, length=256 * 1024)
                if not part.stat().st_size:
                    raise ValueError('Empty download')
                with part.open('rb') as downloaded:
                    header = downloaded.read(32)
                if kind == 'audio' and header[4:8] != b'ftyp':
                    raise ValueError('Expected an M4A audio container')
                if kind == 'image' and not (header.startswith((b'\x89PNG', b'\xff\xd8\xff', b'GIF8', b'RIFF'))):
                    raise ValueError('Unexpected image format')
                part.replace(target)
                break
            except Exception:
                part.unlink(missing_ok=True)
                if attempt == 2:
                    raise
                time.sleep(attempt + 1)
    digest = hashlib.sha256()
    with target.open('rb') as source_file:
        for block in iter(lambda: source_file.read(256 * 1024), b''):
            digest.update(block)
    return {'source': source, 'file': str(target.relative_to(ROOT)),
            'bytes': target.stat().st_size, 'sha256': digest.hexdigest(), 'kind': kind}


class Content(HTMLParser):
    """Keep editorial HTML, images and opt-in media; discard Squarespace layout/JS."""
    KEEP = {'p', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'b', 'i',
            'ul', 'ol', 'li', 'blockquote', 'br', 'hr', 'figure', 'figcaption',
            'table', 'thead', 'tbody', 'tr', 'td', 'th', 'sup', 'sub', 'small'}
    DROP = {'script', 'style', 'noscript', 'svg', 'form', 'button'}
    VOID = {'br', 'hr', 'img', 'input', 'meta', 'link', 'source', 'wbr', 'embed'}

    def __init__(self, images, prefix, known_paths):
        super().__init__(convert_charrefs=True)
        self.images, self.prefix, self.known_paths = images, prefix, known_paths
        self.out, self.drop = [], []

    def href(self, value):
        value = html.unescape(value.strip())
        absolute = url.urljoin('https://www.ohelga.blog/', value)
        parts = url.urlsplit(absolute)
        if parts.scheme not in {'https', 'http', 'mailto'}:
            return '#'
        if (parts.hostname or '').lower() in {'ohelga.blog', 'www.ohelga.blog'}:
            path = url.unquote(parts.path).rstrip('/')
            if path in {'', '/home'}:
                return self.prefix
            if path in self.known_paths:
                return self.prefix + path.lstrip('/') + '/' + ('#' + parts.fragment if parts.fragment else '')
        if parts.scheme == 'http':
            absolute = 'https:' + absolute[5:]
        return absolute

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if self.drop:
            if tag not in self.VOID:
                self.drop.append(tag)
            return
        if tag in self.DROP:
            self.drop.append(tag)
            return
        if tag == 'img':
            original = image_url(a.get('data-src') or a.get('src', ''))
            if original not in self.images:
                return
            src = self.prefix + self.images[original]
            self.out.append(f'<img src="{esc(src)}" alt="{esc(a.get("alt", ""))}" loading="lazy" decoding="async">')
        elif tag == 'a':
            self.out.append(f'<a href="{esc(self.href(a.get("href", "#")))}" rel="noopener noreferrer">')
        elif tag == 'iframe':
            source = a.get('src', '')
            if source.startswith('//'):
                source = 'https:' + source
            parts = url.urlsplit(source)
            providers = {'embed.music.apple.com': 'Apple Music', 'open.spotify.com': 'Spotify',
                         'www.youtube.com': 'YouTube', 'www.youtube-nocookie.com': 'YouTube'}
            provider = providers.get(parts.hostname)
            if provider and parts.scheme == 'https':
                self.out.append(f'<div class="media-embed"><button type="button" class="embed-launch" data-src="{esc(source)}" data-provider="{provider}"><span aria-hidden="true">▶</span> {provider}</button><a href="{esc(source)}" rel="noopener noreferrer" data-i18n="openService">Avaa palvelussa / Öppna i tjänsten</a></div>')
        elif tag == 'h1':
            self.out.append('<h2>')
        elif tag in self.KEEP:
            self.out.append('<' + tag + '>')

    def handle_endtag(self, tag):
        if self.drop:
            if tag in self.drop:
                self.drop = self.drop[:len(self.drop) - 1 - self.drop[::-1].index(tag)]
            return
        if tag == 'h1':
            self.out.append('</h2>')
        elif tag == 'a' or tag in self.KEEP - self.VOID:
            self.out.append('</' + tag + '>')

    def handle_data(self, data):
        if not self.drop:
            self.out.append(html.escape(data))

    def render(self, source):
        self.feed(source)
        result = ''.join(self.out)
        result = re.sub(r'<p>\s*</p>', '', result)
        return re.sub(r'\n\s*\n', '\n', result).strip()


def text_only(source):
    class Text(HTMLParser):
        def __init__(self):
            super().__init__(); self.parts = []
        def handle_data(self, data):
            self.parts.append(data)
    parser = Text(); parser.feed(source)
    return ' '.join(' '.join(parser.parts).split())


def shell(title, body, prefix, feed, description=''):
    return f'''<!doctype html>
<html lang="fi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#071e22"><title>{esc(title)} — O, helga blog.</title>
<meta name="description" content="{esc(description[:200])}">
<link rel="alternate" type="application/rss+xml" title="O, helga blog." href="{esc(feed)}">
<link rel="stylesheet" href="{prefix}archive.css?v=20261124-1">
<link rel="preload" href="{prefix}assets/fonts/rye-latin.woff2" as="font" type="font/woff2" crossorigin>
<script src="{prefix}archive.js?v=20261124-1" defer></script></head><body>
<a class="skip" href="#archive-main" data-i18n="skip">Siirry sisältöön</a>
<header class="archive-header"><a class="wordmark" href="{prefix}">O<span aria-hidden="true">✳</span>N</a>
<nav aria-label="Valikko / Meny"><a href="{prefix}" data-i18n="calendar">Joulukalenteri</a><a href="{prefix}avsnitt/" data-i18n="archive">Podcastarkisto</a><a href="{prefix}om-oss/" data-i18n="about">Meistä</a></nav>
<div class="languages" aria-label="Kieli / Språk"><button type="button" data-lang="fi" aria-pressed="true">FI</button><button type="button" data-lang="sv" aria-pressed="false">SV</button></div></header>
<main id="archive-main">{body}</main>
<footer class="archive-footer"><a href="{prefix}avsnitt/">O, helga podcast.</a><nav aria-label="Lisää / Mer"><a href="{prefix}ranking/">Ranking</a><a href="{prefix}vilken-o-helga/" data-i18n="quiz">Jouluyötesti</a><a href="{prefix}subscribe/" data-i18n="subscribe">Tilaa podcast</a><a href="{esc(feed)}">RSS</a></nav><span>Johanna &amp; Tomi · 2022–2025</span></footer>
</body></html>'''


def write_page(path, source):
    target = ROOT / path.lstrip('/') / 'index.html'
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text('\n'.join(line.rstrip() for line in source.splitlines()) + '\n', encoding='utf-8')


def thumbnail(image):
    """Small derived card assets; retain full-size archive originals unchanged."""
    target = ROOT / 'assets/archive/thumbnails' / (Path(image).stem + '.jpg')
    if not target.exists() and shutil.which('sips'):
        target.parent.mkdir(parents=True, exist_ok=True)
        subprocess.run(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '72',
                        '-Z', '240', str(ROOT / image), '--out', str(target)],
                       check=True, stdout=subprocess.DEVNULL)
    return str(target.relative_to(ROOT)) if target.exists() else image


def audio_duration(guid, fallback):
    """Read only MP4 atom headers and mvhd; no decoding or whole-file reads."""
    key = hashlib.sha256(guid.encode()).hexdigest()[:20]
    path = PRIVATE / 'audio' / (key + '.m4a')
    if not path.is_file():
        return fallback
    def atom_duration(stream, end):
        while stream.tell() + 8 <= end:
            start = stream.tell()
            size, kind = struct.unpack('>I4s', stream.read(8))
            header = 8
            if size == 1:
                size = struct.unpack('>Q', stream.read(8))[0]
                header = 16
            if size == 0:
                size = end - start
            if size < header or start + size > end:
                return None
            if kind == b'moov':
                value = atom_duration(stream, start + size)
                if value is not None:
                    return value
            elif kind == b'mvhd':
                data = stream.read(min(size - header, 32))
                scale, duration = (struct.unpack('>IQ', data[20:32]) if data[0] == 1
                                   else struct.unpack('>II', data[12:20]))
                return duration / scale if scale else None
            stream.seek(start + size)
        return None
    with path.open('rb') as audio:
        seconds = atom_duration(audio, path.stat().st_size)
    if seconds is None:
        return fallback
    minutes, seconds = divmod(round(seconds), 60)
    return f'{minutes}:{seconds:02d}'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--export', type=Path, required=True)
    parser.add_argument('--feed', type=Path, required=True)
    parser.add_argument('--download-images', action='store_true')
    parser.add_argument('--backup-audio', action='store_true')
    parser.add_argument('--host-feed', type=Path, help='Downloaded replacement host RSS; matched by unchanged GUID')
    parser.add_argument('--host-feed-url', help='Public replacement RSS URL (requires --host-feed)')
    args = parser.parse_args()
    PRIVATE.mkdir(parents=True, exist_ok=True)
    for source, name in [(args.export, 'squarespace-export.xml'), (args.feed, 'original-feed.xml')]:
        target = PRIVATE / name
        if source.resolve() != target.resolve():
            shutil.copy2(source, target)
    source = ET.parse(args.export)
    feed = ET.parse(args.feed)
    items = [i for i in source.findall('./channel/item') if i.findtext('wp:status', namespaces=NS) == 'publish'
             and i.findtext('wp:post_type', namespaces=NS) in {'post', 'page'}]
    original = {url.unquote(url.urlsplit(i.findtext('link', '')).path).rstrip('/'): i
                for i in feed.findall('./channel/item')}
    feed_url = OLD_FEED
    host_items = {}
    if bool(args.host_feed) != bool(args.host_feed_url):
        parser.error('--host-feed and --host-feed-url must be supplied together')
    if args.host_feed:
        host_items = {i.findtext('guid'): i for i in ET.parse(args.host_feed).findall('./channel/item')}
        missing = {i.findtext('guid') for i in original.values()} - host_items.keys()
        if missing:
            raise ValueError(f'Replacement host is missing {len(missing)} original GUIDs; do not redirect yet')
        feed_url = args.host_feed_url
    posts, pages = [], []
    for item in items:
        path = url.unquote(url.urlsplit(item.findtext('link', '')).path).rstrip('/')
        if not path.startswith('/') or '..' in path.split('/') or any(len(p.encode()) > 240 for p in path.split('/')):
            raise ValueError(f'Unsafe or unsupported export path: {path}')
        record = {'title': item.findtext('title', ''), 'path': path,
                  'body': item.findtext('content:encoded', '', NS), 'comments': []}
        for comment in item.findall('wp:comment', NS):
            if comment.findtext('wp:comment_approved', namespaces=NS) == '1':
                record['comments'].append({
                    'author': comment.findtext('wp:comment_author', '', NS),
                    'date': comment.findtext('wp:comment_date', '', NS)[:10],
                    'body': comment.findtext('wp:comment_content', '', NS)})
        if item.findtext('wp:post_type', namespaces=NS) == 'post':
            rss = original.get(path)
            if rss is None or rss.find('enclosure') is None:
                raise ValueError(f'Published episode missing from RSS: {path}')
            when = parsedate_to_datetime(rss.findtext('pubDate')).astimezone(ZoneInfo('Europe/Helsinki'))
            guid = rss.findtext('guid')
            hosted = host_items.get(guid, rss)
            enclosure = hosted.find('enclosure')
            if enclosure is None or url.urlsplit(enclosure.get('url', '')).scheme != 'https':
                raise ValueError(f'Missing HTTPS enclosure for {guid}')
            image = rss.find('itunes:image', NS)
            record.update({'guid': guid, 'date': when.date().isoformat(), 'year': when.year,
                           'audio': enclosure.get('url'), 'audioType': enclosure.get('type', 'audio/mp4'),
                           'originalAudio': rss.find('enclosure').get('url'),
                           'summary': rss.findtext('itunes:summary', '', NS),
                           'episodeTitle': rss.findtext('itunes:title', record['title'], NS),
                           'duration': rss.findtext('itunes:duration', '', NS),
                           'image': image_url(image.get('href')) if image is not None else ''})
            posts.append(record)
        else:
            pages.append(record)
    if len(posts) != len(original):
        raise ValueError('Export and RSS episode counts differ')
    posts.sort(key=lambda p: (p['date'], p['path']), reverse=True)
    image_sources = set()
    for record in posts + [p for p in pages if p['path'] != '/home']:
        image_sources.update(ImageFinder(record['body']).urls)
        if record.get('image'):
            image_sources.add(record['image'])
    # Keep all attachment originals, including ranking illustrations and older cover art.
    for item in source.findall('./channel/item'):
        attachment = item.findtext('wp:attachment_url', '', NS)
        if attachment:
            image_sources.add(image_url(attachment))
    image_map = {}
    jobs = []
    for image in sorted(image_sources):
        suffix = Path(url.unquote(url.urlsplit(image).path)).suffix.lower()
        suffix = suffix if suffix in {'.png', '.jpg', '.jpeg', '.webp', '.gif'} else '.jpg'
        path = IMAGES / (hashlib.sha256(image.encode()).hexdigest()[:20] + suffix)
        image_map[image] = str(path.relative_to(ROOT))
        if args.download_images:
            jobs.append((image, path, 'image'))
    if args.backup_audio:
        for post in posts:
            key = hashlib.sha256(post['guid'].encode()).hexdigest()[:20]
            jobs.append((post['originalAudio'], PRIVATE / 'audio' / (key + '.m4a'), 'audio'))
    if jobs:
        completed, failures = [], []
        with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
            futures = {pool.submit(transfer, job): job for job in jobs}
            for future in concurrent.futures.as_completed(futures):
                try:
                    completed.append(future.result())
                except Exception as error:
                    failures.append({'url': futures[future][0], 'error': str(error)})
                if (len(completed) + len(failures)) % 20 == 0:
                    print(f'Downloaded {len(completed)}/{len(jobs)}; failures {len(failures)}', flush=True)
        manifest_path = PRIVATE / 'backup-manifest.json'
        previous = json.loads(manifest_path.read_text()) if manifest_path.exists() else []
        combined = {m['source']: m for m in previous + completed}
        manifest_path.write_text(json.dumps(list(combined.values()), ensure_ascii=False, indent=2) + '\n')
        if failures:
            (PRIVATE / 'download-failures.json').write_text(json.dumps(failures, indent=2))
            raise ValueError(f'{len(failures)} downloads failed; see private download-failures.json and rerun')
    absent = [p for p in image_map.values() if not (ROOT / p).is_file()]
    if absent:
        raise ValueError(f'{len(absent)} archive images missing; run with --download-images')
    known_paths = {p['path'] for p in posts + pages} | {'/avsnitt'}
    for post in posts:
        post['duration'] = audio_duration(post['guid'], post['duration'])
        prefix = '../../'
        editorial = Content(image_map, prefix, known_paths).render(post['body'])
        # RSS summaries often repeat the complete article; show that text once.
        duplicate = text_only(editorial).startswith(' '.join(post['summary'].split()))
        summary = f'<p class="episode-summary">{esc(post["summary"])}</p>' if post['summary'] and not duplicate else ''
        image = f'<img class="episode-art" src="{prefix}{image_map[post["image"]]}" alt="" width="600" height="600">' if post['image'] else ''
        position = posts.index(post)
        adjacent = []
        for offset, label in [(-1, 'newer'), (1, 'older')]:
            index = position + offset
            if 0 <= index < len(posts):
                other = posts[index]
                adjacent.append(f'<a href="{prefix}{esc(other["path"].lstrip("/"))}/"><span data-i18n="{label}">{"Uudempi jakso" if offset == -1 else "Vanhempi jakso"}</span><strong>{esc(other["episodeTitle"])}</strong></a>')
        comments = ''
        if post['comments']:
            comments = '<details class="comments"><summary><span data-i18n="comments">Kommentit / Kommentarer</span> (' + str(len(post['comments'])) + ')</summary>'
            for c in post['comments']:
                comments += f'<article><header><strong>{esc(c["author"])}</strong> <time datetime="{esc(c["date"])}">{esc(c["date"])}</time></header><p>{esc(c["body"]).replace(chr(10), "<br>")}</p></article>'
            comments += '</details>'
        body = f'''<a class="back-link" href="../?year={post['year']}" data-i18n="allEpisodes">Kaikki jaksot</a>
<article class="episode"><div class="episode-hero">{image}<div><p class="eyebrow">O, helga podcast. · {post['year']}</p>
<h1>{esc(post['episodeTitle'])}</h1><p class="episode-meta"><time datetime="{post['date']}">{post['date']}</time><span>{esc(post['duration'])}</span></p>
<audio controls preload="none" aria-label="{esc(post['episodeTitle'])}"><source src="{esc(post['audio'])}" type="{esc(post['audioType'])}"><a href="{esc(post['audio'])}">Audio</a></audio>
<a class="audio-download" href="{esc(post['audio'])}" data-i18n="audioFile">Avaa äänitiedosto</a></div></div>
<div class="prose">{summary}{editorial}</div>{comments}</article><nav class="episode-neighbours" aria-label="Jaksot / Avsnitt">{''.join(adjacent)}</nav>'''
        write_page(post['path'], shell(post['episodeTitle'], body, prefix, feed_url, post['summary'] or text_only(post['body'])))
    years = sorted({p['year'] for p in posts}, reverse=True)
    cards = []
    for post in posts:
        cover = f'<img src="../{thumbnail(image_map[post["image"]])}" alt="" width="92" height="92" loading="lazy" decoding="async">' if post['image'] else '<span class="card-symbol" aria-hidden="true">✳</span>'
        search = ' '.join([post['episodeTitle'], post['summary'], text_only(post['body'])])
        cards.append(f'''<li class="episode-card" data-year="{post['year']}" data-search="{esc(search)}"><a href="../{esc(post['path'].lstrip('/'))}/">{cover}<div><p class="card-meta"><time datetime="{post['date']}">{post['date']}</time><span>{esc(post['duration'])}</span></p><h2>{esc(post['episodeTitle'])}</h2><p class="card-summary">{esc(post['summary'])}</p></div><span class="play-mark" aria-hidden="true">▶</span></a></li>''')
    options = ''.join(f'<option value="{y}">{y} · {sum(p["year"] == y for p in posts)}</option>' for y in years)
    body = f'''<section class="archive-intro"><p class="eyebrow">Johanna &amp; Tomi · 2022–2025</p><h1>O, helga<br><em>podcast.</em><span aria-hidden="true">✳</span></h1>
<p class="archive-lead" data-i18n="intro">Yksi laulu. Monta jouluyötä. Kaikki aiempien vuosien podcastjaksot samassa arkistossa.</p>
<div class="archive-quick-links"><a href="{APPLE}">Apple Podcasts</a><a href="{esc(feed_url)}" data-i18n="rss">Tilaa RSS-syöte</a></div></section>
<section class="episode-library" aria-label="Jaksot / Avsnitt"><div class="archive-filters"><label><span data-i18n="search">Etsi jaksoa</span><input type="search" id="episode-search" placeholder="Jakso, esittäjä, aihe…" autocomplete="off"></label><label><span data-i18n="year">Vuosi</span><select id="episode-year"><option value="all" data-i18n="allYears">Kaikki vuodet</option>{options}</select></label></div>
<div class="library-heading"><h2 data-i18n="episodes">Jaksot</h2><p id="episode-count" role="status" aria-live="polite">{len(posts)} / {len(posts)}</p></div>
<ul class="episode-grid">{''.join(cards)}</ul><p id="no-episodes" hidden data-i18n="noResults">Hakua vastaavia jaksoja ei löytynyt.</p>
<p class="original-language" data-i18n="originalLanguage">Jaksot ja esittelytekstit ovat alkuperäisillä kielillään, suomeksi tai ruotsiksi.</p></section>'''
    write_page('/avsnitt', shell('Podcastarkisto / Podcastarkiv', body, '../', feed_url,
                               '77 podcastjaksoa Oi jouluyöstä / 77 podcastavsnitt om O helga natt. Johanna & Tomi, 2022–2025.'))
    for page in pages:
        path = page['path']
        if path == '/home':
            write_page(path, '<!doctype html><html lang="fi"><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=../"><title>O, helga blog.</title><a href="../">O, helga blog.</a></html>')
            continue
        content = Content(image_map, '../', known_paths).render(page['body'])
        if path == '/subscribe':
            content = f'<p><a href="{APPLE}">Apple Podcasts</a></p><p><a href="{esc(feed_url)}">RSS</a></p><p><a href="../avsnitt/" data-i18n="allEpisodes">Kaikki jaksot</a></p>'
        if path == '/vilken-o-helga':
            content = '<p><a class="primary-link" href="https://take.quiz-maker.com/QQ5HVF2JB" rel="noopener noreferrer" data-i18n="openQuiz">Avaa testi / Öppna testet</a></p>'
        body = f'<a class="back-link" href="../avsnitt/" data-i18n="allEpisodes">Kaikki jaksot</a><article class="archive-page"><p class="eyebrow">O, helga blog.</p><h1>{esc(page["title"])}</h1><div class="prose">{content}</div></article>'
        write_page(path, shell(page['title'], body, '../', feed_url, text_only(content)))
    public = {'title': 'O, helga podcast.', 'feed': feed_url, 'originalFeed': OLD_FEED,
              'episodes': [{k: p[k] for k in ['guid', 'title', 'episodeTitle', 'path', 'year', 'date', 'duration', 'audio', 'audioType']}
                           for p in posts]}
    (ROOT / 'assets/archive/episodes.json').write_text(json.dumps(public, ensure_ascii=False, indent=2) + '\n')
    report = {'publishedEpisodes': len(posts), 'pages': len(pages), 'years': {str(y): sum(p['year'] == y for p in posts) for y in years},
              'images': len(image_map), 'publicComments': sum(len(p['comments']) for p in posts),
              'rss': feed_url, 'audioRehosted': bool(host_items)}
    (PRIVATE / 'import-report.json').write_text(json.dumps(report, indent=2) + '\n')
    print(json.dumps(report, ensure_ascii=False), flush=True)


if __name__ == '__main__':
    main()
