<script lang="ts">
  import { page } from '$app/state';
  import { UserAccounts, UserEmailVerify, UserLogin, UserLogout } from '$lib/comp';
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { m } from '$paraglide/generated/messages';

  type User = ReturnType<typeof page.data.user>[number];
  
  let user: User = $derived(page.data.user);
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Button variant="outline">
      {user ? user.email : m.login()}
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end" class="p-0 w-[16rem]">
    <Card.Root>
      <Card.Content class="flex flex-col gap-[0.6rem] self-stretch">
        {#if user}
          {#if user.emailVerified}
            <UserAccounts />
          {:else}
            <UserEmailVerify />
          {/if}
          <UserLogout />
        {:else}
          <UserLogin />
        {/if}
      </Card.Content>
    </Card.Root>
  </DropdownMenu.Content>
</DropdownMenu.Root>