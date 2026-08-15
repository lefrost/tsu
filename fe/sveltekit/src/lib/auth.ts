// import { page } from '$app/state';
import { createAuthClient } from 'better-auth/svelte';

export const authClient = createAuthClient({
  // baseURL: page.data.env.FE_URL
});