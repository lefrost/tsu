import { cp, rm, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { Plugin } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, `../..`);
const CORE = join(SRC, `core-routes`);
const EDGE = join(SRC, `edge/routes`);
const TARGET = join(SRC, `routes`);

let firstRun = true;
let timer: number | null = null;

async function build() {
  try {
    if (firstRun) {
      await rm(TARGET, { recursive: true, force: true });
      firstRun = false;
    }
    await mkdir(TARGET, { recursive: true });
    try { await cp(CORE, TARGET, { recursive: true, force: true }); } catch {}
    try { await cp(EDGE, TARGET, { recursive: true, force: true }); } catch {}
    console.log(`[routes-sync] Built`);
  } catch (err) {
    console.error(`[routes-sync] Build error:`, err);
  }
}

export function routesSync(): Plugin {
  return {
    name: `routes-sync`,
    async buildStart() { await build(); },
    configureServer(server) {
      server.watcher.add(CORE);
      server.watcher.add(EDGE);
      server.watcher.on(`change`, (path) => {
        if (path.startsWith(CORE) || path.startsWith(EDGE)) {
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            build();
            server.ws.send({ type: `full-reload` });
            timer = null;
          }, 50) as unknown as number;
        }
      });
    }
  };
}