import {
  Bot,
  Context,
  Conversation,
  ConversationFlavor,
  conversations,
  createConversation,
  Menu,
  session,
  SessionFlavor,
} from "./deps.ts";
import { setupDatabase } from "./database/database.ts";
import { startMessage } from "./messages/messages.ts";
import { addSubmissionConversation } from "./conversations/add-submission.ts";

const env = Deno.env.toObject();
const { BOT_TOKEN } = env;

interface SessionData {
  submission: {
    printer_id: number;
    submitted_by: string;
    submitted_on: string;
    status: "active" | "inactive";
    message: string;
  };
}

const menu = new Menu("add-submission-menu");

export type MyContext =
  & Context
  & SessionFlavor<SessionData>
  & ConversationFlavor;
export type MyConversation = Conversation<MyContext>;

const bot = new Bot<MyContext>(BOT_TOKEN);

// Setup middlewares
bot.use(session({
  initial: () => ({
    printer_id: -1,
    submitted_by: "",
    submitted_on: "",
    status: "active",
    message: "",
  }),
}));

bot.use(conversations());
bot.use(createConversation(addSubmissionConversation));

bot.command(
  "start",
  (ctx) => ctx.reply(startMessage),
);

bot.command("help", (ctx) => ctx.reply("Welcome! I am your help."));

bot.command("submit", (ctx) => {
  const username = ctx.from?.username;

  if (!username) {
    return ctx.reply("Sorry, I couldn't find your username.");
  }
});

setupDatabase();
bot.start();
