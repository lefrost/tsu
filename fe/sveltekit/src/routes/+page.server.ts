import { APIError } from 'better-auth/api';
import type { Actions, PageServerLoad } from './$types';
import { auth } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = (event) => {
  // if (!event.locals.user) {
  //   return redirect(302, '/demo/better-auth/login');
  // }
  return { user: event.locals.user };
};

export const actions: Actions = {
  loginEmail: async (event) => {
    const formData = await event.request.formData();
    const email = formData.get(`email`)?.toString() ?? ``;
    const password = formData.get(`password`)?.toString() ?? ``;
    const name = formData.get(`name`)?.toString() ?? ``;

    try {
      await auth.api.signUpEmail({
        body: {
          email,
          password,
          name,
          // callbackURL: '/auth/verification-success'
        }
      });
    } catch (error) {
      if (error instanceof APIError) {
        return fail(400, { message: error.message || `Registration failed` });
      }
      return fail(500, { message: `Unexpected error` });
    }

    return;
  },

  loginSocial: async (event) => {
    const formData = await event.request.formData();
    const provider = formData.get(`provider`)?.toString() ?? ``;
    const callbackURL = formData.get(`callbackURL`)?.toString() ?? `/`;

    const result = await auth.api.signInSocial({
      body: {
        provider: provider,
        callbackURL,
      }
    });

    if (result.url) {
      return redirect(302, result.url);
    }
    return fail(400, { message: `Social sign-in failed` });
  },

  logout: async (event) => {
    await auth.api.signOut({
      headers: event.request.headers
    });
    return;
  }
};