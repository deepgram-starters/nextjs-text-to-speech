# Next.js Text-to-Speech

This starter serves the pinned `text-to-speech-html` frontend as its user interface. Next.js is an API-only backend and keeps `DEEPGRAM_API_KEY` on the server.

## Architecture

- `frontend/` is the shared Vite frontend, served at `http://localhost:8080` in development.
- Next.js serves `GET /api/session`, `GET /api/metadata`, and `POST /api/text-to-speech` at `http://localhost:8081`.
- In production, Caddy serves `frontend/dist` and proxies `/api/*` to Next.js on port 8081.

## Local Development

```sh
git submodule update --init --recursive
corepack pnpm install --frozen-lockfile
cd frontend && corepack pnpm install --frozen-lockfile && cd ..
cp sample.env.local .env.local
# Set DEEPGRAM_API_KEY in .env.local
make start
```

Open http://localhost:8080. To build both production artifacts, run `make build`.

## Production

Build with `docker build -f deploy/Dockerfile -t nextjs-text-to-speech .`. The container exposes Caddy on port 8080 and runs the API backend internally on port 8081.

## License

MIT - See [LICENSE](./LICENSE).
