import { Bunqueue, Job, Queue } from 'bunqueue/client';

export async function jobRun({dat, k, job }: {
  dat: Record<string, unknown>,
  k: string,
  job: Queue
}) {
  await job.add(k, dat);
}

export function jobMake({ fn, k, size, timeout }: {
  fn: (...args: unknown[]) => unknown,
  k: string,
  size?: number,
  timeout?: number
}) {
  return new Bunqueue(k, {
    batch: {
      processor: (job: typeof Job) => fn(job.data),
      size: size ?? 1,
      timeout: timeout ?? 0,
    },
    embedded: true,
  });
}