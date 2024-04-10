import { Events } from "discord.js";

function toCelsius(fahrenheitTemperature) {
	const celsiusTemperature = (fahrenheitTemperature - 32) / 1.8;
	return Math.round(celsiusTemperature * 10) / 10;
}

function toFahrenheit(celsiusTemperature) {
	const fahrenheitTemperature = (celsiusTemperature * 1.8) + 32;
	return Math.round(fahrenheitTemperature * 10) / 10;
}

export const messageCreate = {
	name: Events.MessageCreate,
	once: false,
	async execute(message) {
		if (message.author.bot) return;

		try {
			const messageArray = message.content.split(" ");

			const regexp = /^(?<value>-?\d+)(?<unit>[cf])$/i;

			const temperatures = messageArray.filter(e => regexp.test(e));

			if (temperatures.length === 0) return;

			const conversionMessages= temperatures.map((e) => {
				const match = regexp.exec(e);

				switch (match.groups.unit) {
					case "c": // Temperature was given in Celsius and should be converted to Fahrenheit
						return `${match.input} is ${toFahrenheit(match.groups.value)}f`;
					case "f": // Temperature was given in Fahrenheit and should be converted to Celsius
						return `${match.input} is ${toCelsius(match.groups.value)}c`;
				}
			});

			await message.reply({
				content: conversionMessages.join("\n"), 
				allowedMentions: { repliedUser: false },
			});
		} catch (e) {
			console.error(e);
		}
	},
};
