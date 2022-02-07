import { AnyChannel } from "discord.js";

interface Params {
  channel: AnyChannel | undefined;
  message: string;
}

export const sendMessageToChannel = ({ channel, message }: Params) => {
  if (channel) {
    // @ts-ignore, for weird type issues
    channel.send(message);
  }
};
