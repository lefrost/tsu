<script lang="ts">
  import { Header } from '$lib/comp';
	import { m } from '$paraglide/messages';
</script>

<div class="flex flex-1 flex-col max-w-[1400px] w-full">
  <Header />

  <div class="flex flex-1 flex-col font-medium items-center justify-center">
    <div class="text-5xl">
      {m.heading({ name: m.name() })}
    </div>
  </div>
</div>