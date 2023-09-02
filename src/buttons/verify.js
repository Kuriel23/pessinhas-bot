const discord = require('discord.js');

module.exports = async (client, interaction) => {
	interaction.user
		.send({
			embeds: [
				new discord.EmbedBuilder()
					.setTitle(
						'Envie seu perfil de jogador, siga as etapas abaixo!',
					)
					.setColor(client.cor),
			],
			components: [
				new discord.ActionRowBuilder().setComponents(
					new discord.ButtonBuilder()
						.setLabel('Etapa 1')
						.setStyle(discord.ButtonStyle.Primary)
						.setCustomId('stepOne'),
					new discord.ButtonBuilder()
						.setLabel('Etapa 2')
						.setStyle(discord.ButtonStyle.Primary)
						.setCustomId('stepTwo'),
					new discord.ButtonBuilder()
						.setLabel('Enviar')
						.setStyle(discord.ButtonStyle.Success)
						.setCustomId('finish'),
				),
			],
		})
		.then(() => {
			interaction.reply({
				content: 'Enviei instruções na sua DM!',
				ephemeral: true,
			});
		})
		.catch(() => {
			interaction.reply({
				content:
					'Por favor, libere sua DM para podermos enviar uma mensagem com o formulário!',
				ephemeral: true,
			});
		});
};
