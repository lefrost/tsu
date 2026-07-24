<script lang="ts">
  import { page } from '$app/state';
	import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import { formCreate } from '$lib/form.svelte';
  import { Button } from "$lib/components/ui/button/index.js";
	import { m } from '$paraglide/generated/messages';
	import { getLocale } from '$paraglide/generated/runtime';
  
  let locale = $state(getLocale());

  let form = formCreate({
    job: `emailVerify`,
    onSuccess: async () => {
      await invalidateAll();
    }
  });

  let user = $derived(page.data.user);
</script>

<form method="post" action="/auth?/emailVerificationResend" use:enhance={form.enhance} class="flex flex-col gap-[0.6rem] self-stretch">
  <input type="hidden" name="email" value={user.email} />
  <input type="hidden" name="locale" value={locale} />
  {#if form.updated}
    {#if form.success}
      <div class="text-green-400">
        {m.emailVerificationSent()}
      </div>
    {:else}
      <div class="text-red-400">
        {form.error}
      </div>
    {/if}
  {:else}
    <div class="text-yellow-400">
      {m.emailVerificationPrompt()}
    </div>
  {/if}
  <Button type="submit" class="cursor-pointer w-full" disabled={form.loading}>
    {m.emailVerificationResend()}
  </Button>
</form>