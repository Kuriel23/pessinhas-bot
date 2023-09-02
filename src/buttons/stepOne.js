const discord = require('discord.js');

module.exports = async (client, interaction) => {
	const doc = await client.db.Users.findOne({
		_id: interaction.user.id,
	});
	const modal = new discord.ModalBuilder()
		.setCustomId('stepOne' + interaction.user.id)
		.setTitle('Dados Pessoais');
	const NameInput = new discord.TextInputBuilder()
		.setCustomId('NameInput')
		.setLabel('Nome')
		.setValue(doc && doc.name ? doc.name : '')
		.setRequired()
		.setStyle(1);
	const AgeInput = new discord.TextInputBuilder()
		.setCustomId('AgeInput')
		.setLabel('Idade')
		.setValue(doc && doc.age ? doc.age.toString() : '18')
		.setRequired()
		.setMinLength(2)
		.setMaxLength(2)
		.setStyle(1);
	const BiographyInput = new discord.TextInputBuilder()
		.setCustomId('BiographyInput')
		.setLabel('Biografia')
		.setValue(doc && doc.biography ? doc.biography : '')
		.setRequired()
		.setMaxLength(1024)
		.setStyle(2);
	modal.addComponents(
		new discord.ActionRowBuilder().addComponents(NameInput),
		new discord.ActionRowBuilder().addComponents(AgeInput),
		new discord.ActionRowBuilder().addComponents(BiographyInput),
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
		const name = i.fields.getTextInputValue('NameInput');
		const age = parseInt(i.fields.getTextInputValue('AgeInput'));
		const bio = i.fields.getTextInputValue('BiographyInput');

		if (doc) {
			doc.name = name;
			doc.age = age;
			doc.biography = bio;
			doc.stepOneSuccess = true;
			doc.save();
		} else {
			new client.db.Users({
				_id: interaction.user.id,
				name,
				age,
				biography: bio,
				stepOneSuccess: true,
			}).save();
		}
		i.reply({
			content:
				'Ótimo! Agora você pode prosseguir para a etapa 2.',
			ephemeral: true,
		});
	}
};
