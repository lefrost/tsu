import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db';

export const authConfig = {
  baseURL: process.env.FE_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, { provider: `pg` }),
  emailAndPassword: { enabled: true },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
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