<script lang="ts">
	import { enhance } from '$app/forms';
  import { formCreate } from '$lib/form.svelte';
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
	import { m } from '$paraglide/generated/messages';
	import { getLocale } from '$paraglide/generated/runtime';

  let { forgot = $bindable() } = $props();
  let loc = $state(getLocale());
  let form = formCreate({
    job: `passwordForgot`
  });
</script>

<form method="post" action="/auth?/passwordForgot" use:enhance={form.enhance} class="flex flex-col gap-[1.2rem] w-full">
  <input type="hidden" name="loc" value={loc} />
  <div class="flex flex-col gap-[0.6rem] self-stretch">
    <Label for="email">
      {m.email()}
    </Label>
    <Input type="email" name="email" />
  </div>
  <div class="flex flex-col self-stretch">
    {#if form.up}
      {#if form.ok}
        <p class="mb-[0.4rem] text-green-400">
          {m.passwordResetSent()}
        </p>
      {:else}
        <p class="mb-[0.4rem] text-red-400">
          {form.er}
        </p>
      {/if}
    {/if}
    <div class="flex flex-col gap-[0.6rem] self-stretch">
      {#if form.ok}
        <Button variant="outline" class="w-full">
          {m.return()}
        </Button>
      {:else}
        <Button type="submit" class="w-full" disabled={form.loading}>
          {m.passwordResetSend()}
        </Button>
        <Button variant="outline" class="w-full" onclick={() => { forgot = false; }}>
          {m.cancel()}
        </Button>
      {/if}
    </div>
  </div>
</form>
