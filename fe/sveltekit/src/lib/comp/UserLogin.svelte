<script lang="ts">
	import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import { UserForgot } from '$lib/comp';
  import { formCreate } from '$lib/form.svelte';
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
	import { m } from '$paraglide/generated/messages';
	import { getLocale } from '$paraglide/generated/runtime';
  
  let forgot = $state(false);
  let locale = $state(getLocale());

  let emailForm = formCreate({
    onSuccess: async () => {
      await invalidateAll();
    }
  });
</script>

{#if forgot}
  <div class="flex flex-col gap-[0.6rem] self-stretch">
    <UserForgot bind:forgot={forgot} />
    <Button variant="outline" class="cursor-pointer w-full" onclick={() => { forgot = false; }}>
      {m.cancel()}
    </Button>
  </div>
{:else}
  <form method="post" action="/auth?/emailLogin" use:enhance={emailForm.enhance} class="flex flex-col gap-[1.2rem] w-full">
    <input type="hidden" name="locale" value={locale} />
    <div class="flex flex-col gap-[0.6rem] self-stretch">
      <Label for="email">
        {m.email()}
      </Label>
      <Input type="email" name="email" />
    </div>
    <div class="flex flex-col gap-[0.4rem] self-stretch">
      <div class="flex flex-row self-stretch">
        <Label for="password">
          {m.password()}
        </Label>
        <div class="cursor-pointer ms-auto opacity-50 text-[0.7rem] text-sm underline-offset-4 hover:underline" onclick={() => { forgot = true; }}>
          {m.passwordForgot()}
        </div>
      </div>
      <Input type="password" name="password" />
    </div>
    <div class="flex flex-col self-stretch">
      {#if emailForm.message}
        <p class="mb-[0.4rem] text-red-400">{emailForm.message}</p>
      {/if}
      <div class="flex flex-row gap-[0.6rem] self-stretch">
        <Button type="submit" name="action" value="login" class="cursor-pointer grow-1">
          {m.login()}
        </Button>
        <Button type="submit" variant="outline" name="action" value="signup" class="cursor-pointer grow-1">
          {m.signup()}
        </Button>
      </div>
    </div>
  </form>
  <div class="flex flex-col mt-[0.6rem] gap-[0.6rem] self-stretch">
    <form method="post" action="/auth?/socialLogin" use:enhance>
      <input type="hidden" name="callbackURL" value="/" />
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="provider" value="google" />
      <Button type="submit" variant="outline" class="cursor-pointer w-full">
        {m.socialLogin({ provider: `Google` })}
      </Button>
    </form>
    <form method="post" action="/auth?/socialLogin" use:enhance>
      <input type="hidden" name="callbackURL" value="/" />
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="provider" value="github" />
      <Button type="submit" variant="outline" class="cursor-pointer w-full">
        {m.socialLogin({ provider: `GitHub` })}
      </Button>
    </form>
  </div>
{/if}