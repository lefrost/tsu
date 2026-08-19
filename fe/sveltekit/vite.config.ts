
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { routesSync } from './src/lib/scripts/routes-sync';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import adapter from 'svelte-adapter-bun';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, path.resolve(process.cwd(), '../../'), '');

	return {
		define: {
			viteEnv: {
				FE_URL: env.FE_URL,
				R2_PUBLIC_URL: env.R2_PUBLIC_URL,
				SENTRY_DSN: env.SENTRY_DSN,
				USER_ICON_MB_MAX: env.USER_ICON_MB_MAX
			}
		},
		plugins: [
			paraglideVitePlugin({
				project: path.resolve(import.meta.dirname, '../../all/paraglide/project.inlang'),
				outdir: path.resolve(import.meta.dirname, '../../all/paraglide/generated'),
				emitTsDeclarations: true,
				experimentalPerLocaleBuild: false,
				strategy: ['url']
			}),

			routesSync(),
			
			sveltekit({
				compilerOptions: {
					// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
					runes: ({ filename }) =>
						filename.split(/[/\\]/).includes('node_modules') ? undefined : true
				},
				env: {
					dir: '../../'
				},
				adapter: adapter(),
				// typescript: {
				// 	config: (config) => {
				// 		config.include.push('../drizzle.config.ts');
				// 	}
				// }
			}),
			
			tailwindcss()
		],
		resolve: {
			alias: {
				'$all': path.resolve(import.meta.dirname, '../../all/'),
				'$edge': path.resolve(import.meta.dirname, './edge'),
				'$paraglide': path.resolve(import.meta.dirname, '../../all/paraglide') // paraglide files are generated at runtime
			}
		},
		server: { port: Number(env.FE_PORT) },
		test: {
			expect: { requireAssertions: true },
			projects: [
				{
					extends: './vite.config.ts',
					test: {
						name: 'server',
						environment: 'node',
						include: ['src/**/*.{test,spec}.{js,ts}'],
						exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
					}
				}
			]
		}
	}
});
