import { APIError } from 'better-auth/api';
import type { Actions } from './$types';
import { auth, authClient } from '$lib/server/auth';
import { m } from '$paraglide/messages';
import { fail, redirect } from '@sveltejs/kit';

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
      if (error instanceof APIError) {
        return fail(400, { message: error.message });
        // return fail(400, { message: (m as any)[errorKey]?.({}, { locale }) || error.message });
      }
      
      return fail(500, { message: m.unknownError({}, { locale } as any) });
    }
    //   await auth.api.signInEmail({
    //     body: { email, password }
    //   });

    //   return { success: true };
    // } catch (error) {
    //   const errorCode = (error as any).body?.code;
    //   const errorKey = `loginEmail:${errorCode}`;

    //   console.log(`TEST ERROR: ` + errorCode + " - " + error); // test
      

    //   if (errorCode === `INVALID_EMAIL_OR_PASSWORD`) {
    //     return fail(400, { message: (m as any)[errorKey]?.({}, { locale }) || m.unknownError({}, { locale } as any) });
    //   } else if (errorCode === `USER_NOT_FOUND`) {
    //     await auth.api.signUpEmail({
    //       body: { email, password, name }
    //     });

    //     return fail(400, {
    //       message: m.emailVerify({}, { locale } as any)
    //     });
    //   } else if (errorCode === `EMAIL_NOT_VERIFIED`) {
    //     await authClient.sendVerificationEmail({ email });
    //     return fail(400, {
    //       message: m.emailVerify({}, { locale } as any)
    //     });
    //   }

    //   if (error instanceof APIError) {
    //     return fail(400, { message: (m as any)[errorKey]?.({}, { locale }) || error.message });
    //   }

    //   return fail(500, { message: m.unknownError({}, { locale } as any) });
  },

  socialLogin: async (event) => {
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
        body: { email, redirectTo: `${process.env.FE_URL}/auth/reset-password` }});
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