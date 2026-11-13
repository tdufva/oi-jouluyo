function makeBookPerformer(who) {
  const jussi = who === 'jussi';
  const art = jussi ? `
    <path d="M28 221h112m-97 5h75" fill="none" stroke="#679289" stroke-width="1.5"/>
    <path d="M49 215h69l15 6H34z" fill="#071e22" stroke="#679289" stroke-width="2"/>
    <g class="book-choreography book-tower">
      <path d="M35 71l78-14 19 11-5 114-76 22-18-9z" fill="#ee2e31" opacity=".55" transform="translate(3 2)"/>
      <path d="m38 69 78-15 17 13-5 118-80 21-14-14z" fill="#f4c095" stroke="#071e22" stroke-width="2.5"/>
      <path d="m42 72 74-15-4 115-74 24-9-13z" fill="#1d7874" stroke="#071e22" stroke-width="2.5"/>
      <path d="m42 72 14-3-7 123-11 4-9-13z" fill="#679289"/>
      <path d="m49 74-8 110m10-104-7 98m72-99 8-3m-9 8 9-3m-9 8 9-3m-12 80 10-3m-10 8 10-3" fill="none" stroke="#071e22" stroke-width="1.5"/>
      <path d="m55 68 61-11-4 115-63 20z" fill="url(#riso-dots)" opacity=".38"/>
      <path d="m56 151 48-15-1 14-47 16zm-1 22 35-12v7l-35 11z" fill="#f4c095"/>
      <path d="m66 174-6 37 11-7 8 5-2-39z" fill="#ee2e31" stroke="#071e22" stroke-width="1.5"/>
      <g class="book-react book-shutter">
        <path d="M54 131a28 28 0 0 1 56 0z" fill="#071e22"/>
        <path d="M57 130a25 25 0 0 1 50 0z" fill="#f4c095"/>
        <path d="m82 105 22 24H82z" fill="#ee2e31"/>
        <path d="M69 131h31m-26 5h20" stroke="#679289" stroke-width="1.6"/>
      </g>
    </g>
    <g class="book-react book-index">
      <path d="M24 92h18v68H24z" fill="#ee2e31" stroke="#071e22" stroke-width="2"/>
      <path d="M28 99h4v55h-4z" fill="#f4c095"/>
    </g>
    <g class="book-choreography book-balance">
      <circle cx="93" cy="48" r="27" fill="none" stroke="#679289" stroke-width="1.4" stroke-dasharray="12 4 2 6"/>
      <path d="M93 25a23 23 0 0 1 0 46V25Z" fill="#ee2e31" stroke="#071e22" stroke-width="2"/>
      <path d="M93 25a23 23 0 0 0 0 46V25Z" fill="#f4c095" stroke="#071e22" stroke-width="2"/>
      <circle cx="93" cy="48" r="6" fill="#071e22"/><circle cx="93" cy="48" r="2.3" fill="#f4c095"/>
      <path d="M110 30h18m-6-6v12" stroke="#f4c095" stroke-width="1.5"/>
    </g>` : `
    <path d="M30 221h113m-96 5h77" fill="none" stroke="#679289" stroke-width="1.5"/>
    <path d="M48 215h78l13 6H32z" fill="#071e22" stroke="#679289" stroke-width="2"/>
    <path d="M91 127 54 214h74z" fill="#1d7874" stroke="#071e22" stroke-width="2.5"/>
    <path d="m87 165-10 49h17l3-53z" fill="#f4c095"/>
    <g class="book-choreography book-fan">
      <path d="M22 135a66 66 0 0 1 132-3" fill="none" stroke="#679289" stroke-width="1.4" stroke-dasharray="10 5 2 6"/>
      <path d="m83 164-65-27 4-53 27 13 39 50z" fill="#071e22"/>
      <g class="book-react book-fan-left">
        <path d="m85 157-66-23 5-56 33 11 34 57z" fill="#f4c095" stroke="#071e22" stroke-width="2.4"/>
        <path d="m84 153-57-23 2-42 27 10 31 47z" fill="#ee2e31"/>
        <path d="m31 108 33 13m-32-5 39 16m-40-7 42 17" fill="none" stroke="#f4c095" stroke-width="1.8"/>
        <path d="m85 150-56-21 1-40 26 10z" fill="url(#riso-dots)" opacity=".3"/>
      </g>
      <g class="book-react book-fan-right">
        <path d="m87 158 42-15 25-66-34 12-35 49z" fill="#ee2e31" transform="translate(2 2)" opacity=".72"/>
        <path d="m86 158 45-15 21-68-36 11-33 56z" fill="#f4c095" stroke="#071e22" stroke-width="2.4"/>
        <path d="m88 151 35-12 18-53-23 8-33 50z" fill="#1d7874"/>
        <path d="m126 99-18 33m24-33-18 30m23-31-18 28" fill="none" stroke="#f4c095" stroke-width="1.8"/>
      </g>
      <path d="M85 150 68 85 92 65l19 24-20 64z" fill="#ee2e31" stroke="#071e22" stroke-width="2.2"/>
      <path d="m84 138 9-58 7 12-13 53z" fill="#f4c095"/>
      <circle cx="87" cy="151" r="12" fill="#071e22" stroke="#f4c095" stroke-width="2"/><circle cx="87" cy="151" r="3.4" fill="#ee2e31"/>
      <path d="m87 158 13 34 10-17 8 3-21-25z" fill="#ee2e31" stroke="#071e22" stroke-width="1.5"/>
    </g>
    <g class="book-choreography book-orbit">
      <circle cx="89" cy="49" r="26" fill="none" stroke="#f4c095" stroke-width="1.4"/>
      <path d="M89 23a26 26 0 0 1 0 52V23Z" fill="#1d7874"/>
      <path d="M89 31a18 18 0 0 0 0 36V31Z" fill="#ee2e31"/>
      <path d="M89 34a15 15 0 0 1 0 30V34Z" fill="#f4c095"/>
      <circle cx="114" cy="43" r="6" fill="#ee2e31" stroke="#071e22" stroke-width="1.5"/>
      <path d="m68 21 8 2-4 7-8-1z" fill="#f4c095"/>
    </g>`;
  return `<button type="button" class="book-figure book-figure-${who}">
    <svg class="book-figure-print" viewBox="0 0 170 235" aria-hidden="true">${art}</svg>
    <span class="book-reaction" aria-hidden="true"></span>
  </button>`;
}

