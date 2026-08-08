import { fileAdd, fileAddUrlGet, fileGetUrlGet } from '$all/cloudflare';
import { Body } from '$core/types';
import { userGuard } from '$core/guard';
import { type Context, Elysia, status, t } from 'elysia';

export const routes = new Elysia()
  .use(userGuard)

  .post(`file-add-url`, async ({ body, userId }) => {
    const k = `user-${userId}-${crypto.randomUUID()}`;
    const url = await fileAddUrlGet(k, body.contentType);
    return { k, url };
  }, { body: Body })

  .get(`/file-get-url/:k`, async ({ params, set, userId }) => {
    const k = decodeURIComponent(params.k);
    if (!k.startsWith(`user-${userId}-`)) return status(403, `Forbidden`);
    return { url: await fileGetUrlGet(k) };
  })