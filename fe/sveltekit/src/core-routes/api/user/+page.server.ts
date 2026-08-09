import { fileAdd, fileDel } from '$all/cloudflare';
import { db } from '$all/drizzle';
import { m } from '$paraglide/generated/messages';
import { fail } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types'; // expected to be error in /core-routes
import { UserDetails } from '$all/zod';

export const actions: Actions = {
  update: async (ev: RequestEvent) => {
    const { locals, request: req } = ev;
    const { loc, user } = locals;

    try {
      let iconk = user.icon;

      const parse = UserDetails.safeParse(Object.fromEntries(await req.formData()));
      if (!parse.success) return fail(400, { msg: parse.error.issues[0].message });
      const { icon, iconPrevDel } = parse.data;
      
      if (user.icon && (icon || iconPrevDel)) {
        await fileDel({ k: user.icon });
        iconk = null;
      }

      if (icon) {
        iconk = crypto.randomUUID();
        await fileAdd({
          body: Buffer.from(await icon.arrayBuffer()),
          k: iconk,
          type: icon.type
        });
      }

      // tba: db.update
    } catch (er) {
      return fail(400, { msg: m.unknownError({}, { loc } as any) });
    }

    return { ok: true };
  }
}