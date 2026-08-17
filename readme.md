### (WIP) **Tsu** is a fullstack web boilerplate with a customizable stack.

Tsu is contained in a [Moon](https://github.com/moonrepo/moon) monorepo and deployable to a [Fly machine](https://fly.io/docs/machines/) as a [Docker image](https://docs.docker.com/reference/dockerfile/).

- Ensure prerequisites are installed (see "Prerequisite library" below): Git, Moon, Node, Pnpm.
- Select one folder from `/shelf/be` and `shelf/fe` respectively, and move it into `/be` and `/fe` respectively.
- Make adjustments within `/edge` of the selected `/be/~` and `/fe/~` folders, decoupled from boilerplate, barring documented edge cases.
- Install: `moon run :install`
- Install with latest packages: `moon run :update`
- Initialize DB: `moon run :dbinit`
- Spin up: `moon run :dev`
- Build and preview: `moon run :build`
- Run unit tests: `moon run :test`

For subsequent updates specifically:
- Prepare DB patch: `moon run :dbgen`
- Execute DB patch: `moon run :dbup`

### Frontend options:

| Directory | Client-side | Server-side | Status | Prerequisites | Local ingredients |
| --- | --- | --- | --- | --- | --- |
| fe/next | [React](https://github.com/react/react) | [Next](https://github.com/vercel/next.js) | TBA | - | - |
| fe/nuxt | [Vue](https://github.com/vuejs/core) | [Nuxt](https://github.com/nuxt/nuxt) | TBA | - | - |
| fe/sveltekit | [Svelte](https://github.com/sveltejs/svelte) | [SvelteKit](https://github.com/sveltejs/kit) | WIP | Node | [Bun adapter](https://github.com/gornostay25/svelte-adapter-bun) for deployment; [Svelte-put](https://github.com/vnphanquang/svelte-put) QR codes. |

### Backend options:

| Directory | Framework | Runtime | Status | Prerequistes | Local ingredients |
| --- | --- | --- | --- | --- | --- |
| be/actixweb | [Actix Web](https://github.com/actix/actix-web) | [Tokio](https://github.com/tokio-rs/tokio) ([Rust](https://github.com/rust-lang/rust)) | TBA | - | - |
| be/drogon | [Drogon](https://github.com/drogonframework/drogon) | C++ | TBA | - | - |
| be/elysia | [Elysia](https://github.com/elysiajs/elysia) | [Bun](https://github.com/oven-sh/bun) | WIP | Bun | Bun package management and websocket; [Bunqueue](https://github.com/egeominotti/bunqueue) job queueing. |
| be/fastapi | [FastAPI](https://github.com/fastapi/fastapi) | Python | TBA | - | - |
| be/fiber | [Fiber](https://github.com/gofiber/fiber) | [Go](https://github.com/golang/go) | TBA | - | - |
| be/laravel | [Laravel](https://github.com/laravel/laravel) | PHP | TBA | - | - |
| be/nest | [Nest](https://github.com/nestjs/nest) | [Node](https://github.com/nodejs/node) | TBA | - | - |
| be/rails | [Rails](https://github.com/rails/rails) | [Ruby](https://github.com/ruby/ruby) | TBA | - | - |
| be/springboot | [Spring Boot](https://github.com/spring-projects/spring-boot) | Java | TBA | - | - |

### Miscellaneous ingredients:

| Name | Usage | Purpose | Status |
| --- | --- | --- | --- |
| [Aiven](https://github.com/aiven) | All be | Kafka broker | WIP |
| [Better Auth](https://github.com/better-auth/better-auth) | All fe | BFF auth (credentials, SSO), password resetting, and TOTP 2FA | WIP |
| [Bunqueue](https://github.com/egeominotti/bunqueue) | be/elysia | Job queue | WIP |
| [Cloudflare R2](https://www.cloudflare.com/products/r2/) | All be | Object storage | WIP |
| [Docker](https://docs.docker.com/reference/dockerfile/) | All | Containerization as image for deployment | TBA |
| [Drizzle](https://github.com/drizzle-team/drizzle-orm) | All fe, be/elysia, be/nest | ORM for PostgreSQL | WIP |
| [Ethereal](https://ethereal.email/) | All | SMTP testing | Stable |
| [Fly](https://fly.io/docs/machines/) | All | Containerized deployment | TBA |
| [GitHub OAuth](https://better-auth.com/docs/authentication/github) | All fe | Better Auth default SSO option | WIP |
| [Google OAuth](https://better-auth.com/docs/authentication/google) | All fe | Better Auth default SSO option | WIP |
| [Hono](https://github.com/honojs/hono) | All fe | FE-embedded consumer API with OpenAPI and Scalar integration | WIP |
| [Kafka](https://github.com/apache/kafka) | All be | Event stream | WIP | 
| [Lucide](https://github.com/lucide-icons/lucide/) | All fe | Icons | WIP |
| [Moon](https://github.com/moonrepo/moon) | All | Monorepo | WIP |
| [Neon](https://github.com/neondatabase/neon) | All | PostgreSQL deployment | WIP |
| [Nodemailer](https://github.com/nodemailer/nodemailer) | All fe, be/elysia, be/nest | SMTP | WIP |
| [OpenAPI](https://github.com/oai/openapi-specification) | All be | API spec | WIP |
| [OpenTelemetry](https://github.com/open-telemetry) | All | Observability | WIP |
| [Paraglide](https://github.com/opral/paraglide-js) | All fe | i18n | WIP |
| [Pnpm](https://github.com/pnpm/pnpm) | All | Package management unless otherwise stated | Stable |
| [Polar](https://github.com/polarsource/polar) | All be | User billing and seats | TBA |
| [PostgreSQL](https://github.com/postgres/postgres) | All | Relational database | WIP |
| [Scalar](https://github.com/scalar/scalar) | All fe | Docs UI for AI spec | WIP |
| [Sequoia](https://github.com/Sequoia-Theme/vs-code) | All | Author's choice of theme for VS Code and Zed | Stable |
| [Sentry](https://github.com/getsentry/sentry) | All | Error tracking and performance monitoring via observability | WIP |
| [Shadcn](https://github.com/shadcn-ui/ui) | All fe | UI components | WIP |
| [Sherlock](https://github.com/opral/sherlock) | All | Paraglide management in VS Code | Stable |
| [Tailwind](https://github.com/tailwindlabs/tailwindcss) | All fe | CSS classes | WIP |
| [Tsgo](https://github.com/zed-extensions/tsgo) | All | Resource-efficient TypeScript compiler for Zed | Stable |
| [TypeScript](https://github.com/microsoft/typescript) | All fe, be/elysia, be/nest | Used in place of JavaScript | WIP |
| [Upstash](https://github.com/upstash/redis-js) | All | Redis client fro in-memory data storage | WIP | 
| [Vite](https://github.com/vitejs/vite) | All fe | Frontend build tool | WIP |
| [VS Code](https://github.com/microsoft/vscode) | All | Author's choice of touchscreen-compatible IDE | Stable |
| [Zed](https://github.com/zed-industries/zed) | All | Author's choice of resource-efficient IDE | Stable |
| [Zod](https://github.com/colinhacks/zod) | All fe, be/elysia, be/nest | Static types and schema validation | WIP |


### Prerequisite library:

- Bun: (In PowerShell) `powershell -c "irm bun.sh/install.ps1 | iex"`
- [Git](https://git-scm.com/install/).
- Moon: (In Bash) `bash <(curl -fsSL https://moonrepo.dev/install/proto.sh)`, `proto install moon ; proto pin moon latest`
- [Node](https://nodejs.org/en/download).
- Pnpm: (In PowerShell) `Invoke-WebRequest https://get.pnpm.io/install.ps1 -UseBasicParsing | Invoke-Expression`

### Footnotes:

- Unit tests are conducted for functions that house error potential detecable only at runtime and contain no asynchronous I/O.