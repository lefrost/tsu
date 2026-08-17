import { Kafka } from 'kafkajs'

const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER_URL!],
  ssl: process.env.ENVIRONMENT === `prod`,
  sasl: process.env.ENVIRONMENT === `prod` ? {
    mechanism: `plain`,
    username: process.env.KAFKA_KEY!,
    password: process.env.KAFKA_SECRET!
  } : undefined
});

const producer = kafka.producer()
await producer.connect()

export async function msgAdd({ d, topick }: {
  d: Record<string, unknown>,
  topick: `topic-${1|2|3|4|5}`
}) {
  await producer.send({
    messages: [{ value: JSON.stringify(d) }],
    topic: topick
  });
}

/* example usage:
  app.post(`/order`, async ({ body }) => {
    await msgAdd({
      d: {
        ...body,
        type: `orderConfirmation`
      },
      topick: `topic-1`
    });
    return { ok: true };
  })
*/

export async function msgsListen({ fn, groupk, topick }: {
  fn: (payload: Record<string, unknown>) => Promise<void>,
  groupk: string,
  topick: `topic-${1|2|3|4|5}`
}) {
  const consumer = kafka.consumer({ groupId: groupk });
  await consumer.connect();
  await consumer.subscribe({ topic: topick });
  await consumer.run({
    eachMessage: async ({ message }) => {
      await fn(JSON.parse(message.value!.toString()))
    }
  });
}

/* example usage:
  msgsListen({
    fn: async (payload) => {
      if (payload.type === `orderConfirmation`) await sendEmail(payload);
      if (payload.type === `passwordReset`) await sendResetEmail(payload);
    },
    groupk: `emailService`,
    topick: `topic-1`
  });
*/