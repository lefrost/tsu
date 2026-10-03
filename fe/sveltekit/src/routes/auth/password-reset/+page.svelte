<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { Button, Card, Input, Label } from '#lib/comp/shadcn.js';
	import { formCreate } from '#lib/form.svelte.js';
	import { m } from '$paraglide/generated/messages';
	import { getLocale } from '$paraglide/generated/runtime';

	let loc = $state(getLocale());
	let form = formCreate({
		job: `passwordReset`
	});

	const token = $derived(page.url.searchParams.get(`token`));
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
	<Card.Root>
		<Card.Content>
			<form
				method="post"
				action="/auth?/passwordReset"
				use:enhance={form.enhance}
				class="flex w-[12rem] flex-col gap-[0.6rem]"
			>
				<input type="hidden" name="token" value={token} />
				<Label for="password">
					{m.passwordNew()}
				</Label>
				<Input id="password" type="password" name="password" />
				{#if form.up && form.er}
					<p class="text-red-400">
						{form.er}
					</p>
				{/if}
				<div class="flex gap-[0.6rem] self-stretch">
					<Button type="submit" class="grow" disabled={form.loading}>
						{m.submit()}
					</Button>
					<Button href="/" variant="outline" class="cursor-pointer">
						{m.cancel()}
					</Button>
				</div>
			</form>
		</Card.Content>
	</Card.Root>
</div>
