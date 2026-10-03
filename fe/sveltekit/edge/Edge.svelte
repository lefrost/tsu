<script lang="ts">
	import { m } from '$paraglide/generated/messages';
	// import { msgs, send } from '#lib/ws';
	// todo: ws
</script>

<div class="flex flex-1 flex-col items-center justify-center font-medium">
	<div class="text-5xl">
		{m.hello({ name: m.name() })}
	</div>
</div>
