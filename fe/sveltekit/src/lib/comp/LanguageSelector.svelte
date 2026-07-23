<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { m } from '$paraglide/generated/messages';
	import { getLocale, locales, setLocale } from '$paraglide/generated/runtime';
  
  let locale = $state(getLocale());

  let langs = $derived.by(() =>
    locales.map(locale => ({
      label: new Intl.DisplayNames([locale], { type: `language` }).of(locale),
      locale
    }))
  );
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Button variant="outline" class="cursor-pointer">{m.language()}</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end" >
    {#each langs as lang}
      <DropdownMenu.Item class="cursor-pointer" onclick={async () => {
        setLocale(lang.locale);
        // await fetch('/i18n', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ locale: lang.locale }),
        // });

      }}>
        {lang.label}
      </DropdownMenu.Item>
    {/each}
  </DropdownMenu.Content>
</DropdownMenu.Root>