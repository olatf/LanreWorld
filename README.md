# LANREWORLD links

Link-in-bio page. Next.js 15, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Biome, Bun.

## Run locally
```bash
bun install        # also installs the Git hooks (Husky)
bun dev            # http://localhost:3000
bun run lint       # Biome check
bun run lint:fix   # Biome auto-fix + import sorting
bun run typecheck
bun test
```

## What updates automatically
The profile picture and the 5 latest YouTube videos are fetched from the channel's public page and
feed (`lib/youtube.ts`) and cached for an hour, so new uploads appear without a redeploy.
If YouTube is unreachable, the page falls back to a monogram and hides the video section.
Set `YOUTUBE_CHANNEL_ID` (see `.env.example`) to skip the @handle lookup.

## Edit content
Text, links and the Apple Music player live in `lib/site.ts`. Put local images in `public/`
(e.g. `public/profile.jpg`) and reference them as `/profile.jpg`.

## Git hooks
- `pre-commit`: Biome check and auto-fix on staged files (lint-staged)
- `commit-msg`: Conventional Commits, e.g. `feat: add booking link`, `fix: correct date format`
- `pre-push`: typecheck and tests
- CI (`.github/workflows/ci.yml`) runs lint, typecheck, tests and build on every push and PR.

If a hook says `bunx: command not found` (common in GUI Git clients), add Bun to the PATH in
`~/.config/husky/init.sh`, e.g. `export PATH="$HOME/.bun/bin:$PATH"`.

## Deploy on Vercel
Import the GitHub repo at vercel.com/new. Every push to `main` redeploys.
To let anyone view the site: Project Settings, Deployment Protection, turn Vercel Authentication
off for production.
