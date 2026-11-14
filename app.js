const copy = {
  fi: {
    heading: '24 kirjaa.<br><em>Yksi jouluyö.</em>',
    description: 'Avaa ovi tarinoiden taloon. Löydä joka päivä kirja, ajatus ja pieni valonpilkahdus Oi jouluyön hengessä.',
    date: 'Luukut avautuvat 1.–24. joulukuuta. Menneisiin luukkuihin voi palata.',
    preview: 'Esikatsele kaikki luukut',
    footer: 'Pieni hetki kirjallisuudelle. Joka päivä.',
    top: 'Takaisin ylös ↑',
    day: 'joulukuuta',
    door: 'Luukku',
    locked: 'Tämä luukku avautuu',
    lockedText: 'Tarina odottaa vielä omaa päiväänsä.',
    link: 'Etsi teos Finnasta ↗',
    listen: 'Etsi laulu Finnasta ↗',
    previous: '← Edellinen',
    next: 'Seuraava →',
    illustration: 'Luukun kuvitus',
    loading: 'Avataan luukkua…',
    loadError: 'Luukun sisältöä ei saatu ladattua.',
    retry: 'Yritä uudelleen',
    play: 'Toista YouTube-video',
    watch: 'Avaa YouTubessa ↗',
    music: 'Kuuntele Apple Musicissa ↗',
    share: 'Jaa linkki',
    shareApp: 'Jaa sovelluksessa…',
    shareCopy: 'Kopioi linkki',
    shareEmail: 'Sähköposti',
    shareLinkLabel: 'Luukun osoite',
    shareCopied: 'Luukun linkki kopioitu.',
    shareManual: 'Voit kopioida valitun tekstin.',
    shareUnavailable: 'Valitse alta toinen jakotapa.',
    storyDownload: 'Lataa tarinakuva',
    storyImage: 'Luukun tarinakuva',
    storySave: 'Voit myös tallentaa kuvan pitämällä sitä painettuna.',
    storyEvent: 'Kopioi tapahtumateksti',
    storyEventCopied: 'Tapahtumateksti ja linkki kopioitu.',
    storyHelp: 'Lisää kuva Instagram-tarinaan ja liitä luukun osoite Linkki-tarraan. Voit käyttää tapahtumatekstiä julkaisussa ja lisätä siihen muistutuksen, jos toiminto on tililläsi käytössä.',
  },
  sv: {
    heading: '24 böcker.<br><em>En helig natt.</em>',
    description: 'Öppna dörren till berättelsernas hus. Upptäck en bok, en tanke och en liten ljusglimt varje dag i O helga natts anda.',
    date: 'Luckorna öppnas 1–24 december. Du kan återvända till tidigare luckor.',
    preview: 'Förhandsvisa alla luckor',
    footer: 'En liten stund för litteratur. Varje dag.',
    top: 'Till toppen ↑',
    day: 'december',
    door: 'Lucka',
    locked: 'Den här luckan öppnas',
    lockedText: 'Berättelsen väntar på sin dag.',
    link: 'Sök boken i Finna ↗',
    listen: 'Sök sången i Finna ↗',
    previous: '← Föregående',
    next: 'Nästa →',
    illustration: 'Luckans illustration',
    loading: 'Öppnar luckan…',
    loadError: 'Luckans innehåll kunde inte laddas.',
    retry: 'Försök igen',
    play: 'Spela YouTube-videon',
    watch: 'Öppna på YouTube ↗',
    music: 'Lyssna på Apple Music ↗',
    share: 'Dela länk',
    shareApp: 'Dela i en app…',
    shareCopy: 'Kopiera länk',
    shareEmail: 'E-post',
    shareLinkLabel: 'Luckans adress',
    shareCopied: 'Länken till luckan har kopierats.',
    shareManual: 'Du kan kopiera den markerade texten.',
    shareUnavailable: 'Välj ett annat delningssätt nedan.',
    storyDownload: 'Ladda ner en storybild',
    storyImage: 'Luckans storybild',
    storySave: 'Du kan också spara bilden genom att hålla fingret på den.',
    storyEvent: 'Kopiera evenemangstext',
    storyEventCopied: 'Evenemangstexten och länken har kopierats.',
    storyHelp: 'Lägg till bilden i en Instagram-story och klistra in luckans adress i länkdekalen. Du kan använda evenemangstexten i ett inlägg och lägga till en påminnelse om funktionen finns på ditt konto.',
  },
};
let lang='fi', current=1;const $=id=>document.getElementById(id);let opened=[];try{lang=localStorage.getItem('on-lang')==='sv'?'sv':'fi';opened=JSON.parse(localStorage.getItem('on-opened-2026')||'[]');if(!Array.isArray(opened))opened=[];}catch{}
const query = new URLSearchParams(location.search);
const linkedLanguage = query.get('lang');
if (linkedLanguage === 'fi' || linkedLanguage === 'sv') lang = linkedLanguage;
const editorPreview = query.get('esikatselu') === '1';
$('preview-control').hidden = !editorPreview && !['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
$('preview').checked = editorPreview;
const doorRequests = new Map();
let contentRevision = 0;
const effects = ['starlight', 'aurora', 'snow', 'halo', 'candle', 'comet'];
let opening = false;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function effectFor(day) { return effects[(day - 1) % effects.length]; }
function effectStyle(day) {
  return `--turn:${((day * 7) % 13) - 6}deg;--glow-hue:${35 + (day * 11) % 24};--effect-speed:${1050 + day * 23}ms;--lift:${9 + day % 5}px;--hover-cycle:${2400 + day * 29}ms;--magic-turn:${day * 17}deg;--reveal-turn:${day % 2 ? -3 : 3}deg;--variant:${day};--rest-turn:${(((day*5)%7)-3)*.55}deg;--rest-shift:${(day*11)%7-3}px`;
}
function coverArt(index, decorative = true) {
  const number = doorContent.number(index + 1);
  const description = decorative ? '' : copy[lang].illustration;
  return `<img class="cover-image textless-cover" src="assets/door-art/${number}.svg" width="160" height="210" alt="${description}" loading="${!decorative || index < 6 ? 'eager' : 'lazy'}" decoding="async" draggable="false">`;
}

function loadDoor(day) {
  if (!doorRequests.has(day)) {
    const request = fetch(doorContent.path(day), { cache: 'no-cache' })
      .then(response => {
        if (!response.ok) throw new Error('Door content unavailable');
        return response.json();
      })
      .then(entry => {
        if (!entry || typeof entry !== 'object' || !entry.fi || !entry.sv) {
          throw new Error('Invalid door content');
        }
        return entry;
      })
      .catch(() => {
        doorRequests.delete(day);
        return null;
      });
    doorRequests.set(day, request);
  }
  return doorRequests.get(day);
}

function entranceArt() {
  return `<span class="entrance-architecture" aria-hidden="true"><span class="entrance-stoneframe"></span><span class="entrance-fanlight"></span><span class="door-surface entrance-surface"><span class="door-leaf door-leaf-left"></span><span class="door-leaf door-leaf-right"></span><span class="door-shimmer"></span></span><span class="door-number entrance-number">24</span><span class="entrance-threshold"></span></span>`;
}
function particles(day) {
  const flake='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2L11.6 22M2 12L22 12.4M5 5L19 19M5 19L19 5M8 4L12 7L16 4M8 20L12 17L16 20" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>';
  return Array.from({length:18}, (_,j) => {
    const angle = (j * 137.5 + day * 19) * Math.PI / 180;
    const distance = 30 + (day * 7 + j * 13) % 57;
    const hoverDistance = 76 + (day * 11 + j * 17) % 87;
    const isFlake = j % 4 === 0;
    return `<i class="spark ${isFlake?'spark-flake':''}" style="--x:${Math.cos(angle)*distance}px;--y:${Math.sin(angle)*distance - 25}px;--hover-x:${Math.cos(angle)*hoverDistance}px;--hover-y:${Math.sin(angle)*hoverDistance - 32}px;--delay:${j*14}ms;--hover-delay:-${(j*137+day*53)%1800}ms;--size:${isFlake?12+(day+j)%8:5+(day+j)%7}px;--spin:${day*13+j*47}deg">${isFlake?flake:''}</i>`;
  }).join('');
}
function prepareDoor(button) {
  if (button.dataset.magicReady) return;
  button.dataset.magicReady='true';
  button.querySelector('.door-enchantment').innerHTML='<i class="magic-glow"></i><i class="magic-rays"></i><i class="magic-orbit orbit-outer"></i><i class="magic-orbit orbit-inner"></i><i class="magic-star"></i>';
  button.querySelector('.door-sparks').innerHTML=particles(Number(button.dataset.day));
}
function available(day, now = new Date()) {
  return $('preview').checked || now.getFullYear() > 2026 ||
    (now.getFullYear() === 2026 && now.getMonth() === 11 && now.getDate() >= day);
}
function save() {
  try {
    localStorage.setItem('on-opened-2026', JSON.stringify(opened));
    localStorage.setItem('on-lang', lang);
  } catch {}
}
function render() {
  const t = copy[lang];
  document.documentElement.lang = lang;
  document.title = lang === 'fi' ? 'Oi jouluyö — 24 kirjaa kohti valoa' : 'O helga natt — 24 böcker mot ljuset';
  for (const [id,key] of Object.entries({'heading':'heading','description':'description','date-note':'date','preview-label':'preview','footer-copy':'footer','back-top':'top'})) { const target = $(id); if (target) target.innerHTML = t[key]; }
  document.querySelector('.calendar-section').setAttribute('aria-label', lang === 'fi' ? 'Joulukalenteri' : 'Julkalender');
  document.querySelectorAll('.lang').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
    b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    b.setAttribute('aria-label', b.dataset.lang === 'fi' ? 'Suomi' : 'Svenska');
  });
  $('doors').innerHTML = Array.from({ length: doorContent.total }, (_, i) => {
    const day = i + 1, unlocked = available(day);
    const entryLabel = day === 24 ? (lang === 'fi' ? 'Pääsisäänkäynti, pariovet. ' : 'Huvudingång, pardörrar. ') : '';
    const label = `${entryLabel}${day}. ${t.day}${unlocked ? '' : ', '+t.locked+' '+day+'. '+t.day}`;
    return `<button class="door ${day===24?'door-entrance':day===23?'door-bay':''} ${opened.includes(day)?'opened':''}" data-day="${day}" data-effect="${effectFor(day)}" aria-label="${escapeHTML(label)}" aria-haspopup="dialog" style="${effectStyle(day)}"><span class="door-enchantment" aria-hidden="true"></span><span class="door-light" aria-hidden="true"></span>${day===24?entranceArt():`<span class="door-surface">${coverArt(i)}<span class="door-shimmer" aria-hidden="true"></span><span class="door-number" aria-hidden="true">${String(day).padStart(2,'0')}</span></span>${day===23?'<span class="bay-rail" aria-hidden="true"></span>':''}`}<span class="door-sparks" aria-hidden="true"></span></button>`;
  }).join('') + '<button type="button" class="facade-relief" id="winter-window" aria-label="Jouluikkunan yllätykset"><span aria-hidden="true">✦</span></button>';
  document.querySelectorAll('.door').forEach(button => {
    button.onpointerenter = button.onmouseenter = button.onfocus = () => prepareDoor(button);
    button.onclick = () => {prepareDoor(button);openDoor(+button.dataset.day,button);};
  });
  document.dispatchEvent(new Event('calendar-language'));
}
function startChristmasReveal(day, button) {
  const bounds=button.getBoundingClientRect();
  const x=bounds.left+bounds.width/2,y=bounds.top+bounds.height/2;
  const overlay=document.createElement('div');
  overlay.className='festive-opening';overlay.setAttribute('aria-hidden','true');
  overlay.dataset.effect=effectFor(day);
  overlay.style.cssText=`--origin-x:${x}px;--origin-y:${y}px;--celebration-turn:${day*13}deg`;
  const star='<svg viewBox="0 0 24 24"><path d="M12 1L15 8L23 12L15 15L12 23L9 15L1 12L9 8Z" fill="currentColor"/><path d="M12 5V19M5 12H19" stroke="#f4c095" stroke-width=".7" fill="none"/></svg>';
  const snow='<svg viewBox="0 0 24 24"><path d="M12 2L11.7 22M2 12L22 12.3M5 5L19 19M5 19L19 5M8 4L12 7L16 4M8 20L12 17L16 20" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" fill="none"/></svg>';
  const radius=Math.min(window.innerWidth*.6,window.innerHeight*.48);
  overlay.innerHTML='<div class="festive-field"></div><div class="festive-beam"></div><div class="festive-core"><i class="festive-ring"></i><i class="festive-ring second"></i><i class="festive-compass"></i></div>'+Array.from({length:32},(_,i)=>{
    const angle=(i*137.5+day*17)*Math.PI/180;
    const distance=55+radius*(.4+((i*17+day)%57)/100);
    return `<i class="festive-star ${i%3===0?'drawn-flake':''}" style="--travel-x:${Math.cos(angle)*distance}px;--travel-y:${Math.sin(angle)*distance-55}px;--spark-delay:${i*11}ms;--spark-size:${10+(i*7+day)%17}px;--spark-turn:${i*47+day*11}deg">${i%3===0?snow:star}</i>`;
  }).join('');
  document.body.append(overlay);
  window.setTimeout(()=>overlay.remove(),2450);
}
function openDoor(day, button) {
  if (opening) return;
  if (!available(day) || reducedMotion.matches) { show(day); return; }
  opening = true;
  const content = loadDoor(day);
  button.classList.add('opening');
  button.setAttribute('aria-busy', 'true');
  document.querySelector('.house').classList.add('welcoming');
  startChristmasReveal(day,button);
  setTimeout(() => {
    try { show(day, content); }
    finally {
      button.classList.remove('opening');
      button.removeAttribute('aria-busy');
      document.querySelector('.house').classList.remove('welcoming');
      opening = false;
    }
  }, 360);
}
function makeDoorStory(day, title, art) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ink = canvas.getContext('2d');
  ink.fillStyle = '#071e22';
  ink.fillRect(0, 0, 1080, 1920);
  ink.fillStyle = '#1d7874';
  ink.fillRect(84, 108, 912, 1704);
  ink.fillStyle = '#071e22';
  ink.fillRect(108, 132, 864, 1656);
  ink.fillStyle = '#ee2e31';
  ink.fillRect(108, 132, 864, 13);
  ink.fillStyle = '#f4c095';
  ink.textAlign = 'center';
  ink.font = 'bold 48px monospace';
  ink.fillText(lang === 'sv' ? 'O HELGA NATT' : 'OI JOULUYÖ', 540, 335, 720);
  ink.font = '40px monospace';
  ink.fillText(`${day}. ${copy[lang].day}`, 540, 417, 720);
  if (art?.complete && art.naturalWidth) {
    ink.drawImage(art, 339, 508, 402, 528);
  } else {
    ink.font = '164px Georgia';
    ink.fillText('✦', 540, 825);
  }
  ink.font = 'bold 82px Georgia';
  const words = title.split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && ink.measureText(candidate).width > 730) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  lines.push(line);
  const shown = lines.length > 4 ? [...lines.slice(0, 3), `${lines[3]}…`] : lines;
  shown.forEach((text, index) => ink.fillText(text, 540, 1180 + index * 91, 730));
  ink.fillStyle = '#ee2e31';
  ink.fillRect(474, 1610, 132, 8);
  return canvas.toDataURL('image/png');
}

