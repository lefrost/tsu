import { defineConfig } from 'drizzle-kit';

console.log(process.env.NEON_URL);

if (!process.env.NEON_URL) throw new Error('NEON_URL is not set');

export default defineConfig({
	schema: './fe/drizzle/schema.ts',
	dialect: 'postgresql',
	dbCredentials: { url: process.env.NEON_URL },
	out: './fe/drizzle',
	verbose: true,
	strict: true
});
