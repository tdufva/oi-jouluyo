const editor = document.getElementById('editor');
const dayPicker = document.getElementById('day');
const output = document.getElementById('output');
const loadStatus = document.getElementById('load-status');
const saveStatus = document.getElementById('save-status');
const imageFile = document.getElementById('image-file');
const imagePreview = document.getElementById('image-preview');
const drafts = new Map();
const fields = ['otsikko', 'teema', 'teksti', 'kuvateksti'];
let day = 1;
let loadRevision = 0;
let localImage;

document.getElementById('languages').innerHTML = [
  ['fi', 'Suomi', 'Otsikko', 'Teema', 'Luukun teksti', 'Kuvan kuvaus'],
  ['sv', 'Svenska', 'Rubrik', 'Tema', 'Luckans text', 'Bildbeskrivning'],
].map(([locale, name, title, theme, text, alt]) => `
  <fieldset lang="${locale}">
    <legend>${name}</legend>
    <label>${title}<input name="${locale}.otsikko"></label>
    <label>${theme}<input name="${locale}.teema"></label>
    <label>${text}<textarea name="${locale}.teksti" rows="7"></textarea></label>
    <label>${alt}<input name="${locale}.kuvateksti"></label>
  </fieldset>
`).join('');

for (let i = 1; i <= doorContent.total; i++) dayPicker.add(new Option(doorContent.number(i), i));
document.getElementById('upload-image').href = `${doorContent.repo}/upload/main/assets/luukut`;

function readFields() {
  const data = new FormData(editor);
  const read = name => doorContent.text(data.get(name));
  const localized = locale => Object.fromEntries(fields.map(key => [key, read(`${locale}.${key}`)]));
  return {
    fi: localized('fi'),
    sv: localized('sv'),
    tekija: read('tekija'),
    kuva: read('kuva'),
    youtube: read('youtube'),
    appleMusic: read('appleMusic'),
  };
}

function showImage(url) {
  imagePreview.hidden = !url;
  if (url) imagePreview.src = url;
  else imagePreview.removeAttribute('src');
}

function releaseLocalImage() {
  if (localImage) URL.revokeObjectURL(localImage);
  localImage = undefined;
}

function updateOutput({ preservePreview = false } = {}) {
  const entry = readFields();
  drafts.set(day, entry);
  output.value = JSON.stringify(entry, null, 2) + '\n';
  if (!preservePreview) showImage(localImage || doorContent.imageUrl(entry.kuva));
  const errors = [];
  if (entry.kuva && !doorContent.imageUrl(entry.kuva)) errors.push('Tarkista kuvan osoite tai assets/-polku.');
  if (entry.youtube && !doorContent.youtubeId(entry.youtube)) errors.push('Tarkista YouTube-osoite tai videon tunniste.');
  if (entry.appleMusic && !doorContent.appleMusic(entry.appleMusic)) errors.push('Tarkista Apple Music -osoite.');
  saveStatus.textContent = errors.join(' ');
  document.getElementById('copy-file').disabled = errors.length > 0;
  document.getElementById('download-file').disabled = errors.length > 0;
}

async function selectDay() {
  const revision = ++loadRevision;
  day = Number(dayPicker.value);
  const filename = doorContent.path(day);
  editor.hidden = true;
  loadStatus.textContent = 'Ladataan luukkua…';
  releaseLocalImage();
  try {
    let entry = drafts.get(day);
    if (!entry) {
      const response = await fetch(filename, { cache: 'no-cache' });
      if (!response.ok) throw new Error('Missing entry');
      entry = await response.json();
    }
    if (revision !== loadRevision) return;
    editor.reset();
    for (const locale of ['fi', 'sv']) {
      for (const field of fields) editor.elements.namedItem(`${locale}.${field}`).value = entry[locale]?.[field] || '';
    }
    for (const field of ['tekija', 'kuva', 'youtube', 'appleMusic']) editor.elements.namedItem(field).value = entry[field] || '';
    document.getElementById('edit-file').href = `${doorContent.repo}/edit/main/${filename}`;
    document.getElementById('preview-link').href = `./?esikatselu=1&luukku=${day}`;
    editor.hidden = false;
    loadStatus.textContent = filename;
    updateOutput();
  } catch {
    if (revision === loadRevision) loadStatus.textContent = 'Luukkua ei saatu ladattua. Päivitä sivu ja yritä uudelleen.';
  }
}

editor.addEventListener('submit', event => event.preventDefault());
editor.addEventListener('input', event => {
  if (event.target === imageFile) return;
  if (event.target.name === 'kuva') {
    releaseLocalImage();
    imageFile.value = '';
  }
  updateOutput({ preservePreview: event.target.name !== 'kuva' });
});
imageFile.addEventListener('change', () => {
  releaseLocalImage();
  const file = imageFile.files[0];
  if (file) {
    localImage = URL.createObjectURL(file);
    editor.elements.namedItem('kuva').value = `assets/luukut/${encodeURIComponent(file.name)}`;
  }
  updateOutput();
});
document.getElementById('copy-file').onclick = async () => {
  try {
    await navigator.clipboard.writeText(output.value);
    saveStatus.textContent = 'Sisältö kopioitu. Liitä se GitHubin editoriin.';
  } catch {
    output.focus();
    output.select();
    saveStatus.textContent = 'Sisältö valittu. Kopioi se näppäimillä ⌘C tai Ctrl+C.';
  }
};
document.getElementById('download-file').onclick = () => {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([output.value], { type: 'application/json' }));
  link.download = `${doorContent.number(day)}.json`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
};
dayPicker.onchange = selectDay;
selectDay();
