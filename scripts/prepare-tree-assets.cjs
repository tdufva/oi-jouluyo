const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(root, 'bauhaus.js'), 'utf8'), context);
for (let seed = 1; seed <= 38; seed++) {
  const markup = vm.runInContext(`makeTreeIllustration(${seed},0,100,0,1)`, context);
  let svg = markup.slice(markup.indexOf('<svg'), markup.lastIndexOf('</svg>') + 6);
  svg = svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
  svg = svg.replace('<defs>', '<defs><pattern id="riso-dots" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-16)"><circle cx="2" cy="2" r=".8" fill="#071e22"/></pattern>');
  fs.writeFileSync(path.join(root, `assets/trees/${seed}.svg`), svg);
}
console.log('Prepared 38 static tree illustrations.');