function bindDoorSharing(day, title) {
  const t = copy[lang];
  const calendarTitle = lang === 'sv' ? 'O helga natt' : 'Oi jouluyö';
  const link = new URL('https://tdufva.github.io/oi-jouluyo/');
  link.searchParams.set('luukku', day);
  link.searchParams.set('lang', lang);
  const url = link.href;
  const subject = `${t.door} ${day} – ${title}`;
  const message = `${subject}\n${url}`;
  const event = `${calendarTitle} · ${subject}\n${day}. ${t.day}\n\n${url}`;
  const shareData = { title: subject, url };
  const linkField = $('door-share-url');
  const status = $('door-share-status');
  const shareApp = $('door-share-app');
  linkField.value = url;
  $('door-share-email').href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message.replace('\n', '\r\n'))}`;
  $('door-share-whatsapp').href = `https://wa.me/?text=${encodeURIComponent(message)}`;
  $('door-share-facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  shareApp.hidden = !navigator.share || (navigator.canShare && !navigator.canShare(shareData));
  shareApp.onclick = async () => {
    try {
      await navigator.share(shareData);
    } catch (error) {
      if (error.name !== 'AbortError') status.textContent = t.shareUnavailable;
    }
  };
  async function copyShareText(value, success, fallback) {
    try {
      await navigator.clipboard.writeText(value);
      status.textContent = success;
    } catch {
      fallback.hidden = false;
      fallback.value = value;
      fallback.focus();
      fallback.select();
      status.textContent = t.shareManual;
    }
  }
  $('door-share-copy').onclick = () => copyShareText(url, t.shareCopied, linkField);
  $('door-share-event').onclick = () => copyShareText(event, t.storyEventCopied, $('door-share-event-text'));
  const story = $('door-share-story');
  const preview = $('door-share-story-preview');
  const art = new Image();
  const instagram = story.closest('details');
  instagram.addEventListener('toggle', () => {
    if (instagram.open && !art.hasAttribute('src')) art.src = `assets/door-art/${doorContent.number(day)}.svg`;
  });
  story.onclick = () => {
    story.href = makeDoorStory(day, title, art);
    story.download = `${lang === 'sv' ? 'lucka' : 'luukku'}-${doorContent.number(day)}.png`;
    preview.querySelector('img').src = story.href;
    preview.hidden = false;
  };
}

