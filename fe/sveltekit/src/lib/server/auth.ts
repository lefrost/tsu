import { env } from '$env/dynamic/private';
import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';

export const auth = betterAuth({
	baseURL: env.FE_URL,
	secret: env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, { provider: `pg` }),
	emailAndPassword: { enabled: true },
	socialProviders: {
		github: {
			clientId: env.GITHUB_CLIENT_ID as string,
			clientSecret: env.GITHUB_CLIENT_SECRET as string
		},
		google: {
			clientId: env.GOOGLE_CLIENT_ID as string,
			clientSecret: env.GOOGLE_CLIENT_SECRET as string
		}
	},
	plugins: [
		sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
	],
	user: {
		fields: {
			createdAt: `created`,
			updatedAt: `updated`,
		}
	},
	session: {
		fields: {
			createdAt: `created`,
			updatedAt: `updated`,
		}
	},
	account: {
		fields: {
			accessTokenExpiresAt: `accessTokenExpires`,
			createdAt: `created`,
			refreshTokenExpiresAt: `refreshTokenExpires`,
			updatedAt: `updated`,
		}
	},
	verification: {
		fields: {
			createdAt: `created`,
			expiresAt: `expires`,
			updatedAt: `updated`,
		}
	}
});
