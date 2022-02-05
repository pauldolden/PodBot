import * as Discord from "discord.js";
import { config } from "dotenv";
import { handleCommands } from "./commands";

config();

const client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MEMBERS",
    "GUILD_VOICE_STATES",
    "GUILD_PRESENCES",
  ],
});

handleCommands(client);

client.login(process.env.TOKEN);