function renderDoorEntry(day, entry) {
  const t = copy[lang];
  const chosen = entry[lang];
  const other = entry[lang === 'fi' ? 'sv' : 'fi'];
  const field = key => doorContent.text(chosen[key]) || doorContent.text(other[key]);
  const title = field('otsikko') || `${t.door} ${day}`;
  const author = doorContent.text(entry.tekija);
  const theme = field('teema');
  const image = doorContent.imageUrl(entry.kuva);
  const video = doorContent.youtubeId(entry.youtube);
  const music = doorContent.appleMusic(entry.appleMusic);
  const paragraphs = field('teksti').split(/\n\s*\n/).filter(Boolean)
    .map(text => `<p class="door-paragraph">${escapeHTML(text)}</p>`).join('');
  const finnaQuery = encodeURIComponent([title, author].filter(Boolean).join(' '));
  const art = image
    ? `<img class="modal-illustration" src="${escapeHTML(image)}" alt="${escapeHTML(field('kuvateksti'))}" decoding="async">`
    : `<div class="modal-cover">${coverArt(day - 1, false)}<span class="door-number" aria-hidden="true">${doorContent.number(day)}</span></div>`;

  $('modal-content').innerHTML = `
    <div class="modal-grid">
      <figure class="modal-art">${art}</figure>
      <div class="modal-text">
        <div class="modal-date">${day}. ${t.day}${theme ? ' · ' + escapeHTML(theme) : ''}</div>
        <h2 id="door-title">${escapeHTML(title)}</h2>
        ${author ? `<div class="author">${escapeHTML(author)}</div>` : ''}
        ${paragraphs}
        <div class="door-links">
          <a href="https://www.finna.fi/Search/Results?lookfor=${finnaQuery}&amp;type=AllFields&amp;lng=${lang}" target="_blank" rel="noopener noreferrer">${day === doorContent.total ? t.listen : t.link}</a>
          ${music ? `<a href="${escapeHTML(music)}" target="_blank" rel="noopener noreferrer">${t.music}</a>` : ''}
        </div>
      </div>
    </div>
    ${video ? `<section class="door-video">
      <div id="video-player" class="video-player"><button id="play-video" type="button">${t.play}</button></div>
      <a href="https://www.youtube.com/watch?v=${video}" target="_blank" rel="noopener noreferrer">${t.watch}</a>
    </section>` : ''}
    <details class="door-share">
      <summary>${t.share}</summary>
      <div class="door-share-panel">
        <input id="door-share-url" type="url" readonly aria-label="${t.shareLinkLabel}">
        <div class="door-share-actions">
          <button type="button" id="door-share-copy">${t.shareCopy}</button>
          <button type="button" id="door-share-app" hidden>${t.shareApp}</button>
          <a id="door-share-email">${t.shareEmail}</a>
          <a id="door-share-whatsapp" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a id="door-share-facebook" target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
        <p id="door-share-status" role="status"></p>
        <details class="door-share-instagram">
          <summary>Instagram</summary>
          <p>${t.storyHelp}</p>
          <div class="door-share-actions">
            <a id="door-share-story" href="#" download>${t.storyDownload}</a>
            <button type="button" id="door-share-event">${t.storyEvent}</button>
          </div>
          <textarea id="door-share-event-text" rows="4" aria-label="${t.storyEvent}" readonly hidden></textarea>
          <div id="door-share-story-preview" hidden>
            <p>${t.storySave}</p>
            <img alt="${t.storyImage}" width="180" height="320">
          </div>
        </details>
      </div>
    </details>
    <div class="modal-nav">
      <button id="prev" ${day === 1 ? 'disabled' : ''}>${t.previous}</button>
      <span>${day} / ${doorContent.total}</span>
      <button id="next" ${day === doorContent.total ? 'disabled' : ''}>${t.next}</button>
    </div>`;
  $('prev').onclick = () => show(day - 1);
  $('next').onclick = () => show(day + 1);
  bindDoorSharing(day, title);
  const play = $('play-video');
  if (play) play.onclick = () => {
    const frame = document.createElement('iframe');
    frame.title = `YouTube · ${title}`;
    frame.src = `https://www.youtube-nocookie.com/embed/${video}?autoplay=1`;
    frame.allow = 'autoplay; encrypted-media; picture-in-picture';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    $('video-player').replaceChildren(frame);
    frame.focus();
  };
}

