const { publishToken } = require("../Utils/publishToken");
const { settingsBot, settingsEmojis } = require("../config");

let cooldown = new Set();

module.exports = async(client, message) => {

let tokenRegex = /[\w-]{24}\.[\w-]{6}\.[\w-]{27}/;

let tokenMatch = message.content.match(tokenRegex);

if (tokenMatch !== null) {
  await publishToken(
    client,
    message.channel.id,
    message,
    tokenMatch[0]
  )
};

const database = client.database.servers;

if(!database.get(message.guild.id)) {
  database.set(message.guild.id, {
    prefix: settingsBot.defaultPrefix
  });
};

const server = database.get(message.guild.id);

let args = message.content.slice(server.prefix.length).trim().split(/ +/g);

if (message.author.bot || message.channel.type === "dm") return;
if (!message.channel.permissionsFor(client.user).has("SEND_MESSAGES")) return;
if (message.mentions.users.has(client.user.id)) return message.channel.send(`:wave: Hi, my prefix is \`${server.prefix}\`.\n:arrow_right: To show the help, do \`${server.prefix}help\`.`);
if (!message.content.startsWith(server.prefix)) return;

let commande = args.shift();
let cmd = client.commands.get(commande);

if (!cmd) return;
if (cooldown.has(message.author.id)) {
  message.delete();
  return message.reply(":warning: You have to wait 1 second between commands.");
} else {
if (!message.channel.permissionsFor(client.user).has("EMBED_LINKS")) return message.channel.send(settingsEmojis.uncheck + "To function properly, I need permission to send links (`EMBED_LINKS`)");
  cmd.run(client, message, args);
}
cooldown.add(message.author.id);
setTimeout(() => {
cooldown.delete(message.author.id);
}, 1000);
};