import { getRequestEvent } from '$app/server';
import { betterAuth } from 'better-auth/minimal';
import { createAuthClient } from 'better-auth/svelte';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { authConfig } from '@tsu/all/betterauth';

export const auth = betterAuth({
  ...authConfig,
  plugins: [sveltekitCookies(getRequestEvent)]
});

export const authClient = createAuthClient({
  baseURL: process.env.FE_URL
});