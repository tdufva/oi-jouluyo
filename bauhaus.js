/* Book characters built from primary-color planes, circles and folded pages. */
function makeBookPerformer(who) {
  const jussi=who==='jussi';
  const notes=`<g class="song-notes" fill="#f4c095"><path d="M175 58v-17l10-3v15m-10-12v5l10-3" stroke="#071e22" stroke-width="2" fill="none"/><ellipse cx="171" cy="59" rx="5" ry="3"/><ellipse cx="181" cy="54" rx="5" ry="3"/><path d="M164 27v-14l8 4v5l-8-4" stroke="#071e22" stroke-width="2" fill="none"/><ellipse cx="160" cy="28" rx="5" ry="3"/></g>`;
  const body=jussi?`
    <g class="walk-leg leg-left"><path d="M70 240L61 280" stroke="#071e22" stroke-width="9"/><path d="M61 276L36 292H72V279Z" fill="#ee2e31"/></g>
    <g class="walk-leg leg-right"><path d="M133 240L143 281" stroke="#071e22" stroke-width="9"/><path d="M143 280A18 18 0 0 1 164 297H130V281Z" fill="#071e22"/></g>
    <path d="M37 137L16 163V203" fill="none" stroke="#071e22" stroke-width="7"/><circle cx="16" cy="207" r="8" fill="#f4c095"/>
    <path class="baton-arm" d="M155 133L182 159L187 111" fill="none" stroke="#071e22" stroke-width="7"/><g class="conductor-baton"><circle cx="187" cy="110" r="9" fill="#f4c095"/><path d="M187 104L196 70" stroke="#ee2e31" stroke-width="4"/></g>
    <path d="M35 58L145 44L165 61V240L52 253L31 237Z" fill="#071e22"/>
    <path d="M47 65L157 54V233L47 245Z" fill="#f4c095"/>
    <path d="M151 67V224M146 69V226M141 70V226" stroke="#071e22" stroke-width="1.6"/>
    <g class="book-cover"><path d="M25 57L143 39V119L151 117L143 162V233L31 247L35 159L25 160Z" fill="#1d7874"/><path d="M31 52L53 49V244L31 247Z" fill="#f4c095"/><path d="M36 63V229M42 62V228" stroke="#071e22" stroke-width="2"/>
    <g class="singer-head abstract-mask"><path d="M66 78A30 30 0 0 1 96 48V109H66Z" fill="#f4c095"/><path d="M108 54L145 105L104 124Z" fill="#ee2e31"/><circle cx="119" cy="47" r="13" fill="#f4c095"/><path class="book-brow" d="M65 87L92 83M112 92L136 99" stroke="#071e22" stroke-width="5"/><g class="character-eyes"><rect x="70" y="94" width="19" height="5" fill="#071e22"/><circle cx="120" cy="105" r="6" fill="#071e22"/></g><path d="M92 103L83 119L103 116Z" fill="#f4c095"/><ellipse class="singing-mouth" cx="105" cy="132" rx="10" ry="11" fill="#071e22"/></g>
    <path d="M66 151L94 167L120 145V178L94 167L66 185Z" fill="#f4c095"/>
    <path d="M68 190H130V221H68Z" fill="#f4c095"/><path d="M69 191A30 30 0 0 1 129 191" fill="#f4c095"/><path d="M98 175V222" stroke="#071e22" stroke-width="3"/><path d="M79 202H118M79 210H118" stroke="#071e22" stroke-width="2"/>
    <path class="ribbon-tail" d="M58 239V268L67 259L76 267V236Z" fill="#ee2e31"/></g>`:`
    <g class="walk-leg leg-left"><path d="M77 238L63 281" stroke="#071e22" stroke-width="7"/><path d="M64 276L43 293H70L79 280M46 292V300" fill="#ee2e31" stroke="#ee2e31" stroke-width="3"/></g>
    <g class="walk-leg leg-right"><path d="M128 237L144 280" stroke="#071e22" stroke-width="7"/><path d="M144 277L166 291L163 299H131L132 281Z" fill="#1d7874"/></g>
    <path class="diva-arm" d="M47 142L18 132L9 99" stroke="#071e22" stroke-width="6" fill="none"/><circle cx="9" cy="97" r="8" fill="#f4c095"/>
    <g class="page-wing wing-left"><path d="M98 83L20 48L12 223L99 251Z" fill="#071e22"/><path d="M94 85L27 61L20 214L97 239Z" fill="#ee2e31"/><path d="M90 91L38 71L31 211L97 233Z" fill="#f4c095"/><path d="M84 99L49 80L42 208L96 229Z" fill="#f4c095"/>
    <path d="M48 127L82 145L47 161Z" fill="#1d7874"/><path d="M46 178H85V215H44Z" fill="#ee2e31"/><path d="M46 179A20 20 0 0 1 85 179Z" fill="#ee2e31"/><path d="M53 113L80 126M50 119L80 133" stroke="#071e22" stroke-width="2"/></g>
    <g class="page-wing wing-right"><path d="M101 82L166 35L188 222L100 253Z" fill="#071e22"/><path d="M103 88L159 48L178 215L104 242Z" fill="#ee2e31"/><path d="M110 98L149 65L168 207L108 235Z" fill="#f4c095"/><path d="M117 117L153 91L163 181L114 211Z" fill="#1d7874"/>
    <circle cx="140" cy="151" r="24" fill="#f4c095"/><path d="M140 127V175A24 24 0 0 1 140 127Z" fill="#ee2e31"/><path d="M119 222L154 204" stroke="#071e22" stroke-width="3"/></g>
    <path d="M97 89L105 84L109 249L100 257Z" fill="#071e22"/>
    <g class="singer-head abstract-mask"><g class="paper-hair"><path d="M57 34L87 11L103 49L77 80Z" fill="#f4c095"/><path d="M112 23A39 39 0 0 1 151 62H112Z" fill="#1d7874"/><circle cx="135" cy="36" r="12" fill="#f4c095"/></g><path d="M79 41L109 53L93 101L64 81Z" fill="#ee2e31"/><path d="M109 53A27 27 0 0 1 109 107Z" fill="#f4c095"/><g class="character-eyes" fill="none" stroke="#071e22" stroke-width="3"><circle cx="117" cy="67" r="8"/><path d="M69 63L89 69"/></g><path d="M101 74L112 91H94Z" fill="#f4c095"/><ellipse class="singing-mouth" cx="87" cy="97" rx="10" ry="6" fill="#071e22"/><path d="M65 83L74 96L61 107L52 94Z" fill="#1d7874"/></g>
    <path class="ribbon-tail" d="M96 244L80 279L99 266L116 282L108 241Z" fill="#ee2e31"/>
    <g class="singer-hand"><path d="M160 143L181 127L175 91" fill="none" stroke="#071e22" stroke-width="6"/><circle cx="175" cy="91" r="8" fill="#f4c095"/><path d="M172 87L158 68" stroke="#071e22" stroke-width="5"/><circle cx="154" cy="62" r="10" fill="#071e22"/><path d="M147 60L158 54" stroke="#f4c095" stroke-width="3"/></g>`;
  return `<div class="performer performer-${who} book-character bold-book-character abstract-book-character" data-performer="${who}" role="img" aria-label="${jussi?'Jussi Björling · oopperakirja':'Mariah Carey · avautuva juhlakirja'}"><svg viewBox="0 0 200 320" aria-hidden="true"><path d="M26 306H177" stroke="#071e22" stroke-width="2" opacity=".3"/><g class="character-chair"><path d="M42 264H149M50 264L45 306M140 264L155 306M147 264V211" stroke="#679289" stroke-width="4" fill="none"/><path d="M42 256H149V264H42Z" fill="#1d7874"/></g><g class="performer-body"><g class="character-breath">${body}<path class="book-print-grain" d="M28 58L144 41L165 221L100 250L28 233Z" fill="url(#riso-dots)" opacity=".18"/><g class="reading-book"><path d="M44 170L99 186L151 163V210L100 232L44 214Z" fill="#f4c095" stroke="#071e22" stroke-width="3"/><path d="M99 186L100 232M53 181L87 191M53 188L87 198M111 188L139 177M111 196L139 185" stroke="#071e22" stroke-width="2" fill="none"/><path d="M99 186L93 239L101 232L107 235L104 184Z" fill="#ee2e31"/></g></g></g><g class="seated-legs"><path d="M79 263L123 272L142 300M114 265L88 282L112 300" stroke="#679289" stroke-width="7" fill="none"/><path d="M133 294H157V304H133M103 294H127V304H103" fill="#ee2e31"/></g><g class="thought-marks" fill="none" stroke="#f4c095" stroke-width="1.5"><circle cx="160" cy="70" r="3"/><circle cx="174" cy="48" r="6"/><path d="M164 16L183 11L193 29L173 35Z"/><path d="M174 19L183 26M183 17L176 28"/></g>${notes}</svg></div>`;
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

function characterActivityFor(who, phase) {
  const activities=who==='jussi'?['thinking','walking','singing','reading','seated']:['reading','singing','seated','thinking','walking'];
  return activities[phase%activities.length];
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
