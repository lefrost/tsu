<script lang="ts">
	import { enhance } from '$app/forms';
	import { refreshAll } from '$app/navigation';
	import { UserForgot } from '#lib/comp/core.js';
	import { formCreate } from '#lib/form.svelte.js';
	import { Button, Input, Label } from '#lib/comp/shadcn.js';
	import { m } from '#paraglide/generated/messages';

	let forgot = $state(false);

	let emailForm = formCreate({
		job: `emailLogin`,
		onOk: async () => {
			await refreshAll();
		}
	});

	let socialForm = formCreate({
		job: `socialLogin`
	});
</script>

{#if forgot}
	<div class="flex flex-col gap-[0.6rem] self-stretch">
		<UserForgot bind:forgot />
	</div>
{:else}
	<form
		method="post"
		action="/auth?/emailLogin"
		use:enhance={emailForm.enhance}
		class="flex w-full flex-col gap-[1.2rem]"
	>
		<div class="flex flex-col gap-[0.6rem] self-stretch">
			<Label for="email">
				{m.email()}
			</Label>
			<Input id="email" type="email" name="email" />
		</div>
		<div class="flex flex-col gap-[0.4rem] self-stretch">
			<div class="flex self-stretch">
				<Label for="password">
					{m.password()}
				</Label>
				<div
					class="ms-auto cursor-default text-sm text-[0.7rem] underline-offset-4 opacity-50 hover:underline"
					onclick={() => {
						forgot = true;
					}}
					onkeydown={() => {}}
					role="button"
					tabindex={0}
				>
					{m.passwordForgot()}
				</div>
			</div>
			<Input id="password" type="password" name="password" />
		</div>
		<div class="flex flex-col self-stretch">
			{#if emailForm.up && emailForm.er}
				<p class="mb-[0.4rem] text-red-400">{emailForm.er}</p>
			{/if}
			<div class="flex gap-[0.6rem] self-stretch">
				<Button
					type="submit"
					name="act"
					value="login"
					class="grow-1"
					disabled={emailForm.loading || socialForm.loading}
				>
					{m.login()}
				</Button>
				<Button
					type="submit"
					variant="outline"
					name="act"
					value="signup"
					class="grow"
					disabled={emailForm.loading || socialForm.loading}
				>
					{m.signup()}
				</Button>
			</div>
		</div>
	</form>
	<form
		method="post"
		action="/auth?/socialLogin"
		use:enhance={socialForm.enhance}
		class="mt-[0.6rem] flex flex-col gap-[0.6rem] self-stretch"
	>
		<Button
			type="submit"
			name="provider"
			value="google"
			variant="outline"
			class="w-full cursor-pointer"
			disabled={emailForm.loading || socialForm.loading}
		>
			{m.socialLogin({ provider: `Google` })}
		</Button>
		<Button
			type="submit"
			name="provider"
			value="github"
			variant="outline"
			class="w-full cursor-pointer"
			disabled={emailForm.loading || socialForm.loading}
		>
			{m.socialLogin({ provider: `GitHub` })}
		</Button>
	</form>
{/if}
