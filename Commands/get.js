const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const { settingsEmbed, settingsEmojis } = require("../config");

exports.run = async(client, message, args) => {

const code = args.join(" ");
if (!code) return message.channel.send(settingsEmojis.uncheck + " Please specify the Gist ID.");

const database = client.database.gists;
let infoGist = database.get(code);

if (!infoGist) return message.channel.send(settingsEmojis.uncheck + " Invalid ID Gist.");

const getEmbed = new MessageEmbed()

.setAuthor(client.user.username, client.user.displayAvatarURL())
.setThumbnail(infoGist.bot.avatar)
.setColor(settingsEmbed.color)
.addFields(
  { name: "Gist", value: `\`🆔 ID\` **»** ${infoGist.gist.id}\n\`🔗 URL\` **»** [Click here](${infoGist.gist.url})\n\`📅 Published on\` **»** ${moment(infoGist.gist.date).format("LLLL")}` },
  { name: "Author", value: `\`🧑 Username\` **»** ${infoGist.author.username}\n\`🆔 ID\` **»** ${infoGist.author.id}` },
  { name: "Server", value: `\`📙 Name\` **»** ${infoGist.server.name}\n\`🆔 ID\` **»** ${infoGist.server.id}` },
  { name: (infoGist.bot.bot ? bot = "Bot" : bot = "User"), value: `\`🧑 Username\` **»** ${infoGist.bot.username}\n\`🆔 ID\` **»** ${infoGist.bot.id}` },
  { name: "About", value: `\`🤖 Info\` **»** ${client.user.username} is an open-source bot.\n\`➕ Invite the official bot\` **»** [Click here](https://discord.com/oauth2/authorize?client_id=790262272291242045&scope=bot&permissions=8)\n\`🌐 GitHub\` **»** [Click here](https://github.com/cy-polo/AvertCheckToken)` }
)
.setFooter(settingsEmbed.footer, settingsEmbed.image);

message.channel.send(getEmbed);
};

exports.help = {
  name: "get"
};
