function makeBookPerformer(who) {
  const angular = who === 'jussi';
  const body = angular
    ? '<path d="M43 91l9-8 10 3 8-7 12 4 10-3 12 10 15 3 3 22-14 9-17-4-14 4-16-6-15 1-6-12Z" fill="#d69a70"/><path d="m52 92 25-4 7 29-22-3Z" fill="#b77158" stroke="none"/><path d="m88 88 18 5 6 19-19 6Z" fill="#f4c095" stroke="none"/><path d="m48 98 7-3m13 1 5-4m9 13 6-4m12-6 6 2" class="dog-fur"/>'
    : '<path d="M39 100q-2-11 7-15 3-9 13-6 7-8 16-3 10-5 18 1 12-2 17 8 12 2 12 13 6 9-1 17-5 10-17 8-8 5-18 0-11 4-19-1-12 4-18-5-12-2-10-17Z" fill="#f4dfbf"/><path d="M47 96q3-15 19-12l10 33q-21 5-29-8Z" fill="#679289" stroke="none"/><path d="m83 88 7-2m8 9 7 2m-27 13 6 2m18-6 6-3" class="dog-fur"/>';
  const head = angular
    ? '<path d="m108 70-2-18 9-9 2-11 11 5 9-7 9 13 10 3 6 15 13 3-1 16-16 8-17-3-14 6-15-9Z" fill="#e8b68a"/><path d="m142 62 19-2 14 6-2 12-16 7-18-8Z" fill="#f8d9ae" stroke="none"/><path d="m126 37 6 8m5-9 4 7m-22 35 6 4" class="dog-fur"/>'
    : '<path d="M105 64q-7-7-2-15-3-10 6-15 1-10 12-10 6-9 16-4 10-3 16 6 12 1 14 12 8 5 6 15 7 8 1 16 1 11-11 14-9 9-20 4-11 5-19-3-12 0-16-11-7-2-3-9Z" fill="#fff0da"/><path d="M145 61q17-8 27 2 7 11-8 17-15 3-22-7Z" fill="#e8c9a4" stroke="none"/><path d="m116 34 5 2m17-11 3 5m12 8 5 3m-32 37 5 3" class="dog-fur"/>';
  const ear = angular
    ? '<path d="m115 43-14 5-8 32 7 15 14-11 7-27Z" fill="#825849"/><path d="m107 54-5 24 3 7" class="dog-fur" stroke="#f4c095"/>'
    : '<path d="M111 40q-9-5-16 3-6 8-2 15-5 10 3 15 1 9 12 7 9-4 8-14 6-8 1-15 1-8-6-11Z" fill="#1d7874"/><path d="m100 48-2 10m4 7 3 6" class="dog-fur" stroke="#f4dfbf"/>';
  const tail = angular
    ? '<path d="M46 98Q24 90 24 73q-1-13 9-16l6 7-4 7-5-1q-3 12 10 17" fill="none" stroke="#bc7b5d" stroke-width="9"/><path d="m23 73-6-2m8-6-4-5m15-2 3-5" class="dog-fur"/>'
    : '<path d="M44 98Q23 92 20 76q-10-5-5-13-6-10 3-15 1-10 12-8 7-7 13 1 11 1 11 11 6 7-2 14-2 12-14 10-4 9 7 14" fill="#fff0da"/><path d="M24 57q10-7 15 2m-16 8 7 1" class="dog-fur"/>';
  const farLegs = '<g class="dog-part dog-hind dog-hind-far"><path d="m63 111-1 29 9 7H54l-2-9 3-27Z" fill="var(--dog-leg-shadow)"/></g><g class="dog-part dog-front dog-front-far"><path d="m112 111 2 28 11 8h-19l-4-36Z" fill="var(--dog-leg-shadow)"/></g>';
  const front = angular ? 'm113 107 8 4-1 27 12 7-2 5h-23l-4-8 1-32Z' : 'M108 108q6-4 13 0l-2 29q12 3 10 10-7 4-22 1l-3-9Z';
  const hind = angular ? 'm54 108 11 3-2 25 9 8-3 5H48l-3-8Z' : 'M47 109q8-6 16 1l-2 27q13 2 11 10-8 4-25 1l-5-10Z';
  return `<button type="button" class="book-figure book-figure-${who}" data-activity="idle" data-emotion="curious">
    <svg class="book-figure-print" viewBox="0 0 180 164" aria-hidden="true" stroke="#263331" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path class="dog-ground" d="M23 152q59-3 134 0" fill="none" stroke="#679289" stroke-width="1.2"/>
      <g class="dog-locomotion dog-motion"><g ${angular ? '' : 'transform="translate(180 0) scale(-1 1)"'}>
        ${farLegs}<g class="dog-part dog-tail-anchor"><g class="dog-motion dog-tail">${tail}</g></g>
        <g class="dog-part dog-torso"><g class="dog-motion dog-breath">${body}</g></g>
        <g class="dog-part dog-hind dog-hind-near"><path d="${hind}" fill="${angular ? '#ce926a' : '#f9e8ce'}"/><path d="m52 144 5 1m5 0 4 1" class="dog-fur"/></g>
        <g class="dog-part dog-front dog-front-near"><path d="${front}" fill="${angular ? '#edb886' : '#fff0da'}"/><path d="m111 145 5 1m5 0 4 1" class="dog-fur"/></g>
        <g class="dog-part dog-head"><g class="dog-motion dog-head-life">${head}
          <path d="${angular ? 'm122 85 18 1-2 8-17-1Z' : 'm119 83 23 4-2 7-23-5Z'}" fill="${angular ? '#ee2e31' : '#1d7874'}"/>
          <path d="m128 92 7 1-1 8-7-1Z" fill="#f4c095" stroke-width="1"/><path d="m130 94 2 0m-2 3 2 0" stroke-width=".7"/>
          <path class="dog-brow dog-part" d="M132 46q5-4 10-1" fill="none"/>
          <g class="dog-eyes-open dog-motion"><ellipse cx="139" cy="55" rx="4.4" ry="5.4" fill="#fff8e9" stroke-width="1.1"/><circle class="dog-pupil dog-part" cx="140" cy="55" r="2.4" fill="#071e22" stroke="none"/></g>
          <path class="dog-eyes-closed" d="m134 56 4 2 5-3" fill="none" stroke-width="2.2"/>
          <path d="m169 62 8 2-2 5-7 1-3-4Z" fill="#071e22" stroke="none"/>
          <path class="dog-mouth-smile" d="M159 72q5 5 11-1" fill="none" stroke-width="1.5"/>
          <ellipse class="dog-mouth-howl" cx="170" cy="74" rx="4.2" ry="6" fill="#071e22" stroke="none"/>
          <path class="dog-tongue" d="M162 75v6q4 5 7-1l-1-6Z" fill="#ee6c62" stroke-width=".8"/>
          <g class="dog-part dog-ear">${ear}</g>
        </g></g>
        <g class="dog-pee"><path d="M61 120q-23 4-34 27" fill="none" stroke="#f4c095" stroke-width="1.8" stroke-dasharray="2 6" class="dog-motion dog-stream"/><path d="m21 150 13 1m-9 3 5 0" stroke="#f4c095" stroke-width="1"/></g>
      </g></g>
      <g class="dog-dream"><text x="113" y="48" class="dog-motion">z</text><text x="131" y="30" class="dog-motion">z</text><path class="dog-motion" d="m151 12 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="#f4c095" stroke="none"/></g>
      <g class="dog-howl-rings" fill="none" stroke="#f4c095"><path class="dog-motion" d="M143 19q9-9 20 0"/><path class="dog-motion" d="M138 11q15-13 31 0"/></g>
    </svg><span class="book-reaction" aria-hidden="true"></span>
  </button>`;
}

