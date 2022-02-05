import { Client } from "discord.js";
import { handleCommand } from "../listeners/command";
import { consentToRecording } from "./consent";
import { joinChannel } from "./join";

export const handleCommands = (client: Client) => {
  handleCommand({
    client: client,
    command: "pb::join",
    action: joinChannel,
  });

  handleCommand({
    client: client,
    command: "pb::consent",
    action: consentToRecording,
  });
};
