#!/bin/sh
set -e

echo "Running Prisma migrate deploy..."
npx prisma migrate deploy

exec "$@"