const dogActivityControllers = new WeakMap();
function performDogActivity(figure, activity, interaction = 'click') {
  dogActivityControllers.get(figure)?.act(figure, activity, interaction);
}

function drawBookConstellation(stage, points, duration, starScale = 1) {
  const { width, height } = stage.getBoundingClientRect();
  const stars = points.map(([x, y], index) => {
    const accent = index === 4;
    const size = (accent ? 19 : index % 2 ? 5 : 8) * starScale;
    const halo = accent ? `<circle r="${29 * starScale}" fill="none" stroke="#679289" stroke-width="1" stroke-dasharray="3 5"/><circle r="${23 * starScale}" fill="none" stroke="#ee2e31" stroke-width="1.5"/>` : '';
    return `<g transform="translate(${x} ${y})">
      <g class="book-constellation-star${accent ? ' book-constellation-center' : ''}" style="--star-in:${index * 135}ms">
        ${halo}
        <path d="M0 ${-size} ${size / 4} ${-size / 4} ${size} 0 ${size / 4} ${size / 4} 0 ${size} ${-size / 4} ${size / 4} ${-size} 0 ${-size / 4} ${-size / 4}Z"/>
      </g>
    </g>`;
  }).join('');
  const mainLine = points.map(point => point.join(',')).join(' ');
  const branch = [points[2], points[4], points[6]].map(point => point.join(',')).join(' ');
  stage.insertAdjacentHTML('afterbegin', `<svg class="book-constellation" viewBox="0 0 ${width} ${height}" aria-hidden="true" style="--constellation-duration:${duration}ms">
    <polyline class="book-constellation-branch" points="${branch}"/>
    <polyline class="book-constellation-trace" points="${mainLine}" pathLength="1"/>
    <polyline class="book-constellation-line" points="${mainLine}" pathLength="1"/>
    ${stars}
  </svg>`);
  return stage.firstElementChild;
}

