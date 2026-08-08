import { Bunqueue, Job, Queue } from 'bunqueue/client';

export async function jobAdd(
  dat: Record<string, unknown>,
  k: string,
  queue: Queue
) {
  await queue.add(k, dat);
}

export function queueMake(
  fn: (...args: unknown[]) => unknown,
  k: string,
  size?: number,
  timeout?: number
) {
  return new Bunqueue(k, {
    batch: {
      processor: (job: typeof Job) => fn(job.data),
      size: size ?? 1,
      timeout: timeout ?? 0,
    },
    embedded: true,
  });
}