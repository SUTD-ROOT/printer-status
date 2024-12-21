import { Bot } from "https://deno.land/x/grammy/mod.ts";

const env = Deno.env.toObject();
const { BOT_TOKEN } = env;

const bot = new Bot(BOT_TOKEN);

bot.command("start", (ctx) => ctx.reply("Welcome! I am your bot."));
bot.command("help", (ctx) => ctx.reply("Here to help!"));

bot.on("message", (ctx) => ctx.reply("You said: " + ctx.message.text));

bot.start();
