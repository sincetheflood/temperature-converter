import { Events } from "discord.js";

function convertTemperature(originalUnit, originalValue) {
	let convertedValue = "";

	switch (originalUnit) {
		case "c":
			convertedValue = (originalValue * 1.8) + 32;
			break;
		case "f":
			convertedValue = (originalValue - 32) / 1.8;
			break;
	}

	return convertedValue.toPrecision(2);
}

export const messageCreate = {
	name: Events.MessageCreate,
	once: false,
	async execute(message) {
		if (message.author.bot) return;

		try {
			const response = [];
			const messageArray = message.content.split(" ");

			messageArray.forEach((el) => {
				const match = el.match(/(?<value>\d+)(?<unit>[cf])/i);

				if (!match) return;

				switch (match.groups.unit) {
					case "c":
						response.push(`${match.input} is ${convertTemperature("c", match.groups.value)}f`);
						break;
					case "f":
						response.push(`${match.input} is ${convertTemperature("f", match.groups.value)}c`);
						break;
				}
			});

			await message.reply(response.join("\n"));
		} catch (e) {
			console.error(e);
		}
	},
};
