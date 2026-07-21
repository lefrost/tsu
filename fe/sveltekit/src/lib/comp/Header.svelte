<script lang="ts">
  import { LanguageSelector, ModeToggler, UserManager } from '$lib/comp';
  import FishSymbolIcon from "@lucide/svelte/icons/fish-symbol";
</script>

<div class="absolute border-b-[0.1rem] left-0 flex flex-row justify-center px-[1.6rem] py-[0.8rem] w-full">
  <div class="flex flex-1 flex-row gap-[0.4rem] max-w-[1400px]">
    <FishSymbolIcon class="h-[1.6rem] w-[1.6rem]" />
    <div class="flex flex-1" />
    <ModeToggler />
    <LanguageSelector />
    <UserManager />
  </div>
</div>