# SUTD Printer Status Telegram Bot

## What does the bot do?

The bot shows the status of all 2D printers in SUTD based off submissions from students or faculty. Sort of a downdetector specifically for SUTD Printers.

## Why was this bot created?

The SUTD Printer Status Telegram Bot was created as we saw students sending printer statuses onto the "SUTD Family" telegram group.

## Setup Guide

### Clone this project

```bash
git clone https://github.com/SUTD-ROOT/printer-status.git
```

### Create a Telegram Bot API Token

Go to [@BotFather](https://t.me/botfather) and create an API token for a bot of your creation.

Next, make a file named `.env` from `.env.example` using this command in your terminal:

```bash
cd printer-status
cp .env.example .env
```

Replace `REPLACE_WITH_YOUR_TOKEN` with the API token that you have created for your bot.

### Running the Telegram Bot

The project uses Docker to run the telegram bot. Make sure you have Docker installed and simply run the following command:

```bash
docker compose up --build -d
```
