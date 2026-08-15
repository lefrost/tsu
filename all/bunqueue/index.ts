import { Bunqueue } from 'bunqueue/client';

export async function jobRun({dat, interval = 0, k, job }: {
  dat: Record<string, unknown>,
  interval?: number,
  k: string,
  job: Bunqueue
}) {
  if (interval > 0) await job.every(k, interval, dat);
  else await job.add(k, dat);
}

export function jobMake({ fn, k, size }: {
  fn: (...args: unknown[]) => unknown,
  k: string,
  size?: number,
}) {
  return new Bunqueue(k, {
    concurrency: size ?? 1,
    embedded: true,
    processor: (job) => fn(job.data)
  });
}