<script lang="ts">
  import { authClient } from '$lib/auth';
  import { Button } from "$lib/components/ui/button/index.js";
	import { m } from '$paraglide/generated/messages';
  import { onMount } from 'svelte';

  let accounts = $state([]);
  
  onMount(async () => {
    accounts = await authClient.listAccounts() as any;
  });
</script>

<div class="flex flex-col gap-[0.6rm] self-stretch">
  {#each accounts as account}
    <!-- tba: email & password; comes with "set password" or "reset password" -->

    <!-- <Button class="cursor-pointer" href="/auth/reset-password" variant="outline">
      {m.passwordReset()}
    </Button> -->

    <!-- tba: github -->
    <!-- tba: google -->
  {/each}
</div>