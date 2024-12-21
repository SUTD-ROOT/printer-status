FROM denoland/deno:2.1.4

WORKDIR /app

COPY deps.ts .

RUN deno cache --allow-import deps.ts

COPY . .

CMD ["run", "--watch", "--allow-read", "--allow-net", "--allow-env", "--allow-import", "bot.ts"]
