import { getRequestEvent } from '$app/server';
import { betterAuth } from 'better-auth/minimal';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { authConfig } from '$betterauth';

export const auth = betterAuth({
  ...authConfig,
  plugins: [sveltekitCookies(getRequestEvent)]
});