<script lang="ts">
	import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import { page } from '$app/state';
  import { Button } from "$lib/components/ui/button/index.js";
  import { formCreate } from '$lib/form.svelte';
	import { m } from '$paraglide/generated/messages';

  type Form = ReturnType<typeof formCreate>;
  type User = ReturnType<typeof page.data.user>[number];

  let user: User = $derived(page.data.user);

  let enableGenerated = false;

  let disableForm: Form = formCreate({
    job: `userTwoFactorDisable`,
    onOk: async () => {
      await invalidateAll();
    }
  });

  let enableForm: Form = formCreate({
    job: `userTwoFactorEnable`,
    onOk: async () => {
      await invalidateAll();
    }
  });

  let generateForm: Form = formCreate({
    job: `userTwoFactorGenerate`,
  });
</script>

<div class="flex flex-row gap-[0.4rem] items-center self-stretch">
  <div class="opacity-40">
    {m.twoFactor()}
  </div>

  {#if user.twoFactorEnabled}
    <div class="opacity-30">{m.enabled()}</div>
    <form action="/auth?/twoFactorDisable" method="post" use:enhance={disableForm.enhance}>
      <!-- tba -->
    </form>

  {:else}
    <div class="opacity-30">{m.disabled()}</div>
    {#if enableGenerated}
      <form action="/auth?/twoFactorEnable" method="post" use:enhance={enableForm.enhance}>
        <!-- tba -->
      </form>
    {:else}
      <form action="/auth?/twoFactorGenerate" method="post" use:enhance={generateForm.enhance}>
        <!-- tba -->
      </form>
    {/if}
  {/if}
</div>
