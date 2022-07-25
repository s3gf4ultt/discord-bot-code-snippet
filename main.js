const fs = require("fs");
const {Client} = require("./node_modules/discord.js-selfbot-v13");
const TOKEN = 'your token goes here';
const PREFIX = "!"; // your bot/selfbot prefix

let commands = new Map();

let client = new Client();

fs.readdir("./commands", (err, files) => {
	
	if (err) {
		console.error("An err occured: " + err + "\n");
	}
	
	let cmds = files.filter(f => f.split(".").pop() === "js");
	
	if (cmds.length <= 0)
		console.error("no commands found\n");
	
	cmds.forEach((file, i) => {
		
		let cmdProps = require(`./commands/${file}`);
		commands.set(cmdProps.help.cmd, cmdProps);

	});
});

client.on("ready", async () => {
	
	let username = client.user.username;
	
	console.log(username + " successfully logged in\n");
	
});

client.on("messageCreate", async message => {
	
	let prefixLen = PREFIX.length;
	let msgContent = message.content;
	
	// extract first characters to check if its matches with the PREFIX
	let pref = msgContent.substring(0, prefixLen);
	
	if (pref === PREFIX)
	{
		let firstSpace = msgContent.indexOf(' ');
		let typedCmd = msgContent.substring(prefixLen, 
			firstSpace > 0 ? firstSpace : msgContent.length - prefixLen + 1);

		let cmd = commands.get(typedCmd);

		if (cmd)
			cmd.run(client, message, msgContent.substring(firstSpace + 1));
		else
			message.channel.send("command not found, type help for full command list\n")
	}
	
});

client.login(TOKEN);