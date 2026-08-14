import { Bunqueue, Job } from 'bunqueue/client';

export async function jobRun({dat, interval = 0, k, job }: {
  dat: Record<string, unknown>,
  interval?: number,
  k: string,
  job: Bunqueue
}) {
  if (interval > 0) await job.every(k, interval, dat);
  else await job.add(k, dat);
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