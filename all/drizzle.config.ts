import { defineConfig } from 'drizzle-kit';

if (!process.env.NEON_URL) throw new Error('NEON_URL is not set');

export default defineConfig({
	schema: './src/schema.ts',
	dialect: 'postgresql',
	dbCredentials: { url: process.env.NEON_URL },
	verbose: true,
	strict: true
});
