<script lang="ts">
	import { enhance } from '$app/forms';
	import { formCreate } from '#lib/form.svelte.js';
	import { Button, Input, Label } from '#lib/comp/shadcn.js';
	import { m } from '#paraglide/generated/messages';

	let { forgot = $bindable() } = $props();
	let form = formCreate({
		job: `passwordReset`
	});
</script>

<form
	method="post"
	action="/auth?/passwordResetRequest"
	use:enhance={form.enhance}
	class="flex w-full flex-col gap-[1.2rem]"
>
	<div class="flex flex-col gap-[0.6rem] self-stretch">
		<Label for="email">
			{m.email()}
		</Label>
		<Input id="email" type="email" name="email" />
	</div>
	<div class="flex flex-col self-stretch">
		{#if form.up}
			{#if form.ok}
				<p class="mb-[0.4rem] text-green-400">
					{m.passwordResetSent()}
				</p>
			{:else}
				<p class="mb-[0.4rem] text-red-400">
					{form.er}
				</p>
			{/if}
		{/if}
		<div class="flex flex-col gap-[0.6rem] self-stretch">
			{#if form.ok}
				<Button variant="outline" class="self-stretch">
					{m.return()}
				</Button>
			{:else}
				<Button type="submit" class="self-stretch" disabled={form.loading}>
					{m.passwordResetSend()}
				</Button>
				<Button
					variant="outline"
					class="self-stretch"
					onclick={() => {
						forgot = false;
					}}
				>
					{m.cancel()}
				</Button>
			{/if}
		</div>
	</div>
</form>
