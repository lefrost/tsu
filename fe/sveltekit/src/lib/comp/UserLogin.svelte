<script lang="ts">
	import { enhance } from '$app/forms';
  import { formCreate } from '$lib/form.svelte';
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
	import { m } from '$paraglide/messages';
  
  let emailForm = formCreate();
</script>

<form method="post" action="/auth?/loginEmail" use:enhance={emailForm.enhance} class="flex flex-col gap-[1.2rem] w-full">
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
      <a class="cursor-pointer ms-auto opacity-50 text-[0.7rem] text-sm underline-offset-4 hover:underline">
        {m.passwordForgot()}
      </a>
    </div>
    <Input type="password" name="password" />
  </div>
  <div class="flex flex-col self-stretch">
    {#if emailForm.message}
      <p class="mb-[0.4rem] text-red-500">{emailForm.message}</p>
    {/if}
    <Button type="submit" class="cursor-pointer w-full">
      {m.login()}
    </Button>
  </div>
</form>
<div class="flex flex-col mt-[0.6rem] gap-[0.6rem] self-stretch">
  <form method="post" action="/auth?/loginSocial" use:enhance>
    <input type="hidden" name="provider" value="google" />
    <input type="hidden" name="callbackURL" value="/" />
    <Button type="submit" variant="outline" class="cursor-pointer w-full">
      {m.loginSocial({ provider: `Google` })}
    </Button>
  </form>
  <form method="post" action="/auth?/loginSocial" use:enhance>
    <input type="hidden" name="provider" value="github" />
    <input type="hidden" name="callbackURL" value="/" />
    <Button type="submit" variant="outline" class="cursor-pointer w-full">
      {m.loginSocial({ provider: `GitHub` })}
    </Button>
  </form>
</div>