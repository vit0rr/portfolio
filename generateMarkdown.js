import fs from 'fs';
import path from 'path';
import moment from 'moment';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error('Use: node generateMarkdown.js <nome-do-arquivo>');
  process.exit(1);
}
const blogTitle = args[0];

const currentDate = moment().format('YYYY-MM-DD');
const tags = ['tag1', 'tag2'];

const frontMatter = `---
title: ${blogTitle}
pubDate: ${currentDate}
tags:
${tags.map(tag => `  - ${tag}`).join('\n')}
---

Content
`;

const fileName = `${blogTitle.replace(/\s+/g, '-').toLowerCase()}.md`;
const filePath = path.join(__dirname, './', 'src', 'content', 'blog', fileName);

fs.writeFileSync(filePath, frontMatter);

console.log(`File "${fileName}" created "${filePath}"`);
