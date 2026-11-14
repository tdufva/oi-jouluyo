function makeBookPerformer(who) {
  const left = who === 'jussi';
  const art = left ? `
    <g fill="none" stroke="#679289" stroke-width="1.5"><path d="M16 143h131m-114 5h87"/><path d="M19 140h22m76 0h24" opacity=".45"/></g>
    <g class="book-react dog-pose">
      <g class="book-choreography dog-body">
        <g class="book-choreography book-dog-tail"><path d="m46 87-20-6-12-24-8 2 9 31 27 13z" fill="#ee2e31"/><path d="m10 59 6 15 7-4-7-13z" fill="#f4c095"/></g>
        <g class="book-choreography dog-hind"><path d="m54 105 18 1-8 29 7 4H43l7-14z" fill="#679289"/><path d="M44 136h24v5H43z" fill="#f4c095"/></g>
        <path d="M38 82 60 65l51 6 10 17-10 30-67-4-12-13z" fill="#ee2e31" transform="translate(3 2)"/>
        <path d="M38 82 60 65l51 6 10 17-10 30-67-4-12-13z" fill="#f4c095"/>
        <path d="m37 84 18-11 51 4 2 32-64-3-9-8z" fill="#1d7874"/>
        <path d="m44 82 17-5 29 4-1 21-43-2z" fill="url(#riso-dots)" opacity=".42" stroke="none"/>
        <path d="m48 92 33 3m-32 3 23 2" fill="none" stroke="#f4c095" stroke-width="1.5"/>
        <path d="m93 75 11 1-1 35-12-1z" fill="#ee2e31"/>
        <g class="book-choreography dog-front"><path d="m96 103 16 1 4 32 9 3v3H100l-6-21z" fill="#1d7874"/><path d="m102 134 13 1 10 4v3h-24z" fill="#f4c095"/></g>
        <g class="book-react dog-face"><g class="book-choreography dog-head">
          <path d="m91 71 10-33 26 2 12 16 22 4-2 20-31 9-25-3z" fill="#f4c095"/>
          <path d="m130 59 31 1-2 20-28 6z" fill="#679289"/>
          <path d="m153 60 9-1 1 8-8 4-4-5z" fill="#071e22"/>
          <path d="M140 75h13m-34-22 10-3" fill="none" stroke-width="1.7"/>
          <path d="m123 55 5 1-3 5-4-2z" fill="#071e22"/>
          <g class="book-choreography dog-ear"><path d="m99 45-12-17 5-14 16 9 11 18-12 31-13-7z" fill="#ee2e31"/><path d="m94 25 10 4 6 15-9 15z" fill="#1d7874"/></g>
          <path d="m100 76 21 7-4 10-22-8z" fill="#ee2e31"/><path d="m107 86-4 13 9-5 4 4 3-9z" fill="#f4c095"/>
        </g></g>
      </g>
    </g>` : `
    <g fill="none" stroke="#679289" stroke-width="1.5"><path d="M24 143h132m-106 5h86"/><path d="M24 139h18m97 0h17" opacity=".45"/></g>
    <g class="book-react dog-pose">
      <g class="book-choreography dog-body">
        <g class="book-choreography book-dog-tail"><path d="m126 76 13-11 10-28 12-7 3 10-6 30-23 24z" fill="#f4c095"/><path d="m148 41 13-11 3 10-3 10z" fill="#ee2e31"/></g>
        <g class="book-choreography dog-hind"><path d="m115 105 18-4-2 34 11 5h-26l-9-18z" fill="#ee2e31"/><path d="m118 135 14-2 10 7h-25z" fill="#f4c095"/></g>
        <path d="m50 77 31-14 25 3a29 29 0 0 1 22 45l-27 7-35-8-15-15z" fill="#ee2e31" transform="translate(3 2)"/>
        <path d="m50 77 31-14 25 3a29 29 0 0 1 22 45l-27 7-35-8-15-15z" fill="#f4c095"/>
        <path d="m66 78 32-10a25 25 0 0 1 26 39l-25 8-27-7z" fill="#ee2e31"/>
        <path d="M94 72a20 20 0 0 1 17 29L94 110Z" fill="#1d7874"/>
        <path d="m75 82 18-7v34l-17-4z" fill="#679289"/>
        <path d="m103 76 14 5m-15 1 16 6m-16 0 15 6" fill="none" stroke="#f4c095" stroke-width="1.4"/>
        <g class="book-choreography dog-front"><path d="m70 102 16 6-4 30-19 3-5-4 10-9z" fill="#679289"/><path d="m64 133 17 2v5l-19 2-4-5z" fill="#f4c095"/></g>
        <g class="book-react dog-face"><g class="book-choreography dog-head">
          <path d="m33 43 18-11 27 13 7 27-13 17-23-6-10-13-21-3-4-14z" fill="#f4c095"/>
          <path d="m26 53 16 2 10 20-13-5-21-3-4-14z" fill="#679289"/>
          <path d="m14 52 10 1 1 6-10 4-5-6z" fill="#071e22"/>
          <path d="m45 51 12-3m-29 16 8 2" fill="none" stroke-width="1.8"/>
          <path d="M48 56h6l-2 6h-4z" fill="#071e22"/>
          <g class="book-choreography dog-ear"><path d="m58 36 9-25 17 12-6 26-11 6z" fill="#1d7874"/><path d="m69 19 8 7-5 15-4-5z" fill="#ee2e31"/></g>
          <path d="m54 75 23-5 4 12-22 8z" fill="#1d7874"/><path d="m62 86 9-3 5 10-12 8z" fill="#f4c095"/>
        </g></g>
      </g>
    </g>`;
  return `<button type="button" class="book-figure book-figure-${who}">
    <svg class="book-figure-print" viewBox="0 0 170 152" aria-hidden="true" stroke="#071e22" stroke-width="2" stroke-linejoin="round">${art}</svg>
    <span class="book-reaction" aria-hidden="true"></span>
  </button>`;
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
  const dancers = [
    { figure: stage.querySelector('.book-figure-jussi'), phrases: ['sniff', 'prance', 'tilt', 'sit', 'listen'] },
    { figure: stage.querySelector('.book-figure-mariah'), phrases: ['bow', 'hop', 'listen', 'stretch', 'sit'] },
  ];
  for (const dancer of dancers) dancer.last = Math.floor(Math.random() * dancer.phrases.length);
  let timer;
  const canDance = () => !motion.matches && !backgroundPaused() && stage.dataset.inView !== 'false';

  function startPhrase() {
    let longest = 0;
    for (const dancer of dancers) {
      const { figure, phrases } = dancer;
      dancer.last = (dancer.last + 1 + Math.floor(Math.random() * (phrases.length - 1))) % phrases.length;
      const duration = 4900 + Math.round(Math.random() * 2300);
      figure.style.setProperty('--book-phrase-duration', `${duration}ms`);
      figure.dataset.phrase = phrases[dancer.last];
      longest = Math.max(longest, duration);
    }
    timer = setTimeout(() => {
      for (const { figure } of dancers) delete figure.dataset.phrase;
      timer = setTimeout(startPhrase, 900 + Math.random() * 1500);
    }, longest);
  }

  function sync() {
    if (canDance()) {
      if (!timer) startPhrase();
      return;
    }
    clearTimeout(timer);
    timer = undefined;
    for (const { figure } of dancers) delete figure.dataset.phrase;
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
      react(glints[glint++ % glints.length], false);
    }
    function localize() {
      const swedish = document.documentElement.lang === 'sv';
      const name = names[swedish ? 1 : 0];
      const action = swedish ? 'Visa en överraskning' : 'Näytä yllätys';
      button.setAttribute('aria-label', `${name}. ${action}.`);
    }
    button.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch') peek();
    });
    button.addEventListener('focus', () => {
      if (button.matches(':focus-visible')) peek();
    });
    button.addEventListener('click', () => {
      react(shows[show++ % shows.length], true);
      activateDuet(button);
    });
    document.addEventListener('calendar-language', localize);
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
