**Tsu** is a fullstack web boilerplate with a customizable stack. (Currently a work-in-progress.)

- Install: `moon run :install`
- Install with latest packages: `moon run :update`
- Initialize DB: `moon run :dbinit`
- Prepare DB patch: `moon run :dbgen`
- Execute DB patch: `moon run :dbup`
- Spin up: `moon run :dev`
- Build and preview: `moon run :build`
- (TBA~)

Tsu is contained in a [Moon](https://github.com/moonrepo/moon) monorepo and deployable to a [Fly machine](https://fly.io/docs/machines/) as a [Docker image](https://docs.docker.com/reference/dockerfile/). Frontend framework options are [SvelteKit](https://github.com/sveltejs/kit) (using [pnpm](https://github.com/pnpm/pnpm) package management and a [Bun adapter](https://github.com/gornostay25/svelte-adapter-bun) for deployment), (TBA). Backend framework options are [Elysia](https://github.com/elysiajs/elysia) (using [Bun](https://github.com/oven-sh/bun) runtime and package management), (TBA). All frontend frameworks independently use [Lucide](https://github.com/lucide-icons/lucide/) icons, [Paraglide](https://github.com/opral/paraglide-js) i18n, [Shadcn](https://github.com/shadcn-ui/ui) UI components, [Tailwind](https://github.com/tailwindlabs/tailwindcss) CSS classes, (TBA). All backend frameworks independently use (TBA). All stack variations use [TypeScript](https://github.com/microsoft/typescript) in place of JavaScript, [Better Auth](https://github.com/better-auth/better-auth) frontend-BFF authentication, a centralized [PostgreSQL](https://github.com/postgres/postgres) database deployed as a [Neon](https://github.com/neondatabase/neon) instance with [Drizzle](https://github.com/drizzle-team/drizzle-orm) ORM, (TBA). Default user authentication options are email + password, and SSO with [GitHub OAuth](https://better-auth.com/docs/authentication/github) and [Google OAuth](https://better-auth.com/docs/authentication/google). (TBA~)
