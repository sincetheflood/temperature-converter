import { Client, Collection, GatewayIntentBits } from "discord.js";
import { Commands } from "./commands/index.js";
import { Events } from "./events/index.js";
import data from "../config.json" with { type: "json" };

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Register commands
client.commands = new Collection()

for (let command of Commands) {
  client.commands.set(command.name, command);
}

// Register events
for (let event of Events) {
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Log in to Discord
client.login(data.token);

