const { PermissionFlagsBits } = require('discord.js');
const discord = require('discord.js');

module.exports = async (client, interaction) => {
	const tagger = interaction.user.tag;
	if (
		interaction.guild.channels.cache.find(
			c => c.name === `${tagger}-${interaction.values[0]}`,
		)
	) {
		const c = interaction.guild.channels.cache.find(
			c => c.name === `${tagger}-${interaction.values[0]}`,
		);
		interaction.reply({
			content: `Você já possui um ticket aberto em ${c}.`,
			ephemeral: true,
		});
	} else {
		interaction.guild.channels
			.create({
				name: `${tagger}-${interaction.values[0]}`,
				type: 0,
				parent: '1141138818808946839',
				permissionOverwrites: [
					{
						id: interaction.guild.id,
						deny: [PermissionFlagsBits.ViewChannel],
					},
					{
						id: interaction.user.id,
						allow: [
							PermissionFlagsBits.ViewChannel,
							PermissionFlagsBits.SendMessages,
							PermissionFlagsBits.AttachFiles,
							PermissionFlagsBits.AddReactions,
						],
					},
					{
						id: '1143669702439223367',
						allow: [
							PermissionFlagsBits.ViewChannel,
							PermissionFlagsBits.SendMessages,
							PermissionFlagsBits.AttachFiles,
							PermissionFlagsBits.AddReactions,
						],
					},
					{
						id: '1143670057361223851',
						allow: [
							PermissionFlagsBits.ViewChannel,
							PermissionFlagsBits.SendMessages,
							PermissionFlagsBits.AttachFiles,
							PermissionFlagsBits.AddReactions,
						],
					},
				],
			})
			.then(c => {
				interaction.reply({
					content: `Seu ticket foi aberto em ${c}.`,
					ephemeral: true,
				});

				const embed = new discord.EmbedBuilder()
					.setAuthor({
						name: interaction.guild.name,
						iconURL: interaction.guild.iconURL({ dynamic: true }),
					})
					.setColor(client.cor)
					.setDescription(
						`Olá, ${interaction.user.username}, boas vindas ao seu ticket!\nAguarde alguns instantes para a nossa equipe falar consigo, enquanto isso faça favor de mandar sua dúvida/denúncia!`,
					);

				const botao = new discord.ActionRowBuilder().addComponents(
					new discord.ButtonBuilder()
						.setCustomId('ft')
						.setEmoji('🔒')
						.setLabel('Fechar Ticket')
						.setStyle(2),
				);

				c.send({
					content: '<@&1143669702439223367> <@&1143670057361223851>',
					embeds: [embed],
					components: [botao],
				}).then(msg => msg.pin());
			});
	}
};




