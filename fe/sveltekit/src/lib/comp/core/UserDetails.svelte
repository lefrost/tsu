<script lang="ts">
  import { page } from '$app/state';
  import { Button, Input, Label } from '$lib/comp/shadcn';
  import { formCreate } from '$lib/form.svelte';
	import { m } from '$paraglide/generated/messages';
  
  let user = $derived(page.data.user);
  let form = formCreate({ job: `socialLink` });
</script>

<form action="/api/user?/update" class="flex flex-col gap-1 self-stretch">
  <Label for="icon">
    {m.icon()}
  </Label>
  <Input id="icon" name="icon" type="file" />

  <!-- tba: display icon image if one is added to file -->
  <!-- tba: enfoce max file size for icon image -->

  {#if form.up}
    {#if form.er}
      <div class="text-red-400">{form.er}</div>
    {:else if form.ok}
      <div class="text-green-400">{m.saved()}</div>
    {/if}
  {/if}

  <div class="flex gap-1 self-stretch">
    <Button class="grow" type="submit">{m.save()}</Button>
    <Button variant="outline">{m.cancel()}</Button>
  </div>
</form>