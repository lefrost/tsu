<script lang="ts">
	import { LanguageSelector, ModeToggler, UserManager } from '#lib/comp/core.js';
	import { FishSymbol } from '#lib/comp/lucide.js';
</script>

<div
	class="sticky top-0 left-0 flex max-h-[3.5rem] min-h-[3.5rem] w-full items-center justify-center border-b-[0.1rem] bg-background px-[1rem]"
>
	<div class="flex max-w-[1400px] flex-1 gap-[0.4rem]">
		<a class="cursor-pointer" href="/">
			<FishSymbol class="h-[1.6rem] w-[1.6rem]" />
		</a>
		<div class="flex flex-1"></div>
		<ModeToggler />
		<LanguageSelector />
		<UserManager />
	</div>
</div>
