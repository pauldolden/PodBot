import { Message } from "discord.js";

interface Params {
  channelId: string | null | undefined;
  message: Message;
}

export const fetchVoiceMembers = ({ channelId, message }: Params) => {
  if (channelId) {
    const channelMembers = message.guild?.channels.cache.find(
      (channel) => channel.id === channelId
    )?.members;

    if (channelMembers) {
      // @ts-ignore, some weirdness with DiscordJS types.
      const chanMembersArray = Array.from(channelMembers);

      return chanMembersArray;
    }
  }
};
