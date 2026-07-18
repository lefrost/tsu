### Prerequisite setup (TBA)
- `bash <(curl -fsSL https://moonrepo.dev/install/proto.sh)`
- `proto install moon` 
- `proto pin moon latest`
- `powershell -c "irm bun.sh/install.ps1 | iex"`

### Boilerplate setup (TBA)
- `moon init`
- `pnpm dlx sv@0.16.3 create --template minimal --types ts --add prettier eslint vitest="usages:unit" tailwindcss="plugins:typography,forms" sveltekit-adapter="adapter:node" better-auth="demo:password,github" paraglide="languageTags:en, ja+demo:yes" drizzle="database:postgresql+postgresql:neon" --install pnpm`