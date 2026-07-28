import { createAuthClient } from 'better-auth/svelte';
import { PUBLIC_FE_URL } from '$env/static/public';

export const authClient = createAuthClient({
  baseURL: PUBLIC_FE_URL
});