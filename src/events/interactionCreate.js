module.exports = (client, interaction) => {
	if (interaction.isStringSelectMenu()) {
		require('../menu/' + interaction.customId)(client, interaction);
	}
	if (interaction.isButton()) {
		require('../buttons/' + interaction.customId)(client, interaction);
	}
};