async function show(day, content) {
  current = day;
  const revision = ++contentRevision;
  const t = copy[lang];
  const modal = $('book-modal');
  const target = $('modal-content');
  const unlocked = available(day);
  modal.dataset.effect = effectFor(day);
  modal.style.cssText = effectStyle(day);
  modal.classList.remove('revealing');
  target.innerHTML = unlocked
    ? `<p class="modal-date">${doorContent.number(day)} / ${doorContent.total}</p><p role="status">${t.loading}</p>`
    : `<p class="modal-date">${doorContent.number(day)} / ${doorContent.total}</p><h2 id="door-title">${t.locked} ${day}. ${t.day}</h2><p>${t.lockedText}</p>`;
  if (unlocked) modal.setAttribute('aria-label', `${t.door} ${day}`);
  else modal.setAttribute('aria-label', `${t.locked} ${day}. ${t.day}`);
  if (!modal.open) modal.showModal();
  if (!unlocked) return;

  const entry = await (content || loadDoor(day));
  if (revision !== contentRevision || !modal.open) return;
  if (!entry) {
    target.innerHTML = `<p role="status">${t.loadError}</p><button type="button" id="retry-door" class="door-retry">${t.retry}</button>`;
    $('retry-door').onclick = () => show(day);
    return;
  }
  if (!opened.includes(day)) {
    opened.push(day);
    save();
    document.querySelector(`.door[data-day="${day}"]`)?.classList.add('opened');
  }
  renderDoorEntry(day, entry);
  modal.setAttribute('aria-label', $('door-title').textContent);
  requestAnimationFrame(() => {
    if (revision === contentRevision && modal.open) modal.classList.add('revealing');
  });
}
document.querySelectorAll('.lang').forEach(button => button.onclick = () => {
  lang = button.dataset.lang; save(); render();
  if ($('book-modal').open) show(current);
});
$('preview').onchange = render;
$('close').onclick = () => $('book-modal').close();
$('book-modal').addEventListener('close', () => {
  if ($('book-modal').open) return;
  contentRevision++;
  $('modal-content').replaceChildren();
});
$('book-modal').addEventListener('click', e => {
  if (e.target !== $('book-modal')) return;
  const r = e.target.getBoundingClientRect();
  if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) e.target.close();
});
render();
const linkedDay = Number(query.get('luukku'));
if (Number.isInteger(linkedDay) && linkedDay >= 1 && linkedDay <= doorContent.total) show(linkedDay);
let calendarDate = new Date().toDateString();
setInterval(() => {
  const nextDate = new Date().toDateString();
  if (nextDate !== calendarDate) { calendarDate = nextDate; render(); }
}, 30000);
