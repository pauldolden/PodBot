import {
  DiscordGatewayAdapterCreator,
  joinVoiceChannel,
} from "@discordjs/voice";
import { Message } from "discord.js";

export const joinChannel = (message: Message) => {
  if (
    message.member &&
    message.member.voice.channel &&
    message.guild &&
    message.guildId
  ) {
    joinVoiceChannel({
      channelId: message!.member!.voice!.channel!.id,
      guildId: message.guildId,
      adapterCreator: message.guild
        .voiceAdapterCreator as unknown as DiscordGatewayAdapterCreator,
    });
  }
};
