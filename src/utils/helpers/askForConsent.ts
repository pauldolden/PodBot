import { Client, GuildMember } from "discord.js";

interface Params {
  members: any[][];
  client: Client;
  initiator: GuildMember;
  channelId: string;
}

export const askForConsent = ({
  members,
  client,
  initiator,
  channelId,
}: Params) => {
  // Check to see if the bot is in the channel
  if (members.some((member) => member[0] === client.user?.id)) {
    members.forEach((member) => {
      // 0th item is the former map key, which is the user ID.
      const userKey = member[0];
      if (/* initiator.user.id !== userKey && */ client.user?.id !== userKey) {
        client.users.cache
          .get(userKey)
          ?.send(
            `${initiator?.nickname} has initiated a PodBot recording. You cool with that?`
          );
      }
    });
  } else {
    const channel = client.channels.cache.find(
      (channel) => channel.id === channelId
    );
    // @ts-ignore weird typing again?
    channel.send(
      "I need to be the in channel to start recording. Type pb::join first."
    );
  }
};
