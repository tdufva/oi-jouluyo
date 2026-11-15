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
    choir: `<svg viewBox="0 0 287 156">
      <path class="choir-arch" d="M28 140V96a115 89 0 0 1 230 0v44Z" fill="#071e22" stroke="#679289" stroke-width="2"/>
      <path d="M10 140h267m-236 7h204M51 137v-29a93 77 0 0 1 185 0v29" fill="none" stroke="#f4c095" stroke-width="1.6"/>
      ${['#1d7874', '#679289', '#ee2e31', '#1d7874', '#a66353'].map((coat, i) => `<g transform="translate(${42 + i * 43} ${i === 2 ? 64 : i % 2 ? 76 : 84})">
        <g class="choir-singer" style="--choir-delay:${i * -152}ms">
          <path d="M-3 55 4 29l18-6 11 8 9 24Z" fill="${coat}" stroke="#071e22" stroke-width="2"/>
          <path d="M5 13 10 3l13-2 10 11-4 14-13 5-10-7Z" fill="${i % 2 ? '#cf946d' : '#f4c095'}" stroke="#071e22" stroke-width="2"/>
          <path d="m9 12 3-2m12 0 4 2" stroke="#071e22" stroke-linecap="round" stroke-width="1.8"/>
          <ellipse class="choir-mouth" cx="20" cy="20" rx="3.4" ry="5.1" fill="#071e22"/>
          <path d="m4 36 15 5 16-6-2 13-14 7-13-5Z" fill="#f4c095" stroke="#071e22" stroke-width="2"/>
          <path d="M19 41v14" stroke="#071e22" stroke-width="1.5"/>
        </g>
      </g>`).join('')}
      <g class="choir-notes" fill="#f4c095"><path d="M93 39v12q-8-3-8 2 0 5 10 1V40l7 2v-4Zm50-14v15q-8-3-8 2 0 6 10 1V29l8-2v10q-8-2-8 3 0 5 10 1V22Zm51 12v12q-8-3-8 2 0 5 10 1V38l7 2v-4Z"/><path d="M65 51h9m-4-4v9m147-9h12m-6-6v12" stroke="#679289" stroke-width="1.5"/></g>
    </svg>`,
    ladder: `<svg viewBox="0 0 170 212">
      <g class="ladder-frame" fill="none" stroke-linecap="round">
        <path d="M73 199 102 34m7 165 28-165M85 145l36 0M91 112h36M97 79h36M102 47h34m-57 132h36" stroke="#071e22" stroke-width="7"/>
        <path d="M73 199 102 34m7 165 28-165M85 145h36M91 112h36M97 79h36M102 47h34m-57 132h36" stroke="#f4c095" stroke-width="3.7"/>
        <path d="M106 35h33l11-9M66 200h52" stroke="#ee2e31" stroke-width="2"/>
      </g>
      <g class="ladder-climber">
        <path d="m7 22 17-15 13 12-5 17L16 42Z" fill="#ee2e31" stroke="#071e22" stroke-width="2"/>
        <path d="m10 22 8 1m10-6 18 1m-27 17-6 20H4m22-22 9 14 10-4" fill="none" stroke="#f4c095" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="m24-8 10 2 2 11-12 6-8-10Z" fill="#f4c095" stroke="#071e22" stroke-width="2"/>
        <path d="m17 0 7-17 15 10-4 7Z" fill="#679289" stroke="#071e22" stroke-width="2"/>
        <circle cx="30" cy="1" r="1.5" fill="#071e22"/>
      </g>
    </svg>`,
    freedom: `<svg viewBox="0 0 325 165">
      <path class="freedom-dawn" d="M46 140a117 99 0 0 1 234 0Z" fill="#f4c095"/>
      <path d="M18 140h290m-253 8h199" fill="none" stroke="#679289" stroke-width="1.5"/>
      ${['#679289', '#ee2e31', '#f4c095', '#1d7874'].map((coat, i) => `<g transform="translate(${74 + i * 46} ${i % 2 ? 56 : 65})">
        <g class="freedom-figure" style="--freedom-x:${i < 2 ? -17 + i * 10 : 7 + (i - 2) * 10}px;--freedom-delay:${i * 90}ms">
          <path d="m11 46-2 25m20-25 7 25M2 73h12m18 0h11" fill="none" stroke="#071e22" stroke-width="5" stroke-linecap="round"/>
          <path d="m5 27 12-7 18 6 5 25H0Z" fill="${coat}" stroke="#071e22" stroke-width="2"/>
          <path d="M11 9 16 0l14 2 6 8-7 13-13-1Z" fill="${i % 2 ? '#b97759' : '#f4c095'}" stroke="#071e22" stroke-width="2"/>
          <path class="freedom-hands" d="M0 26-12 7m52 19L51 3" fill="none" stroke="#071e22" stroke-width="3.5" stroke-linecap="round"/>
        </g>
      </g>`).join('')}
      <g class="freedom-chain" fill="none" stroke="#fff0da" stroke-width="3">
        <g class="freedom-chain-left"><ellipse cx="82" cy="122" rx="13" ry="6"/><ellipse cx="105" cy="122" rx="13" ry="6"/><ellipse cx="128" cy="122" rx="13" ry="6"/><path d="M153 117c-10-3-15 0-15 5s7 7 15 5"/></g>
        <g class="freedom-chain-right"><path d="M173 117c10-3 15 0 15 5s-7 7-15 5"/><ellipse cx="197" cy="122" rx="13" ry="6"/><ellipse cx="220" cy="122" rx="13" ry="6"/><ellipse cx="243" cy="122" rx="13" ry="6"/></g>
        <ellipse class="freedom-chain-joint" cx="163" cy="122" rx="13" ry="6"/>
        <path class="freedom-spark" d="m162 104 1 10m-10-10 5 10m14-10-5 10m-5 16v9" stroke="#ee2e31" stroke-width="2" stroke-linecap="round"/>
      </g>
    </svg>`,
    meteors: `<svg viewBox="0 0 960 650" preserveAspectRatio="xMidYMid slice">
      ${[[860, 56, 0, 1], [573, 78, 320, .72], [1000, 128, 610, .85], [737, 6, 940, 1.2], [918, 196, 1320, .75], [536, 42, 1640, .58], [1040, 90, 1980, 1.2], [780, 142, 2290, .69], [692, 83, 2680, .95], [973, 231, 2920, .65]].map(([x, y, delay, size], i) => `<g transform="translate(${x} ${y}) scale(${size})">
        <g class="meteor-streak" style="--meteor-delay:${delay}ms">
          <path d="m0 0 139-78L23-2 10 9Z" fill="${i % 3 === 0 ? '#ee2e31' : '#679289'}" opacity=".75"/>
          <path d="m10 1 104-65M25 3l60-34" stroke="#f4c095" stroke-width="1.6" opacity=".84"/>
          <path d="M0-7 10-1 6 8-4 6-9 0Z" fill="#f4c095"/><path d="m-2-4 5 3-5 4-3-3Z" fill="#fff0da"/>
        </g>
      </g>`).join('')}
    </svg>`,
  };

  const house = roof.closest('.house');
  const hotspots = [
    { id: 'sky-star', art: 'comet', mount: roof, label: ['Tähden yllätys', 'Stjärnans överraskning'], message: ['Joulutähti lensi katon yli.', 'En julstjärna flög över taket.'] },
    { id: 'chimney-egg', art: 'gift', mount: roof, label: ['Savupiipun yllätys', 'Skorstenens överraskning'], message: ['Savupiipusta ilmestyi lahjapaketti.', 'Ett paket dök upp ur skorstenen.'] },
    { id: 'snow-tracks', art: 'tracks', mount: document.querySelector('.ground'), label: ['Tassunjäljet lumessa', 'Tassavtryck i snön'], message: ['Lumeen ilmestyi tassunjälkiä.', 'Tassavtryck dök upp i snön.'] },
    { id: 'choir-egg', art: 'choir', mount: roof, duration: 9600, label: ['Katon pikkuikkunat, yllätys', 'Takets små fönster, överraskning'], message: ['Katon pikkuikkunoihin ilmestyi laulava kuoro.', 'En sjungande kör dök upp i takets små fönster.'] },
    { id: 'ladder-egg', art: 'ladder', mount: roof, duration: 5800, label: ['Kattoporras, yllätys', 'Taktrappan, överraskning'], message: ['Hahmo hyppäsi tikapuille ja kiipesi katolle.', 'En figur hoppade upp på stegen och klättrade till taket.'] },
    { id: 'freedom-egg', art: 'freedom', mount: house, duration: 6500, label: ['Kahle, yllätys', 'Kedjan, överraskning'], message: ['Kahleet katkesivat ja orjuutetut ihmiset astuivat vapaina valoon.', 'Kedjorna brast och de förslavade människorna steg fria ut i ljuset.'] },
    { id: 'meteor-egg', art: 'meteors', mount: document.body, duration: 6200, label: ['Punainen tähti, yllätys', 'Den röda stjärnan, överraskning'], message: ['Taivas pimeni hetkeksi, kun meteoriparvi lensi yli.', 'Himlen mörknade en stund när en meteorsvärm drog förbi.'] },
  ].map(spot => ({ ...spot, button: document.getElementById(spot.id) }));
  const lang = () => document.documentElement.lang === 'sv' ? 1 : 0;
  const windowScenes = ['stars', 'candles', 'baubles'];
  const starShape = '<path d="M0-9 2.5-2.5 9 0 2.5 2.5 0 9-2.5 2.5-9 0-2.5-2.5Z"/>';
  let roseScene = 0;
  let winterScene = 0;
  let scene;
  let sceneTimer;
  let rescueActive = false;
  let tapWindow;
  let taps = 0;
  let lastTap = -Infinity;
  let boundWinterWindow;
  let choirAudio;

  function clearScene() {
    clearTimeout(sceneTimer);
    if (choirAudio) {
      choirAudio.pause();
      choirAudio.currentTime = 0;
    }
    scene?.remove();
    scene = undefined;
    rescueActive = false;
  }

  function showArt(parent, name, duration, art = holidayArt[name]) {
    clearScene();
    scene = document.createElement('span');
    scene.className = `holiday-egg egg-${name}`;
    scene.setAttribute('aria-hidden', 'true');
    scene.innerHTML = art;
    parent.append(scene);
    sceneTimer = setTimeout(clearScene, duration);
  }

  function playWindowStars(button, isRose) {
    if (isRose) {
      const radius = 46;
      const rays = Array.from({ length: 8 }, (_, index) => {
        const angle = index * 45;
        return `<g transform="rotate(${angle} 62 62)"><path d="M62 29V20" stroke="currentColor" stroke-width="1.2"/><g transform="translate(62 ${62 - radius})"><g class="rose-ray" style="--star-delay:${index * 75}ms">${starShape}</g></g></g>`;
      }).join('');
      showArt(roof, 'rose-stars', 3700, `<svg viewBox="0 0 124 124"><circle cx="62" cy="62" r="40" fill="none" stroke="#ee2e31" stroke-width="1.6" stroke-dasharray="2 4"/><g class="rose-crown">${rays}</g><g transform="translate(62 62) scale(2.05)"><g class="rose-ray">${starShape}</g></g></svg>`);
      status.textContent = ['Ruusuikkunan ympärille syttyi tähtikehä.', 'En krans av stjärnor tändes runt rosettfönstret.'][lang()];
      return;
    }
    const facade = button.closest('.house-body');
    const { left, top, width, height } = facade.getBoundingClientRect();
    const windowBounds = button.getBoundingClientRect();
    const x = Math.round(windowBounds.left + windowBounds.width / 2 - left);
    const y = Math.round(windowBounds.top + windowBounds.height / 2 - top);
    const spread = Math.min(1, width / 510);
    const stars = [[0, -6, 1.55], [-27, -18, .8], [-51, -38, 1.25], [18, -57, .7], [-83, -71, 1.1], [-139, -88, .7], [-107, -112, 1], [-184, -135, 1.35], [-153, -159, .66]]
      .map(([dx, dy, scale], index) => `<g transform="translate(${Math.round(x + dx * spread)} ${Math.round(y + dy * spread)}) scale(${scale})"><g class="winter-star" style="--star-delay:${index * 120}ms">${starShape}</g></g>`).join('');
    showArt(facade, 'winter-stars', 4200, `<svg viewBox="0 0 ${width} ${height}">${stars}</svg>`);
    status.textContent = ['Jouluikkunasta leijui tähtisade.', 'Ett stjärnregn steg från julfönstret.'][lang()];
  }

  function playWindowScene(button) {
    const isRose = button === windowButton;
    const name = windowScenes[(isRose ? roseScene++ : winterScene++) % windowScenes.length];
    if (name === 'stars') {
      playWindowStars(button, isRose);
      return;
    }
    showArt(isRose ? roof : button, name, 3800);
    status.textContent = (name === 'candles'
      ? ['Ikkunassa syttyi kolme joulukynttilää.', 'Tre julljus tändes i fönstret.']
      : ['Joulukoristeet heilahtivat ikkunassa.', 'Julgranskulor svängde i fönstret.'])[lang()];
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
    if (duration >= 360) {
      taps = 0;
      return;
    }
    if (button !== tapWindow || now - lastTap > 850) taps = 0;
    tapWindow = button;
    lastTap = now;
    taps++;
    if (taps === 3) {
      taps = 0;
      launchRescue();
    } else if (taps === 1) {
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

  for (const { button, art, mount, duration = 3600, message } of hotspots) {
    button.addEventListener('click', () => {
      if (rescueActive) return;
      if (art === 'choir' && scene?.classList.contains('egg-choir')) {
        clearScene();
        status.textContent = ['Kuoro hiljeni.', 'Kören tystnade.'][lang()];
        return;
      }
      showArt(mount, art, duration);
      status.textContent = message[lang()];
      if (art === 'choir') {
        choirAudio ??= new Audio('assets/holiday-choir.wav');
        scene.append(choirAudio);
        const performance = scene;
        choirAudio.play().catch(error => {
          if (error.name === 'AbortError' || scene !== performance) return;
          status.textContent = ['Kuoro näkyy, mutta ääntä ei saatu toistettua.', 'Kören visas, men ljudet kunde inte spelas upp.'][lang()];
        });
      }
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
    taps = 0;
    clearScene();
  });
  const modal = document.getElementById('book-modal');
  new MutationObserver(() => {
    if (modal.open && scene?.classList.contains('egg-choir')) clearScene();
  }).observe(modal, { attributes: true, attributeFilter: ['open'] });
  localize();
}
