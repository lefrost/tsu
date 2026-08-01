<script lang="ts">
	import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import { page } from '$app/state';
  import { Button, Input, Label } from '$lib/comp/shadcn';
  import { formCreate } from '$lib/form.svelte';
	import { m } from '$paraglide/generated/messages';
	import { getLocale } from '$paraglide/generated/runtime';

  type Form = ReturnType<typeof formCreate>;
  type Locale = ReturnType<typeof getLocale>;
  type User = ReturnType<typeof page.data.user>;

  let enableToggled: boolean = $state(false);
  let loc: Locale = $state(getLocale());

  let user: User = $derived(page.data.user);

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

  let verifyForm: Form = formCreate({
    job: `userTwofaVerify`,
    onOk: async () => {
      await invalidateAll();
    }
  });
</script>

<div class="flex gap-[0.4rem] items-center self-stretch">
  <div class="opacity-40">
    {m.twofa()}
  </div>

  {#if user.twoFactorEnabled}
    <div class="opacity-30">{m.enabled()}</div>

    <form action="/auth?/twofaDisable" method="post" use:enhance={disableForm.enhance}>
      <input name="loc" type="hidden" value={loc} />

      <Button class="ms-auto" disabled={disableForm.loading} type="submit" variant="outline">
        {m.disable()}
      </Button>
    </form>

  {:else}
    <div class="opacity-30">{m.disabled()}</div>
    
    <Button class="h-auto ms-auto" disabled={enableForm.loading || verifyForm.loading} onclick={() => { enableToggled = !enableToggled; }}>
      {enableToggled ? m.cancel(): m.enable() }
    </Button>
  {/if}
</div>

{#if `totpUri` in enableForm.dat && enableForm.dat.totpUri}
  <form action="/auth?/twofaVerify" class="flex flex-col self-stretch" method="post" use:enhance={verifyForm.enhance}>
    <input name="loc" type="hidden" value={loc} />

    <!-- tba: qr code based on totpUri -->

    {#if `backupCodes` in enableForm.dat && (enableForm.dat.backupCodes as string[]).length}
      <div class="flex flex-col gap-[0.2rem] self-stretch">
        {#each (enableForm.dat.backupCodes as string[]) as code}
          <div class="opacity-0.4 text-xs">{code}</div>
        {/each}
        
        <div class="hover:underline opacity-0.4" onclick={async () => { await navigator.clipboard.writeText((enableForm.dat.backupCodes as string[]).join(` `)) }} onkeydown={() => {}} role="button" tabindex={0}>
          {m.twofaCodesCopy()}
        </div>
      </div>
    {/if}

    <Input autocomplete="one-time-code" class="w-full" name="code" type="text" />

    <Button disabled={verifyForm.loading} type="submit">
      {m.submit()}
    </Button>
  </form>
{:else if enableToggled}
  <form action="/auth?/twofaEnable" method="post" use:enhance={enableForm.enhance}>
    <input name="loc" type="hidden" value={loc} />

    <Label for="password">
      {m.password()}
    </Label>
  
    <Input class="w-full" name="password" type="password" />

    <Button class="ms-auto" disabled={enableForm.loading} type="submit" variant="outline">
      {m.continue()}
    </Button>
  </form>
{/if}

{#if disableForm.up && disableForm.er}
  <div class="text-red-400">
    {disableForm.er}
  </div>
{/if}

{#if enableForm.up && enableForm.er}
  <div class="text-red-400">
    {enableForm.er}
  </div>
{/if}

{#if verifyForm.up && verifyForm.er}
  <div class="text-red-400">
    {verifyForm.er}
  </div>
{/if}