import { getRequestEvent } from '$app/server';
import { betterAuth } from '@tsu/all/fe/better-auth/minimal';
import { sveltekitCookies } from '@tsu/all/fe/better-auth/svelte-kit';
import { authConfig } from '@tsu/all/fe/betterauth';

export const auth = betterAuth({
  ...authConfig,
  plugins: [sveltekitCookies(getRequestEvent)]
});