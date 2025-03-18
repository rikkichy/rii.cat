FROM oven/bun:latest AS builder
WORKDIR /usr/src/nuxt-app
COPY package*.json ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM oven/bun:latest-slim
WORKDIR /usr/src/nuxt-app
COPY --from=builder /usr/src/nuxt-app/.output ./.output
COPY --from=builder /usr/src/nuxt-app/public ./public
ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
EXPOSE 3000
ENTRYPOINT ["bun", "run", ".output/server/index.mjs"]