import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = process.cwd();
const pages = fs.readdirSync(root).filter((name) => name.endsWith('.html')).sort();
const failures = [];

function fail(file, message) {
  failures.push(`${file}: ${message}`);
}

function idsIn(html) {
  return [...html.matchAll(/\sid=["']([^"']+)["']/gi)].map((match) => match[1]);
}

for (const file of pages) {
  const filePath = path.join(root, file);
  const html = fs.readFileSync(filePath, 'utf8');
  const ids = idsIn(html);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);

  if (!/<html\s+lang=["'][^"']+["']/i.test(html)) fail(file, 'missing document language');
  if (!/<meta\s+name=["']viewport["']/i.test(html)) fail(file, 'missing viewport metadata');
  if (!/<meta\s+name=["']description["']/i.test(html)) fail(file, 'missing page description');
  if (!/<title>[^<]+<\/title>/i.test(html)) fail(file, 'missing page title');
  if (!/<main\b/i.test(html)) fail(file, 'missing main content landmark');
  if ((html.match(/<h1\b/gi) || []).length > 1) fail(file, 'contains more than one h1');
  if (duplicateIds.length) fail(file, `duplicate IDs: ${[...new Set(duplicateIds)].join(', ')}`);
  if (/A\+ Candidate|aplus-lab|APlus-Lab|220-1101|220-1102/i.test(html)) fail(file, 'contains stale A+ branding');

  for (const tag of ['main', 'nav', 'article']) {
    const opening = (html.match(new RegExp(`<${tag}\\b`, 'gi')) || []).length;
    const closing = (html.match(new RegExp(`</${tag}>`, 'gi')) || []).length;
    if (opening !== closing) fail(file, `unbalanced ${tag} tags (${opening} open, ${closing} close)`);
  }

  if (!/<link\s+rel=["']canonical["']/i.test(html)) fail(file, 'missing canonical URL');
  if (!/<link\s+rel=["']icon["']/i.test(html)) fail(file, 'missing favicon');

  for (const match of html.matchAll(/\s(?:href|src)=["']([^"']+)["']/gi)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(reference)) continue;

    const [relativePath, fragment] = reference.split('#');
    const targetPath = relativePath
      ? path.resolve(path.dirname(filePath), relativePath)
      : filePath;

    if (!fs.existsSync(targetPath)) {
      fail(file, `missing local target: ${reference}`);
      continue;
    }

    if (fragment && targetPath.endsWith('.html')) {
      const targetHtml = fs.readFileSync(targetPath, 'utf8');
      if (!idsIn(targetHtml).includes(fragment)) fail(file, `missing fragment target: ${reference}`);
    }
  }

  for (const match of html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      new vm.Script(match[1], { filename: file });
    } catch (error) {
      fail(file, `inline JavaScript syntax error: ${error.message}`);
    }
  }
}

if (failures.length) {
  console.error(`Site checks failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Site checks passed for ${pages.length} HTML pages.`);
