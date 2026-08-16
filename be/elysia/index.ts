import { routes as cloudRoutes } from '$core/cloud';
import { keyGuard } from '$core/guard';
import { ws } from '$core/ws';
import { Elysia, t } from 'elysia';
import { edge } from '$edge/index';

new Elysia()
  .use(keyGuard)
  .use(cloudRoutes)
  .use(ws)
  .use(edge)
  .listen(Number(process.env.BE_PORT));

console.log(`Elysia - ${process.env.BE_URL}`);