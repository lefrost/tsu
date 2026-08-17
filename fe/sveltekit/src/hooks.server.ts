import { sequence } from '@sveltejs/kit/hooks';
import { hono } from '$all/hono';
import { building } from '$app/environment';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { auth } from '$lib/server/auth';
import '$lib/otel';
import type { Handle } from '@sveltejs/kit';
import { getTextDirection, locales } from '$paraglide/generated/runtime';
import { paraglideMiddleware } from '$paraglide/generated/server';
import * as Sentry from '@sentry/sveltekit';

Sentry.init({
	dsn: process.env.SENTRY_DSN,
	tracesSampleRate: 0
});

const honoHandle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith(`/api`) || event.url.pathname.startsWith(`/docs`)) return hono.fetch(event.request);
  return resolve(event);
};


const paraglideHandle: Handle = ({ event, resolve }) => {
	// const url = new URL(event.request.url);
	// const pathSegments = url.pathname.split('/').filter(Boolean);
	// const urlLocale = pathSegments[0] as any;
	// if (locales.includes(urlLocale)) {
	// 	event.cookies.set('locale', urlLocale, {
	// 		path: '/',
	// 		maxAge: 60 * 60 * 24 * 30,
	// 		sameSite: 'lax',
	// 		httpOnly: true,
	// 	});
	// }

	return paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;
		event.locals.loc = locale;

		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html
					.replace('%paraglide.lang%', locale)
					.replace('%paraglide.dir%', getTextDirection(locale))
		});
	});
}

const betterAuthHandle: Handle = async ({ event, resolve }) => {
	const sesh = await auth.api.getSession({ headers: event.request.headers });

	if (sesh) {
		event.locals.sesh = sesh.session;
		event.locals.user = sesh.user;
	}

	return svelteKitHandler({ event, resolve, auth, building });
};

export const handle: Handle = sequence(honoHandle, paraglideHandle, betterAuthHandle);
export const handleError = Sentry.handleErrorWithSentry();