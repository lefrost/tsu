import type { User } from 'better-auth';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { twoFactor } from 'better-auth/plugins';
import { db } from '../drizzle';
import nodemailer from 'nodemailer';
import { m } from '$paraglide/generated/messages';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
});

const socialProviders = {
  github: {
    clientId: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
  }
};

export const authConfig = {
  appName: process.env.NAME,
  baseURL: process.env.FE_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, { provider: `pg` }),
  emailAndPassword: {
    enabled: true,
    async sendResetPassword({ url, user }: { url: string, user: User }) {
      await transporter.sendMail({
        html: `<a href="${url}">${m.passwordReset()}</a>`,
        subject: m.passwordReset(),
        to: user.email
      });
    }
  },
  emailVerification: {
    callbackURL: encodeURIComponent(`/?email-verified=true`),
    enabled: true,
    sendOnSignUp: true,
    async sendVerificationEmail({ url, user }: { url: string, user: User }) {
      await transporter.sendMail({
        html: `<a href="${url}">${m.emailVerify()}</a>`,
        subject: m.emailVerify(),
        to: user.email
      });
    }
  },
  plugins: [
    twoFactor() as any
  ],
  socialProviders,
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: Object.keys(socialProviders)
    },
    fields: {
      accessTokenExpiresAt: `access_token_expires`,
      createdAt: `created`,
      refreshTokenExpiresAt: `refresh_token_expires`,
      updatedAt: `updated`
    }
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    freshAge: 0,
    updateAge: 60 * 60 * 24 * 1, // 1 day
    fields: {
      createdAt: `created`,
      expiresAt: `expires`,
      updatedAt: `updated`
    }
  },
  user: {
    changeEmail: { enabled: true },
    fields: {
      createdAt: `created`,
      image: `iconk`,
      updatedAt: `updated`
    }
  },
  verification: {
    fields: {
      createdAt: `created`,
      expiresAt: `expires`,
      updatedAt: `updated`
    }
  }
};

export const auth = betterAuth(authConfig);