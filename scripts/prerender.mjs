import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

const rootDir = path.resolve(import.meta.dirname, '..');
const distHtmlPath = path.join(rootDir, 'dist', 'index.html');
const ssrOutDir = path.join(rootDir, '.ssr-temp');

async function prerender() {
  if (!fs.existsSync(distHtmlPath)) {
    throw new Error(`Missing built HTML at ${distHtmlPath}. Run vite build first.`);
  }

  try {
    await build({
      root: rootDir,
      logLevel: 'silent',
      build: {
        ssr: path.join(rootDir, 'src', 'entry-server.tsx'),
        outDir: ssrOutDir,
        emptyOutDir: true,
        rollupOptions: {
          output: {
            format: 'es',
            entryFileNames: 'entry-server.mjs',
          },
        },
      },
    });

    const serverEntryUrl = pathToFileURL(path.join(ssrOutDir, 'entry-server.mjs')).href;
    const { render } = await import(serverEntryUrl);
    const appHtml = render();
    const template = fs.readFileSync(distHtmlPath, 'utf-8');
    const rendered = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    if (rendered === template) {
      throw new Error('Could not find <div id="root"></div> placeholder in dist/index.html');
    }

    fs.writeFileSync(distHtmlPath, rendered, 'utf-8');
    console.log('Prerendered static HTML into dist/index.html successfully.');
  } finally {
    fs.rmSync(ssrOutDir, { recursive: true, force: true });
  }
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
