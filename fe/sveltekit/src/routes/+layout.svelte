<script lang="ts">
	import './layout.css';
	import { Header } from '#lib/comp/core.js';
	import type { Path } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref } from '#paraglide/generated/runtime';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href="/favicon.png" /></svelte:head>
<ModeWatcher />

<div class="flex h-full w-full flex-col items-center text-xs sm:text-sm md:text-base">
	<Header />
	<div class="flex w-full max-w-[1400px] flex-1 flex-col">
		{@render children()}
	</div>
</div>

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={resolve(localizeHref(page.url.pathname, { locale }) as Path)}>{locale}</a>
	{/each}
</div>

<style>
	:global(html, body) {
		width: 100%;
		height: 100%;
	}
</style>
