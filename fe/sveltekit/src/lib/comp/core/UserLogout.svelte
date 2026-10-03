<script lang="ts">
	import { enhance } from '$app/forms';
	import { refreshAll } from '$app/navigation';
	import { formCreate } from '#lib/form.svelte.js';
	import { Button } from '#lib/comp/shadcn.js';
	import { m } from '$paraglide/generated/messages';

	let form = formCreate({
		job: `logout`,
		onOk: async () => {
			await refreshAll();
		}
	});
</script>

<form
	class="flex flex-col self-stretch"
	method="post"
	action="/auth?/logout"
	use:enhance={form.enhance}
>
	<Button type="submit" variant="destructive" class="self-stretch" disabled={form.loading}>
		{m.logout()}
	</Button>
</form>
