<script lang="ts">
	import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import { page } from '$app/state';
  import { Button } from '$lib/comp/shadcn';
  import { formCreate } from '$lib/form.svelte';
	import { m } from '$paraglide/generated/messages';

  type Form = ReturnType<typeof formCreate>;
  type User = ReturnType<typeof page.data.user>[number];

  let user: User = $derived(page.data.user);

  let enableGened = false;

  let disableForm: Form = formCreate({
    job: `userTwofaDisable`,
    onOk: async () => {
      await invalidateAll();
    }
  });

  let enableForm: Form = formCreate({
    job: `userTwofaEnable`,
    onOk: async () => {
      await invalidateAll();
    }
  });

  let genForm: Form = formCreate({
    job: `userTwofaGen`,
  });
</script>

<div class="flex gap-[0.4rem] items-center self-stretch">
  <div class="opacity-40">
    {m.twofa()}
  </div>

  {#if user.twoFactorEnabled}
    <div class="opacity-30">{m.enabled()}</div>
    <form action="/auth?/twofaDisable" method="post" use:enhance={disableForm.enhance}>
      <!-- tba -->
    </form>

  {:else}
    <div class="opacity-30">{m.disabled()}</div>
    {#if enableGened}
      <form action="/auth?/twoFaEnable" method="post" use:enhance={enableForm.enhance}>
        <!-- tba -->
      </form>
    {:else}
      <form action="/auth?/twoFaGen" method="post" use:enhance={genForm.enhance}>
        <!-- tba -->
      </form>
    {/if}
  {/if}
</div>