function drawBookConstellation(stage, from, to, duration) {
  const stageBounds = stage.getBoundingClientRect();
  const origin = button => {
    const bounds = button.querySelector('.book-reaction').getBoundingClientRect();
    return { x: bounds.left - stageBounds.left, y: bounds.top - stageBounds.top };
  };
  const start = origin(from);
  const end = origin(to);
  const points = [[0, 0], [.12, 42], [.26, 101], [.37, 62], [.5, 142], [.64, 92], [.75, 118], [.89, 45], [1, 0]]
    .map(([fraction, rise]) => [
      Math.round(start.x + (end.x - start.x) * fraction),
      Math.round(start.y + (end.y - start.y) * fraction - rise),
    ]);
  const stars = points.map(([x, y], index) => {
    const accent = index === 4;
    const size = accent ? 19 : index % 2 ? 5 : 8;
    return `<g transform="translate(${x} ${y})">
      <g class="book-constellation-star${accent ? ' book-constellation-center' : ''}" style="--star-in:${index * 135}ms">
        ${accent ? '<circle r="29" fill="none" stroke="#679289" stroke-width="1" stroke-dasharray="3 5"/><circle r="23" fill="none" stroke="#ee2e31" stroke-width="1.5"/>' : ''}
        <path d="M0 ${-size} ${size / 4} ${-size / 4} ${size} 0 ${size / 4} ${size / 4} 0 ${size} ${-size / 4} ${size / 4} ${-size} 0 ${-size / 4} ${-size / 4}Z"/>
      </g>
    </g>`;
  }).join('');
  const mainLine = points.map(point => point.join(',')).join(' ');
  const branch = [points[2], points[4], points[6]].map(point => point.join(',')).join(' ');
  stage.insertAdjacentHTML('afterbegin', `<svg class="book-constellation" viewBox="0 0 ${stageBounds.width} ${stageBounds.height}" aria-hidden="true" style="--constellation-duration:${duration}ms">
    <polyline class="book-constellation-branch" points="${branch}"/>
    <polyline class="book-constellation-trace" points="${mainLine}" pathLength="1"/>
    <polyline class="book-constellation-line" points="${mainLine}" pathLength="1"/>
    ${stars}
  </svg>`);
  return stage.firstElementChild;
}

