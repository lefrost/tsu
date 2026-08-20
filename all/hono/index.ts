import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';

const res = (schema: z.ZodType) => ({
  200: {
    content: { 'application/json': { schema } },
    description: `ok`
  }
})

export const hono = new OpenAPIHono();

hono.use(`/client/*`, async (ctx, next) => {
  if (ctx.req.header(`apik`) !== process.env.CLIENT_KEY) return ctx.json({ error: `Unauthorized` }, 401)
  await next()
});

hono.openapi(createRoute({
  method: `get`,
  path: `/client`,
  // request
  responses: res(z.literal(`Client API`))
}), async (ctx) => {
  return ctx.json(`Client API`);
});

hono.doc(`/client/openapi.json`, {
  openapi: `3.0.0`,
  info: {
    title: `Client API`,
    version: `0.0.1`
  }
});

hono.get(`/client/docs`, Scalar({ spec: { url: '/client/openapi.json' } }));