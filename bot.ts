import { Bot } from "./deps.ts";

const env = Deno.env.toObject();
const { BOT_TOKEN } = env;

const bot = new Bot(BOT_TOKEN);

bot.command("start", (ctx) => ctx.reply("Welcome! I am your bot."));
bot.command("help", (ctx) => ctx.reply("Welcome! I am your help."));

bot.start();
