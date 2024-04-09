import { Events } from "discord.js"
import { Commands } from "../commands/index.js";

export const ready = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    await client.application.commands.set(Commands);

    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};

