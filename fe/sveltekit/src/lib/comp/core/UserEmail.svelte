<script lang="ts">
	import { enhance } from '$app/forms';
  import { page } from '$app/state';
  import { authClient } from '$lib/auth';
  import { cache } from '$lib/runtime.svelte';
  import { Button, Spinner } from '$lib/comp/shadcn';
  import { formCreate } from '$lib/form.svelte';
	import { m } from '$paraglide/generated/messages';
	import { getLocale } from '$paraglide/generated/runtime';
  import { onMount } from 'svelte';

  type Account = Awaited<ReturnType<typeof authClient.listAccounts>>[`data`][number];
  type Form = ReturnType<typeof formCreate>;
  type Locale = ReturnType<typeof getLocale>;
  type User = ReturnType<typeof page.data.user>;

  let accounts: Account[] = $state([]);
  let changing: boolean = $state(false);
  let loc: Locale = $state(getLocale());
  let user : User = $derived(page.data.user);

  let form: Form = formCreate({
    job: `emailChange`
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

  <!-- tba: "change" button, ms-auto class (turns to "cancel" if changing) -->
</div>

{#if changing}
  <form action="tba" class="flex gap-2 self-stretch" method="post" use:enhance={form.enhance}>
    <!-- tba: change email ui, user betterauth changeEmail api function, enable and setup changeEmail in instance config -->
  </form>
{/if}