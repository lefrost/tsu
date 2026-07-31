<script lang="ts">
	import { enhance } from '$app/forms';
  import { page } from '$app/state';
  import { Button, Card, Input, Label } from '$lib/comp/shadcn';
  import { formCreate } from '$lib/form.svelte';
	import { m } from '$paraglide/generated/messages';
	import { getLocale } from '$paraglide/generated/runtime';

  let loc = $state(getLocale());
  let form = formCreate({
    job: `passwordReset`
  });

  const token = $derived(page.url.searchParams.get(`token`));
</script>

<div class="flex flex-col h-full items-center justify-center w-full">
  <Card.Root>
    <Card.Content>
      <form method="post" action="/auth?/passwordReset" use:enhance={form.enhance} class="flex flex-col gap-[0.6rem] w-[12rem]">
        <input type="hidden" name="loc" value={loc} />
        <input type="hidden" name="token" value={token} />
        <Label for="email">
          {m.passwordNew()}
        </Label>
        <Input type="password" name="password" />
        {#if form.up && form.er}
          <p class="text-red-400">
            {form.er}
          </p>
        {/if}
        <div class="flex flex-row gap-[0.6rem] self-stretch">
          <Button type="submit" class="grow" disabled={form.loading}>
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
