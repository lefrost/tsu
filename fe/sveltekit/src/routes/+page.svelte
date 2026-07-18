<script lang="ts">
  import './layout.css';
  import { Button } from "$lib/components/ui/button/index.js";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { getLocale, locales, setLocale } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';
  import FishSymbolIcon from "@lucide/svelte/icons/fish-symbol";
  import SunIcon from "@lucide/svelte/icons/sun";
  import MoonIcon from "@lucide/svelte/icons/moon";
  import { toggleMode } from "mode-watcher";

  let locale = $state(getLocale());
  let langs = $derived.by(() =>
    locales.map(locale => ({
      label: new Intl.DisplayNames([locale], { type: `language` }).of(locale),
      locale
    }))
  );
</script>

<div class="flex flex-1 flex-col max-w-[1400px] w-full">
  <!-- top -->
  <div class="absolute border-b-[0.1rem] left-0 flex flex-row justify-center px-[1.6rem] py-[0.8rem] w-full">
    <div class="flex flex-1 flex-row gap-[0.6rem] max-w-[1400px]">
      <FishSymbolIcon class="h-[1.6rem] w-[1.6rem]" />
      <div class="flex flex-1" />
      
      <Button onclick={toggleMode} variant="outline" size="icon">
        <SunIcon class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90" />
        <MoonIcon class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0" />
      </Button>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="outline">{m.language()}</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {#each langs as lang}
            <DropdownMenu.Item onclick={() => setLocale(lang.locale)}>{lang.label}</DropdownMenu.Item>
          {/each}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  </div>

  <!-- text -->
  <div class="flex flex-1 flex-col font-medium items-center justify-center">
    <div class="text-5xl">
      {m.heading({ name: m.name() })}
    </div>
  </div>
</div>