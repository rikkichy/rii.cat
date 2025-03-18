FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile 
COPY . .
RUN bun --bun run build
FROM oven/bun:1 AS production
WORKDIR /app
COPY --from=build /app/.output /app
COPY --from=build /app/node_modules /app/node_modules
EXPOSE 3000/tcp

ENTRYPOINT [ "bun", "--bun", "run", "/app/server/index.mjs" ]