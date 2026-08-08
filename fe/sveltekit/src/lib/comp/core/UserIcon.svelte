<script lang="ts">
  import { page } from '$app/state';
  import { Input, Label } from '$lib/comp/shadcn';
	import { m } from '$paraglide/generated/messages';

  type User = ReturnType<typeof page.data.user>;
  
  let user: User = $derived(page.data.user);
</script>

<div class="flex flex-col gap-1 self-stretch">
  <!-- tba -->
</div>