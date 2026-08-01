<script lang="ts">
	import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import { formCreate } from '$lib/form.svelte';
  import { Button } from '$lib/comp/shadcn';
	import { m } from '$paraglide/generated/messages';
	import { getLocale } from '$paraglide/generated/runtime';

  let loc = $state(getLocale());

  let form = formCreate({
    job: `logout`,
    onOk: async () => {
      await invalidateAll();
    }
  });
</script>

<form class="flex flex-col self-stretch" method="post" action="/auth?/logout" use:enhance={form.enhance}>
  <input type="hidden" name="loc" value={loc} />
  <Button type="submit" variant="destructive" class="self-stretch" disabled={form.loading}>
    {m.logout()}
  </Button>
</form>
