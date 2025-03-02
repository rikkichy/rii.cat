FROM node:22-alpine AS builder
WORKDIR /usr/src/nuxt-app
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .
RUN npm run build
FROM node:22-alpine
WORKDIR /usr/src/nuxt-app
COPY --from=builder /usr/src/nuxt-app/.output ./.output
COPY --from=builder /usr/src/nuxt-app/public ./public
ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
EXPOSE 3000
ENTRYPOINT ["node", ".output/server/index.mjs"]