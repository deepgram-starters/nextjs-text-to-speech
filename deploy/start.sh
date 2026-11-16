#!/bin/sh
set -e

if [ -z "${SESSION_SECRET:-}" ]; then
  SESSION_SECRET="$(node -e "process.stdout.write(require('node:crypto').randomBytes(32).toString('hex'))")"
  export SESSION_SECRET
fi

corepack pnpm run start &
exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile
