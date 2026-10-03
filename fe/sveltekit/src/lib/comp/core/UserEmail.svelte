<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { authClient } from '#lib/auth.js';
	import { cache } from '#lib/runtime.svelte.js';
	import { Button, Input, Label, Spinner } from '#lib/comp/shadcn.js';
	import { formCreate } from '#lib/form.svelte.js';
	import { m } from '$paraglide/generated/messages';
	import { onMount } from 'svelte';

	type Account = Awaited<ReturnType<typeof authClient.listAccounts>>[`data`][number];
	type Form = ReturnType<typeof formCreate>;
	type User = ReturnType<typeof page.data.user>;

	let accounts: Account[] = $state([]);
	let changing: boolean = $state(false);
	let hasPassLoaded = $state(false);
	let user: User = $derived(page.data.user);
	let userHasPass = $state(false);

	let form: Form = formCreate({
		job: `emailChange`,
		onOk: async () => {
			changing = false;
		}
	});

	onMount(async () => {
		const hasPassRes = await fetch(`/api/user?x=hasPass`);
		if (hasPassRes.ok) userHasPass = await hasPassRes.json();
		hasPassLoaded = true;

		let cachedAccounts: Account[] = cache.get(`accounts`) || [];
		if (cachedAccounts.length) {
			accounts = cachedAccounts;
		} else {
			accounts = (await authClient.listAccounts()).data || [];
			cache.set(`accounts`, accounts);
		}
	});
</script>

<div class="relative flex flex-col items-start self-stretch">
	<div class="opacity-40">
		{m.email()}
	</div>
	{user.email}

	{#if !hasPassLoaded}
		<Spinner class="absolute top-0 right-0 h-auto opacity-40" />
	{:else if userHasPass}
		<Button
			class="absolute top-0 right-0 h-auto"
			variant={changing ? `destructive` : `outline`}
			onclick={() => {
				changing = !changing;
			}}
		>
			{changing ? m.cancel() : m.emailChange()}
		</Button>
	{/if}
</div>

{#if changing}
	<form
		action="/auth?/emailUpdate"
		class="flex flex-col gap-2 self-stretch"
		method="post"
		use:enhance={form.enhance}
	>
		<div class="flex flex-row gap-2 self-stretch">
			<Label for="email">{m.email()}</Label>
			<Input id="email" name="email" type="email" />
		</div>
		<Button disabled={form.loading} type="submit">{m.submit()}</Button>
		{#if form.up && form.er}
			<div class="text-red-400">{form.er}</div>
		{/if}
	</form>
{/if}
