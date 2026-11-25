const $ = id => document.getElementById(id);
const form = $('editor');
const fields = ['otsikko', 'teema', 'teksti', 'kuvateksti'];
const titles = ['Otsikko', 'Teema', 'Luukun teksti', 'Kuvan kuvaus'];
const storagePrefix = 'ohelga-editor-v3:';
const records = new Map();
let record, bridge, currentDay = 1, loadRevision = 0;
let saveTimer, translationTimer, previewTimer;
let translating = false, publishing = false, uploading = false, previewLanguage = 'fi';
let localImage;
const otherLanguage = lang => lang === 'fi' ? 'sv' : 'fi';
const languageName = lang => lang === 'fi' ? 'suomi' : 'ruotsi';
const signature = value => JSON.stringify(fields.map(key => value[key] || ''));
const field = name => form.elements.namedItem(name);
const readLocale = prefix => Object.fromEntries(fields.map(key => [key, field(prefix + '.' + key).value.trim()]));
const source = () => readLocale('source');
const isTranslated = () => record?.state.translatedFrom === signature(source());

for (const prefix of ['source', 'target']) {
  const parent = $(prefix + '-fields');
  fields.forEach((key, index) => {
    const label = document.createElement('label');
    label.textContent = titles[index];
    const input = document.createElement(key === 'teksti' ? 'textarea' : 'input');
    input.name = prefix + '.' + key;
    if (key === 'teksti') input.rows = 8;
    label.append(input);
    parent.append(label);
  });
}
for (let day = 1; day <= doorContent.total; day++) $('day').add(new Option(doorContent.number(day), day));
$('upload-image').href = doorContent.repo + '/upload/main/assets/luukut';

