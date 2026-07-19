import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

if (!process.env.NEON_URL) throw new Error('NEON_URL is not set');

const client = neon(process.env.NEON_URL);

export const db = drizzle(client, { schema });