function initBookPerformers(stage, motion) {
  const sparks = {
    star: '<path d="M12 0 15 9 24 12 15 15 12 24 9 15 0 12 9 9Z" fill="currentColor"/>',
    diamond: '<path d="m12 1 9 11-9 11L3 12Z" fill="currentColor"/>',
    page: '<path d="m2 4 10 3 10-4-2 16-8 3-9-4z" fill="currentColor"/><path d="M12 7v15M5 10l4 1m6 0 4-2m-4 5 3-1" fill="none" stroke="#071e22" stroke-width="1.4"/>',
    ring: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/>',
    dot: '<circle cx="12" cy="12" r="5" fill="currentColor"/>',
    prism: '<path d="M3 21 11 2l11 19Z" fill="currentColor"/><path d="M11 2v19H3Z" fill="#071e22" opacity=".48"/>',
  };
  const recipes = {
    stars: { shapes: ['star', 'diamond', 'dot'], spread: 112, lift: 28, turn: .23, symbol: 'star' },
    pages: { shapes: ['page', 'page', 'diamond'], spread: 72, lift: 116, turn: -.4, symbol: 'page' },
    echoes: { shapes: ['ring', 'dot', 'ring'], spread: 107, lift: 15, turn: .16, symbol: 'ring' },
    orbit: { shapes: ['dot', 'star', 'ring'], spread: 102, lift: 19, turn: 1.35, symbol: 'ring' },
    prisms: { shapes: ['prism', 'diamond', 'prism'], spread: 84, lift: 57, turn: -.8, symbol: 'prism' },
    rain: { shapes: ['star', 'star', 'diamond'], spread: 88, lift: -62, turn: .58, symbol: 'star' },
  };
  const palettes = {
    jussi: ['#f4c095', '#fff0da', '#8cb4a9', '#ee2e31'],
    mariah: ['#fff0da', '#ee2e31', '#f4c095', '#8cb4a9'],
  };
  const figures = [
    { who: 'jussi', name: 'Jussi Björling', glints: ['stars', 'pages'], shows: ['stars', 'pages', 'echoes'] },
    { who: 'mariah', name: 'Mariah Carey', glints: ['orbit', 'prisms'], shows: ['orbit', 'prisms', 'rain'] },
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
      constellation = drawBookConstellation(stage, first, button, duetDuration);
      stage.dataset.duet = 'together';
      status.textContent = document.documentElement.lang === 'sv' ? 'En stjärnbild tändes mellan bokfigurerna.' : 'Kirjahahmojen väliin syttyi tähtikuvio.';
      duetTimer = setTimeout(resetDuet, duetDuration);
      return;
    }
    previousFigure = button;
    stage.dataset.duet = button.classList.contains('book-figure-jussi') ? 'left' : 'right';
    duetTimer = setTimeout(resetDuet, duetWindow);
  }

  window.addEventListener('resize', resetDuet);
  document.addEventListener('visibilitychange', resetDuet);

  for (const { who, name, glints, shows } of figures) {
    const button = stage.querySelector('.book-figure-' + who);
    const layer = button.querySelector('.book-reaction');
    let glint = 0;
    let show = 0;
    let cleanup;
    function react(mode, full) {
      clearTimeout(cleanup);
      const recipe = recipes[mode];
      const still = motion.matches;
      const count = full ? 19 : 9;
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
      const action = document.documentElement.lang === 'sv' ? 'Visa en överraskning' : 'Näytä yllätys';
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
