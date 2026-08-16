import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: `https://o0.ingest.sentry.io/api/${viteEnv.SENTRY_ID}/otlp/v1/traces`,
    headers: { 'x-sentry-auth': `Sentry sentry_key=${viteEnv.SENTRY_KEY}` },
  }),
  instrumentations: [getNodeAutoInstrumentations()],
}).start();