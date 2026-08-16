import type { ClientInit } from '@sveltejs/kit';
import { Locale } from '$lib/paraglide.svelte';
import * as Sentry from '@sentry/sveltekit';

Sentry.init({
	dsn: viteEnv.SENTRY_DSN,
	tracesSampleRate: 0
});

export const handleError = Sentry.handleErrorWithSentry();

export const init: ClientInit = () => {
	new Locale();
};
