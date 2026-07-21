<script lang="ts">
	import { enhance } from '$app/forms';
  import { Button } from "$lib/components/ui/button/index.js";
	import { m } from '$paraglide/messages';
</script>

<form method="post" action="/auth?/logout" use:enhance>
  <!-- tba -->
  <Button type="submit" variant="outline" class="cursor-pointer w-full">
    {m.logout()}
  </Button>
</form>