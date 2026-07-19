<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
	import { getLocale, locales, setLocale } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';
  import FishSymbolIcon from "@lucide/svelte/icons/fish-symbol";
  import SunIcon from "@lucide/svelte/icons/sun";
  import MoonIcon from "@lucide/svelte/icons/moon";
  import { toggleMode } from "mode-watcher";
	import type { PageServerData } from './$types';

  let { data }: { data: PageServerData } = $props();
  
  let locale = $state(getLocale());
  
  let user = $derived(data.user);

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
    <div class="flex flex-1 flex-row gap-[0.4rem] max-w-[1400px]">
      <FishSymbolIcon class="h-[1.6rem] w-[1.6rem]" />
      <div class="flex flex-1" />
      
      <Button onclick={toggleMode} variant="outline" size="icon" class="cursor-pointer">
        <SunIcon class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90" />
        <MoonIcon class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0" />
      </Button>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="outline" class="cursor-pointer">{m.language()}</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end" >
          {#each langs as lang}
            <DropdownMenu.Item class="cursor-pointer" onclick={() => setLocale(lang.locale)}>
              {lang.label}
            </DropdownMenu.Item>
          {/each}
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="outline" class="cursor-pointer">
            {user ? `Logout` : `Login`}
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end" class="p-0 w-[16rem]">
          <Card.Root class="w-full">
            <!-- <Card.Header>
              <Card.Title>Login to your account</Card.Title>
              <Card.Description
                >Enter your email below to login to your account</Card.Description
              >
            </Card.Header> -->
            <Card.Content>
              <form>
                <div class="flex flex-col gap-[1.2em]">
                  <div class="flex flex-col gap-[0.6em]">
                    <Label for="email">
                      {m.email()}
                    </Label>
                    <Input type="email" />
                  </div>
                  <div class="flex flex-col gap-[0.6em]">
                    <div class="flex flex-row self-stretch">
                      <Label for="password">
                        {m.password()}
                      </Label>
                      <a class="cursor-pointer ms-auto opacity-50 text-[0.7rem] text-sm underline-offset-4 hover:underline">
                        {m.passwordForgot()}
                      </a>
                    </div>
                    <Input type="password" />
                  </div>
                </div>
              </form>
            </Card.Content>
            <Card.Footer class="flex-col gap-2">
              <Button type="submit" class="cursor-pointer w-full">
                {m.login()}
              </Button>
              <Button variant="outline" class="cursor-pointer w-full">
                {m.loginSocial({ provider: `Google` })}
              </Button>
              <Button variant="outline" class="cursor-pointer w-full">
                {m.loginSocial({ provider: `GitHub` })}
              </Button>
            </Card.Footer>
          </Card.Root>
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