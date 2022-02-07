import { AnyChannel, Client } from "discord.js";

interface Params {
  channelId: string;
  client: Client;
}

export const fetchChannel = ({
  channelId,
  client,
}: Params): AnyChannel | undefined => {
  return client.channels.cache.find((channel) => channel.id === channelId);
};
