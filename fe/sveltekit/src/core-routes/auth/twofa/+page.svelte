<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
  import { Button, Card } from '$lib/comp/shadcn';
  import { formCreate } from '$lib/form.svelte';
	import { m } from '$paraglide/generated/messages';
	import { getLocale } from '$paraglide/generated/runtime';
  
  let loc = $state(getLocale());

  let form = formCreate({
    job: `twofaVerify`,
    onOk: () => {
      invalidateAll();
      goto(`/`);
    }
  });
</script>

<form action="/auth?/twofaVerify" class="flex flex-col h-full items-center justify-center w-full" method="post" use:enhance={form.enhance}>
  <Card.Root>
    <Card.Content class="flex flex-col gap-[0.6rem] w-[12rem]">

    </Card.Content>
  </Card.Root>
</form>

<!-- tba: this is the page 2fa-enabled users are redirected to during login process -->