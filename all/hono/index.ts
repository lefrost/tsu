import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';

const res = (schema: z.ZodType) => ({
  200: {
    content: { 'application/json': { schema } },
    description: `ok`
  }
})

export const hono = new OpenAPIHono();

hono.use(`/api/*`, async (ctx, next) => {
  if (ctx.req.header(`apik`) !== process.env.API_KEY) return ctx.json({ error: `Unauthorized` }, 401)
  await next()
});

hono.openapi(createRoute({
  method: `get`,
  path: `/api`,
  // request
  responses: res(z.literal(`Consumer API`))
}), async (ctx) => {
  return ctx.json(`Consumer API`);
});

hono.doc(`/api/openapi.json`, {
  openapi: `3.0.0`,
  info: {
    title: `Consumer API`,
    version: `0.0.1`
  }
});

hono.get(`/docs`, Scalar({ spec: { url: '/api/openapi.json' } }));