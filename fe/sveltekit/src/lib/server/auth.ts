import { getRequestEvent } from '$app/server';
import { betterAuth } from 'better-auth/minimal';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { authConfig } from '$all/fe/betterauth/instance';

export const auth = betterAuth({
  ...authConfig,
  plugins: [
    ...(authConfig.plugins || []),
    sveltekitCookies(getRequestEvent),
  ]
});