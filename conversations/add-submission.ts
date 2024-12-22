import { Menu } from "../deps.ts";
import { getPrinters } from "../database/database.ts";
import { MyContext, MyConversation } from "../bot.ts";

const menu = new Menu("add-submission-menu");

// create menu of printers TODO
for (const printer of getPrinters()) {
  const { location, level, unit, name } = printer;
  const printerName = `${location} ${level} ${unit} ${name}`;
  menu.text(printerName);
}

async function addSubmissionConversation(
  conversation: MyConversation,
  ctx: MyContext,
) {
  await ctx.reply("Hi there! Which printer do you want to report about?");
  const { message } = await conversation.wait();
  await ctx.reply(`Welcome to the chat, ${message.text}!`);
}

export { addSubmissionConversation, menu as addSubmissionMenu };
