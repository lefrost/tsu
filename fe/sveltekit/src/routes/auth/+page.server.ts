import type { Actions, RequestEvent } from './$types';
import { auth } from '$lib/server/auth';
import { m } from '$paraglide/generated/messages';
import { fail, redirect } from '@sveltejs/kit';
import { translations } from '$all/fe/betterauth/i18n';

function erMsgGet(er: any, loc: string) {
  const locEntry = translations[loc as keyof typeof translations];
  const msg = locEntry?.[(er as any).body?.code as keyof typeof locEntry & string];
  console.log(er, loc, locEntry, msg); // test

  return msg || m.unknownError({}, { loc } as any)
}

export const actions: Actions = {
  emailLogin: async (ev: RequestEvent) => {
    const req = ev.request;
    const dat = await req.formData();
    const act = dat.get(`act`);
    const email = dat.get(`email`);
    const loc = dat.get(`loc`);
    const password = dat.get(`password`);

    try {
      if (act === `login`) {
        await auth.api.signInEmail({
          body: { email, password }
        });

      } else if (act === `signup`) {
        await auth.api.signUpEmail({
          body: { email, password, name: `` }
        });
      }

      return { ok: true };

    } catch (er) {
      console.log(er);
      return fail(400, { msg: erMsgGet(er, loc) });
    }
  },

  logout: async (ev: RequestEvent) => {
    const req = ev.request;
    const dat = await req.formData();
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
    const dat = await req.formData();
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
    const dat = await req.formData();
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
    const dat = await req.formData();
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
    const dat = await req.formData();
    const loc = dat.get(`loc`);
    const provider = dat.get(`provider`);

    let res;

    try {
      let res = await auth.api.linkSocialAccount({
        body: { provider },
        headers: req.headers,
      });

    } catch (er) {
      return fail(400, { msg: erMsgGet(er, loc) });
    }

    if (res && !(`error` in res) && `url` in res) return redirect(302, res.url);

    return fail(400, {
      msg: m.unknownError({}, { loc } as any)
    });
  },

  socialLogin: async (ev: RequestEvent) => {
    const req = ev.request;
    const dat = await req.formData();
    const callbackUrl = dat.get(`callbackUrl`) ?? `/`;
    const loc = dat.get(`loc`);
    const provider = dat.get(`provider`);

    let res;

    try {
      res = await auth.api.signInSocial({
        body: {
          provider: provider,
          callbackURL: callbackUrl,
          errorCallbackURL: `/auth/error`,
        }
      });

    } catch (er) {
      return fail(400, { msg: erMsgGet(er, loc) });
    }

    if (res?.url) return redirect(302, res.url);

    return fail(400, {
      er: m.unknownError({}, { loc } as any)
    });
  },

  socialUnlink: async (ev: RequestEvent) => {
    const req = ev.request;
    const dat = await req.formData();
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

  twofaDisable: async (ev: RequestEvent) => {
    const req = ev.request;
    const dat = await req.formData();
    const loc: string = dat.get(`loc`);
    const password: string = dat.get(`password`);

    try {
      await (auth.api as any).disableTwoFactor({
        body: { password },
        headers: req.headers
      });

      return { ok: true };

    } catch (er) {
      return fail(400, { msg: erMsgGet(er, loc) });
    }
  },

  twofaEnable: async (ev: RequestEvent) => {
    const req = ev.request;
    const dat = await req.formData();
    const password: string = dat.get(`password`);
    const loc: string = dat.get(`loc`);

    try {
      const res = await (auth.api as any).enableTwoFactor({
        body: { password, issuer: process.env.NAME },
        headers: req.headers
      });

      return {
        ok: true,
        totpUri: res.totpUri?.toString(),
        backupCodes: res.backupCodes ?? []
      }

    } catch (er) {
      return fail(400, { msg: erMsgGet(er, loc) });
    }
  },

  twofaVerify: async (ev: RequestEvent) => {
    const req = ev.request;
    const dat = await req.formData();
    const loc: string = dat.get(`loc`);

    try {
      // tba: with standalone page to input 2fa code and call this function as part of login ux; add 2fa intercept in emailLogin and socialLogin

    } catch (er) {
      return fail(400, { msg: erMsgGet(er, loc) });
    }
  },
};
