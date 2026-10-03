<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { authClient } from '#lib/auth.js';
	import { cache } from '#lib/runtime.svelte.js';
	import { Button, Spinner } from '#lib/comp/shadcn.js';
	import { formCreate } from '#lib/form.svelte.js';
	import { m } from '#paraglide/generated/messages';
	import { onMount } from 'svelte';

	type Account = Awaited<ReturnType<typeof authClient.listAccounts>>[`data`][number];
	type Form = ReturnType<typeof formCreate>;

	let accounts: Account[] = $state([]);

	let user = $derived(page.data.user);

	let passwordResetForm: Form = formCreate({
		job: `passwordReset`
	});

	let socialLinkForm: Form = formCreate({
		job: `socialLink`,
		onOk: () => accountsRefresh()
	});

	let socialUnlinkForm: Form = formCreate({
		job: `socialUnlink`,
		onOk: () => accountsRefresh()
	});

	onMount(async () => {
		let cachedAccounts: Account[] = cache.get(`accounts`) || [];
		if (cachedAccounts.length) {
			accounts = cachedAccounts;
		} else {
			accounts = (await authClient.listAccounts()).data || [];
			cache.set(`accounts`, accounts);
		}
	});

	async function accountsRefresh() {
		accounts = (await authClient.listAccounts()).data || [];
		cache.set(`accounts`, accounts);
		console.log(accounts); // test
	}
</script>

<div class="flex flex-col gap-[0.6rem] self-stretch">
	{#if accounts.length}
		<form
			action="/auth?/passwordResetRequest"
			class="flex items-center gap-[0.6rem] self-stretch"
			method="post"
			use:enhance={passwordResetForm.enhance}
		>
			<input type="hidden" name="email" value={user.email} />
			<div class="opacity-40">{m.password()}</div>
			{#if accounts.some((account) => account.providerId === `credential`)}
				<div>{m.set()}</div>
			{:else}
				<div class="opacity-30">{m.unset()}</div>
			{/if}
			<Button class="ms-auto h-auto cursor-pointer" type="submit" variant="outline">
				{#if accounts.some((account) => account.providerId === `credential`)}
					{m.reset()}
				{:else}
					{m.set()}
				{/if}
			</Button>
		</form>

		<div class="flex items-center gap-[0.6rem] self-stretch">
			<span class="opacity-40"> GitHub </span>

			{#if accounts.some((account) => account.providerId === `github`)}
				<div>{m.linked()}</div>
				<form
					action="/auth?/socialUnlink"
					class="ms-auto"
					method="post"
					use:enhance={socialUnlinkForm.enhance}
				>
					<Button
						class="h-auto cursor-pointer"
						disabled={socialUnlinkForm.loading}
						name="provider"
						type="submit"
						value="github"
						variant="outline"
					>
						{m.unlink()}
					</Button>
				</form>
			{:else}
				<div class="opacity-30">{m.unlinked()}</div>
				<form
					action="/auth?/socialLink"
					class="ms-auto"
					method="post"
					use:enhance={socialLinkForm.enhance}
				>
					<input type="hidden" name="act" value="link" />
					<Button
						class="h-auto cursor-pointer"
						disabled={socialLinkForm.loading}
						name="provider"
						type="submit"
						value="github"
						variant="outline"
					>
						{m.link()}
					</Button>
				</form>
			{/if}
		</div>

		<div class="flex items-center gap-[0.6rem] self-stretch">
			<span class="opacity-40"> Google </span>

			{#if accounts.some((account) => account.providerId === `google`)}
				<div>{m.linked()}</div>
				<form
					action="/auth?/socialUnlink"
					class="ms-auto"
					method="post"
					use:enhance={socialUnlinkForm.enhance}
				>
					<input type="hidden" name="act" value="unlink" />
					<Button
						class="h-auto cursor-pointer"
						disabled={socialUnlinkForm.loading}
						name="provider"
						type="submit"
						value="google"
						variant="outline"
					>
						{m.unlink()}
					</Button>
				</form>
			{:else}
				<div class="opacity-30">{m.unlinked()}</div>
				<form
					action="/auth?/socialLink"
					class="ms-auto"
					method="post"
					use:enhance={socialLinkForm.enhance}
				>
					<input type="hidden" name="act" value="link" />
					<Button
						class="h-auto cursor-pointer"
						disabled={socialLinkForm.loading}
						name="provider"
						type="submit"
						value="google"
						variant="outline"
					>
						{m.link()}
					</Button>
				</form>
			{/if}
		</div>

		{#if socialLinkForm.up && socialLinkForm.er}
			<div class="text-red-400">
				{socialLinkForm.er}
			</div>
		{/if}

		{#if socialUnlinkForm.up && socialLinkForm.er}
			<div class="text-red-400">
				{socialUnlinkForm.er}
			</div>
		{/if}
	{:else}
		<div class="flex items-center gap-[0.2rem] opacity-40">
			<Spinner />
			{m.accountsLoading()}
		</div>
	{/if}
</div>
