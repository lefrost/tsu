// import { APIError } from 'better-auth/api';
import type { Actions } from './$types';
import { auth, authClient } from '$lib/server/auth';
import { m } from '$paraglide/generated/messages';
import { fail, redirect } from '@sveltejs/kit';
import { translations } from '$all/fe/betterauth/i18n';

function errorMessageGet(error: any, locale: string) {
  const localeEntry = translations[locale as keyof typeof translations];
  const message = localeEntry?.[(error as any).body?.code as keyof typeof localeEntry & string];

  return message
    || (error as any).message
    || m.unknownError({}, { locale } as any)
}

export const actions: Actions = {
  emailLogin: async (event) => {
    const formData = await event.request.formData();
    const action = formData.get(`action`)?.toString() ?? ``;
    const email = formData.get(`email`)?.toString() ?? ``;
    const locale = formData.get(`locale`)?.toString() ?? ``;
    const name = formData.get(`name`)?.toString() ?? ``;
    const password = formData.get(`password`)?.toString() ?? ``;

    try {
      if (action === `login`) {
        await auth.api.signInEmail({
          body: { email, password }
        });
      } else if (action === `signup`) {
        await auth.api.signUpEmail({
          body: { email, password, name }
        });
      }
    } catch (error) {
      return fail(400, { message: errorMessageGet(error, locale) });
    }

    return { success: true };
  },

  logout: async (event) => {
    const formData = await event.request.formData();
    const locale = formData.get(`locale`)?.toString() ?? ``;
    try {
      await auth.api.signOut({
        headers: event.request.headers
      });
    } catch (error) {
      return fail(400, { message: errorMessageGet(error, locale) });
    }
    return { success: true };
  },

  // emailVerificationResend: async (event) => {
  //   const formData = await event.request.formData();
  //   const email = formData.get(`email`)?.toString() ?? ``;
  //   const locale = formData.get(`locale`)?.toString() ?? ``;

  //   try {
  //     await authClient.sendVerificationEmail({ 
  //       email
  //     });
  //   } catch (error) {
  //     return fail(400, { message: errorMessageGet(error, locale) });
  //   }

  //   return { success: true };
  // },

  passwordForgot: async (event) => {
    const formData = await event.request.formData();
    const email = formData.get(`email`)?.toString() ?? ``;
    const locale = formData.get(`locale`)?.toString() ?? ``;
    
    try {
      await auth.api.requestPasswordReset({
        body: { email, redirectTo: `${process.env.FE_URL}/auth/reset-password` }
      });
    } catch (error) {
      return fail(400, { message: errorMessageGet(error, locale) });
    }
    
    return { success: true };
  },

  passwordReset: async (event) => {
    const formData = await event.request.formData();
    const locale = formData.get(`locale`)?.toString() ?? ``;
    const password = formData.get(`password`)?.toString() ?? ``;
    const token = formData.get(`token`)?.toString() ?? ``;

    try {
      await auth.api.resetPassword({
        body: { newPassword: password, token }
      });
    } catch (error) {
      return fail(400, { message: errorMessageGet(error, locale) });
    }
    
    return redirect(302, `/`);
  },

  socialLogin: async (event) => {
    const formData = await event.request.formData();
    const callbackURL = formData.get(`callbackURL`)?.toString() ?? `/`;
    const locale = formData.get(`locale`)?.toString() ?? ``;
    const provider = formData.get(`provider`)?.toString() ?? ``;

    let result;

    try {
      result = await auth.api.signInSocial({
        body: {
          provider: provider,
          callbackURL,
        }
      })
    } catch (error) {
      return fail(400, { message: errorMessageGet(error, locale) });
    }
    
    if (result?.url) {
      return redirect(302, result.url);
    }

    return fail(400, {
      message: m.unknownError({}, { locale } as any)
    });
  },

  twoFactorDisable: async (event) => {
    // tba
  },
  
  twoFactorEnable: async (event) => {
    // tba
  },

  twoFactorGenerate: async (event) => {
    // tba
  },

  twoFactorVerify: async (event) => {
    // tba
  },
};