<script lang="ts">
  import { page } from '$app/state';
	import { enhance } from '$app/forms';
  import { formCreate } from '$lib/form.svelte';
  import { Button } from "$lib/comp/shadcn";
	import { m } from '$paraglide/generated/messages';

  let user = $derived(page.data.user);
  
  let form = formCreate({ job: `emailVerify` });
</script>

<form method="post" action="/auth?/emailVerificationResend" use:enhance={form.enhance} class="flex flex-col gap-[0.6rem] self-stretch">
  <input type="hidden" name="email" value={user.email} />
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
