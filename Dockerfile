FROM oven/bun:1.2.3 AS base
FROM oven/bun:1.2.3-alpine AS prod

FROM base AS builder

WORKDIR /app

RUN bun i -g turbo

COPY . .

RUN turbo prune gateway --docker

FROM base AS installer

WORKDIR /app

COPY --from=builder /app/out/json/ .
RUN bun i

COPY --from=builder /app/out/full/ .


FROM prod AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 bunjs
RUN adduser --system --uid 1001 microservice


COPY --from=installer /app . 
RUN chown -R microservice:bunjs /app  # 👈 Fix ownership here


USER microservice

EXPOSE 3000


CMD ["bun", "run", "start"]
