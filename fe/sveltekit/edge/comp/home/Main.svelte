<script lang="ts">
	import { m } from '#paraglide/generated/messages';
</script>

<div class="flex flex-1 flex-col items-center justify-center font-medium">
  <div class="text-5xl">
    {m.hello({ name: m.name() })}
  </div>
</div>