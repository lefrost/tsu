<script lang="ts">
	import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import { UserForgot } from '$lib/comp/core';
  import { formCreate } from '$lib/form.svelte';
  import { Button, Input, Label } from '$lib/comp/shadcn';
	import { m } from '$paraglide/generated/messages';
	import { getLocale } from '$paraglide/generated/runtime';

  let forgot = $state(false);
  let loc = $state(getLocale());

  let emailForm = formCreate({
    job: `emailLogin`,
    onOk: async () => { await invalidateAll(); }
  });

  let socialForm = formCreate({
    job: `socialLogin`
  });
</script>

{#if forgot}
  <div class="flex flex-col gap-[0.6rem] self-stretch">
    <UserForgot bind:forgot={forgot} />
  </div>
{:else}
  <form method="post" action="/auth?/emailLogin" use:enhance={emailForm.enhance} class="flex flex-col gap-[1.2rem] w-full">
    <input type="hidden" name="loc" value={loc} />
    <div class="flex flex-col gap-[0.6rem] self-stretch">
      <Label for="email">
        {m.email()}
      </Label>
      <Input type="email" name="email" />
    </div>
    <div class="flex flex-col gap-[0.4rem] self-stretch">
      <div class="flex self-stretch">
        <Label for="password">
          {m.password()}
        </Label>
        <div class="cursor-default hover:underline ms-auto opacity-50 text-[0.7rem] text-sm underline-offset-4" onclick={() => { forgot = true; }} onkeydown={() => {}} role="button" tabindex="0">
          {m.passwordForgot()}
        </div>
      </div>
      <Input type="password" name="password" />
    </div>
    <div class="flex flex-col self-stretch">
      {#if emailForm.up && emailForm.er}
        <p class="mb-[0.4rem] text-red-400">{emailForm.er}</p>
      {/if}
      <div class="flex gap-[0.6rem] self-stretch">
        <Button type="submit" name="act" value="login" class="grow-1" disabled={emailForm.loading || socialForm.loading}>
          {m.login()}
        </Button>
        <Button type="submit" variant="outline" name="act" value="signup" class="grow" disabled={emailForm.loading || socialForm.loading}>
          {m.signup()}
        </Button>
      </div>
    </div>
  </form>
  <form method="post" action="/auth?/socialLogin" use:enhance={socialForm.enhance} class="flex flex-col mt-[0.6rem] gap-[0.6rem] self-stretch">
    <input type="hidden" name="loc" value={loc} />
    <Button type="submit" name="provider" value="google" variant="outline" class="cursor-pointer w-full" disabled={emailForm.loading || socialForm.loading}>
      {m.socialLogin({ provider: `Google` })}
    </Button>
    <Button type="submit" name="provider" value="github" variant="outline" class="cursor-pointer w-full" disabled={emailForm.loading || socialForm.loading}>
      {m.socialLogin({ provider: `GitHub` })}
    </Button>
  </form>
{/if}
