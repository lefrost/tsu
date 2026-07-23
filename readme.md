**Tsu** is a fullstack web boilerplate with a customizable stack. (Currently a work-in-progress.)

- Select one folder from `/shelf/be` and `shelf/fe` respectively, and move it into `/be` and `/fe` respectively.
- Install: `moon run :install`
- Install with latest packages: `moon run :update`
- Initialize DB: `moon run :dbinit`
- Prepare DB patch: `moon run :dbgen`
- Execute DB patch: `moon run :dbup`
- Spin up: `moon run :dev`
- Build and preview: `moon run :build`
- (TBA~)

Tsu is contained in a [Moon](https://github.com/moonrepo/moon) monorepo and deployable to a [Fly machine](https://fly.io/docs/machines/) as a [Docker image](https://docs.docker.com/reference/dockerfile/). Frontend framework options are: [SvelteKit](https://github.com/sveltejs/kit) (using [pnpm](https://github.com/pnpm/pnpm) package management and a [Bun adapter](https://github.com/gornostay25/svelte-adapter-bun) for deployment); (TBA). Backend framework options are: [Elysia](https://github.com/elysiajs/elysia) (using [Bun](https://github.com/oven-sh/bun) runtime and package management); (TBA). All frontend frameworks independently use: [Better Auth](https://github.com/better-auth/better-auth) BFF user authentication with password resetting, TOTP 2FA, and [better-auth-localization](https://github.com/marcellosso/better-auth-localization) i18n; [Lucide](https://github.com/lucide-icons/lucide/) icons; [Nodemailer](https://github.com/nodemailer/nodemailer) SMTP; [Paraglide](https://github.com/opral/paraglide-js) i18n; [Shadcn](https://github.com/shadcn-ui/ui) UI components; [Tailwind](https://github.com/tailwindlabs/tailwindcss) CSS classes; (TBA). All backend frameworks independently use: (TBA). All stack variations use: [Drizzle](https://github.com/drizzle-team/drizzle-orm) ORM for a centralized [PostgreSQL](https://github.com/postgres/postgres) database deployed as a [Neon](https://github.com/neondatabase/neon) instance; [TypeScript](https://github.com/microsoft/typescript) in place of JavaScript; (TBA). Default user authentication options are: email + password; and SSO with [GitHub OAuth](https://better-auth.com/docs/authentication/github) and [Google OAuth](https://better-auth.com/docs/authentication/google). (TBA~)

Prerequisites:

- [Node](https://nodejs.org/en/download).
- Bun: `powershell -c "irm bun.sh/install.ps1 | iex"`
- Moon: `bash <(curl -fsSL https://moonrepo.dev/install/proto.sh) ; proto install moon ; proto pin moon latest`
- (TBA~)

QoL:

- [Ethereal](https://ethereal.email/) for SMTP testing.
- [Sherlock](https://github.com/opral/sherlock) for Paraglide management in [VS Code](https://github.com/microsoft/vscode).
- (TBA~)