<script lang="ts">
	import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import { page } from '$app/state';
  import { formCreate } from '$lib/form.svelte';
  import { Button } from "$lib/components/ui/button/index.js";
	import { m } from '$paraglide/generated/messages';
	import { getLocale } from '$paraglide/generated/runtime';
  
  let locale = $state(getLocale());

  let form = formCreate({
    job: `logout`,
    onSuccess: async () => {
      await invalidateAll();
    }
  });
  
  let user = $derived(page.data.user);
</script>

<form method="post" action="/auth?/logout" use:enhance={form.enhance}>
  <input type="hidden" name="locale" value={locale} />
  {#if user.emailVerified}
    <!-- tba -->
  {:else}
    <!-- tba -->
  {/if}
  <Button type="submit" variant="outline" class="cursor-pointer w-full" disabled={form.loading}>
    {m.logout()}
  </Button>
</form>