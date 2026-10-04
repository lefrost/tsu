<script lang="ts">
	import { m } from '#paraglide/generated/messages';
</script>

<div class="flex flex-1 flex-col items-center justify-center px-[2rem] py-[3rem]">
  <div class="font-medium text-[2em]">
    {m.hello({ name: m.name() })}
  </div>
</div>