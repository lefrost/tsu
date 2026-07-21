import { APIError } from 'better-auth/api';
import type { Actions } from './$types';
import { auth } from '$lib/server/auth';
import { m } from '$paraglide/messages';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  loginEmail: async (event) => {
    const formData = await event.request.formData();
    const email = formData.get(`email`)?.toString() ?? ``;
    const locale = formData.get(`locale`)?.toString() ?? ``;
    const name = formData.get(`name`)?.toString() ?? ``;
    const password = formData.get(`password`)?.toString() ?? ``;

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
      const errorKey = `loginEmail:${(error as any).body?.code}`;
      if (error instanceof APIError) {
        return fail(400, { message: (m as any)[errorKey]?.({}, { locale }) || error.message });
      }
      return fail(500, { message: m.unknownError({}, { locale } as any) });
    }

    return;
  },

  loginSocial: async (event) => {
    const formData = await event.request.formData();
    const callbackURL = formData.get(`callbackURL`)?.toString() ?? `/`;
    const locale = formData.get(`locale`)?.toString() ?? ``;
    const provider = formData.get(`provider`)?.toString() ?? ``;

    const result = await auth.api.signInSocial({
      body: {
        provider: provider,
        callbackURL,
      }
    });

    if (result.url) {
      return redirect(302, result.url);
    }
    return fail(400, { message: m.unknownError({}, { locale } as any) });
  },

  logout: async (event) => {
    await auth.api.signOut({
      headers: event.request.headers
    });
    return;
  },

  passwordForgot: async (event) => {
    const formData = await event.request.formData();
    const email = formData.get(`email`)?.toString() ?? ``;
    const locale = formData.get(`locale`)?.toString() ?? ``;
    
    try {
      await auth.api.requestPasswordReset({
        body: { email, redirectTo: `${process.env.FE_URL}/reset-password` }});
    } catch (error) {
      const errorKey = `passwordForgot:${(error as any).body?.code}`;
      if (error instanceof APIError) {
        return fail(400, { message: (m as any)[errorKey]?.({}, { locale }) || error.message });
      }
      return fail(500, { message: m.unknownError({}, { locale } as any) });
    }

    return { success: true };
  },

  passwordReset: async (event) => {
    const formData = await event.request.formData();
    const locale = formData.get(`locale`)?.toString() ?? ``;
    const password = formData.get(`password`)?.toString() ?? ``;
    const token = event.url.searchParams.get(`token`) ?? '';

    try {
      await auth.api.resetPassword({
        body: { newPassword: password, token }
      });
    } catch (error) {
      const errorKey = `passwordReset:${(error as any).body?.code}`;
      if (error instanceof APIError) {
        return fail(400, { message: (m as any)[errorKey]?.({}, { locale }) || error.message });
      }
      return fail(500, { message: m.unknownError({}, { locale } as any) });
    }
    
    throw redirect(302, `/`);
  }
};