(() => {
  const house = document.querySelector('.house');
  const roof = house.querySelector('.roof');
  const ground = document.querySelector('.ground');
  const modal = document.getElementById('book-modal');
  const snowEnabled = document.getElementById('snow-enabled');
  const snowAmount = document.getElementById('snow-amount');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const helsinki = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Helsinki', year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', hourCycle: 'h23',
  });

  function caravanRider(x, coat, saddle, crown) {
    return `<g transform="translate(${x} 0)">
      <g class="caravan-stepping">
        <ellipse cx="49" cy="108" rx="38" ry="2.5" fill="#071e22" opacity=".58"/>
        <path class="camel-step-far" d="M31 79l7 2-6 18 7 3h-12zm40-1 6 1 5 21-8 2-4-14z" fill="#679289" stroke="#071e22" stroke-width="2"/>
        <path d="M19 65q-9 0-9 13l6-6 7-3z" fill="#ee2e31" stroke="#071e22" stroke-width="1.8"/>
        <path d="M18 72c0-4 3-7 6-10l1-12c1-6 7-8 10-2l5 10 4-6c3-5 10-5 13 0l8 10 6-2 6-21 5-12 12 1 7 6 8 3-1 7-13 2-7-5-7 23c-5 18-13 20-29 20H30c-8 0-12-5-12-12Z" fill="#f4c095" stroke="#071e22" stroke-width="2.3" stroke-linejoin="round"/>
        <path d="M85 28l-3-8 8 7m8 11h2m2 4h4" fill="none" stroke="#071e22" stroke-width="2" stroke-linecap="round"/>
        <path class="camel-step" d="M25 78h8l-2 17-5 8h5v4H19l5-13zm40 0h9l-3 13 2 12h5v4H67l-4-16z" fill="#f4c095" stroke="#071e22" stroke-width="2" stroke-linejoin="round"/>
        <path d="m30 59 27-3 6 13-9 13-24-2-4-12z" fill="${saddle}" stroke="#071e22" stroke-width="2"/>
        <path d="m29 69 13 8 15-10m22-12 10 5m-13 0 10 5" fill="none" stroke="#f4c095" stroke-width="1.8"/>
        <path d="m41 31 15 1 10 31-30 1 2-15-8 9-5-4z" fill="${coat}" stroke="#071e22" stroke-width="2" stroke-linejoin="round"/>
        <path d="m48 34 6 26-16 1z" fill="#071e22" opacity=".34"/>
        <path d="m49 45 13 8 21-3" fill="none" stroke="#071e22" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M42 17h15l4 11-6 8H43l-4-9z" fill="#f4c095" stroke="#071e22" stroke-width="2"/>
        <path d="m53 30 5-4-1 8-5 3h-7l-3-6z" fill="#071e22"/>
        <circle cx="54" cy="24" r="1.4" fill="#071e22"/>
        ${crown}
      </g>
    </g>`;
  }

  const scenes = [
    {
      name: 'koira',
      anchor: ground,
      mount: () => house,
      duration: 14500,
      art: `<div class="dog-crossing">
        <svg class="dog-figure" viewBox="0 0 88 62" aria-hidden="true">
          <ellipse cx="42" cy="58" rx="30" ry="2" fill="#071e22" opacity=".5"/>
          <g class="dog-leg dog-leg-far" fill="#679289" stroke="#071e22" stroke-width="2">
            <path d="M23 37h8l-1 18h-8z"/><path d="M47 37h8l-1 18h-8z"/>
          </g>
          <path class="dog-tail" d="M13 33Q5 26 5 16q7 5 12 15" fill="#f4c095" stroke="#071e22" stroke-width="2"/>
          <path d="M13 34q0-12 12-12h31v22H23q-10 0-10-10z" fill="#1d7874" stroke="#071e22" stroke-width="2"/>
          <path d="M18 35a11 11 0 0 1 22 0z" fill="#679289"/>
          <circle cx="63" cy="25" r="13" fill="#f4c095" stroke="#071e22" stroke-width="2"/>
          <path d="M66 27h13a6 6 0 0 1 0 12H64z" fill="#f4c095" stroke="#071e22" stroke-width="2"/>
          <path d="M53 15q-8 3-5 20h8l4-16z" fill="#1d7874" stroke="#071e22" stroke-width="2"/>
          <circle cx="68" cy="24" r="2" fill="#071e22"/><circle cx="82" cy="29" r="3" fill="#071e22"/>
          <g class="dog-leg" fill="#f4c095" stroke="#071e22" stroke-width="2">
            <path d="M26 39h8l-1 17h-8z"/><path d="M50 39h8l-1 17h-8z"/>
          </g>
          <path d="m49 30 13 6-3 7-14-7z" fill="#ee2e31" stroke="#071e22" stroke-width="1.5"/>
          <path class="dog-scarf" d="m50 34-17-9-2 5 16 12z" fill="#ee2e31"/>
          <path d="m52 34 4 2m-6 2 5 2" stroke="#f4c095" stroke-width="1.4"/>
        </svg>
      </div>`,
    },
    {
      name: 'tonttu',
      anchor: roof,
      mount: () => roof,
      duration: 7600,
      art: `<div class="elf-window"><svg class="elf-peek" viewBox="0 0 78 86" aria-hidden="true">
        <path d="M4 86 22 68l37-3 16 21z" fill="#1d7874" stroke="#071e22" stroke-width="2.5"/>
        <path d="m27 70 10 16 15-19z" fill="#679289"/><path d="m36 75-8-4 1 11 9-4 8 3 2-10z" fill="#ee2e31"/>
        <path d="m19 37 40-3 6 18 9-1-7 10-9 10-23 3-14-8-7-12-8-4 10-3z" fill="#f4c095" stroke="#071e22" stroke-width="2.5"/>
        <path d="m43 37 16-3 6 18 9-1-7 10-9 10-15 2z" fill="#ee2e31" opacity=".68"/>
        <path d="M10 43 26 14l13 5L61 2l5 32-13 8z" fill="#ee2e31" stroke="#071e22" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="m32 30 29-28-8 34z" fill="#f4c095"/><path d="m9 43 56-12 3 8-58 11z" fill="#679289" stroke="#071e22" stroke-width="2.2"/>
        <circle cx="62" cy="6" r="5.5" fill="#f4c095" stroke="#071e22" stroke-width="1.5"/>
        <path d="m21 50 11-4m-9 18 10 3" fill="none" stroke="#071e22" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="52" cy="51" r="9" fill="#071e22" stroke="#f4c095" stroke-width="2"/>
        <circle cx="54" cy="49" r="2.6" fill="#f4c095"/><path d="m61 54 5 10-4 3" fill="none" stroke="#071e22" stroke-width="1.4"/>
        <ellipse class="elf-wink" cx="28" cy="54" rx="2.6" ry="3.5" fill="#071e22"/>
        <path d="m38 51-2 9 7-3m-3 8q9 3 15-3" fill="none" stroke="#071e22" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg></div>`,
    },
    {
      name: 'lyhty',
      anchor: ground,
      mount: () => house.querySelector('.entrance-fanlight'),
      duration: 7200,
      art: '<span class="fanlight-glow"></span>',
    },
    {
      name: 'lintu',
      anchor: roof,
      mount: () => roof,
      duration: 8200,
      art: `<svg class="roof-robin" viewBox="0 0 56 42" aria-hidden="true">
        <path d="m16 25-13-5 5 11 13-3z" fill="#679289" stroke="#071e22" stroke-width="1.5"/>
        <ellipse cx="28" cy="25" rx="17" ry="11" fill="#f4c095" stroke="#071e22" stroke-width="1.5"/>
        <path d="M30 35q-3-13 13-16 7 10-7 16z" fill="#ee2e31"/>
        <circle cx="42" cy="17" r="9" fill="#1d7874" stroke="#071e22" stroke-width="1.5"/>
        <path d="m49 16 7 3-7 3z" fill="#f4c095"/>
        <circle cx="45" cy="15" r="1.6" fill="#f4c095"/>
        <path class="robin-wing" d="M29 24Q8 21 14 8q15 1 22 15z" fill="#679289" stroke="#071e22" stroke-width="1.5"/>
        <path d="M26 34v6h-5m15-6v6h-5" fill="none" stroke="#f4c095" stroke-width="1.5"/>
      </svg>`,
    },
    {
      name: 'lumipyry',
      anchor: roof,
      mount: () => roof,
      duration: 9500,
      ready: () => snowEnabled.checked && Number(snowAmount.value) > 0,
      art: `<svg class="flurry-print" viewBox="0 0 760 380" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <pattern id="flurry-specks" width="127" height="88" patternUnits="userSpaceOnUse">
            <path d="m6 13 14 4m-9 28 5 2m21-25 10 5m11 45 17 6m11-41 12 4m11 30 8 2m-73 9 8 3m51-79 16 7" fill="none" stroke="#f4c095" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M31 55l15 4m-6-11-3 17m56-15 10 8m-1-11-8 12M67 16l5 2" fill="none" stroke="#fff0da" stroke-width="1.7" stroke-linecap="round"/>
            <circle cx="65" cy="49" r="2.2" fill="#fff0da"/><circle cx="112" cy="30" r="1.7" fill="#fff0da"/>
          </pattern>
          <pattern id="flurry-streaks" width="277" height="144" patternUnits="userSpaceOnUse">
            <path d="M8 20q43 1 81 19m10 3 31 13m-78 54q21 1 42 8m67-95q43 2 80 24m-49 44q29 8 61 28m-7-55 26 10" fill="none" stroke="#fff0da" stroke-width="2.7" stroke-linecap="round"/>
            <path d="m139 82 5 17m-11-15 16 12m-16-3 14-8M29 66l10 6m-2-11-6 16m146 48 10 4m-3-8-3 11" fill="none" stroke="#f4c095" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="161" cy="53" r="3" fill="#fff0da"/><circle cx="207" cy="10" r="2" fill="#f4c095"/>
          </pattern>
        </defs>
        <rect class="flurry-far" x="-260" y="-100" width="1270" height="560" fill="url(#flurry-specks)"/>
        <rect class="flurry-near" x="-560" y="-180" width="1900" height="720" fill="url(#flurry-streaks)"/>
      </svg>`,
    },
    {
      name: 'poro',
      anchor: roof,
      mount: () => roof,
      duration: 11200,
      art: `<div class="reindeer-flight"><svg class="reindeer-figure" viewBox="0 0 180 108" aria-hidden="true">
        <path d="M8 53h35M1 65h24m7 10h14" stroke="#f4c095" stroke-width="1.7" stroke-linecap="round" stroke-dasharray="13 5" opacity=".78"/>
        <path class="reindeer-spark" d="M14 35l3 5 6 2-6 2-2 6-2-6-6-2 5-2zm31-18 2 5 6 2-6 2-2 6-2-6-5-2 5-2z" fill="#f4c095"/>
        <path class="reindeer-stride-back" d="m68 70-15 12 10 11 6-2-8-9 20-12zm39-4 12 10 14 1-1 7-19-2-14-11z" fill="#679289" stroke="#071e22" stroke-width="2.2"/>
        <path d="m56 52-12-8-4 11 18 6z" fill="#f4c095" stroke="#071e22" stroke-width="2.3"/>
        <path d="M49 62q0-14 18-14h31l13-22 18-8 9 10 19 5 9 12-20 7-18-5-15 19-15 9H69Q49 75 49 62Z" fill="#f4c095" stroke="#071e22" stroke-width="2.8" stroke-linejoin="round"/>
        <path d="M64 49a16 16 0 0 0 2 26h30L83 49z" fill="#1d7874"/><path d="m82 49 17 23 14-13-10-16z" fill="#679289"/>
        <path d="m124 24-10-12-10-3m9 3 1-9m10 21 2-15 8-7m-9 9-6-6m16 20 10-9 9 1m-9-1 2-10" fill="none" stroke="#f4c095" stroke-width="3.7" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="m123 30-11-5-1 7 11 6" fill="#1d7874" stroke="#071e22" stroke-width="2"/>
        <path d="m106 41 20 12-5 7-20-11z" fill="#ee2e31" stroke="#071e22" stroke-width="2"/><path d="m104 43-24-8 9 12 14 5z" fill="#ee2e31"/>
        <path class="reindeer-stride" d="m76 70-12 17-18 9 4 6 23-10 13-18zm31-3 16 8 23-3 2 6-26 4-20-9z" fill="#f4c095" stroke="#071e22" stroke-width="2.2" stroke-linejoin="round"/>
        <circle cx="138" cy="36" r="2.7" fill="#071e22"/><circle cx="164" cy="43" r="5.5" fill="#ee2e31" stroke="#071e22" stroke-width="1.7"/>
      </svg></div>`,
    },
    {
      name: 'tahti',
      anchor: roof,
      mount: () => roof,
      duration: 8600,
      art: `<svg class="roof-star" viewBox="0 0 130 130" aria-hidden="true">
        <circle class="star-halo" cx="65" cy="65" r="53" fill="none" stroke="#f4c095" stroke-width="1" stroke-dasharray="7 5 1 5"/>
        <circle class="star-halo" cx="65" cy="65" r="38" fill="#f4c095" fill-opacity=".12" stroke="#679289" stroke-width="1.3"/>
        <g class="star-core">
          <path d="m65 3 10 43 48 19-46 10-12 51-13-48L7 65l45-13z" fill="#f4c095" stroke="#071e22" stroke-width="2.2" stroke-linejoin="round"/>
          <path d="M65 3v62l10-19zm58 62H65l12 10zM65 126V65L52 78zM7 65h58L52 52z" fill="#ee2e31"/>
          <path d="m65 18 7 39 34 8-35 7-6 34-7-34-35-7 35-8z" fill="#fff0da"/><circle cx="65" cy="65" r="5" fill="#f4c095"/>
        </g>
        <path class="star-sparks" d="M25 14v16m-8-8h16m72 73v20m-10-10h20m-9-89v10m-5-5h10m-93 82v10m-5-5h10" fill="none" stroke="#f4c095" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
    },
    {
      name: 'tietajat',
      anchor: ground,
      mount: () => house,
      duration: 19000,
      art: `<div class="caravan-crossing"><svg class="caravan-figure" viewBox="0 0 332 113" aria-hidden="true">
        ${caravanRider(0, '#679289', '#ee2e31', '<path d="m39 18 2-7 9-5 10 5 2 8z" fill="#1d7874" stroke="#071e22" stroke-width="2"/><path d="m41 14 17-3-9 7z" fill="#f4c095"/>')}
        ${caravanRider(111, '#1d7874', '#679289', '<path d="m40 19-2-12 7 5 4-8 6 8 7-5-2 12z" fill="#f4c095" stroke="#071e22" stroke-width="2"/><circle cx="50" cy="15" r="1.9" fill="#ee2e31"/>')}
        ${caravanRider(222, '#ee2e31', '#1d7874', '<path d="m38 19 8-15 12 4 5 11z" fill="#ee2e31" stroke="#071e22" stroke-width="2"/><path d="m41 13 17-5-2 8-16 3z" fill="#f4c095"/>')}
      </svg></div>`,
    },
  ];

  const previewName = new URLSearchParams(location.search).get('kohtaus');
  const preview = scenes.find(scene => scene.name === previewName);
  const minimumVisibility = 0.3;
  const visible = new Set();
  let timer;
  let current;
  let previousScene;
  let nextAt = 0;
  let plays = 0;

  function helsinkiSlot(date = new Date()) {
    const { year, month, day, hour } = Object.fromEntries(
      helsinki.formatToParts(date).map(part => [part.type, Number(part.value)])
    );
    const dayNumber = Date.UTC(year, month - 1, day) / 86400000;
    return dayNumber + Math.floor(hour / 6);
  }

  function availableScene() {
    if (preview) return !plays && sceneVisible(preview) ? preview : undefined;
    const offset = (helsinkiSlot() + plays) % scenes.length;
    const order = [...scenes.slice(offset), ...scenes.slice(0, offset)]
      .filter(sceneVisible);
    return order.find(scene => scene !== previousScene) ?? order[0];
  }

  function sceneVisible(scene) {
    return visible.has(scene.anchor) && (scene.ready?.() ?? true);
  }

  function blocked() {
    return reducedMotion.matches || document.hidden || modal.open;
  }

  function stop() {
    clearTimeout(timer);
    timer = undefined;
    current?.element.remove();
    current = undefined;
  }

  function play() {
    timer = undefined;
    const scene = availableScene();
    if (blocked() || !scene) return;
    const parent = scene.mount();
    if (!parent) return;
    const element = document.createElement('div');
    element.className = `house-surprise surprise-${scene.name}`;
    element.setAttribute('aria-hidden', 'true');
    element.style.setProperty('--scene-duration', `${scene.duration}ms`);
    element.innerHTML = scene.art;
    parent.append(element);
    current = { element, scene };
    previousScene = scene;
    plays++;
    nextAt = Date.now() + 140000 + (helsinkiSlot() % 4) * 15000;
    timer = setTimeout(() => {
      stop();
      sync();
    }, scene.duration + 100);
  }

  function sync() {
    if (current && (blocked() || !sceneVisible(current.scene) || !current.element.isConnected)) stop();
    if (current) return;
    if (blocked() || !availableScene()) {
      stop();
      return;
    }
    if (!timer) {
      const firstDelay = preview ? 650 : 8500 + (helsinkiSlot() % 4) * 1000;
      timer = setTimeout(play, Math.max(firstDelay, nextAt - Date.now()));
    }
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.intersectionRatio >= minimumVisibility) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      sync();
    }, { threshold: minimumVisibility });
    observer.observe(roof);
    observer.observe(ground);
  } else {
    visible.add(roof);
    visible.add(ground);
  }

  document.addEventListener('visibilitychange', sync);
  document.addEventListener('calendar-language', sync);
  snowEnabled.addEventListener('change', sync);
  snowAmount.addEventListener('input', sync);
  reducedMotion.addEventListener('change', sync);
  new MutationObserver(sync).observe(modal, { attributes: true, attributeFilter: ['open'] });

  if (preview && !reducedMotion.matches) {
    requestAnimationFrame(() => preview.anchor.scrollIntoView({ block: 'center', behavior: 'instant' }));
  }
  sync();
})();
