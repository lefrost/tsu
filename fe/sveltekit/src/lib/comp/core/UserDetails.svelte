<script lang="ts">
	import { enhance } from '$app/forms';
	import { refreshAll } from '$app/navigation';
	import { page } from '$app/state';
	import { Button, Input, Label } from '#lib/comp/shadcn.js';
	import { formCreate } from '#lib/form.svelte.js';
	import { m } from '#paraglide/generated/messages';

	let user = $derived(page.data.user);

	let iconEr: string | null = $state(null);
	let iconIn: HTMLInputElement | null = $state(null);
	let iconPrevDel = $state(false);
	let iconUrl: string | null = $state(null);

	let form = formCreate({
		job: `socialLink`,
		onOk: async () => {
			refreshAll();
		}
	});

	$effect(() => {
		iconUrlLoad();
	});

	function iconChange(e: Event) {
		const file = (e.currentTarget as HTMLInputElement).files?.[0];
		iconEr =
			file && file.size > Number(viteEnv.USER_ICON_MB_MAX) * 1024 * 1024
				? m.userIconSizeExceed({ mb: viteEnv.USER_ICON_MB_MAX })
				: null;
		iconUrl = file && !iconEr ? URL.createObjectURL(file) : null;
	}

	function reset() {
		form.reset();
		iconEr = null;
		if (iconIn) iconIn.value = ``;
		iconUrlLoad();
		iconPrevDel = false;
	}

	function iconUrlLoad() {
		iconUrl = user?.iconFilek
			? `${user.iconFilek.startsWith(`http`) ? `` : viteEnv.R2_PUBLIC_URL}/${user.iconFilek}`
			: null;
	}
</script>

<form
	action="/api/user?/update"
	class="flex flex-col gap-2 self-stretch"
	enctype="multipart/form-data"
	method="post"
	use:enhance={form.enhance}
>
	<input name="iconPrevDel" type="hidden" value={iconPrevDel} />

	<Label for="icon">{m.icon()}</Label>
	<Input bind:ref={iconIn} id="icon" name="icon" oninput={iconChange} type="file" />

	{#if iconEr}
		<div class="text-red-400">{iconEr}</div>
	{:else if iconUrl}
		<div class="relative flex aspect-square max-h-32 self-start">
			<img alt="" class="h-full w-full" src={iconUrl} />
			<Button
				class="absolute top-1 right-1 h-auto"
				disabled={form.loading}
				onclick={() => {
					iconIn!.value = ``;
					iconUrl = null;
					iconPrevDel = true;
				}}
				type="button">{m.delete()}</Button
			>
		</div>
	{/if}

	{#if form.up}
		{#if form.er}
			<div class="text-red-400">{form.er}</div>
		{:else if form.ok}
			<div class="text-green-400">{m.saved()}</div>
		{/if}
	{/if}

	<div class="flex gap-1 self-stretch">
		<Button class="grow" disabled={form.loading} type="submit">{m.save()}</Button>
		<Button disabled={form.loading} onclick={reset} type="button" variant="outline"
			>{m.reset()}</Button
		>
	</div>
</form>
