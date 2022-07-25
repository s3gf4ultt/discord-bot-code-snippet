
/*
	@param {Client} client The bot/selfbot Object
	@param {Message} message The message which the command was triggered
	@param {string} args The remaining string after the command
*/
module.exports.run = async (client, message, args) => {
	
	message.channel.send(args);
	
}

module.exports.help = {
	
	cmd: "echo",
	desc: "output a message passed on args"
	
}