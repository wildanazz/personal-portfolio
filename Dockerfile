FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN \
    if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 wildanazz
COPY --from=builder /app/public ./public
COPY --from=builder --chown=wildanazz:nodejs /app/.next/standalone ./
COPY --from=builder --chown=wildanazz:nodejs /app/.next/static ./.next/static
USER wildanazz
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
