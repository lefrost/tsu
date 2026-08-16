<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
  import { page } from '$app/state';
  import { Button, Input, Label } from '$lib/comp/shadcn';
  import { formCreate } from '$lib/form.svelte';
	import { m } from '$paraglide/generated/messages';
  
  let user = $derived(page.data.user);
  let iconEr: string | null = $state(null);
  let iconIn: HTMLInputElement | null = $state(null);
  let iconPrevDel = $state(false);
  let iconUrl: string | null = $state(null);

  let form = formCreate({
    job: `socialLink`,
    onOk: async () => {
      invalidateAll();
    }
  });

  $effect(() => {
    iconUrl = user?.icon ? `${viteEnv.R2_PUBLIC_URL}/${user.iconFilek}` : null;
  });

  function iconChange(e: Event) {
    const file = (e.currentTarget as HTMLInputElement).files?.[0];
    iconEr = file && file.size > Number(viteEnv.USER_ICON_MB_MAX) * 1024 * 1024 ? m.userIconSizeExceed() : null;
    iconUrl = file && !iconEr ? URL.createObjectURL(file) : null;
  }

  function reset() {
    form.reset();
    if (iconIn) iconIn.value = ``;
    iconUrl = user?.icon ? `${viteEnv.R2_PUBLIC_URL}/${user.iconFilek}` : null;
    iconPrevDel = false;
  }
</script>

<form action="/api/user?/update" class="flex flex-col gap-2 self-stretch" method="post" use:enhance={form.enhance}>
  <input name="iconPrevDel" type="hidden" value={iconPrevDel} />

  <Label for="icon">{m.icon()}</Label>
  <Input bind:ref={iconIn} id="icon" name="icon" oninput={iconChange} type="file" />

  {#if iconEr}
    <div class="text-red-400">{iconEr}</div>
  {:else if iconUrl}
    <div class="aspect-square flex max-h-32 relative">
      <img alt="" class="h-full w-full" src={iconUrl} />
      <Button class="absolute h-auto right-1 top-1" onclick={() => { iconUrl = null; iconPrevDel = true; }} type="button">{m.delete()}</Button>
    </div>
  {/if}

  {#if form.up}
    {#if form.er}
      <div class="text-red-400">{form.er}</div>
    {:else if form.ok}
      <div class="text-green-400">{m.saved()}</div>
    {/if}
  {/if}

  <div class="flex gap-1 self-stretch">
    <Button class="grow" type="submit">{m.save()}</Button>
    <Button onclick={reset} type="button" variant="outline">{m.reset()}</Button>
  </div>
</form>