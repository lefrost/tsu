<script lang="ts">
  import { Button, DropdownMenu } from '$lib/comp/shadcn';
	import { m } from '$paraglide/generated/messages';
	import { locales, setLocale } from '$paraglide/generated/runtime';

  let langs = $derived.by(() =>
    locales.map(locale => ({
      label: new Intl.DisplayNames([locale], { type: `language` }).of(locale),
      locale
    }))
  );
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Button variant="outline">{m.language()}</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end" >
    {#each langs as lang}
      <DropdownMenu.Item onclick={async () => {
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
