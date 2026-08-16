import type { User, Session } from 'better-auth';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			loc: string,
			sesh?: Session;
			user?: User;
		}

		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare const viteEnv: {
  FE_URL: string;
  R2_PUBLIC_URL: string;
  SENTRY_DSN: string;
	USER_ICON_MB_MAX: string;
};

export {};
