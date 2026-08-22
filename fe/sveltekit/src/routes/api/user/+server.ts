import { and, db, eq, schema } from '$all/drizzle';
import { m } from '$paraglide/generated/messages';
import { json } from '@sveltejs/kit';
import { type RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, url }) => {
  const { loc, user } = locals;
  const x = url.searchParams.get(`x`);

  switch (x) {
    case `hasPass`: {
      return json(
        user && await db.query.account.findFirst({
          where: and(
            eq(schema.account.userId, user.id),
            eq(schema.account.providerId, 'credential')
          )
        }) ? true : false
      );
    }
  }
  
  return json({ msg: m.unknownError({}, { loc } as any) }, { status: 400 });
};