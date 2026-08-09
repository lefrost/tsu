<script lang="ts">
	import { enhance } from '$app/forms';
  import { page } from '$app/state';
  import { Button, Input, Label } from '$lib/comp/shadcn';
  import { formCreate } from '$lib/form.svelte';
	import QR from '@svelte-put/qr/svg/QR.svelte';
	import { m } from '$paraglide/generated/messages';
	import { getLocale } from '$paraglide/generated/runtime';
  import { mode } from "mode-watcher";

  type Form = ReturnType<typeof formCreate>;
  type Locale = ReturnType<typeof getLocale>;
  type User = ReturnType<typeof page.data.user>;

  let disableToggled: boolean = $state(false);
  let enableToggled: boolean = $state(false);
  let loc: Locale = $state(getLocale());

  let user: User = $derived(page.data.user);

  let disableForm: Form = formCreate({
    job: `userTwofaDisable`,
    onOk: async () => {
      page.data.user.twoFactorEnabled = false;
      disableForm.reset();
      disableToggled = false;
    }
  });

  let enableForm: Form = formCreate({ job: `userTwofaEnable` });

  let verifyForm: Form = formCreate({
    job: `userTwofaVerify`,
    onOk: async () => {
      page.data.user.twoFactorEnabled = true;
      enableForm.reset();
      enableToggled = false;
    }
  });
</script>

<div class="flex gap-[0.4rem] items-center self-stretch">
  <div class="opacity-40">
    {m.twofa()}
  </div>

  {#if user.twoFactorEnabled}
    <div class="opacity-30">{m.enabled()}</div>

    <Button class="h-auto ms-auto" disabled={disableForm.loading} onclick={() => { disableToggled = !disableToggled; disableForm.reset(); }} variant="outline">
      {disableToggled ? m.cancel(): m.disable() }
    </Button>

  {:else}
    <div class="opacity-30">{m.disabled()}</div>
    
    <Button class="h-auto ms-auto" disabled={enableForm.loading || verifyForm.loading} onclick={() => { enableToggled = !enableToggled; enableForm.reset(); }} variant="outline">
      {enableToggled ? m.cancel(): m.enable() }
    </Button>
  {/if}
</div>

{#if `totpUri` in enableForm.dat && enableForm.dat.totpUri}
  <form action="/auth?/twofaVerify" class="flex flex-col gap-[0.6rem] self-stretch" method="post" use:enhance={verifyForm.enhance}>
    <Label class="opacity-40">
      {m.twofaScan()}
    </Label>

    <QR data={enableForm.dat.totpUri as string} moduleFill={mode.current === `dark` ? `white` : `black`} anchorOuterFill={mode.current === `dark` ? `white` : `black`} anchorInnerFill={mode.current === `dark` ? `white` : `black`} />

    {#if `backupCodes` in enableForm.dat && (enableForm.dat.backupCodes as string[]).length}
      <Button class="self-stretch" onclick={async () => { await navigator.clipboard.writeText((enableForm.dat.backupCodes as string[]).join(` `)) }} onkeydown={() => {}} role="button" tabindex={0} variant="outline">
        {m.twofaCodesCopy()}
      </Button>
    {/if}

    <Label for ="code">
      {m.twofaCode()}
    </Label>

    <Input autocomplete="one-time-code" class="self-stretch" name="code" type="text" />

    <Button disabled={verifyForm.loading} type="submit">
      {m.submit()}
    </Button>
  </form>
{:else if enableToggled}
  <form action="/auth?/twofaEnable" class="flex flex-col gap-[0.4rem] self-stretch" method="post" use:enhance={enableForm.enhance}>
    <Label for="password">
      {m.password()}
    </Label>
  
    <Input class="self-stretch" id="password" name="password" type="password" />

    <Button class="ms-auto" disabled={enableForm.loading} type="submit" variant="outline">
      {m.continue()}
    </Button>
  </form>
{:else if disableToggled}
  <form action="/auth?/twofaDisable" class="flex flex-col gap-[0.4rem] self-stretch" method="post" use:enhance={disableForm.enhance}>
    <Label for="password">
      {m.password()}
    </Label>
  
    <Input class="self-stretch" id="password" name="password" type="password" />

    <Button class="ms-auto" disabled={disableForm.loading} type="submit" variant="outline">
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