import { fileAddUrlGet, fileGetUrlGet } from '$all/r2';
import { userGuard } from '$core/guard';
import { Body } from '$core/types';
import { Elysia, status } from 'elysia';

export const routes = new Elysia()
  .use(userGuard)

  .post(`/file-add-url-get`, async ({ body, userId }) => {
    const k = `user-${userId}-${crypto.randomUUID()}`;
    const url = await fileAddUrlGet({ k, type: body.contentType });
    return { k, url };
  }, { body: Body })

  .get(`/file-get-url-gte/:k`, async ({ params, userId }) => {
    const k = decodeURIComponent(params.k);
    if (!k.startsWith(`user-${userId}-`)) return status(403, `Forbidden`);
    return { url: await fileGetUrlGet({ k }) };
  })