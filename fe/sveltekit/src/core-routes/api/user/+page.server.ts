import { fileAdd, fileDel } from '$all/r2';
import { db, eq, schema } from '$all/drizzle';
import { m } from '$paraglide/generated/messages';
import { fail } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types'; // expected to be error in /core-routes
import { UserDetailsCreate } from '$all/zod';

const UserDetails = UserDetailsCreate({ userIconMbMax: viteEnv.USER_ICON_MB_MAX });

export const actions: Actions = {
  update: async (ev: RequestEvent) => {
    const { locals, request: req } = ev;
    const { loc, user } = locals;

    try {
      let iconFilek = user.iconFilek;

      const parse = UserDetails.safeParse(Object.fromEntries(await req.formData()));
      if (!parse.success) return fail(400, { msg: parse.error.issues[0].message });
      const { icon, iconPrevDel } = parse.data;
      
      if (user.iconFilek && iconPrevDel) {
        await fileDel({ k: user.iconFilek });
        iconFilek = null;
      }

      if (icon) {
        iconFilek = crypto.randomUUID();
        await fileAdd({
          body: Buffer.from(await icon.arrayBuffer()),
          k: iconFilek,
          type: icon.type
        });
      }

      if (iconFilek !== user.iconFilek) await db.update(schema.user)
        .set({ iconFilek })
        .where(eq(schema.user.id, user.id));
    } catch (er) {
      return fail(400, { msg: m.unknownError({}, { loc } as any) });
    }

    return { ok: true };
  }
}