import type { User } from 'better-auth';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../drizzle/instance';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
});

export const authConfig = {
  baseURL: process.env.FE_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, { provider: `pg` }),
  emailAndPassword: {
    enabled: true,
    async sendResetPassword(data: { user: User; url: string; token: string }) {
      await transporter.sendMail({
        to: data.user.email,
        subject: `Reset your password`,
        html: `<a href="${data.url}">Reset password</a>`,
      });
    }
  },
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