async function api(path, body) {
  const response = await fetch('/editor-api/' + path, {
    method: body === undefined ? 'GET' : 'POST', cache: 'no-store',
    headers: body === undefined ? {} : {'Content-Type': 'application/json', 'X-Editor-Token': bridge.token},
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Yhteys ei onnistunut.');
  return result;
}

function capture() {
  if (!record) return;
  const state = record.state;
  state.entry[state.language] = source();
  state.entry[otherLanguage(state.language)] = readLocale('target');
  for (const key of ['tekija', 'kuva', 'youtube', 'appleMusic']) state.entry[key] = field(key).value.trim();
  state.mode = $('source-language').value;
  state.autoTranslate = $('auto-translate').checked;
  state.updatedAt = Date.now();
}

function saveBrowser(item = record) {
  try {
    localStorage.setItem(storagePrefix + item.day, JSON.stringify(item.state));
    $('draft-status').textContent = bridge ? 'Tallennetaan…' : 'Luonnos tallessa tässä selaimessa';
  } catch {
    $('draft-status').textContent = 'Selaintallennus ei onnistunut. Lataa JSON-varmuuskopio.';
  }
}

async function saveDisk(item = record) {
  clearTimeout(saveTimer);
  if (!bridge || !item || item.conflict) return;
  if (item.saving) { item.saveAgain = true; return item.saving; }
  const snapshot = JSON.parse(JSON.stringify(item.state));
  item.saving = api('draft', {day: item.day, version: item.version, state: snapshot})
    .then(result => {
      item.version = result.version;
      if (record === item) $('draft-status').textContent = 'Luonnos tallessa Macilla';
    }).catch(error => {
      if (record === item) $('draft-status').textContent = error.message;
      if (error.message.includes('toisessa välilehdessä')) item.conflict = true;
    }).finally(() => {
      item.saving = null;
      if (item.saveAgain) { item.saveAgain = false; return saveDisk(item); }
    });
  return item.saving;
}

function persist() {
  capture();
  saveBrowser();
  clearTimeout(saveTimer);
  const item = record;
  saveTimer = setTimeout(() => saveDisk(item), 450);
  updateControls();
  clearTimeout(previewTimer);
  previewTimer = setTimeout(renderPreview, 140);
}

function fillLocale(prefix, value) {
  for (const key of fields) field(prefix + '.' + key).value = value?.[key] || '';
}

function renderFields() {
  const state = record.state;
  fillLocale('source', state.entry[state.language]);
  fillLocale('target', state.entry[otherLanguage(state.language)]);
  for (const key of ['tekija', 'kuva', 'youtube', 'appleMusic']) field(key).value = state.entry[key] || '';
  $('source-language').value = state.mode || 'auto';
  $('auto-translate').checked = state.autoTranslate !== false;
  updateLanguageLabel();
  updateControls();
  renderPreview();
}

function updateLanguageLabel(pending = false) {
  $('language-status').textContent = pending && $('source-language').value === 'auto'
    ? 'Kieli tunnistetaan käännöksessä…'
    : 'Kirjoituskieli: ' + languageName(record.state.language);
  $('translation-heading').textContent = 'Tarkista käännös · ' + languageName(otherLanguage(record.state.language));
  for (const prefix of ['source', 'target']) {
    $(prefix + '-fields').lang = prefix === 'source' ? record.state.language : otherLanguage(record.state.language);
  }
}

function validationErrors() {
  const entry = record.state.entry;
  const errors = [];
  if (entry.kuva && !doorContent.imageUrl(entry.kuva)) errors.push('Tarkista kuvan osoite.');
  if (entry.youtube && !doorContent.youtubeId(entry.youtube)) errors.push('Tarkista YouTube-linkki.');
  if (entry.appleMusic && !doorContent.appleMusic(entry.appleMusic)) errors.push('Tarkista Apple Music -linkki.');
  if (!entry.fi?.otsikko || !entry.sv?.otsikko || !entry.fi?.teksti || !entry.sv?.teksti) errors.push('Julkaisuun tarvitaan otsikko ja teksti molemmilla kielillä.');
  return errors;
}

function updateControls() {
  if (!record) return;
  $('output').value = JSON.stringify(record.state.entry, null, 2) + '\n';
  const errors = validationErrors();
  $('validation-status').textContent = errors.join(' ');
  $('publish').disabled = !bridge?.github || !record.state.baseSha || record.conflict || errors.length > 0 || !isTranslated() || translating || publishing || uploading;
  $('translate').disabled = !bridge?.codex || translating || uploading || !source().teksti && !source().otsikko;
  $('translate').textContent = translating ? 'Käännetään…' : 'Käännä nyt';
  $('restore').disabled = !bridge || translating || publishing || uploading;
}

function appendText(parent, tag, text, className) {
  const node = document.createElement(tag);
  node.textContent = text;
  if (className) node.className = className;
  parent.append(node);
  return node;
}

function renderPreview() {
  if (!record) return;
  const entry = record.state.entry;
  const localized = entry[previewLanguage] || {};
  const parent = $('live-preview');
  parent.replaceChildren();
  parent.lang = previewLanguage;
  const pending = record.state.image;
  const imageUrl = pending?.path === entry.kuva ? pending.preview : doorContent.imageUrl(entry.kuva);
  const image = document.createElement('img');
  image.src = imageUrl || 'assets/door-art/' + doorContent.number(record.day) + '.svg';
  image.alt = localized.kuvateksti || '';
  image.className = imageUrl ? 'preview-image' : 'preview-cover';
  parent.append(image);
  appendText(parent, 'p', record.day + '. ' + (previewLanguage === 'fi' ? 'joulukuuta' : 'december') + (localized.teema ? ' · ' + localized.teema : ''), 'preview-date');
  appendText(parent, 'h2', localized.otsikko || 'Luukun otsikko');
  if (entry.tekija) appendText(parent, 'p', entry.tekija, 'preview-author');
  for (const paragraph of (localized.teksti || '').split(/\n\s*\n/).filter(Boolean)) appendText(parent, 'p', paragraph);
  if (entry.appleMusic && doorContent.appleMusic(entry.appleMusic)) {
    const link = appendText(parent, 'a', 'Apple Music');
    link.href = doorContent.appleMusic(entry.appleMusic); link.target = '_blank'; link.rel = 'noopener noreferrer';
  }
  const id = doorContent.youtubeId(entry.youtube);
  if (id) {
    const video = document.createElement('div'); video.className = 'preview-video';
    const button = appendText(video, 'button', 'Toista YouTube-video'); button.type = 'button';
    button.onclick = () => {
      const frame = document.createElement('iframe');
      frame.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1';
      frame.title = 'YouTube · ' + localized.otsikko;
      frame.allow = 'autoplay; encrypted-media; picture-in-picture'; frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin'; video.replaceChildren(frame);
    };
    parent.append(video);
  }
  for (const button of document.querySelectorAll('[data-preview]')) button.setAttribute('aria-pressed', String(button.dataset.preview === previewLanguage));
}

async function selectDay() {
  clearTimeout(translationTimer);
  if (record) { capture(); saveBrowser(); await saveDisk(); }
  const revision = ++loadRevision;
  const day = Number($('day').value);
  currentDay = day;
  form.hidden = true;
  $('load-status').textContent = 'Ladataan…';
  $('publish-status').textContent = '';
  $('translation-status').textContent = '';
  $('published-preview').hidden = true;
  try {
    let remote, saved;
    if (bridge) {
      remote = await api('door/' + day);
      saved = remote.draft;
    } else {
      const response = await fetch(doorContent.path(day), {cache: 'no-cache'});
      if (!response.ok) throw new Error('Luukkua ei saatu ladattua.');
      remote = {entry: await response.json()};
    }
    if (revision !== loadRevision) return;
    let browser;
    try { browser = JSON.parse(localStorage.getItem(storagePrefix + day) || 'null'); } catch {}
    const state = browser?.entry && (browser.updatedAt || 0) > (saved?.state.updatedAt || 0) ? browser : saved?.state;
    const fallback = {entry: remote.entry, language: 'fi', mode: 'auto', autoTranslate: true, updatedAt: 0, baseSha: remote.sha};
    const chosen = state?.entry?.fi && state.entry.sv ? state : fallback;
    if (!['fi', 'sv'].includes(chosen.language)) chosen.language = 'fi';
    if (chosen.image?.preview?.startsWith('blob:')) delete chosen.image;
    if (!state) chosen.translatedFrom = signature(chosen.entry.fi);
    record = {day, state: chosen, version: saved?.version || null, editRevision: 0};
    if (!record.state.baseSha) record.state.baseSha = remote.sha;
    records.set(day, record);
    record.conflict = !!remote.sha && record.state.baseSha !== remote.sha;
    $('draft-status').textContent = record.conflict ? 'GitHubissa on uudempi versio. Luonnostasi ei julkaista sen päälle.' : state ? 'Luonnos palautettu' : 'Julkaistu sisältö ladattu';
    $('edit-file').href = doorContent.repo + '/edit/main/' + doorContent.path(day);
    $('load-status').textContent = 'Luukku ' + doorContent.number(day);
    form.hidden = false;
    renderFields();
    if (!isTranslated()) {
      $('translation-status').textContent = 'Luonnoksen teksti on muuttunut. Käännös päivitetään ennen julkaisua.';
      queueTranslation();
    }
  } catch (error) {
    if (revision === loadRevision) $('load-status').textContent = error.message;
  }
}

function queueTranslation() {
  clearTimeout(translationTimer);
  if (bridge?.codex && $('auto-translate').checked && !translating && !isTranslated()) translationTimer = setTimeout(translateNow, 2500);
}

async function translateNow() {
  clearTimeout(translationTimer);
  if (!bridge?.codex || translating || !record) return;
  capture();
  const item = record, original = source(), revision = item.editRevision;
  if (!original.otsikko && !original.teksti) return;
  const mode = $('source-language').value;
  translating = true;
  $('translation-status').textContent = 'Codex tunnistaa kielen ja kääntää tekstin…';
  updateControls();
  let completed = false;
  try {
    const result = await api('translate', {source: original, language: mode});
    if (record !== item || revision !== item.editRevision || signature(source()) !== signature(original)) return;
    item.state.language = result.language;
    item.state.entry[result.language] = original;
    item.state.entry[otherLanguage(result.language)] = result.translation;
    item.state.translatedFrom = signature(original);
    fillLocale('target', result.translation);
    updateLanguageLabel();
    $('translation-status').textContent = 'Tunnistettu ' + languageName(result.language) + '. Käännös valmis – voit tarkistaa ja muokata sitä.';
    persist();
    completed = true;
  } catch (error) {
    if (record === item) $('translation-status').textContent = error.message + ' Voit yrittää painikkeesta uudelleen.';
    // Do not loop on an authentication error or unavailable service.
    completed = true;
  } finally {
    translating = false;
    updateControls();
    if (!completed) queueTranslation();
  }
}

form.addEventListener('submit', event => event.preventDefault());
form.addEventListener('input', event => {
  if (!record || event.target === $('image-file') || event.target === $('source-language')) return;
  const name = event.target.name || '';
  if (name.startsWith('source.')) {
    record.editRevision++; updateLanguageLabel(true);
    if (!translating) $('translation-status').textContent = 'Teksti on muuttunut. Käännös päivitetään ennen julkaisua.';
  }
  if (name.startsWith('target.')) { record.editRevision++; record.state.translatedFrom = signature(source()); }
  persist();
  if (name.startsWith('source.') || event.target === $('auto-translate')) queueTranslation();
});
$('source-language').onchange = () => {
  capture();
  record.editRevision++;
  record.state.translatedFrom = '';
  updateLanguageLabel(true); persist(); queueTranslation();
};
$('translate').onclick = translateNow;
$('day').onchange = selectDay;
for (const button of document.querySelectorAll('[data-preview]')) button.onclick = () => { previewLanguage = button.dataset.preview; renderPreview(); };

$('image-file').onchange = async () => {
  const file = $('image-file').files[0];
  if (!file) return;
  if (file.size > 8 * 1024 * 1024) { $('image-help').textContent = 'Valitse enintään 8 Mt:n kuva.'; return; }
  const item = record;
  uploading = true; updateControls();
  $('image-help').textContent = 'Tallennetaan kuvaa luonnokseen…';
  try {
    if (bridge) {
      const data = await new Promise((resolve, reject) => {
        const reader = new FileReader(); reader.onerror = reject;
        reader.onload = () => resolve(reader.result.split(',')[1]); reader.readAsDataURL(file);
      });
      const image = await api('image', {data});
      if (record !== item) return;
      record.state.image = image;
      field('kuva').value = image.path;
      $('image-help').textContent = 'Kuva tallessa Macilla. Se julkaistaan tekstin kanssa.';
    } else {
      if (localImage) URL.revokeObjectURL(localImage);
      localImage = URL.createObjectURL(file);
      field('kuva').value = 'assets/luukut/' + encodeURIComponent(file.name);
      record.state.image = {path: field('kuva').value, preview: localImage};
      $('image-help').textContent = 'Verkkoversio näyttää vain esikatselun. Lataa sama kuva GitHubiin tai avaa Mac-muokkain.';
    }
    persist(); renderPreview();
  } catch (error) { $('image-help').textContent = error.message || 'Kuvaa ei voitu lukea.'; }
  finally { uploading = false; updateControls(); }
};

$('publish').onclick = async () => {
  if ($('publish').disabled) return;
  capture();
  const item = record, snapshot = JSON.parse(JSON.stringify(record.state.entry));
  const originalRevision = record.editRevision;
  publishing = true; updateControls();
  $('publish-status').textContent = 'Siirretään tekstit ja kuva GitHubiin…';
  try {
    await saveDisk(item);
    const result = await api('publish', {day: item.day, entry: snapshot, sha: item.state.baseSha});
    item.state.baseSha = result.sha;
    saveBrowser(item); await saveDisk(item);
    if (record === item) {
      $('publish-status').textContent = 'Tallennettu GitHubiin. Sivusto päivittyy GitHub Pagesin julkaisun valmistuttua.' + (originalRevision !== item.editRevision ? ' Uudemmat tekstimuutoksesi ovat vielä luonnoksena.' : '');
      $('published-preview').href = result.url; $('published-preview').hidden = false;
    }
  } catch (error) { if (record === item) $('publish-status').textContent = error.message; }
  finally { publishing = false; updateControls(); }
};
$('copy-file').onclick = async () => {
  capture(); updateControls();
  try { await navigator.clipboard.writeText($('output').value); $('save-status').textContent = 'Sisältö kopioitu.'; }
  catch { $('output').focus(); $('output').select(); $('save-status').textContent = 'Kopioi valittu sisältö näppäimillä ⌘C tai Ctrl+C.'; }
};
$('restore').onclick = async () => {
  capture(); saveBrowser();
  const item = record;
  $('restore').disabled = true;
  try {
    await saveDisk(item);
    const restored = await api('restore', {day: item.day, version: item.version});
    if (record !== item) return;
    record = {day: item.day, state: restored.state, version: restored.version, editRevision: 0};
    saveBrowser(); renderFields();
    $('translation-status').textContent = '';
    $('draft-status').textContent = 'Julkaistu sisältö palautettu. Aiempi luonnos on Macin varmuuskopiossa.';
  } catch (error) { $('save-status').textContent = error.message; }
  finally { updateControls(); }
};
$('download-file').onclick = () => {
  capture(); updateControls();
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([$('output').value], {type: 'application/json'}));
  link.download = doorContent.number(record.day) + '.json'; link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
};
window.addEventListener('pagehide', () => {
  if (!record) return;
  capture(); saveBrowser();
  if (bridge && !record.saving && !record.conflict) fetch('/editor-api/draft', {
    method: 'POST', keepalive: true,
    headers: {'Content-Type': 'application/json', 'X-Editor-Token': bridge.token},
    body: JSON.stringify({day: record.day, state: record.state, version: record.version})
  }).catch(() => {});
});
window.addEventListener('storage', event => {
  if (event.key === storagePrefix + currentDay) $('draft-status').textContent = 'Tätä luukkua muokataan myös toisessa välilehdessä. Tarkista luonnos ennen jatkamista.';
});

(async () => {
  if (['localhost', '127.0.0.1'].includes(location.hostname)) {
    try { bridge = await api('status'); } catch {}
  }
  $('connection').textContent = bridge
    ? 'Macin muokkain käytössä · luonnokset, Codex-käännös ja GitHub-julkaisu'
    : 'Verkkoversio · luonnokset tallentuvat selaimeen. Avaa Mac-muokkain automaattikäännöstä ja suoraa julkaisua varten.';
  $('connection').dataset.connected = String(!!bridge);
  $('local-help').hidden = !!bridge;
  if (!bridge) $('image-help').textContent = 'Verkkoversiossa valittu kuva näkyy esikatselussa. Lataa sama tiedosto GitHubiin lomakkeen lopun linkistä.';
  await selectDay();
})();
