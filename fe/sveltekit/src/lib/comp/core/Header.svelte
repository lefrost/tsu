<script lang="ts">
  import { LanguageSelector, ModeToggler, UserManager } from '$lib/comp/core';
  import { FishSymbol } from "$lib/comp/lucide";
</script>

<div class="sticky bg-background border-b-[0.1rem] left-0 top-0 flex max-h-[3.5rem] min-h-[3.5rem] items-center justify-center px-[1rem] w-full">
  <div class="flex flex-1 gap-[0.4rem] max-w-[1400px]">
    <a class="cursor-pointer" href="/">
      <FishSymbol class="h-[1.6rem] w-[1.6rem]" />
    </a>
    <div class="flex flex-1"></div>
    <ModeToggler />
    <LanguageSelector />
    <UserManager />
  </div>
</div>