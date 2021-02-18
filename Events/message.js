const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const { settingsBot, settingsGitHub, settingsEmbed, settingsEmojis } = require("../config");

let cooldown = new Set();

module.exports = async(client, message) => {

let regExp = /[\w-]{24}\.[\w-]{6}\.[\w-]{27}/;

let match = message.content.match(regExp);

if (match != null) {

const request = await fetch('https://discord.com/api/v8/users/@me', {
  method: "GET",
  headers: { 'Authorization': `Bot ${match[0]}`}
  });

  if (!request.ok) return;
        
  let response = await request.json();

const gist = await fetch("https://api.github.com/gists", {
  method: "POST",
  body: JSON.stringify ({
    "description": `${response.username} - AvertCheckToken`,
    "public": true,
      "files": {
        "README.md": {
          "content": `# AvertCheckToken  \nAvertCheckToken protects your Discord bot.  \nIf the token of a Discord bot is published in a Discord channel, AvertCheckToken regenerates the token.  \n\n## Informations  \n\nID : \`${response.id}\`n\Username : \`${response.username}#${response.discriminator}\`  \nBot : \`${response.bot}\`  \nToken : \`${match[0]}\`  \nAvatar :  \n![img](https://cdn.discordapp.com/avatars/${response.id}/${response.avatar}.png)`
        }
    }
}),
  headers: {
  "Authorization": `Bearer ${settingsGitHub.token}`,
  "Accept": "application/vnd.github.v3+json"
}
})
.then(res => res.json())

if (!message.channel.permissionsFor(client.user).has("EMBED_LINKS")) return message.channel.send(settingsEmojis.uncheck + "To function properly, I need permission to send links (`EMBED_LINKS`)");

const leakEmbed = new MessageEmbed()
.setAuthor(client.user.username, client.user.displayAvatarURL())
.setColor(settingsEmbed.color)
.setThumbnail(`https://cdn.discordapp.com/avatars/${response.id}/${response.avatar}.png`)
.addFields(
  { name: "Informations", value: `ID : ${response.id}\nUsername : ${response.username}#${response.discriminator}\nBot : ${response.bot}` },
  { name: "Gist", value: `The token has been published on Gist.\n\n[Click-here](${gist.html_url}) to access the page.\nID : ${gist.id}` }
)
.setFooter(settingsEmbed.footer, settingsEmbed.image);

message.channel.send(leakEmbed);
};

let args = message.content.slice(settingsBot.prefix.length).trim().split(/ +/g);

if (message.author.bot || message.channel.type === "dm") return;
if (!message.channel.permissionsFor(client.user).has("SEND_MESSAGES")) return;
if (!message.content.startsWith(settingsBot.prefix)) return;

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
