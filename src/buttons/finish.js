const discord = require('discord.js');

module.exports = async (client, interaction) => {
	const doc = await client.db.Users.findOne({
		_id: interaction.user.id,
	});

	if (doc && doc.stepOneSuccess && doc.stepTwoSuccess) {
		const ranksIds = [
			'1111765310505234502',
			'826971786247143425',
			'819071433984573441',
			'1111765495046230056',
			'819068447106400286',
			'819036450485829652',
			'1111765246315606138',
			'826981903780937778',
			'826980462480195624',
		];

		function rankRole(user) {
			const server = client.guilds.cache.get('459227565996113930');
			const member = server.members.cache.get(user.id);
			const rolesUser = member.roles.cache;

			for (const roleId of ranksIds) {
				const role = rolesUser.get(roleId);
				if (role) {
					return role;
				}
			}

			return null;
		}

		interaction.reply({
			content: 'Enviado com sucesso!',
			ephemeral: true,
		});
		const rank = rankRole(interaction.user);
		const row = new discord.ActionRowBuilder().setComponents(
			new discord.ButtonBuilder()
				.setCustomId('verify')
				.setLabel('Enviar minha apresentação')
				.setStyle(discord.ButtonStyle.Primary),
		);
		client.channels.cache.get('1127162097722195999').send({
			content: `Player ${interaction.user}`,
			embeds: [
				{
					description: `**Nome:** ${doc.name}\n\n**Idade:** ${doc.age}\n\n**Bio:** ${doc.biography}\n\n**Rank:** <@&${rank.id}>\n\n**Personagens preferido:** ${doc.FavoriteCharacters}\n\n**Função principal:** ${doc.PrincipalFunction}\n\n**O que espera de um time?** ${doc.TeamReason}\n\n**Tracker:** ${doc.tracker}`,
					color: 13609061,
					thumbnail: {
						url: interaction.user.displayAvatarURL({
							format: 'png',
							size: 2048,
						}),
					},
				},
			],
			components: [row],
		});
	} else {
		interaction.reply({
			content: 'Você ainda não preencheu os dados todos.',
			ephemeral: true,
		});
	}
};
