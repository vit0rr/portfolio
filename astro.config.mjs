import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import fs from 'node:fs/promises';

import vercel from "@astrojs/vercel/static";

const BLOG_DIR = './src/content/blog';

const getBlogRoutesRedirect = async () => {
  const blogRoutes = (await fs.readdir(BLOG_DIR)).map((slug) => [
    `/${slug}`,
    `/blog/${slug}`,
  ]);

  return Object.fromEntries(blogRoutes);
}

// https://astro.build/config
export default defineConfig({
  site: 'https://vitorsalmeida.com',
  integrations: [mdx(), sitemap()],
  output: "static",
  adapter: vercel(),
  markdown: {
    remarkPlugins: [
      remarkMath,
    ],
    rehypePlugins: [
      [rehypeKatex, {}]
    ],
    shikiConfig: {
      theme: 'github-dark',
    },
  },
  redirects: {
    ...await getBlogRoutesRedirect(),
  }
});
