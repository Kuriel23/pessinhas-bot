const discord = require('discord.js');

module.exports = async (client, interaction) => {
	const doc = await client.db.Users.findOne({
		_id: interaction.user.id,
	});
	const modal = new discord.ModalBuilder()
		.setCustomId('stepTwo' + interaction.user.id)
		.setTitle('Dados de Jogo');
	const PrincipalFunctionInput = new discord.TextInputBuilder()
		.setCustomId('PrincipalFunctionInput')
		.setLabel('Função Principal')
		.setRequired()
		.setValue(doc && doc.PrincipalFunction ? doc.PrincipalFunction : '')
		.setMaxLength(50)
		.setStyle(1);
	const TeamReasonInput = new discord.TextInputBuilder()
		.setCustomId('TeamReasonInput')
		.setLabel('O que espera de um time?')
		.setValue(doc && doc.TeamReason ? doc.TeamReason : '')
		.setRequired()
		.setMaxLength(1024)
		.setStyle(2);
	const FavoriteCharactersInput = new discord.TextInputBuilder()
		.setCustomId('FavoriteCharactersInput')
		.setLabel('Personagens Favoritos')
		.setValue(doc && doc.FavoriteCharacters ? doc.FavoriteCharacters : '')
		.setRequired()
		.setMaxLength(100)
		.setStyle(1);
	const TrackerInput = new discord.TextInputBuilder()
		.setCustomId('TrackerInput')
		.setLabel('Tracker')
		.setRequired()
		.setValue(doc && doc.Tracker ? doc.Tracker : '')
		.setMaxLength(80)
		.setStyle(2);
	modal.addComponents(
		new discord.ActionRowBuilder().addComponents(PrincipalFunctionInput),
		new discord.ActionRowBuilder().addComponents(TeamReasonInput),
		new discord.ActionRowBuilder().addComponents(FavoriteCharactersInput),
		new discord.ActionRowBuilder().addComponents(TrackerInput),
	);
	await interaction.showModal(modal);

	const i = await interaction
		.awaitModalSubmit({
			time: 300000,
			filter: i => i.user.id === interaction.user.id,
		})
		.catch(error => {
			if (error) return null;
		});

	if (i) {
		const PrincipalFunction = i.fields.getTextInputValue(
			'PrincipalFunctionInput',
		);
		const TeamReason = i.fields.getTextInputValue('TeamReasonInput');
		const FavoriteCharacters = i.fields.getTextInputValue(
			'FavoriteCharactersInput',
		);
		const tracker = i.fields.getTextInputValue('TrackerInput');

		if (doc) {
			doc.PrincipalFunction = PrincipalFunction;
			doc.TeamReason = TeamReason;
			doc.FavoriteCharacters = FavoriteCharacters;
			doc.tracker = tracker;
			doc.stepTwoSuccess = true;
			doc.save();
		} else {
			new client.db.Users({
				_id: interaction.user.id,
				PrincipalFunction,
				TeamReason,
				FavoriteCharacters,
				tracker,
				stepTwoSuccess: true,
			}).save();
		}
		i.reply({
			content:
				'Ótimo! Agora você pode prosseguir para o botão "Enviar", se você não quiser efetuar alterações.',
			ephemeral: true,
		});
	}
};