function scheduleBookChoreography(stage, motion, backgroundPaused) {
  const duration = { idle: 6800, sniff: 5800, sit: 9500, lie: 10500, sleep: 16000, stretch: 4300, run: 4400, pee: 4900, howl: 5600, happy: 3200 };
  const emotions = { idle: 'curious', sniff: 'curious', sit: 'content', lie: 'drowsy', sleep: 'asleep', stretch: 'drowsy', run: 'excited', pee: 'concentrating', howl: 'proud', happy: 'happy' };
  const dogs = [
    { figure: stage.querySelector('.book-figure-jussi'), bag: ['sniff', 'idle', 'run', 'sit', 'sniff', 'howl', 'lie', 'pee'], initial: 'sniff' },
    { figure: stage.querySelector('.book-figure-mariah'), bag: ['sit', 'lie', 'sleep', 'happy', 'idle', 'sniff', 'run', 'howl', 'sit', 'pee'], initial: 'sit' }
  ];
  let timer = 0;
  const canRun = () => !motion.matches && !backgroundPaused() && stage.dataset.inView !== 'false';
  function apply(dog, activity, interactive = false) {
    const rests = { sit: 24000, lie: 32000, sleep: 65000 };
    const span = interactive && rests[activity] ? rests[activity] : duration[activity] + (interactive ? 0 : Math.round(Math.random() * 1600));
    dog.figure.dataset.activity = activity;
    dog.figure.dataset.emotion = emotions[activity];
    dog.figure.style.setProperty('--dog-activity-duration', `${span}ms`);
    dog.until = performance.now() + span;
    dog.last = activity;
    dog.figure.dispatchEvent(new Event('dog-activity'));
  }
  function next(dog) {
    if (dog.last === 'sleep') return 'stretch';
    if (dog.last === 'run' || dog.last === 'pee') return 'sniff';
    if (dog.last === 'howl') return 'sit';
    if (dog.last === 'lie' && Math.random() < .72) return 'sleep';
    const choices = dog.bag.filter(action => action !== dog.last);
    return choices[Math.floor(Math.random() * choices.length)];
  }
  function tick() {
    timer = 0;
    if (!canRun()) return;
    const now = performance.now();
    for (const dog of dogs) if (dog.until <= now) apply(dog, next(dog));
    timer = setTimeout(tick, Math.max(100, Math.min(...dogs.map(dog => dog.until - performance.now()))));
  }
  const controller = {
    act(figure, activity, interaction) {
      const dog = dogs.find(item => item.figure === figure);
      if (!dog || !Object.hasOwn(duration, activity)) return;
      if (interaction === 'hover' && dog.until - performance.now() > duration[dog.last] - 900) return;
      apply(dog, activity, true);
      clearTimeout(timer);
      timer = 0;
      if (canRun()) tick();
    }
  };
  for (const dog of dogs) {
    dogActivityControllers.set(dog.figure, controller);
    apply(dog, dog.initial);
  }
  function sync() {
    if (canRun()) {
      if (!timer) tick();
    } else {
      clearTimeout(timer);
      timer = 0;
    }
  }
  motion.addEventListener('change', sync);
  return sync;
}

