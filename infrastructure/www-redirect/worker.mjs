const CALENDAR = 'https://ohelga.blog';
const PODCAST_FEED = 'https://feeds.redcircle.com/84f56904-c061-4877-be4c-c527ec8fa5a5';

export default {
  fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
          'Access-Control-Max-Age': '86400'
        }
      });
    }
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', {
        status: 405,
        headers: { Allow: 'GET, HEAD, OPTIONS' }
      });
    }
    const incoming = new URL(request.url);
    const path = incoming.pathname.replace(/\/+$/, '') || '/';
    const format = (incoming.searchParams.get('format') || '').toLowerCase();
    const isPodcastFeed = path === '/avsnitt' && (format === 'rss' || format === 'atom');
    const target = isPodcastFeed
      ? PODCAST_FEED
      : CALENDAR + incoming.pathname + incoming.search;

    return new Response(null, {
      status: 301,
      headers: {
        Location: target,
        'Cache-Control': 'public, max-age=300',
        'Access-Control-Allow-Origin': '*',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
      }
    });
  }
};
