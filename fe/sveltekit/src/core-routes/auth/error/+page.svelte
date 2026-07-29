<script lang="ts">
  import { page } from '$app/state';
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { formCreate } from '$lib/form.svelte';
	import { m } from '$paraglide/generated/messages';
  
  const error = $derived(page.url.searchParams.get(`error`));
</script>

<div class="flex flex-col h-full items-center justify-center w-full">
  <Card.Root>
    <Card.Content class="flex flex-col gap-[1rem] w-[20rem]">
      <div class="text-yellow-400">
        {#if error === `account_not_linked`}
          {m.accountNotLinked()}
        {:else}
          {m.unknownError()}
        {/if}
      </div>
      <Button class="cursor-pointer" href="/" variant="outline">
        {m.return()}
      </Button>
    </Card.Content>
  </Card.Root>
</div>