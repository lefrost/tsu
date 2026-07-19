import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db';

export const authConfig = {
  baseURL: Bun.env.FE_URL,
  secret: Bun.env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, { provider: `pg` }),
  emailAndPassword: { enabled: true },
  socialProviders: {
    github: {
      clientId: Bun.env.GITHUB_CLIENT_ID as string,
      clientSecret: Bun.env.GITHUB_CLIENT_SECRET as string
    },
    google: {
      clientId: Bun.env.GOOGLE_CLIENT_ID as string,
      clientSecret: Bun.env.GOOGLE_CLIENT_SECRET as string
    }
  },
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
};

export const auth = betterAuth(authConfig);