function initBookPerformers(stage, motion) {
  const sparks = {
    star: '<path d="M12 0 15 9 24 12 15 15 12 24 9 15 0 12 9 9Z" fill="currentColor"/>',
    diamond: '<path d="m12 1 9 11-9 11L3 12Z" fill="currentColor"/>',
    page: '<path d="m2 4 10 3 10-4-2 16-8 3-9-4z" fill="currentColor"/><path d="M12 7v15M5 10l4 1m6 0 4-2m-4 5 3-1" fill="none" stroke="#071e22" stroke-width="1.4"/>',
    ring: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/>',
    dot: '<circle cx="12" cy="12" r="5" fill="currentColor"/>',
    prism: '<path d="M3 21 11 2l11 19Z" fill="currentColor"/><path d="M11 2v19H3Z" fill="#071e22" opacity=".48"/>',
    paw: '<path d="M5 17q0-2 3-4l4-4 4 4q4 2 4 5 0 5-8 3-7 2-7-4Z" fill="currentColor"/><g fill="currentColor"><circle cx="4" cy="9" r="2.3"/><circle cx="9" cy="5" r="2.5"/><circle cx="15" cy="5" r="2.5"/><circle cx="20" cy="9" r="2.3"/></g>',
    biscuit: '<path d="M5 9a4 4 0 1 1 3-6l8 8a4 4 0 1 1 5 5 4 4 0 1 1-5 5L7 12a4 4 0 0 1-2-3Z" fill="currentColor"/>',
  };
  const recipes = {
    stars: { shapes: ['star', 'diamond', 'dot'], spread: 112, lift: 28, turn: .23, symbol: 'star' },
    pages: { shapes: ['page', 'page', 'diamond'], spread: 72, lift: 116, turn: -.4, symbol: 'page' },
    echoes: { shapes: ['ring', 'dot', 'ring'], spread: 107, lift: 15, turn: .16, symbol: 'ring' },
    orbit: { shapes: ['dot', 'star', 'ring'], spread: 102, lift: 19, turn: 1.35, symbol: 'ring' },
    prisms: { shapes: ['prism', 'diamond', 'prism'], spread: 84, lift: 57, turn: -.8, symbol: 'prism' },
    rain: { shapes: ['star', 'star', 'diamond'], spread: 88, lift: -62, turn: .58, symbol: 'star' },
    paw: { shapes: ['paw', 'dot', 'star'], spread: 86, lift: 18, turn: .22, symbol: 'paw' },
    biscuit: { shapes: ['biscuit', 'diamond', 'dot'], spread: 70, lift: 35, turn: -.4, symbol: 'biscuit' },
    bow: { shapes: ['star', 'paw', 'prism'], spread: 92, lift: 70, turn: .65, symbol: 'star' },
  };
  const palettes = {
    jussi: ['#f4c095', '#fff0da', '#8cb4a9', '#ee2e31'],
    mariah: ['#fff0da', '#ee2e31', '#f4c095', '#8cb4a9'],
  };
  const figures = [
    { who: 'jussi', names: ['Kirjakoira Jussi', 'Bokhunden Jussi'], glints: ['stars', 'paw'], shows: ['paw', 'pages', 'biscuit', 'echoes'] },
    { who: 'mariah', names: ['Kirjakoira Mariah', 'Bokhunden Mariah'], glints: ['orbit', 'biscuit'], shows: ['bow', 'orbit', 'prisms', 'rain'] },
  ];
  stage.innerHTML = figures.map(({ who }) => makeBookPerformer(who)).join('') +
    '<span id="book-duet-status" class="book-assistive" role="status"></span>';
  const status = stage.querySelector('#book-duet-status');
  const duetWindow = 8000;
  const duetDuration = 4400;
  let previousFigure;
  let duetTimer;
  let constellation;

  function resetDuet() {
    clearTimeout(duetTimer);
    previousFigure = undefined;
    constellation?.remove();
    constellation = undefined;
    delete stage.dataset.duet;
    status.textContent = '';
  }

  function activateDuet(button) {
    const first = previousFigure;
    resetDuet();
    if (first && first !== button) {
      const stageBounds = stage.getBoundingClientRect();
      const origin = figure => {
        const bounds = figure.querySelector('.book-reaction').getBoundingClientRect();
        return { x: bounds.left - stageBounds.left, y: bounds.top - stageBounds.top };
      };
      const start = origin(first);
      const end = origin(button);
      const riseScale = Math.min(1, stageBounds.width / 470);
      const points = [[0, 0], [.12, 42], [.26, 101], [.37, 62], [.5, 142], [.64, 92], [.75, 118], [.89, 45], [1, 0]]
        .map(([fraction, rise]) => [
          Math.round(start.x + (end.x - start.x) * fraction),
          Math.round(start.y + (end.y - start.y) * fraction - rise * riseScale),
        ]);
      constellation = drawBookConstellation(stage, points, duetDuration, Math.max(.56, riseScale));
      stage.dataset.duet = 'together';
      status.textContent = document.documentElement.lang === 'sv' ? 'En stjärnbild tändes mellan bokhundarna.' : 'Kirjakoirien väliin syttyi tähtikuvio.';
      duetTimer = setTimeout(resetDuet, duetDuration);
      return;
    }
    previousFigure = button;
    stage.dataset.duet = button.classList.contains('book-figure-jussi') ? 'left' : 'right';
    duetTimer = setTimeout(resetDuet, duetWindow);
  }

  window.addEventListener('resize', resetDuet);
  document.addEventListener('visibilitychange', resetDuet);

  for (const { who, names, glints, shows } of figures) {
    const button = stage.querySelector('.book-figure-' + who);
    const layer = button.querySelector('.book-reaction');
    let glint = 0;
    let show = 0;
    let activityStep = 0;
    const activities = who === 'jussi' ? ['sit', 'lie', 'sleep', 'run', 'pee', 'howl', 'happy'] : ['lie', 'sleep', 'stretch', 'howl', 'run', 'pee', 'sit', 'happy'];
    let cleanup;
    function react(mode, full) {
      clearTimeout(cleanup);
      const recipe = recipes[mode];
      const still = motion.matches;
      const count = full ? 16 : 7;
      const scale = full ? 1 : .52;
      const colors = palettes[who];
      const symbol = `<svg class="book-reaction-mark" viewBox="0 0 24 24">${sparks[recipe.symbol]}</svg>`;
      const pieces = still ? '' : Array.from({ length: count }, (_, index) => {
        const phase = index / count * Math.PI * 2 + show * .36;
        const distance = (0.56 + Math.random() * .42) * scale;
        const x = Math.cos(phase) * recipe.spread * distance;
        const y = Math.sin(phase) * recipe.spread * distance * .8 - recipe.lift * scale;
        const midX = Math.cos(phase - recipe.turn) * recipe.spread * distance * .63;
        const midY = Math.sin(phase - recipe.turn) * recipe.spread * distance * .54 - (mode === 'rain' ? 66 : recipe.lift * .74) * scale;
        const shape = recipe.shapes[index % recipe.shapes.length];
        const size = (shape === 'ring' ? 20 : 10) + Math.round(Math.random() * (full ? 18 : 9));
        const color = colors[index % colors.length];
        const delay = index * (mode === 'rain' ? 28 : 11);
        const duration = (full ? 980 : 750) + Math.round(Math.random() * 245);
        const spin = (index % 2 ? 1 : -1) * (mode === 'pages' ? 175 : 94);
        return `<svg class="book-reaction-piece" viewBox="0 0 24 24" style="--dx:${x.toFixed(1)}px;--dy:${y.toFixed(1)}px;--mx:${midX.toFixed(1)}px;--my:${midY.toFixed(1)}px;--spin:${spin}deg;--size:${size}px;--ink:${color};--delay:${delay}ms;--duration:${duration}ms">${sparks[shape]}</svg>`;
      }).join('');
      layer.innerHTML = symbol + pieces;
      button.dataset.reaction = mode;
      button.dataset.force = full ? 'full' : 'glint';
      cleanup = setTimeout(() => {
        layer.replaceChildren();
        delete button.dataset.reaction;
        delete button.dataset.force;
      }, still ? 850 : 1850);
    }
    function peek() {
      if (button.dataset.force === 'full') return;
      performDogActivity(button, 'happy', 'hover');
      react(glints[glint++ % glints.length], false);
    }
    function localize() {
      const swedish = document.documentElement.lang === 'sv';
      const name = names[swedish ? 1 : 0];
      const descriptions = swedish
        ? { idle: 'spanar', sniff: 'nosar', sit: 'sitter', lie: 'ligger', sleep: 'sover', stretch: 'sträcker på sig', run: 'springer', pee: 'kissar', howl: 'ylar', happy: 'viftar på svansen' }
        : { idle: 'katselee ympärilleen', sniff: 'nuuskii', sit: 'istuu', lie: 'makaa', sleep: 'nukkuu', stretch: 'venyttelee', run: 'juoksee', pee: 'pissaa', howl: 'ulvoo', happy: 'heiluttaa häntäänsä' };
      const activity = descriptions[button.dataset.activity] || descriptions.idle;
      const action = swedish ? 'Tryck för en ny rörelse och en överraskning' : 'Paina: uusi liike ja yllätys';
      button.setAttribute('aria-label', `${name} ${activity}. ${action}.`);
    }
    button.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch') peek();
    });
    button.addEventListener('focus', () => {
      if (button.matches(':focus-visible')) peek();
    });
    button.addEventListener('click', () => {
      performDogActivity(button, activities[activityStep++ % activities.length]);
      react(shows[show++ % shows.length], true);
      activateDuet(button);
    });
    document.addEventListener('calendar-language', localize);
    button.addEventListener('dog-activity', localize);
    localize();
  }
}

