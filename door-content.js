const doorContent = (() => {
  const total = 24;
  const repo = 'https://github.com/tdufva/oi-jouluyo';
  const number = day => String(day).padStart(2, '0');
  const path = day => `luukut/${number(day)}.json`;
  const text = value => typeof value === 'string' ? value.trim() : '';

  function httpsUrl(value) {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && !url.username && !url.password ? url : null;
    } catch {
      return null;
    }
  }

  function youtubeId(value) {
    value = text(value);
    if (/^[\w-]{11}$/.test(value)) return value;
    const url = httpsUrl(value);
    if (!url) return '';
    const host = url.hostname.replace(/^(www\.|m\.)/, '');
    let id;
    if (host === 'youtu.be') id = url.pathname.split('/')[1];
    if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      id = url.searchParams.get('v') || url.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]+)/)?.[1];
    }
    return id && /^[\w-]{11}$/.test(id) ? id : '';
  }

  function appleMusic(value) {
    const url = httpsUrl(text(value));
    return url && ['music.apple.com', 'geo.music.apple.com'].includes(url.hostname) ? url.href : '';
  }

  function imageUrl(value) {
    value = text(value);
    if (httpsUrl(value)) return httpsUrl(value).href;
    if (!value.startsWith('assets/')) return '';
    const url = new URL(value, document.baseURI);
    const assets = new URL('assets/', document.baseURI);
    return url.origin === assets.origin && url.pathname.startsWith(assets.pathname) ? url.href : '';
  }

  return { total, repo, number, path, text, youtubeId, appleMusic, imageUrl };
})();
