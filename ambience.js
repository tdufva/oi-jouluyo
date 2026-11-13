(() => {
  const element = id => document.getElementById(id);
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const strings = {
    fi:{snow:'Lumisade',amount:'Määrä',speed:'Nopeus'},
    sv:{snow:'Snöfall',amount:'Mängd',speed:'Hastighet'}
  };
  const text = () => strings[document.documentElement.lang] || strings.fi;
  const settings = {snow:!motion.matches,amount:35,speed:2};
  try {
    const stored = JSON.parse(localStorage.getItem('on-atmosphere') || '{}');
    if(typeof stored.snow==='boolean')settings.snow=stored.snow;
    if(Number.isFinite(stored.amount))settings.amount=Math.max(0,Math.min(100,stored.amount));
    if(Number.isFinite(stored.speed))settings.speed=Math.max(1,Math.min(5,stored.speed));
  } catch {}
  if(motion.matches) settings.snow=false;
  const saveSettings = () => {try{localStorage.setItem('on-atmosphere',JSON.stringify(settings));}catch{}};
  element('snow-enabled').checked=settings.snow;
  element('snow-amount').value=settings.amount;
  element('snow-speed').value=settings.speed;
  function updateLanguage(){
    document.querySelectorAll('[data-atmosphere]').forEach(node=>node.textContent=text()[node.dataset.atmosphere]);
    element('snow-amount').setAttribute('aria-label',text().snow+' · '+text().amount);
    element('snow-speed').setAttribute('aria-label',text().snow+' · '+text().speed);
    element('snow-amount-value').value=settings.amount+' %';
    element('snow-speed-value').value=settings.speed+' / 5';
  }
  document.addEventListener('calendar-language',updateLanguage);
  updateLanguage();
  // Every tree has a unique silhouette, spine arrangement, palette and lean.
  const tree=makeBauhausTree;
  element('winter-landscape').innerHTML='<svg class="night-sky-shapes" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path d="M0 0H440L0 710Z" fill="#1d7874" opacity=".24"/><path d="M1170 0H1600V1000H1425L1050 350Z" fill="#679289" opacity=".17"/><circle cx="1280" cy="190" r="145" fill="#f4c095" opacity=".09"/><circle cx="1280" cy="190" r="166" fill="none" stroke="#679289" stroke-width=".9" opacity=".22"/><path d="M1280 45V335A145 145 0 0 0 1280 45" fill="#071e22" opacity=".7"/><path d="M960 64L1450 610M78 720L616 168" stroke="#f4c095" opacity=".2" stroke-width="1"/><circle cx="256" cy="315" r="85" stroke="#679289" fill="none" opacity=".12"/></svg>'+Array.from({length:17},(_,i)=>tree(i+1,-4+i*6.8,60+(i*43)%150,2+(i*13)%21,.13+(i%5)*.045)).join('')+`<div class="landscape-stars">${Array.from({length:10},(_,i)=>`<i style="--star-x:${[5,93,12,86,3,97,18,81,31,70][i]}%;--star-y:${[14,22,45,52,77,82,7,91,30,68][i]}%;--star-size:${18+(i*13)%53}px;--star-delay:-${i*2}s">${i%2?'✳':'✦'}</i>`).join('')}</div><div class="snow-horizon"></div><div class="snow-horizon hill-two"></div>`;
  document.querySelector('.scene-grove').innerHTML=Array.from({length:9},(_,i)=>tree(i+30,3+i*11.5,55+(i*29)%90,1+(i*7)%14,.7)).join('');
  const stage=element('stage-performers'),grove=document.querySelector('.scene-grove');
  const modal=element('book-modal');
  initBookPerformers(stage,motion);
  initRoseWindow(element('rose-window'));
  const backgroundPaused=()=>document.hidden||modal.open;
  const syncChoreography=scheduleBookChoreography(stage,motion,backgroundPaused);
  if('IntersectionObserver' in window){
    stage.dataset.inView='false';
    const visibility=new IntersectionObserver(entries=>{
      for(const entry of entries){
        entry.target.dataset.inView=String(entry.isIntersecting);
        if(entry.target===stage)syncChoreography();
      }
    },{rootMargin:'80px 0px'});
    visibility.observe(stage);visibility.observe(grove);
  }

  const canvas=element('snow-canvas'),ctx=canvas.getContext('2d',{alpha:true,desynchronized:true});
  let width=0,height=0,flakes=[],frame=0,lastTime=0,resizeFrame=0,sprites=[],spriteScale=0;
  let flakeSerial=0;
  const makeFlake=()=>({x:Math.random()*width,y:Math.random()*height,r:5+Math.random()*7,fall:.3+Math.random()*.7,sway:Math.random()*Math.PI*2,sprite:flakeSerial++%80,rotation:Math.random()*Math.PI*2,spin:(Math.random()-.5)*.007});
  function resize(){
    resizeFrame=0;
    const oldWidth=width,oldHeight=height;
    width=window.innerWidth;height=window.innerHeight;
    const scale=Math.min(window.devicePixelRatio||1,1.5);
    if(spriteScale!==scale){sprites=createKleeSnowSprites(scale);spriteScale=scale;}
    canvas.width=Math.round(width*scale);canvas.height=Math.round(height*scale);
    canvas.style.width=width+'px';canvas.style.height=height+'px';
    ctx.setTransform(scale,0,0,scale,0,0);
    const count=Math.round(settings.amount*(width<700?1.1:2.2));
    if(oldWidth&&oldHeight){for(const flake of flakes){flake.x*=width/oldWidth;flake.y*=height/oldHeight;}}
    if(flakes.length>count)flakes.length=count;
    while(flakes.length<count)flakes.push(makeFlake());
    syncSnow();
  }
  function draw(time){
    if(!settings.snow||settings.amount===0||backgroundPaused()){frame=0;lastTime=0;return;}
    const delta=lastTime?Math.min((time-lastTime)/16.67,3):1;lastTime=time;
    ctx.clearRect(0,0,width,height);
    for(const flake of flakes){
      flake.y+=flake.fall*(.45+settings.speed*.5)*delta;
      flake.x+=Math.sin(flake.sway+flake.y*.009)*.3*delta;
      if(flake.y>height+15){flake.y=-15;flake.x=Math.random()*width;}
      flake.rotation+=flake.spin*delta;
      const size=flake.r*3.2;
      ctx.save();ctx.translate(flake.x,flake.y);ctx.rotate(flake.rotation);
      ctx.drawImage(sprites[flake.sprite],-size/2,-size/2,size,size);
      ctx.restore();
    }
    frame=requestAnimationFrame(draw);
  }
  function syncSnow(){
    element('snow-amount-value').value=settings.amount+' %';
    element('snow-speed-value').value=settings.speed+' / 5';
    element('snow-amount').disabled=!settings.snow;
    element('snow-speed').disabled=!settings.snow;
    if(!settings.snow||settings.amount===0||backgroundPaused()){
      cancelAnimationFrame(frame);frame=0;lastTime=0;ctx.clearRect(0,0,width,height);
    }else if(!frame){frame=requestAnimationFrame(draw);}
  }
  function syncScene(){
    document.documentElement.classList.toggle('scene-paused',backgroundPaused());
    syncSnow();syncChoreography();
  }
  element('snow-enabled').onchange=event=>{settings.snow=event.target.checked;syncSnow();saveSettings();};
  element('snow-amount').oninput=event=>{
    settings.amount=Number(event.target.value);
    const count=Math.round(settings.amount*(width<700?1.1:2.2));
    if(flakes.length>count)flakes.length=count;
    while(flakes.length<count)flakes.push(makeFlake());
    syncSnow();saveSettings();
  };
  element('snow-speed').oninput=event=>{settings.speed=Number(event.target.value);syncSnow();saveSettings();};
  window.addEventListener('resize',()=>{if(!resizeFrame)resizeFrame=requestAnimationFrame(resize);},{passive:true});
  document.addEventListener('visibilitychange',syncScene);
  new MutationObserver(syncScene).observe(modal,{attributes:true,attributeFilter:['open']});
  resize();syncScene();
  motion.addEventListener('change',event=>{
    if(event.matches){settings.snow=false;element('snow-enabled').checked=false;syncSnow();}
  });
})();
