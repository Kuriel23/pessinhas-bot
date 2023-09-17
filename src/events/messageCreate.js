module.exports = async (client, message) => {
	if (message.guild === null || message.author.bot) return;

	if (
		message.content.startsWith('ps?') &&
		message.author.id === '487288989288628224'
	)
		require('../messages/' + message.content.replace('ps?', ''))(
			client,
			message,
		).catch(err => {
			return message.reply(err);
		});
};
