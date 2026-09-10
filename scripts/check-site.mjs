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
  if ((html.match(/<h1\b/gi) || []).length !== 1) fail(file, 'must contain exactly one h1');
  if (duplicateIds.length) fail(file, `duplicate IDs: ${[...new Set(duplicateIds)].join(', ')}`);
  if (/A\+ Candidate|aplus-lab|APlus-Lab|220-1101|220-1102/i.test(html)) fail(file, 'contains stale A+ branding');

  for (const tag of ['main', 'nav', 'article']) {
    const opening = (html.match(new RegExp(`<${tag}\\b`, 'gi')) || []).length;
    const closing = (html.match(new RegExp(`</${tag}>`, 'gi')) || []).length;
    if (opening !== closing) fail(file, `unbalanced ${tag} tags (${opening} open, ${closing} close)`);
  }

  if (!/<link\s+rel=["']canonical["']/i.test(html)) fail(file, 'missing canonical URL');
  if (!/<link\s+rel=["']icon["']/i.test(html)) fail(file, 'missing favicon');
  if (!/<meta\s+property=["']og:title["']/i.test(html)) fail(file, 'missing Open Graph title');
  if (!/<meta\s+property=["']og:description["']/i.test(html)) fail(file, 'missing Open Graph description');
  if (!/<meta\s+property=["']og:url["']/i.test(html)) fail(file, 'missing Open Graph URL');
  if (!/<meta\s+name=["']twitter:card["']/i.test(html)) fail(file, 'missing social card metadata');
  if (!/<a\s+class=["']skip-link["']/i.test(html)) fail(file, 'missing keyboard skip link');

  for (const match of html.matchAll(/<button\b([^>]*)>/gi)) {
    if (!/\btype=["']button["']/i.test(match[1])) fail(file, 'button missing explicit type="button"');
  }

  for (const match of html.matchAll(/<img\b([^>]*)>/gi)) {
    if (!/\balt=["'][^"']*["']/i.test(match[1])) fail(file, 'image missing alt text');
  }

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

const polishCss = fs.readFileSync(path.join(root, 'assets', 'site-polish.css'), 'utf8');
if (!/:focus-visible/.test(polishCss)) fail('assets/site-polish.css', 'missing visible keyboard focus styles');
if (!/@media\s*\(prefers-reduced-motion:\s*reduce\)/.test(polishCss)) fail('assets/site-polish.css', 'missing reduced-motion support');

for (const file of ['index.html', 'about.html', 'projects.html', 'troubleshooter.html']) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  if (!/<nav\b[^>]*aria-label=/i.test(html)) fail(file, 'primary navigation is missing an accessible name');
  if (!/data-menu-toggle[^>]*aria-controls=["']primary-menu["'][^>]*aria-expanded=["']false["']/i.test(html)) {
    fail(file, 'mobile menu control is missing accessible state');
  }
}

const homeHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const requiredHeroDestination of [
  'projects.html',
  'assets/resume/Steve_Garnet_Resume.pdf',
  'https://www.linkedin.com/in/steve-garnet-502b10334/',
  'https://github.com/Steve-G-Git',
]) {
  const hero = homeHtml.match(/<div class=["']hero-ctas["']>([\s\S]*?)<\/div>/i)?.[1] || '';
  if (!hero.includes(`href="${requiredHeroDestination}"`)) {
    fail('index.html', `missing recruiter-critical hero link: ${requiredHeroDestination}`);
  }
}

if (!/ENTRY-LEVEL IT SUPPORT[\s\S]*HELP DESK[\s\S]*JUNIOR NETWORKING/.test(homeHtml)) {
  fail('index.html', 'target roles are not explicit in the first view');
}

const projectsHtml = fs.readFileSync(path.join(root, 'projects.html'), 'utf8');
const projectAcceptanceChecks = [
  ['project problems', /<strong>Problem:<\/strong>/g, 5],
  ['personal contribution sections', /<dt>What I (?:configured|built|investigated)<\/dt>/g, 5],
  ['testing and proof sections', /<dt>Testing and proof<\/dt>/g, 5],
  ['problem and correction sections', /<dt>Problem and correction<\/dt>/g, 5],
  ['next-improvement sections', /<dt>What I would improve next<\/dt>/g, 5],
];

for (const [label, pattern, expected] of projectAcceptanceChecks) {
  const count = (projectsHtml.match(pattern) || []).length;
  if (count !== expected) fail('projects.html', `${label}: expected ${expected}, found ${count}`);
}

for (const projectType of ['INFRASTRUCTURE LAB', 'STUDY APPLICATION', 'BROWSER STUDY TOOL', 'TECHNICAL CASE STUDY']) {
  if (!projectsHtml.includes(projectType)) fail('projects.html', `missing project type: ${projectType}`);
}

const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
for (const label of ['**Type:**', '**Problem:**', '**Verification:**', '**Problem and correction:**', '**Next improvement:**']) {
  const count = readme.split(label).length - 1;
  if (count !== 5) fail('README.md', `${label} expected 5, found ${count}`);
}

if (failures.length) {
  console.error(`Site checks failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Site checks passed for ${pages.length} HTML pages.`);