function makeBauhausTree(seed,x,width,bottom,depth){
  return `<div class="book-tree landscape-tree geometric-tree nocturne-tree" data-tree-id="${seed}" style="--tree-x:${x}%;--tree-width:${width}px;--tree-bottom:${bottom}%;--tree-depth:${depth};--tree-delay:-${seed*1.7}s;--tree-tilt:${(seed%7-3)*.6}deg"><img src="assets/trees/${seed}.svg" alt="" width="120" height="195" decoding="async" draggable="false"></div>`;
}

function makeTreeIllustration(seed,x,width,bottom,depth){
  const palette=['#071e22','#1d7874','#071e22','#679289','#1d7874','#071e22'];
  const a=palette[seed%6],b=palette[(seed+2)%6],c=palette[(seed+4)%6];
  const ink='#071e22',edge='#679289',gold='#f4c095';
  let state=seed*104729;
  const rnd=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};
  const axis=42+seed%31,variant=seed%6;
  const silhouettes=[
    `M${axis} 10L103 78L89 91L116 158H5L27 97L14 78Z`,
    `M${axis} 11A37 37 0 0 1 101 70L83 87L114 160H6L36 91L18 67A37 37 0 0 1 ${axis} 11Z`,
    `M${axis-13} 14H${axis+17}V48H87V84H101V119H114V160H7V120H19V87H29V51H${axis-13}Z`,
    `M${axis} 12L99 51L84 88L115 135L97 162H8L26 118L14 86L34 64L22 41Z`,
    `M${axis} 8L111 87H83L115 161H6L28 102H8Z`,
    `M${axis} 10L103 57L88 89L116 157H5L36 105L19 64Z`
  ];
  const silhouette=silhouettes[variant];
  const books=Array.from({length:12+seed%9},(_,i)=>{
    const px=4+rnd()*86,py=28+rnd()*131,bw=15+rnd()*39,bh=8+rnd()*24,angle=-22+rnd()*44;
    const fill=[a,b,c][i%3];
    return `<g transform="rotate(${angle.toFixed(2)} ${px.toFixed(2)} ${py.toFixed(2)})"><rect x="${px.toFixed(2)}" y="${py.toFixed(2)}" width="${bw.toFixed(2)}" height="${bh.toFixed(2)}" fill="${fill}" stroke="${edge}" stroke-opacity=".42" stroke-width=".7"/><path d="M${(px+4).toFixed(2)} ${py.toFixed(2)}v${bh.toFixed(2)}M${(px+8).toFixed(2)} ${(py+3).toFixed(2)}h${(bw-11).toFixed(2)}m-${(bw-11).toFixed(2)} 3h${(bw-11).toFixed(2)}" fill="none" stroke="${i%4===0?gold:edge}" stroke-opacity=".57" stroke-width=".65"/></g>`;
  }).join('');
  const rings=Array.from({length:2+seed%3},(_,i)=>`<circle cx="${25+(seed*7+i*29)%67}" cy="${37+(seed*13+i*31)%100}" r="${8+(seed+i*7)%19}" fill="${i%2?b:c}" stroke="${gold}" stroke-opacity=".3" stroke-width=".8"/>`).join('');
  return `<div class="book-tree landscape-tree geometric-tree nocturne-tree" data-tree-id="${seed}" style="--tree-x:${x}%;--tree-width:${width}px;--tree-bottom:${bottom}%;--tree-depth:${depth};--tree-delay:-${seed*1.7}s;--tree-tilt:${(seed%7-3)*.6}deg"><svg viewBox="0 0 120 195" aria-hidden="true"><defs><clipPath id="canopy-${seed}"><path d="${silhouette}"/></clipPath></defs><path d="M${axis} 112L${axis-3} 187M${axis-3} 154L27 125M${axis-2} 145L90 104" fill="none" stroke="${ink}" stroke-width="4"/><path d="${silhouette}" fill="${a}" stroke="${edge}" stroke-opacity=".45" stroke-width="1"/><g clip-path="url(#canopy-${seed})"><path d="M0 40L120 5V162H62Z" fill="${b}"/>${books}${rings}<path d="${silhouette}" fill="url(#riso-dots)" opacity=".5"/><path d="M${axis} 5V174" stroke="${gold}" stroke-opacity=".45" stroke-width="1.1"/><path d="M9 155H113" stroke="${ink}" stroke-width="7"/></g><path d="M${axis-3} 158V187M${23+seed%11} 187H${98-seed%12}" stroke="${gold}" stroke-opacity=".55" stroke-width="1.2"/>${seed%4===0?'<path d="M58 2L61 9L68 12L61 15L58 22L55 15L48 12L55 9Z" fill="#f4c095"/>':''}</svg></div>`;
}

