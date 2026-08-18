import { routes as cloudRoutes } from '$core/cloud';
import { keyGuard } from '$core/guard'
import { routes as polarRoutes } from '$core/polar';
import '$core/otel';
import { ws } from '$core/ws';
import { Elysia, t } from 'elysia';
import { edge } from '$edge/index';
import * as Sentry from '@sentry/bun';

new Elysia()
  .use(polarRoutes) // before keyGuard
  .use(keyGuard)
  .use(cloudRoutes)
  .use(ws)
  .use(edge)
  .onError(({ error }) => Sentry.captureException(error))
  .listen(Number(process.env.BE_PORT));

console.log(`Elysia - ${process.env.BE_URL}`);