import { z } from 'zod';

const dbDeleteBody = z.object({
  key: z.string(),
  table: z.string(),
  val: z.string()
});

export type DbDeleteBody = z.infer<typeof dbDeleteBody>;