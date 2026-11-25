import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

let now = 0, sequence = 0, paused = false;
const timers = new Map();
const figure = () => ({ dataset: {}, style: { setProperty() {} }, dispatchEvent() {} });
const jussi = figure(), mariah = figure();
const stage = { dataset: { inView: 'true' }, querySelector: name => name.endsWith('jussi') ? jussi : mariah };
const motion = { matches: false, addEventListener() {} };
const context = vm.createContext({
  performance: { now: () => now }, Event: class { constructor(type) { this.type = type; } },
  setTimeout: (callback, delay) => { const id = ++sequence; timers.set(id, { callback, delay }); return id; },
  clearTimeout: id => timers.delete(id)
});
vm.runInContext(await readFile(new URL('../bauhaus.js', import.meta.url), 'utf8'), context);
const sync = context.scheduleBookChoreography(stage, motion, () => paused);
assert.equal(jussi.dataset.activity, 'sniff');
assert.equal(mariah.dataset.activity, 'sit');
sync();
assert.equal(timers.size, 1, 'Both dogs must share one scheduler timer');
for (const action of ['sit', 'lie', 'sleep', 'run', 'pee', 'howl', 'happy']) {
  context.performDogActivity(jussi, action);
  assert.equal(jussi.dataset.activity, action);
  assert.equal(timers.size, 1);
}
context.performDogActivity(jussi, 'unknown');
assert.equal(jussi.dataset.activity, 'happy');
paused = true; sync();
assert.equal(timers.size, 0, 'No scheduling while the page/modal pauses the scene');
context.performDogActivity(mariah, 'sleep');
assert.equal(mariah.dataset.emotion, 'asleep');
assert.equal(timers.size, 0);
paused = false; motion.matches = true; sync();
context.performDogActivity(jussi, 'sit');
assert.equal(timers.size, 0, 'Reduced motion must permit static poses without background timers');
motion.matches = false; stage.dataset.inView = 'false'; sync();
assert.equal(timers.size, 0, 'No scheduling outside the viewport');
stage.dataset.inView = 'true'; sync();
assert.equal(timers.size, 1);
now = 100_000;
const timer = [...timers.values()][0]; timers.clear(); timer.callback();
assert.equal(timers.size, 1, 'Resuming after a long pause must not create parallel timers');
for (const who of ['jussi', 'mariah']) {
  const svg = context.makeBookPerformer(who);
  for (const part of ['dog-torso', 'dog-head', 'dog-front', 'dog-hind', 'dog-tail', 'dog-dream', 'dog-pee', 'dog-howl-rings']) assert.ok(svg.includes(part));
  assert.ok((svg.match(/<(?:path|g|ellipse|circle|text)\b/g) || []).length < 100, 'Keep each dog a small SVG rig');
}
assert.notEqual(context.makeBookPerformer('jussi'), context.makeBookPerformer('mariah'));
console.log('Dog actions, different rigs, single timer, pause/resume, offscreen and reduced-motion behavior verified.');
