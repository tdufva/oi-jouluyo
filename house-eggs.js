function initHouseEggs() {
  const windowButton = document.getElementById('rose-window');
  const roof = windowButton.parentElement;
  const status = document.getElementById('rose-window-status');
  const holidayArt = {
    candles: `<svg viewBox="0 0 90 90">
      <path d="M10 75h70M21 81h48" stroke="#f4c095" stroke-width="2"/>
      <path d="M20 52h13v22H20zM40 40h15v34H40zM62 55h12v19H62z" fill="#ee2e31" stroke="#071e22" stroke-width="2"/>
      <path d="M24 53h4v19h-4zm21-11h4v30h-4zm21 15h4v15h-4z" fill="#f4c095"/>
      <g class="egg-flames" fill="#fff0da" stroke="#ee2e31" stroke-width="1.4"><path d="M27 33q-12 12 0 17 10-5 0-17ZM47 16q-13 14 0 21 12-6 0-21ZM68 36q-11 12 0 16 9-5 0-16Z"/></g>
    </svg>`,
    baubles: `<svg viewBox="0 0 90 90">
      <path d="M24 13v25m22-28v38m23-30v18" fill="none" stroke="#f4c095" stroke-width="1.6"/>
      <g class="egg-baubles" stroke="#071e22" stroke-width="2">
        <path d="m24 35 13 14-13 20-12-20z" fill="#ee2e31"/><path d="m24 35 13 14H24v20L12 49h12z" fill="#f4c095"/>
        <circle cx="46" cy="62" r="15" fill="#f4c095"/><path d="M31 62a15 15 0 0 0 30 0H31Z" fill="#1d7874"/>
        <path d="m62 36 15 2 2 19-18-1z" fill="#679289"/><path d="m62 36 17 21-18-1z" fill="#ee2e31"/>
      </g>
    </svg>`,
    comet: `<svg viewBox="0 0 90 90"><path d="m8 71 48-31m-42 39 36-20m-29 6 38-28" stroke="#f4c095" fill="none" stroke-width="1.5"/><path d="m64 9 5 21 19 6-19 5-5 23-6-23-21-5 21-6z" fill="#f4c095" stroke="#071e22" stroke-width="2"/><path d="m64 9 5 21 19 6H64v28l-6-23-21-5h27z" fill="#ee2e31"/><path d="m64 24 3 10 10 2-10 3-3 11-3-11-11-3 11-2z" fill="#fff0da"/></svg>`,
    gift: `<svg viewBox="0 0 90 90"><g class="egg-gift" stroke="#071e22" stroke-width="2"><path d="m45 37-20-8 3-10 14 5 5 12 8-17 13 1 2 10z" fill="#ee2e31"/><path d="m23 41 43-1-2 33-39 2z" fill="#1d7874"/><path d="m40 42 10-1-1 33h-9z" fill="#f4c095"/><path d="m19 36 52-2-1 12-50 1z" fill="#ee2e31"/><path d="m39 36 13-1-1 12H39z" fill="#f4c095"/></g><path d="m13 35 4-6m55 5 9-7M43 17V9" stroke="#f4c095" stroke-width="2"/></svg>`,
    tracks: `<svg viewBox="0 0 150 70"><defs><g id="egg-paw" fill="#f4c095"><path d="M-9 3c0-2 5-7 9-8 4 1 9 6 9 8 0 8-6 4-9 4s-9 4-9-4Z"/><circle cx="-8" cy="-6" r="2.5"/><circle cx="-3" cy="-10" r="2.8"/><circle cx="3" cy="-10" r="2.8"/><circle cx="8" cy="-6" r="2.5"/></g></defs><use href="#egg-paw" transform="translate(23 54) rotate(23)"/><use href="#egg-paw" transform="translate(54 29) rotate(33)"/><use href="#egg-paw" transform="translate(91 39) rotate(42)"/><use href="#egg-paw" transform="translate(128 16) rotate(51)"/></svg>`,
    flare: `<svg viewBox="0 0 106 118"><path class="flare-trail" d="M53 41 35 113l17-20 13 23-7-74z" fill="#ee2e31"/><path d="m53 12 12 31-10 18-13-17z" fill="#ee2e31" stroke="#fff0da" stroke-width="2"/><path d="m53 0 4 19 18 5-18 5-4 19-5-19-19-5 19-5z" fill="#fff0da"/><path d="M20 20 5 15m18 23L9 45m76-24 15-7m-15 24 14 6" stroke="#ee2e31" stroke-width="2.5" stroke-linecap="round"/></svg>`,
    rescue: `<svg viewBox="0 0 238 118">
      <path class="rescue-light" d="m111 66-27 51h69l-27-51z" fill="#f4c095" opacity=".34"/>
      <path d="m66 62-41-12-10-15-10 2 12 27 47 15z" fill="#679289" stroke="#071e22" stroke-width="3"/>
      <path d="m23 49 3-11 11-1-5 14z" fill="#ee2e31"/><path d="m65 55 23-16h53l34 18 8 23-22 9H87L64 75z" fill="#ee2e31" stroke="#071e22" stroke-width="3"/>
      <path d="M87 59h74l18 13-13 11H88z" fill="#f4c095"/><path d="m141 42 32 16 4 13-38-12z" fill="#1d7874" stroke="#071e22" stroke-width="2"/>
      <path d="M99 62h16v5h-5v5h-6v-5h-5z" fill="#ee2e31"/><path d="M115 39V23M95 85l-6 13m59-13 7 13m-76 0h89l9-5" fill="none" stroke="#071e22" stroke-width="4" stroke-linecap="round"/>
      <path class="rescue-rotor" d="M46 23h139m-113-5h91" stroke="#fff0da" stroke-width="2" stroke-linecap="round"/><path d="M192 52h13m-10 11h25m-17 14h25" stroke="#679289" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
  };

  const hotspots = [
    { button: document.getElementById('sky-star'), art: 'comet', label: ['Tähden yllätys', 'Stjärnans överraskning'], message: ['Joulutähti lensi katon yli.', 'En julstjärna flög över taket.'] },
    { button: document.getElementById('chimney-egg'), art: 'gift', label: ['Savupiipun yllätys', 'Skorstenens överraskning'], message: ['Savupiipusta ilmestyi lahjapaketti.', 'Ett paket dök upp ur skorstenen.'] },
    { button: document.getElementById('snow-tracks'), art: 'tracks', label: ['Tassunjäljet lumessa', 'Tassavtryck i snön'], message: ['Lumeen ilmestyi tassunjälkiä.', 'Tassavtryck dök upp i snön.'] },
  ];
  const lang = () => document.documentElement.lang === 'sv' ? 1 : 0;
  const windowScenes = ['constellation', 'candles', 'baubles'];
  const windowMessages = [
    ['Talon julkisivulla syttyi tähtikuvio.', 'En stjärnbild tändes på husets fasad.'],
    ['Ikkunassa syttyi kolme joulukynttilää.', 'Tre julljus tändes i fönstret.'],
    ['Joulukoristeet heilahtivat ikkunassa.', 'Julgranskulor svängde i fönstret.'],
  ];
  const sos = '...---...';
  let roseScene = 0;
  let winterScene = 0;
  let scene;
  let sceneTimer;
  let rescueActive = false;
  let entered = '';
  let lastSignal = -Infinity;
  let lastWindowScene = -Infinity;
  let boundWinterWindow;

  function clearScene() {
    clearTimeout(sceneTimer);
    scene?.remove();
    scene = undefined;
    rescueActive = false;
  }

  function showArt(parent, name, duration) {
    clearScene();
    scene = document.createElement('span');
    scene.className = `holiday-egg egg-${name}`;
    scene.setAttribute('aria-hidden', 'true');
    scene.innerHTML = holidayArt[name];
    parent.append(scene);
    sceneTimer = setTimeout(clearScene, duration);
  }

  function playWindowScene(button) {
    const index = (button === windowButton ? roseScene++ : winterScene++) % windowScenes.length;
    const name = windowScenes[index];
    if (name === 'constellation') {
      clearScene();
      if (button === windowButton) {
        const { width, height } = roof.getBoundingClientRect();
        const points = [[284 / 740, 128 / 260], [.23, .76], [.12, 1.04], [.31, 1.17], [.51, .9], [.65, 1.16], [.85, 1.04], [.91, .74], [.73, .57]]
          .map(([x, y]) => [Math.round(width * x), Math.round(height * y)]);
        scene = drawBookConstellation(roof, points, 4400, .72);
      } else {
        const facade = button.closest('.house-body');
        const { left, top, width } = facade.getBoundingClientRect();
        const windowBounds = button.getBoundingClientRect();
        const windowX = windowBounds.left + windowBounds.width / 2 - left;
        const windowY = windowBounds.top + windowBounds.height / 2 - top;
        const rise = Math.min(180, width * .48);
        const points = [[windowX / width, 0], [.79, .48], [.69, .28], [.63, .81], [.51, 1], [.36, .71], [.29, 1.07], [.18, .52], [.1, .85]]
          .map(([x, y]) => [Math.round(x * width), Math.round(windowY - y * rise)]);
        scene = drawBookConstellation(facade, points, 4400, .72);
      }
      sceneTimer = setTimeout(clearScene, 4400);
    } else {
      showArt(button === windowButton ? roof : button, name, 3800);
    }
    status.textContent = windowMessages[index][lang()];
  }

  function launchRescue() {
    const { top, height } = roof.getBoundingClientRect();
    if (top < 120 || top > window.innerHeight - height - 48) {
      roof.scrollIntoView({ block: 'center', behavior: 'instant' });
    }
    showArt(roof, 'flare', 2100);
    rescueActive = true;
    status.textContent = ['Punainen hätäraketti nousi taivaalle.', 'En röd nödraket steg mot himlen.'][lang()];
    clearTimeout(sceneTimer);
    sceneTimer = setTimeout(() => {
      showArt(roof, 'rescue', 5800);
      rescueActive = true;
      status.textContent = ['Pelastushelikopteri saapui.', 'En räddningshelikopter anlände.'][lang()];
    }, 2100);
  }

  function signal(duration, button) {
    if (rescueActive) return;
    const now = performance.now();
    if (now - lastSignal > 1900) entered = '';
    lastSignal = now;
    entered += duration >= 360 ? '-' : '.';
    while (!sos.startsWith(entered)) entered = entered.slice(1);
    if (entered === sos) {
      entered = '';
      launchRescue();
    } else if (duration < 360 && now - lastWindowScene > 750) {
      lastWindowScene = now;
      playWindowScene(button);
    }
  }

  function isActivationKey(event) {
    return event.key === ' ' || event.key === 'Enter';
  }
  function bindWindow(button) {
    let pointerStart;
    let keyStart;
    button.addEventListener('pointerdown', event => {
      if (event.isPrimary && event.button === 0) pointerStart = performance.now();
    });
    button.addEventListener('pointerup', event => {
      if (!event.isPrimary || pointerStart === undefined) return;
      const duration = performance.now() - pointerStart;
      pointerStart = undefined;
      const bounds = button.getBoundingClientRect();
      if (event.clientX >= bounds.left && event.clientX <= bounds.right &&
          event.clientY >= bounds.top && event.clientY <= bounds.bottom) signal(duration, button);
    });
    button.addEventListener('pointercancel', () => { pointerStart = undefined; });
    button.addEventListener('click', event => {
      if (!event.detail && !event.pointerType) signal(0, button);
    });
    button.addEventListener('contextmenu', event => event.preventDefault());
    button.addEventListener('keydown', event => {
      if (!isActivationKey(event)) return;
      event.preventDefault();
      if (!event.repeat) keyStart = performance.now();
    });
    button.addEventListener('keyup', event => {
      if (!isActivationKey(event)) return;
      event.preventDefault();
      if (keyStart === undefined) return;
      signal(performance.now() - keyStart, button);
      keyStart = undefined;
    });
    button.addEventListener('blur', () => { keyStart = undefined; pointerStart = undefined; });
  }
  bindWindow(windowButton);

  for (const { button, art, message } of hotspots) {
    button.addEventListener('click', () => {
      if (rescueActive) return;
      showArt(art === 'tracks' ? button.parentElement : roof, art, 3600);
      status.textContent = message[lang()];
    });
  }
  function localize() {
    windowButton.setAttribute('aria-label', ['Ruusuikkunan jouluyllätykset', 'Rosettfönstrets julöverraskningar'][lang()]);
    const winterWindow = document.getElementById('winter-window');
    if (winterWindow && boundWinterWindow !== winterWindow) {
      boundWinterWindow = winterWindow;
      bindWindow(winterWindow);
    }
    winterWindow?.setAttribute('aria-label', ['Jouluikkunan yllätykset', 'Julfönstrets överraskningar'][lang()]);
    for (const { button, label } of hotspots) button.setAttribute('aria-label', label[lang()]);
  }
  document.addEventListener('calendar-language', localize);
  document.addEventListener('visibilitychange', () => {
    entered = '';
    clearScene();
  });
  localize();
}
