import { VoiceConnection } from "@discordjs/voice";
import { Client, Message } from "discord.js";

interface Params {
  client: Client;
  command: string;
  action: (message: Message, client: Client) => any;
  connection?: VoiceConnection;
}

export const handleCommand = ({ client, command, action }: Params) => {
  client.on("messageCreate", async (message) => {
    if (message && message.content === command) {
      action(message, client);
    }
  });
};
