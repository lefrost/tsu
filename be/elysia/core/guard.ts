import { type Context, Elysia, status } from 'elysia';
import { jwt } from "@elysiajs/jwt";

export const keyGuard = new Elysia()
  .derive(async ({ headers, set }) => {
    const key = headers[`apik`];
    if (key !== process.env.BE_KEY) return status(401, `Unauthorized`);
    return {};
  }).as(`scoped`);

export const userGuard = new Elysia()
  .use(jwt({ name: `jwt`, secret: process.env.JWT_SECRET! }))
  .derive(async ({ jwt, headers, set }) => {
    const token = headers.authorization?.replace(`Bearer `, ``);
    const payload = token && await jwt.verify(token);
    if (!payload) return status(401, `Unauthorized`);
    return { userId: payload.sub as string };
  }).as(`scoped`);