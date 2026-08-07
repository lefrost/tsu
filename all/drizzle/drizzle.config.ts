import { defineConfig } from 'drizzle-kit';

if (!process.env.NEON_URL) throw new Error('NEON_URL is not set');

export default defineConfig({
	schema: `./drizzle/schema.ts`, // from /all root
	dialect: `postgresql`,
	dbCredentials: { url: process.env.NEON_URL },
	out: `./drizzle/generated`, // from /all root
	casing: `snake_case`,
	verbose: true,
	strict: true
});
