import * as schema from '$all/drizzle/schema';
import { db, eq } from '$all/drizzle/instance';
import type { DbDeleteBody } from '$all/zod/types';
import type { Context } from 'elysia';

export async function dbDelete ({ body }: Context<{ body: DbDeleteBody }>) {
  const table = (schema as Record<string, any>)[body.table];
  await db.delete(table).where(eq(table[body.key], body.val));
}

export async function dbGet (ctx: Context) {
  // tba: get from db on query params
}

export async function dbPatch (ctx: Context) {
  // tba: update in db based on query params
}

export async function dbPost (ctx: Context) {
  // tba: create in db based on query params
}
