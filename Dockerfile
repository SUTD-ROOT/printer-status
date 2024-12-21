FROM denoland/deno:latest

WORKDIR /app

COPY . .

RUN deno cache --allow-import bot.ts

CMD ["run", "--watch", "--allow-net", "--allow-env", "--allow-import", "bot.ts"]