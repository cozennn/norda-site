#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://norda-site.pages.dev';
const projectsSource = fs.readFileSync(path.join(ROOT, 'projects.js'), 'utf8');
const sandbox = { window: {} };
vm.runInNewContext(projectsSource, sandbox, { timeout: 1000 });
const projects = sandbox.window.NORDA_PROJECTS;
if (!Array.isArray(projects) || projects.length === 0) {
  throw new Error('projects.js did not provide NORDA_PROJECTS');
}
const template = fs.readFileSync(path.join(ROOT, 'project.html'), 'utf8');
const outputDir = path.join(ROOT, 'projects');
fs.mkdirSync(outputDir, { recursive: true });

function escapeHtml(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
  });
}
function setMeta(html, attribute, key, content) {
  const pattern = new RegExp('<meta\\s+' + attribute + '="' + key + '"[^>]*>', 'i');
  const tag = '<meta ' + attribute + '="' + escapeHtml(key) + '" content="' + escapeHtml(content) + '">';
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace(/<\/head>/i, tag + '\n</head>');
}
function setCanonical(html, url) {
  const tag = '<link rel="canonical" href="' + escapeHtml(url) + '">';
  const pattern = /<link\b(?=[^>]*\brel="canonical")[^>]*>/i;
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace(/<\/head>/i, tag + '\n</head>');
}
function insertInHead(html, addition) {
  if (!/<\/head>/i.test(html)) throw new Error('project.html is missing </head>');
  return html.replace(/<\/head>/i, addition + '\n</head>');
}
function renderBody(project) {
  const copy = {
    back: 'العودة إلى المعرض', label: 'مشروع تجريبي من نوردا', description: 'وصف الموقع',
    request: 'طلب العميل', requestNote: 'طلب تخيلي أُعدّ لهذا النموذج، ولا يمثّل عميلًا أو مشروعًا حقيقيًا.',
    result: 'النتيجة', excerpts: 'مقتطفات من الموقع', demo: 'لايف ديمو',
    demoHint: 'سيُتاح العرض المباشر لاحقًا', ask: 'هل تريد موقعًا بفكرة مشابهة؟',
    contact: 'ناقش مشروعك معنا', placeholder: 'صورة مؤقتة · 800 × 600',
    excerptFallback: 'مقتطف تجريبي من تصميم الموقع.'
  };
  const title = escapeHtml(project.title);
  const excerpts = Array.isArray(project.excerpts) ? project.excerpts : [];
  const excerptHtml = excerpts.map(function (item, index) {
    const image = item.image || '';
    const placeholder = !image || image === project.image;
    const caption = item.caption || copy.excerptFallback;
    const alt = item.alt || project.title + ' — ' + caption;
    const visual = placeholder
      ? '<div class="project-excerpt-image project-excerpt-placeholder" role="img" aria-label="' + escapeHtml(copy.placeholder) + '" style="--shot-hue:' + ((index * 53 + project.title.length * 19) % 360) + '"><div class="project-shot-window"><span class="project-shot-dots"><i></i><i></i><i></i></span><span class="project-shot-content"><span class="project-shot-lines"><i></i><i></i><i></i><b></b></span><span class="project-shot-art"></span></span></div><small class="project-shot-label">' + escapeHtml(copy.placeholder) + '</small></div>'
      : '<img class="project-excerpt-image" src="' + escapeHtml(image) + '" alt="' + escapeHtml(alt) + '" loading="lazy" width="1280" height="769">';
    return '<article class="project-excerpt' + (index % 2 ? ' is-reversed' : '') + '">' + visual + '<div class="project-excerpt-copy" dir="rtl"><span>' + String(index + 1).padStart(2, '0') + '</span><h3>' + escapeHtml(caption) + '</h3></div></article>';
  }).join('');
  return '<section class="project-hero"><div class="w"><a class="project-back" href="portfolio.html">← ' + copy.back + '</a><span class="project-kind">' + copy.label + '</span><div class="project-heading"><p class="project-type">' + escapeHtml(project.type) + '</p><h1>' + title + '</h1><h2>' + copy.description + '</h2><p class="project-summary">' + escapeHtml(project.siteDescription || project.summary) + '</p><button class="project-demo-button" type="button" disabled aria-disabled="true"><span>' + copy.demo + '</span><small>' + copy.demoHint + '</small></button></div></div></section>' +
    '<section class="project-story"><div class="w"><div class="project-overview"><article><h2>' + copy.request + '</h2><p>' + escapeHtml(project.clientRequest || project.brief) + '</p><p class="project-disclosure">' + copy.requestNote + '</p></article><article><h2>' + copy.result + '</h2><p>' + escapeHtml(project.result || project.solution) + '</p></article></div><h2 class="project-excerpts-title">' + copy.excerpts + '</h2><div class="project-excerpts">' + excerptHtml + '</div></div></section>' +
    '<section class="project-cta"><div class="w"><h2>' + copy.ask + '</h2><a class="btn" href="contact.html">' + copy.contact + '</a></div></section>';
}

for (const project of projects) {
  if (!/^[a-z0-9-]+$/.test(project.id)) throw new Error('Unsafe project id: ' + project.id);
  const canonical = SITE + '/projects/' + project.id + '.html';
  const title = project.title + ' | NORDA';
  const description = project.siteDescription || project.summary || '';
  const image = project.image || SITE + '/og.png';
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, '<title>' + escapeHtml(title) + '</title>');
  html = setMeta(html, 'name', 'description', description);
  html = setMeta(html, 'property', 'og:title', title);
  html = setMeta(html, 'property', 'og:description', description);
  html = setMeta(html, 'property', 'og:image', image);
  html = setMeta(html, 'property', 'og:image:alt', project.title);
  html = setMeta(html, 'property', 'og:url', canonical);
  html = setMeta(html, 'name', 'twitter:card', 'summary_large_image');
  html = setMeta(html, 'name', 'twitter:title', title);
  html = setMeta(html, 'name', 'twitter:description', description);
  html = setMeta(html, 'name', 'twitter:image', image);
  html = setMeta(html, 'name', 'twitter:image:alt', project.title);
  html = setCanonical(html, canonical);
  if (!/<base\b/i.test(html)) html = html.replace(/<link rel="stylesheet" href="style\.css">/i, '<base href="/">\n<link rel="stylesheet" href="style.css">');
  const schema = {
    '@context': 'https://schema.org', '@type': 'CreativeWork',
    name: project.title, description: description, image: image, url: canonical,
    creator: { '@type': 'Organization', name: 'NORDA' }
  };
  const jsonLd = '<script type="application/ld+json">' + JSON.stringify(schema).replace(/</g, '\\u003c') + '</script>';
  html = insertInHead(html, jsonLd);
  const scripts = '<script src="projects.js" defer></script><script src="project-page.js" defer></script>';
  const projectScripts = '<script src="projects.js" defer></script><script>window.NORDA_PROJECT_PAGE_ID=' + JSON.stringify(project.id) + ';</script><script src="project-page.js" defer></script>';
  if (!html.includes(scripts)) throw new Error('Project scripts not found in project.html');
  html = html.replace(scripts, projectScripts);
  const root = '<div id="projectDetail"></div>';
  if (!html.includes(root)) throw new Error('Project detail mount not found in project.html');
  html = html.replace(root, '<div id="projectDetail" data-project-page-id="' + escapeHtml(project.id) + '">' + renderBody(project) + '</div>');
  fs.writeFileSync(path.join(outputDir, project.id + '.html'), html);
}
console.log('Generated ' + projects.length + ' static project pages.');
