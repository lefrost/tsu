<script lang="ts">
	import { page } from '$app/state';
	import { Button, Card } from '#lib/comp/shadcn.js';
	import { formCreate } from '#lib/form.svelte.js';
	import { m } from '$paraglide/generated/messages';

	const error = $derived(page.url.searchParams.get(`error`));
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
	<Card.Root>
		<Card.Content class="flex w-[20rem] flex-col gap-[1rem]">
			<div class="text-yellow-400">
				{#if error === `account_not_linked`}
					{m.accountNotLinked()}
				{:else}
					{m.unknownError()}
				{/if}
			</div>
			<Button class="cursor-pointer" href="/" variant="outline">
				{m.return()}
			</Button>
		</Card.Content>
	</Card.Root>
</div>
