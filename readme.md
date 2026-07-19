**Tsu** is a fullstack web boilerplate with a customizable stack. (Currently a work-in-progress.)

- Install: `moon run :install`
- Initialize DB: `moon run :dbinit`
- Prepare DB patch: `moon run :dbgen`
- Execute DB patch: `moon run :dbup`
- Spin up: `moon run :dev`
- Build and preview: `moon run :build`
- (TBA~)

Tsu is contained in a [Moon](https://github.com/moonrepo/moon) monorepo and deployable to a [Fly machine](https://fly.io/docs/machines/) as a [Docker image](https://docs.docker.com/reference/dockerfile/). Frontend framework options are [SvelteKit](https://github.com/sveltejs/kit) (using [pnpm](https://github.com/pnpm/pnpm) package management and a [Bun adapter](https://github.com/gornostay25/svelte-adapter-bun) for deployment), (TBA). Backend framework options are [Elysia](https://github.com/elysiajs/elysia) (using [Bun](https://github.com/oven-sh/bun) runtime and package management), (TBA). Frontend frameworks use [Better Auth](https://github.com/better-auth/better-auth) BFF authentication, [Lucide](https://github.com/lucide-icons/lucide/) icons, [Paraglide](https://github.com/opral/paraglide-js) i18n, [Shadcn](https://github.com/shadcn-ui/ui) UI components, [Tailwind](https://github.com/tailwindlabs/tailwindcss) CSS classes, (TBA). Backend frameworks use (TBA). All frameworks use [TypeScript](https://github.com/microsoft/typescript) where possible, a centralized [PostgreSQL](https://github.com/postgres/postgres) database deployed as a [Neon](https://github.com/neondatabase/neon) instance with [Drizzle](https://github.com/drizzle-team/drizzle-orm) ORM, (TBA). (TBA~)
