<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto, refreshAll } from '$app/navigation';
	import { Button, Card, Input, Label } from '#lib/comp/shadcn.js';
	import { formCreate } from '#lib/form.svelte.js';
	import { m } from '$paraglide/generated/messages';
	import { getLocale } from '$paraglide/generated/runtime';

	let backupUsing = $state(false);
	let loc = $state(getLocale());

	let form = formCreate({
		job: `twofaVerify`,
		onOk: async () => {
			await refreshAll();
			goto(`/`);
		}
	});
</script>

<form
	action="/auth?/{backupUsing ? `twofaBackupVerify` : `twofaVerify`}"
	class="flex h-full w-full flex-col items-center justify-center"
	method="post"
	use:enhance={form.enhance}
>
	<Card.Root>
		<Card.Content class="flex w-[20rem] flex-col gap-[0.6rem]">
			<Label for="code">
				{backupUsing ? m.twofaBackupCode() : m.twofaCode()}
			</Label>

			<Input id="code" name="code" type="text" />

			{#if form.up && form.er}
				<div class="text-red-400">
					{form.er}
				</div>
			{/if}

			<div class="flex gap-[0.6rem] self-stretch">
				<Button class="grow" disabled={form.loading} type="submit">
					{m.submit()}
				</Button>
				<Button class="cursor-pointer" disabled={form.loading} href="/" variant="outline">
					{m.cancel()}
				</Button>
			</div>

			<Button
				class="self-stretch"
				disabled={form.loading}
				onclick={() => {
					backupUsing = !backupUsing;
				}}
				variant="outline"
			>
				{backupUsing ? m.twofaMainUse() : m.twofaBackupUse()}
			</Button>
		</Card.Content>
	</Card.Root>
</form>
