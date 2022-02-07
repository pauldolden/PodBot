import { Message } from "discord.js";
import { consentStore } from "../utils/stores";
export const consentToRecording = (message: Message) => {
  const channelId = message.member?.voice.channelId;
  if (channelId) {
    const channelMembers = message.guild?.channels.cache.find(
      (channel) => channel.id === channelId
    )?.members;
    console.log(channelMembers);

    if (channelMembers) {
      for (let [key, value] of Object.entries(channelMembers)) {
        console.log(key);
      }
    }
  }
};
