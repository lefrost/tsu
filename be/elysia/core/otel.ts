import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import * as Sentry from '@sentry/bun';

new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: `https://o0.ingest.sentry.io/api/${process.env.SENTRY_ID}/otlp/v1/traces`,
    headers: { 'x-sentry-auth': `Sentry sentry_key=${process.env.SENTRY_KEY}` },
  }),
  instrumentations: [getNodeAutoInstrumentations()],
}).start();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0
});