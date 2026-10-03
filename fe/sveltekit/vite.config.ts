import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { routesSync } from './src/lib/scripts/routes-sync';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import adapterNode from '@sveltejs/adapter-node';
// import adapterVercel from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
import { sentrySvelteKit } from '@sentry/sveltekit/vite';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, path.resolve(process.cwd(), '../../'), '');

	return {
		build: {
			rolldownOptions: {
				output: {
					codeSplitting: { groups: [{ name: 'aws', test: /@aws-sdk|@smithy/ }] }
				}
			}
		},

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
			
			sentrySvelteKit({ autoUploadSourceMaps: false }),

			sveltekit({
				adapter: adapterNode(),
				// adapter: adapterVercel(),
				compilerOptions: {
					// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
					runes: ({ filename }) =>
						filename.split(/[/\\]/).includes('node_modules') ? undefined : true
				},
				env: {
					dir: '../../'
				},
				// typescript: {
				// 	config: (config) => {
				// 		config.include.push('../drizzle.config.ts');
				// 	}
				// }
			}),

			tailwindcss()
		],
		preview: { port: Number(env.FE_PORT) },
		resolve: {
			alias: {
				$all: path.resolve(import.meta.dirname, '../../all/'),
				$edge: path.resolve(import.meta.dirname, './edge'),
				$paraglide: path.resolve(import.meta.dirname, '../../all/paraglide') // paraglide files are generated at runtime
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
	};
});
