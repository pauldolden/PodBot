import { Client, Message } from "discord.js";
import { getVoiceConnection } from "@discordjs/voice";
import { askForConsent } from "../utils/helpers/askForConsent";
import { fetchVoiceMembers } from "../utils/helpers/fetchChannelMembers";

export const startRecording = (message: Message, client: Client) => {
  const messageChannelId = message.channelId;
  const voiceChannelId = message.member?.voice.channelId;

  if (
    message.member &&
    message.member.voice.channel &&
    message.guild &&
    message.guildId
  ) {
    // Get the user who originally sent the request.
    const initiator = message.member;
    console.log(initiator);

    // Get all the active users for the voice channel
    const voiceMembers = fetchVoiceMembers({
      channelId: voiceChannelId,
      message: message,
    });

    if (voiceMembers) {
      // Loop over all voice members and DM them asking for consent
      askForConsent({
        members: voiceMembers,
        client: client,
        initiator: initiator,
        channelId: messageChannelId,
      });
    }
  }
};
