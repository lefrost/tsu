<script lang="ts">
	import { enhance } from '$app/forms';
  import { page } from '$app/state';
  import { authClient } from '$lib/auth';
  import { cache } from '$lib/runtime.svelte';
  import { Button, Input, Label } from '$lib/comp/shadcn';
  import { formCreate } from '$lib/form.svelte';
	import { m } from '$paraglide/generated/messages';
  import { onMount } from 'svelte';

  type Account = Awaited<ReturnType<typeof authClient.listAccounts>>[`data`][number];
  type Form = ReturnType<typeof formCreate>;
  type User = ReturnType<typeof page.data.user>;

  let accounts: Account[] = $state([]);
  let changing: boolean = $state(false);
  let user : User = $derived(page.data.user);

  let form: Form = formCreate({
    job: `emailChange`,
    onOk: async () => {
      changing = false;
    }
  });

  onMount(async () => {
    let cachedAccounts: Account[] = cache.get(`accounts`) || [];
    if (cachedAccounts.length) {
      accounts = cachedAccounts;
    } else {
      accounts = (await authClient.listAccounts()).data || [];
      cache.set(`accounts`, accounts);
    }
  });
</script>

<div class="flex gap-2 items-start self-stretch">
  <div class="flex flex-col">
    <div class="opacity-40">
      {m.email()}
    </div>
    {user.email}
  </div>

  <Button class="h-auto" variant="outline" onclick={() => { changing = !changing; }}>
    {changing ? m.cancel() : m.emailChange()}
  </Button>
</div>

{#if changing}
  <form action="/auth?/emailUpdate" class="flex gap-2 self-stretch" method="post" use:enhance={form.enhance}>
    <Label for="email">{m.email()}</Label>
    <Input id="email" name="email" type="email" />
    <Button disabled={form.loading} type="submit">{m.submit()}</Button>
    {#if form.up && form.er}
      <div class="text-red-400">{form.er}</div>
    {/if}
  </form>
{/if}