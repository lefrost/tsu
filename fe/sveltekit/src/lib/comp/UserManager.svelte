<script lang="ts">
  import { page } from '$app/state';
  import { UserLogin, UserSettings } from '$lib/comp';
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

  let user = $derived(page.data.user);
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Button variant="outline" class="cursor-pointer">
      {user ? `Logout` : `Login`}
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end" class="p-0 w-[16rem]">
    <Card.Root>
      <Card.Content>
        {#if user}
          <UserSettings />
        {:else}
          <UserLogin />
        {/if}
      </Card.Content>
    </Card.Root>
  </DropdownMenu.Content>
</DropdownMenu.Root>