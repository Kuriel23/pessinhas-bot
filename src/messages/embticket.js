const discord = require('discord.js');

module.exports = async (client, message) => {
	message.delete();
	if (message.author.id !== '487288989288628224') return 0;
	const row = new discord.ActionRowBuilder().addComponents(
		new discord.StringSelectMenuBuilder()
			.setCustomId('ajuda')
			.setPlaceholder('Ajuda')
			.addOptions([
				{
					label: 'pss',
					value: 'pss',
					emoji: '🗂',
				},
				{
					label: 'Partners',
					value: 'partners',
					emoji: '🗂',
				},
				{
					label: 'Suporte',
					value: 'suporte',
					emoji: '🗂',
				},
				{
					label: 'Marca ações',
					value: 'marca-ações',
					emoji: '🗂',
				},
				{
					label: 'Outros',
					value: 'outros',
					emoji: '🗂',
				},
			]),
	);
	const embed = new discord.EmbedBuilder()
		.setColor(client.cor)
		.setTitle('Central de atendimento')
		.setDescription(
			'Selecione abaixo um departamento e será gerado um canal de texto privado para você comunicar-se com a nossa equipe.'
		);
	message.channel.send({ embeds: [embed], components: [row] });
};







