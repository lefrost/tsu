import { paraglideVitePlugin } from '@inlang/paraglide-js';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import adapter from 'svelte-adapter-bun';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, path.resolve(process.cwd(), '../../'), '');

	return {
		plugins: [
			paraglideVitePlugin({
				project: path.resolve(import.meta.dirname, '../../all/fe/paraglide/project.inlang'),
				outdir: path.resolve(import.meta.dirname, '../../all/fe/paraglide/generated'),
				emitTsDeclarations: true,
				experimentalPerLocaleBuild: false,
				strategy: ['url']
			}),
			
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
		// resolve: {
		// 	alias: {
		// 		'$betterauth': path.resolve(import.meta.dirname, '../../all/betterauth/instance.ts'),
		// 		'$drizzle': path.resolve(import.meta.dirname, '../../all/drizzle/instance.ts'),
		// 		'$paraglide': path.resolve(import.meta.dirname, '../../all/paraglide/generated')
		// 	}
		// },
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