function drawKleeSnowflake(ctx,flake){
  const r=flake.r;
  ctx.save();ctx.translate(flake.x,flake.y);ctx.rotate(flake.rotation);
  ctx.strokeStyle=flake.color;ctx.fillStyle=flake.color;ctx.lineWidth=.85;ctx.lineCap='round';ctx.lineJoin='round';
  // Stable per-flake pencil noise: it does not flicker between animation frames.
  let pencilSeed=flake.inkSeed || (flake.kind+1)*18527+Math.round(r*103);
  const random=()=>{pencilSeed=(Math.imul(pencilSeed,1664525)+1013904223)>>>0;return pencilSeed/4294967296;};
  const line=(points)=>{
    const strokeWidth=.78+random()*.5;
    for(let pass=0;pass<2;pass++){
      ctx.save();ctx.globalAlpha=pass?.27:.94;ctx.lineWidth=pass?strokeWidth*.55:strokeWidth;
      ctx.beginPath();
      let previous=[points[0][0]*r+(random()-.5)*.7,points[0][1]*r+(random()-.5)*.7];
      ctx.moveTo(...previous);
      for(let i=1;i<points.length;i++){
        const start=points[i-1],end=points[i],distance=Math.hypot(end[0]-start[0],end[1]-start[1])*r;
        const steps=Math.max(2,Math.ceil(distance/3));
        for(let j=1;j<=steps;j++){
          const t=j/steps,wiggle=(random()-.5)*.78;
          const x=(start[0]+(end[0]-start[0])*t)*r+wiggle;
          const y=(start[1]+(end[1]-start[1])*t)*r+(random()-.5)*.7;
          ctx.quadraticCurveTo((previous[0]+x)/2+(random()-.5)*.65,(previous[1]+y)/2+(random()-.5)*.65,x,y);
          previous=[x,y];
        }
      }
      ctx.stroke();ctx.restore();
    }
  };
  if(flake.kind===0){
    for(let j=0;j<6;j++){ctx.save();ctx.rotate(j*Math.PI/3);line([[0,0],[.08,-.45],[0,-1]]);line([[-.25,-.53],[.05,-.7],[.3,-.5]]);ctx.restore();}
  }else if(flake.kind===1){
    line([[-.1,-1],[.6,-.1],[.1,1],[-.65,.05],[-.1,-1]]);line([[0,-.63],[0,.65]]);line([[-.44,0],[.4,.05]]);
  }else if(flake.kind===2){
    line([[-.9,0],[1,.08]]);line([[0,-1],[.05,1]]);line([[-.65,-.7],[.65,.7]]);line([[-.6,.7],[.7,-.62]]);line([[-.9,-.2],[-.9,.25]]);line([[.78,-.25],[1,.05],[.76,.3]]);
  }else if(flake.kind===3){
    line([[0,-1],[.26,-.3],[.92,-.2],[.35,.2],[.6,.88],[0,.48],[-.55,.9],[-.35,.2],[-.92,-.2],[-.25,-.3],[0,-1]]);
    ctx.fillRect(-.08*r,-.05*r,.18*r,.18*r);
  }else if(flake.kind===4){
    line([[-.8,-.8],[0,-.8],[0,0],[.8,0],[.8,.8]]);line([[-.8,.8],[-.8,0],[0,0],[0,-.8],[.8,-.8]]);line([[0,0],[0,.9]]);
  }else if(flake.kind===5){
    line([[0,-1],[.6,0],[0,1],[-.6,0],[0,-1]]);line([[-1,0],[1,0]]);line([[-.7,-.7],[.7,.7]]);line([[-.7,.7],[.7,-.7]]);
  }else if(flake.kind===6){
    line([[-.7,-.7],[.1,-.9],[.7,-.2],[.4,.6],[-.3,.9],[-.8,.2],[-.7,-.7]]);line([[-.7,-.7],[.4,.6]]);line([[.1,-.9],[-.3,.9]]);line([[-.8,.2],[.7,-.2]]);
  }else{
    for(let j=0;j<4;j++){ctx.save();ctx.rotate(j*Math.PI/2);line([[0,0],[.03,-.95]]);line([[-.33,-.5],[.03,-.75],[.3,-.55]]);ctx.restore();}
  }
  ctx.restore();
}

// Draw the pencil strokes once. Animation only rotates and composites these small bitmaps.
function createKleeSnowSprites(scale = 1) {
  const colors=['rgba(244,192,149,.85)','rgba(103,146,137,.9)','rgba(244,192,149,.8)','rgba(238,46,49,.64)','rgba(103,146,137,.72)'];
  return Array.from({length:80},(_,index)=>{
    const sprite=document.createElement('canvas');
    sprite.width=sprite.height=Math.ceil(32*scale);
    const pen=sprite.getContext('2d');
    pen.scale(scale,scale);
    drawKleeSnowflake(pen,{x:16,y:16,r:10,rotation:0,kind:index%8,inkSeed:(index+1)*7919,color:colors[Math.floor(index/8)%5]});
    return sprite;
  });
}
