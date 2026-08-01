<script lang="ts">
  import { page } from '$app/state';
	import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import { formCreate } from '$lib/form.svelte';
  import { Button } from "$lib/comp/shadcn";
	import { m } from '$paraglide/generated/messages';
	import { getLocale } from '$paraglide/generated/runtime';

  let loc = $state(getLocale());

  let form = formCreate({
    job: `emailVerify`,
    onOk: async () => {
      await invalidateAll();
    }
  });

  let user = $derived(page.data.user);
</script>

<form method="post" action="/auth?/emailVerificationResend" use:enhance={form.enhance} class="flex flex-col gap-[0.6rem] self-stretch">
  <input type="hidden" name="email" value={user.email} />
  <input type="hidden" name="loc" value={loc} />
  {#if form.up}
    {#if form.ok}
      <div class="text-green-400">
        {m.emailVerificationSent()}
      </div>
    {:else}
      <div class="text-red-400">
        {form.er}
      </div>
    {/if}
  {:else}
    <div class="text-yellow-400">
      {m.emailVerificationPrompt()}
    </div>
  {/if}
  <Button type="submit" class="self-stretch" disabled={form.loading}>
    {m.emailVerificationResend()}
  </Button>
</form>
