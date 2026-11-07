# syntax=docker/dockerfile:1
#
# QUAN TRỌNG: context build PHẢI là root repo, vì image cần packages/shared.
#    docker build -f backend/Dockerfile -t bep-api .
#
# Build từ trong backend/ sẽ lỗi "COPY packages/shared: not found".
# Đây là cái bẫy phổ biến nhất của monorepo JS.

# ---------- 1. Cài dependency ----------
FROM node:24-alpine AS deps
WORKDIR /app

# Chỉ copy manifest trước để tận dụng layer cache: sửa source không phải npm install lại.
COPY package.json ./
COPY packages/shared/package.json packages/shared/
COPY backend/package.json backend/

RUN npm install \
      --workspace @bepnhaminh/shared \
      --workspace backend \
      --include-workspace-root \
      --no-audit --no-fund

# ---------- 2. Build ----------
FROM deps AS build
WORKDIR /app

COPY tsconfig.base.json ./
COPY packages/shared packages/shared
COPY backend backend

RUN npm run build -w @bepnhaminh/shared \
 && npm run db:generate -w backend \
 && npm run build -w backend

# ---------- 3. Runtime ----------
FROM node:24-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production

COPY package.json ./
COPY packages/shared/package.json packages/shared/
COPY backend/package.json backend/

RUN npm install --omit=dev \
      --workspace @bepnhaminh/shared \
      --workspace backend \
      --include-workspace-root \
      --no-audit --no-fund \
 && npm cache clean --force

COPY --from=build /app/packages/shared/dist packages/shared/dist
COPY --from=build /app/backend/dist backend/dist
COPY --from=build /app/node_modules/.prisma node_modules/.prisma
COPY --from=build /app/node_modules/@prisma node_modules/@prisma
COPY backend/prisma backend/prisma

RUN chown -R node:node /app
USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "backend/dist/server.js"]
