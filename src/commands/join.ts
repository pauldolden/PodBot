import {
  DiscordGatewayAdapterCreator,
  joinVoiceChannel,
} from "@discordjs/voice";
import { Client, Message } from "discord.js";
import { fetchChannel } from "../utils/helpers/fetchChannel";
import { fetchVoiceMembers } from "../utils/helpers/fetchChannelMembers";
import { sendMessageToChannel } from "../utils/helpers/sendMessageToChannel";

export const joinChannel = (message: Message, client: Client) => {
  const messageChannelId = message.channelId;
  const voiceChannelId = message.member?.voice.channelId;

  if (
    message.member &&
    message.member.voice.channel &&
    message.guild &&
    message.guildId
  ) {
    // Check to see that the bot is not already in this voice channel.
    // We could theoretically do this in the above check, but I feel like this is a logical step.
    const voiceMembers = fetchVoiceMembers({
      channelId: voiceChannelId,
      message: message,
    });

    if (voiceMembers) {
      const botNotInChannel = voiceMembers?.every(
        (member) => member[0] !== client.user?.id
      );
      if (botNotInChannel) {
        // Join the voice channel of the user that called the command.
        joinVoiceChannel({
          channelId: message.member.voice.channel.id,
          guildId: message.guildId,
          adapterCreator: message.guild
            .voiceAdapterCreator as unknown as DiscordGatewayAdapterCreator,
        });

        // Success?
        const channel = fetchChannel({
          channelId: messageChannelId,
          client: client,
        });
        sendMessageToChannel({
          channel: channel,
          message:
            "Stomp, stomp I've arrived! Waiting for consent from all channel members, then you are good to type **pb::record**.",
        });
      } else {
        const channel = fetchChannel({
          channelId: messageChannelId,
          client: client,
        });
        sendMessageToChannel({
          channel: channel,
          message: "Already there, dummy.",
        });
      }
    }
  } else {
    // If user isn't in a voice channel, prompt them to join one.
    const channel = fetchChannel({
      channelId: messageChannelId,
      client: client,
    });
    sendMessageToChannel({
      channel: channel,
      message: "You need to be in a voice channel to invite me in.",
    });
  }
};
