import { m } from '$paraglide/generated/messages';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types'; // expected to be error in /core-routes

export const actions: Actions = {
  update: async (ev: RequestEvent) => {
    const { locals, request: req } = ev;
    const { loc, user } = locals;
    const dat = await req.formData();

    try {
      // tba: update user details

    } catch (er) { return fail(400, { msg: m.unknownError({}, { loc } as any) }); }

    return { ok: true };
  }
}