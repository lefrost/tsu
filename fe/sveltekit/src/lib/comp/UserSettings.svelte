<script lang="ts">
	import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import { page } from '$app/state';
  import { formCreate } from '$lib/form.svelte';
  import { Button } from "$lib/components/ui/button/index.js";
	import { m } from '$paraglide/generated/messages';

  let form = formCreate({
    onSuccess: async () => {
      await invalidateAll();
    }
  });
  
  let user = $derived(page.data.user);
</script>

<form method="post" action="/auth?/logout" use:enhance={form.enhance}>
  {#if user.emailVerified}
    <!-- tba -->
  {:else}
    <!-- tba -->
  {/if}
  <Button type="submit" variant="outline" class="cursor-pointer w-full">
    {m.logout()}
  </Button>
</form>