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
  let loc: Locale = $state(getLocale());
  let user : User = $derived(page.data.user);

  let socialLinkForm: Form = formCreate({
    job: `socialLink`
  });

  let socialUnlinkForm: Form = formCreate({
    job: `socialUnlink`
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

<div class="flex flex-col gap-[0.4rem] self-stretch">
  <div class="flex gap-[0.4rem] self-stretch">
    <div class="opacity-40">
      {m.email()}
    </div>
    <div class="ms-auto">
      {user.email}
    </div>
  </div>
  {#if accounts.length}
    <div class="flex gap-[0.4rem] items-center self-stretch">
      <div class="opacity-40">{m.password()}</div>
      {#if accounts.some(account => account.providerId === `credential`)}
        <div>{m.set()}</div>
      {:else}
        <div class="opacity-30">{m.unset()}</div>
      {/if}
      <Button class="cursor-pointer h-auto ms-auto" href="/auth/reset-password" variant="outline">
        {#if accounts.some(account => account.providerId === `credential`)}
          {m.reset()}
        {:else}
          {m.set()}
        {/if}
      </Button>
    </div>

    <div class="flex gap-[0.4rem] items-center self-stretch">
      <span class="opacity-40">
        GitHub
      </span>

      {#if accounts.some(account => account.providerId === `github`)}
        <div>{m.linked()}</div>
        <form action="/auth?/socialUnlink" class="ms-auto" method="post" use:enhance={socialUnlinkForm.enhance}>
          <input type="hidden" name="loc" value={loc} />
          <Button class="cursor-pointer h-auto" disabled={socialUnlinkForm.loading} name="provider" type="submit" value="github" variant="outline">
            {m.unlink()}
          </Button>
        </form>
      {:else}
        <div class="opacity-30">{m.unlinked()}</div>
        <form action="/auth?/socialLink" class="ms-auto" method="post" use:enhance={socialLinkForm.enhance}>
          <input type="hidden" name="loc" value={loc} />
          <input type="hidden" name="act" value="link" />
          <Button class="cursor-pointer h-auto" disabled={socialLinkForm.loading} name="provider" type="submit" value="github" variant="outline">
            {m.link()}
          </Button>
        </form>
      {/if}
    </div>

    <div class="flex gap-[0.4rem] items-center self-stretch">
      <span class="opacity-40">
        Google
      </span>

      {#if accounts.some(account => account.providerId === `google`)}
        <div>{m.linked()}</div>
        <form action="/auth?/socialUnlink" class="ms-auto" method="post" use:enhance={socialUnlinkForm.enhance}>
          <input type="hidden" name="loc" value={loc} />
          <input type="hidden" name="act" value="unlink" />
          <Button class="cursor-pointer h-auto" disabled={socialUnlinkForm.loading} name="provider" type="submit" value="google" variant="outline">
            {m.unlink()}
          </Button>
        </form>
      {:else}
        <div class="opacity-30">{m.unlinked()}</div>
        <form action="/auth?/socialLink" class="ms-auto" method="post" use:enhance={socialLinkForm.enhance}>
          <input type="hidden" name="loc" value={loc} />
          <input type="hidden" name="act" value="link" />
          <Button class="cursor-pointer h-auto" disabled={socialLinkForm.loading} name="provider" type="submit" value="google" variant="outline">
            {m.link()}
          </Button>
        </form>
      {/if}
    </div>

    {#if socialLinkForm.up}
      <div class="text-red-400">
        {socialLinkForm.er}
      </div>
    {/if}

    {#if socialUnlinkForm.up}
      <div class="text-red-400">
        {socialUnlinkForm.er}
      </div>
    {/if}
  {:else}
    <div class="flex items-center gap-[0.2rem] opacity-40">
      <Spinner />
      {m.accountsLoading()}
    </div>
  {/if}
</div>
