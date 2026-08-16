<script lang="ts">
	import { m } from '$paraglide/generated/messages';
  // import { msgs, send } from '$lib/comp/ws';
  // todo: ws
</script>

<div class="flex flex-1 flex-col font-medium items-center justify-center">
  <div class="text-5xl">
    {m.hello({ name: m.name() })}
  </div>
</div>