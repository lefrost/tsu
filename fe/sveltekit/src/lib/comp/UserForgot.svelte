<script lang="ts">
	import { enhance } from '$app/forms';
  import { formCreate } from '$lib/form.svelte';
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
	import { m } from '$paraglide/messages';
	import { getLocale } from '$paraglide/runtime';
  
  let { forgot = $bindable() } = $props();
  let locale = $state(getLocale());
  let form = formCreate();
</script>

<form method="post" action="/auth?/passwordForgot" use:enhance={form.enhance} class="flex flex-col gap-[1.2rem] w-full">
  <input type="hidden" name="locale" value={locale} />
  <div class="flex flex-col gap-[0.6rem] self-stretch">
    <Label for="email">
      {m.email()}
    </Label>
    <Input type="email" name="email" />
  </div>
  <div class="flex flex-col self-stretch">
    {#if form.message}
      <p class="mb-[0.4rem] text-red-400">
        {form.message}
      </p>
    {/if}
    {#if form.success}
      <p class="mb-[0.4rem] text-green-400">
        {m.passwordResetSent()}
      </p>
      <Button variant="outline" class="cursor-pointer w-full">
        {m.return()}
      </Button>
    {:else}
      <Button type="submit" class="cursor-pointer w-full">
        {m.passwordResetSend()}
      </Button>
    {/if}
  </div>
</form>