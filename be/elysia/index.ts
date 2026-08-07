import { Elysia, t } from 'elysia';
import { edge } from '$edge/index';

new Elysia()
  .guard({
    beforeHandle: ({ headers, set }) => { if (headers[`x-key`] !== process.env.BE_KEY) return (set.status === 401), `Unauthorized`; },
    headers: t.Object({ 'x-key': t.String() }),
  }, (app) => app.use(edge)
  ).listen(Number(process.env.BE_PORT));

console.log(`Elysia - ${process.env.BE_URL}`);