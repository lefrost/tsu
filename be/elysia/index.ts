import { dbDelete, dbGet, dbPatch, dbPost } from './core/db';
import { Elysia, t } from 'elysia';

const app = new Elysia()
  .guard({
    beforeHandle: ({ headers, set }) => { if (headers[`x-key`] !== process.env.BE_KEY) return (set.status === 401), `Unauthorized`; },
    headers: t.Object({ 'x-key': t.String() }),
  }, (app) => app
    .delete(`/`, dbDelete)
    .get(`/`, dbGet)
    .patch(`/`, dbPatch)
    .post(`/`, dbPost)
  ).listen(Number(process.env.BE_PORT));

console.log(`Elysia - ${process.env.BE_URL}`);

