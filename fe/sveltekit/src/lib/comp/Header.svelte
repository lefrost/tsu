<script lang="ts">
  import { LanguageSelector, ModeToggler, UserManager } from '$lib/comp';
  import FishSymbolIcon from "@lucide/svelte/icons/fish-symbol";
</script>

<div class="sticky bg-background border-b-[0.1rem] left-0 top-0 flex flex-row max-h-[3.5rem] min-h-[3.5rem] items-center justify-center px-[1rem] w-full">
  <div class="flex flex-1 flex-row gap-[0.4rem] max-w-[1400px]">
    <a href="/">
      <FishSymbolIcon class="h-[1.6rem] w-[1.6rem]" />
    </a>
    <div class="flex flex-1" />
    <ModeToggler />
    <LanguageSelector />
    <UserManager />
  </div>
</div>