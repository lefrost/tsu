import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (event) => {
  return {
    env: {
      FE_URL: env.FE_URL,
      R2_PUBLIC_URL: env.R2_PUBLIC_URL,
      USER_ICON_MB_MAX: env.USER_ICON_MB_MAX
    },
    user: event.locals.user
  };
};