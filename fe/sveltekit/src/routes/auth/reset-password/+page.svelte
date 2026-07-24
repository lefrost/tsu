<script lang="ts">
	import { enhance } from '$app/forms';
  import { page } from '$app/state';
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { formCreate } from '$lib/form.svelte';
	import { m } from '$paraglide/generated/messages';
	import { getLocale } from '$paraglide/generated/runtime';
  
  let locale = $state(getLocale());
  let form = formCreate({
    job: `passwordReset`
  });
  
  const token = $derived(page.url.searchParams.get(`token`));
</script>

<div class="flex flex-col h-full items-center justify-center w-full">
  <Card.Root>
    <Card.Content>
      <form method="post" action="/auth?/passwordReset" use:enhance={form.enhance} class="flex flex-col gap-[0.6rem]">
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="token" value={token} />
        <Label for="email">
          {m.passwordNew()}
        </Label>
        <Input type="password" name="password" />
        {#if form.message}
          <p class="text-red-400">
            {form.message}
          </p>
        {/if}
        <div class="flex flex-row gap-[0.6rem] self-stretch">
          <Button type="submit" class="cursor-pointer grow-1" disabled={form.loading}>
            {m.submit()}
          </Button>
          <Button href="/" variant="outline" class="cursor-pointer">
            {m.cancel()}
          </Button>
        </div>
      </form>
    </Card.Content>
  </Card.Root>
</div>