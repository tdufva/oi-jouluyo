(() => {
  const house = document.querySelector('.house');
  const roof = house.querySelector('.roof');
  const ground = document.querySelector('.ground');
  const modal = document.getElementById('book-modal');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const helsinki = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Helsinki', year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', hourCycle: 'h23',
  });

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
      duration: 6800,
      art: `<div class="elf-window"><svg class="elf-peek" viewBox="0 0 76 84" aria-hidden="true">
        <path d="M10 84q1-19 27-20t29 20z" fill="#1d7874" stroke="#071e22" stroke-width="2"/>
        <circle cx="38" cy="53" r="21" fill="#f4c095" stroke="#071e22" stroke-width="2"/>
        <path d="M17 43q4-26 35-39l-3 18 13 21z" fill="#ee2e31" stroke="#071e22" stroke-width="2"/>
        <circle cx="52" cy="6" r="5" fill="#f4c095"/>
        <path d="M16 41h47v8H16z" fill="#679289" stroke="#071e22" stroke-width="2"/>
        <path d="M28 56h2m16 0h2m-14 7q4 4 8 0" fill="none" stroke="#071e22" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="23" cy="62" r="3" fill="#ee2e31" opacity=".6"/><circle cx="53" cy="62" r="3" fill="#ee2e31" opacity=".6"/>
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
    if (preview) return !plays && visible.has(preview.anchor) ? preview : undefined;
    const offset = (helsinkiSlot() + plays) % scenes.length;
    const order = [...scenes.slice(offset), ...scenes.slice(0, offset)]
      .filter(scene => visible.has(scene.anchor));
    return order.find(scene => scene !== previousScene) ?? order[0];
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
    current = { element, anchor: scene.anchor };
    previousScene = scene;
    plays++;
    nextAt = Date.now() + 140000 + (helsinkiSlot() % 4) * 15000;
    timer = setTimeout(() => {
      stop();
      sync();
    }, scene.duration + 100);
  }

  function sync() {
    if (current && (blocked() || !visible.has(current.anchor) || !current.element.isConnected)) stop();
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
  reducedMotion.addEventListener('change', sync);
  new MutationObserver(sync).observe(modal, { attributes: true, attributeFilter: ['open'] });

  if (preview && !reducedMotion.matches) {
    requestAnimationFrame(() => preview.anchor.scrollIntoView({ block: 'center', behavior: 'instant' }));
  }
  sync();
})();
