FROM oven/bun:latest AS builder
WORKDIR /usr/src/nuxt-app
COPY package*.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun x nuxi generate

FROM oven/bun:latest
WORKDIR /usr/src/nuxt-app
COPY --from=builder /usr/src/nuxt-app/.output ./.output
COPY --from=builder /usr/src/nuxt-app/public ./public
COPY --from=builder /usr/src/nuxt-app/package.json /usr/src/nuxt-app/bun.lock ./
RUN bun install --production

ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
EXPOSE 3000
ENTRYPOINT ["bun", "run", ".output/server/index.mjs"]