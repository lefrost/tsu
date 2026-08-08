<script lang="ts">
  import { page } from '$app/state';
  import { UserEmail, UserEmailVerify, UserIcon, UserLogin, UserLogout, UserSocials, UserTwofa } from '$lib/comp/core';
  import { Button, Card, DropdownMenu } from '$lib/comp/shadcn';
	import { m } from '$paraglide/generated/messages';

  type User = ReturnType<typeof page.data.user>;
  
  let user: User = $derived(page.data.user);
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Button variant="outline">
      {user ? user.email : m.login()}
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end" class="max-h-[80vh] p-0 w-[16rem]">
    <Card.Root>
      <Card.Content class="flex flex-col gap-[0.6rem] self-stretch">
        {#if user}
          {#if user.emailVerified}
            <UserIcon />
            <UserEmail />
            <UserSocials />
            <UserTwofa />
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