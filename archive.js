(() => {
  'use strict';
  const strings = {
    fi: {
      skip: 'Siirry sisältöön', calendar: 'Joulukalenteri', archive: 'Podcastarkisto', about: 'Meistä',
      intro: 'Yksi laulu. Monta jouluyötä. Kaikki aiempien vuosien podcastjaksot samassa arkistossa.',
      rss: 'Tilaa RSS-syöte', search: 'Etsi jaksoa', year: 'Vuosi', allYears: 'Kaikki vuodet',
      episodes: 'Jaksot', noResults: 'Hakua vastaavia jaksoja ei löytynyt.',
      originalLanguage: 'Jaksot ja esittelytekstit ovat alkuperäisillä kielillään, suomeksi tai ruotsiksi.',
      allEpisodes: 'Kaikki jaksot', audioFile: 'Avaa äänitiedosto', comments: 'Kommentit',
      newer: 'Uudempi jakso', older: 'Vanhempi jakso', subscribe: 'Tilaa podcast', quiz: 'Jouluyötesti',
      openQuiz: 'Avaa testi', openService: 'Avaa palvelussa', placeholder: 'Jakso, esittäjä, aihe…',
      loadMedia: 'Lataa soitin', embedFailed: 'Soitin ei latautunut. Avaa linkki palveluun.'
    },
    sv: {
      skip: 'Till innehållet', calendar: 'Julkalender', archive: 'Podcastarkiv', about: 'Om oss',
      intro: 'En sång. Många julnätter. Alla tidigare års podcastavsnitt samlade i ett arkiv.',
      rss: 'Prenumerera via RSS', search: 'Sök avsnitt', year: 'År', allYears: 'Alla år',
      episodes: 'Avsnitt', noResults: 'Inga avsnitt matchar din sökning.',
      originalLanguage: 'Avsnitten och presentationerna är på sina ursprungliga språk, finska eller svenska.',
      allEpisodes: 'Alla avsnitt', audioFile: 'Öppna ljudfilen', comments: 'Kommentarer',
      newer: 'Nyare avsnitt', older: 'Äldre avsnitt', subscribe: 'Prenumerera', quiz: 'Julnattstest',
      openQuiz: 'Öppna testet', openService: 'Öppna i tjänsten', placeholder: 'Avsnitt, artist, ämne…',
      loadMedia: 'Ladda spelaren', embedFailed: 'Spelaren kunde inte laddas. Öppna länken till tjänsten.'
    }
  };
  let lang = 'fi';
  const params = new URLSearchParams(location.search);
  try { lang = localStorage.getItem('on-lang') === 'sv' ? 'sv' : 'fi'; } catch {}
  if (['fi', 'sv'].includes(params.get('lang'))) lang = params.get('lang');
  function translate() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(node => {
      const value = strings[lang][node.dataset.i18n];
      if (value) node.textContent = value;
    });
    document.querySelectorAll('[data-lang]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
    });
    const search = document.getElementById('episode-search');
    if (search) search.placeholder = strings[lang].placeholder;
    document.querySelectorAll('.embed-launch').forEach(button => {
      button.setAttribute('aria-label', `${strings[lang].loadMedia}: ${button.dataset.provider}`);
    });
    try { localStorage.setItem('on-lang', lang); } catch {}
  }
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => {
    lang = button.dataset.lang;
    const next = new URL(location.href);
    next.searchParams.set('lang', lang);
    history.replaceState(null, '', next);
    translate();
  }));
  translate();

  const search = document.getElementById('episode-search');
  const year = document.getElementById('episode-year');
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
  if (search && year) {
    const cards = [...document.querySelectorAll('.episode-card')].map(node => ({
      node, search: normalize(node.dataset.search), year: node.dataset.year
    }));
    if ([...year.options].some(option => option.value === params.get('year'))) year.value = params.get('year');
    search.value = params.get('q') || '';
    function filter() {
      const words = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
      let visible = 0;
      cards.forEach(card => {
        const match = (year.value === 'all' || year.value === card.year) && words.every(word => card.search.includes(word));
        card.node.hidden = !match;
        if (match) visible++;
      });
      document.getElementById('episode-count').textContent = `${visible} / ${cards.length}`;
      document.getElementById('no-episodes').hidden = visible !== 0;
      const next = new URL(location.href);
      if (year.value === 'all') next.searchParams.delete('year');
      else next.searchParams.set('year', year.value);
      if (search.value.trim()) next.searchParams.set('q', search.value.trim());
      else next.searchParams.delete('q');
      history.replaceState(null, '', next);
    }
    search.addEventListener('input', filter);
    year.addEventListener('change', filter);
    filter();
  }

  // Third-party players make no requests until explicitly opened.
  document.querySelectorAll('.embed-launch').forEach(button => button.addEventListener('click', () => {
    let source;
    try { source = new URL(button.dataset.src); } catch { return; }
    const providers = new Set(['embed.music.apple.com', 'open.spotify.com', 'www.youtube.com', 'www.youtube-nocookie.com']);
    if (source.protocol !== 'https:' || !providers.has(source.hostname)) return;
    if (source.hostname === 'www.youtube.com') source.hostname = 'www.youtube-nocookie.com';
    const frame = document.createElement('iframe');
    frame.title = button.dataset.provider;
    frame.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.allowFullscreen = true;
    frame.src = source.href;
    const container = button.closest('.media-embed');
    container.dataset.provider = button.dataset.provider;
    button.replaceWith(frame);
  }));
  document.querySelectorAll('audio').forEach(player => player.addEventListener('play', () => {
    document.querySelectorAll('audio').forEach(other => { if (other !== player) other.pause(); });
  }));
})();
