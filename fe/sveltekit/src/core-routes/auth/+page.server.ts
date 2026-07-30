import type { Actions, RequestEvent } from './$types';
import { auth } from '$lib/server/auth';
import { m } from '$paraglide/generated/msgs';
import { fail, redirect } from '@sveltejs/kit';
import { translations } from '$all/fe/betterauth/i18n';

function erMsgGet(error: any, loc: string) {
  const locEntry = translations[loc as keyof typeof translations];
  const msg = locEntry?.[(error as any).body?.code as keyof typeof locEntry & string];

  return msg
    || (error as any).msg
    || m.unknownError({}, { loc } as any)
}

export const actions: Actions = {
  emailLogin: async (ev: RequestEvent) => {
    const req = ev.request;
    const dat = await req.data();
    const action = dat.get(`action`);
    const email = dat.get(`email`);
    const loc = dat.get(`loc`);
    const name = dat.get(`name`);
    const password = dat.get(`password`);

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

      return { ok: true };

    } catch (er) {
      return fail(400, { msg: erMsgGet(er, loc) });
    }
  },

  logout: async (ev: RequestEvent) => {
    const req = ev.request;
    const dat = await req.data();
    const loc = dat.get(`loc`);

    try {
      await auth.api.signOut({
        headers: req.headers
      });

      return { ok: true };

    } catch (er) {
      return fail(400, { msg: erMsgGet(er, loc) });
    }
  },

  emailVerificationResend: async (ev: RequestEvent) => {
    const req = ev.request;
    const dat = await req.data();
    const email = dat.get(`email`);
    const loc = dat.get(`loc`);

    try {
      await auth.api.sendVerificationEmail({
        body: { email },
        headers: req.headers
      });

      return { ok: true };

    } catch (error) {
      return fail(400, { msg: erMsgGet(error, loc) });
    }
  },

  passwordForgot: async (ev: RequestEvent) => {
    const req = ev.request;
    const dat = await req.data();
    const email = dat.get(`email`);
    const loc = dat.get(`loc`);

    try {
      await auth.api.requestPasswordReset({
        body: {
          email,
          redirectTo: `${process.env.FE_URL}/auth/reset-password`
        }
      });

      return { ok: true };

    } catch (er) {
      return fail(400, { msg: erMsgGet(er, loc) });
    }
  },

  passwordReset: async (ev: RequestEvent) => {
    const req = ev.request;
    const dat = await req.data();
    const loc = dat.get(`loc`);
    const password = dat.get(`password`);
    const token = dat.get(`token`);

    try {
      await auth.api.resetPassword({
        body: {
          newPassword: password,
          token
        }
      });

    } catch (er) {
      return fail(400, { msg: erMsgGet(er, loc) });
    }

    return redirect(302, `/`);
  },

  socialLink: async (ev: RequestEvent) => {
    const req = ev.request;
    const dat = await req.data();
    const loc = dat.get(`loc`)?.toString();
    const provider = dat.get(`provider`)?.toString();;

    try {
      let res = await auth.api.linkSocialAccount({
        body: { provider },
        headers: req.headers,
      });

      if (res && !(`error` in res) && `url` in res) return redirect(302, res.url);

      return fail(400, {
        msg: m.unknownError({}, { loc } as any)
      });

    } catch (er) {
      return fail(400, { msg: erMsgGet(er, loc) });
    }
  },

  socialLogin: async (ev: RequestEvent) => {
    const req = ev.request;
    const dat = await req.data();
    const callbackUrl = dat.get(`callbackUrl`) ?? `/`;
    const loc = dat.get(`loc`)?.toString();
    const provider = dat.get(`provider`);

    try {
      let res = await auth.api.signInSocial({
        body: {
          provider: provider,
          callbackURL: callbackUrl,
          errorCallbackURL: `/auth/error`,
        }
      });

      if (res?.url) return redirect(302, res.url);

      return fail(400, {
        er: m.unknownError({}, { loc } as any)
      });

    } catch (er) {
      return fail(400, { msg: erMsgGet(er, loc) });
    }
  },

  socialUnlink: async (ev: RequestEvent) => {
    const req = ev.request;
    const dat = await req.data();
    const loc = dat.get(`loc`);
    const provider = dat.get(`provider`);

    try {
      await auth.api.unlinkAccount({
        body: { providerId: provider },
        headers: req.headers,
      });

      return { ok: true };

    } catch (er) {
      return fail(400, { msg: erMsgGet(er, loc) });
    }
  },

  twoFactorDisable: async (ev: RequestEvent) => {
    const req = ev.request;
    const dat = await req.data();
    const loc: string = dat.get(`loc`)?.toString();

    try {
      // tba

    } catch (er) {
      return fail(400, { msg: erMsgGet(er, loc) });
    }
  },

  twoFactorEnable: async (ev: RequestEvent) => {
    const req = ev.request;
    const dat = await req.data();
    const password: string = dat.get(`password`)?.toString();
    const loc: string = dat.get(`loc`)?.toString();

    try {
      const result = await (auth.api as any).enableTwoFactor({
        body: { password, issuer: process.env.NAME },
        headers: req.headers
      });

      return {
        ok: true,
        totpUri: result.totpUri?.toString(),
        backupCodes: result.backupCodes ?? []
      }

    } catch (er) {
      return fail(400, { msg: erMsgGet(er, loc) });
    }
  },

  twoFactorGenerate: async (ev: RequestEvent) => {
    const req = ev.request;
    const dat = await req.data();
    const loc: string = dat.get(`loc`)?.toString();

    try {
      // tba

    } catch (er) {
      return fail(400, { msg: erMsgGet(er, loc) });
    }
  },

  twoFactorVerify: async (ev: RequestEvent) => {
    const req = ev.request;
    const dat = await req.data();
    const loc: string = dat.get(`loc`)?.toString();

    try {
      // tba: with standalone page to input 2fa code and call this function as part of login ux

    } catch (er) {
      return fail(400, { msg: erMsgGet(er, loc) });
    }
  },
};
