import { Message } from "discord.js";
import { consentStore } from "../utils/consentStore";
export const consentToRecording = (message: Message) => {
  const channelId = message.member?.voice.channelId;
  if (channelId) {
    const channelMembers = message.guild?.channels.cache.find(
      (channel) => channel.id === channelId
    )?.members;
    console.log(channelMembers);
  }
};
