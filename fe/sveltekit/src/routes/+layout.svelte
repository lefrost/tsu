<script lang="ts">
	import Header from '$lib/comp/Header.svelte';
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref } from '$paraglide/generated/runtime';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from "mode-watcher";

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ModeWatcher />

<div class="flex flex-col items-center h-full w-full">
	<Header />
	<div class="flex flex-1 flex-col px-[1rem] py-[2rem] max-w-[1400px] w-full">
		{@render children()}
	</div>
</div>

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={resolve(localizeHref(page.url.pathname, { locale }) as Pathname)}>{locale}</a>
	{/each}
</div>

<style>
	:global(html,body) {
		width: 100%;
		height: 100%;
	}
</style>