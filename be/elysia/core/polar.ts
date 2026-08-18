import { polarWebhookHandle } from '$all/polar';
import { Elysia } from 'elysia';

export const routes = new Elysia()
  .post(`/polar/webhook`, async ({ headers, request: req }) => {
    await polarWebhookHandle({
      headers: headers as Record<string, string>,
      rawBody: await req.text()
    });
    return { ok: true };
  }, { parse: `none` });