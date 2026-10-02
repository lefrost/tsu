import { and, db, eq, schema } from '$all/drizzle';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, url }) => {
  const { user } = locals;
  if (!user) return json(false, { status: 401 });

  if (url.searchParams.get(`x`) === `hasPass`) {
    const acc = await db.query.account.findFirst({
      where: and(
        eq(schema.account.userId, user.id),
        eq(schema.account.providerId, `credential`)
      )
    });
    return json(!!acc);
  }

  return json(null, { status: 400 });
};