import { defineConfig } from 'drizzle-kit';

if (!Bun.env.NEON_URL) throw new Error('NEON_URL is not set');

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: { url: Bun.env.NEON_URL },
	verbose: true,
	strict: true
});
