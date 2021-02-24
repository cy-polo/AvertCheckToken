const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");
const { settingsGitHub, settingsEmbed } = require("../config");

exports.publishToken = async(client, channelID, message, token) => {

let request;

request = await fetch('https://discord.com/api/v8/users/@me', {
  headers: { "Authorization": `Bot ${token}`}
});

if (!request.ok) {
  request = await fetch('https://discord.com/api/v8/users/@me', {
  headers: { "Authorization": token }
});

if(!request.ok) return;

};
        
let response = await request.json();

if (response.bot === undefined) response.bot = false;

const gistDatabase = client.database.gists;

const gist = await fetch("https://api.github.com/gists", {
  method: "POST",
  body: JSON.stringify ({
    "description": `${response.username} - AvertCheckToken`,
    "public": true,
      "files": {
        "README.md": {
          "content": `# AvertCheckToken  \n🙂 AvertCheckToken protects your Discord bot.  \n👮 If the token of a Discord bot is published in a Discord channel, AvertCheckToken regenerates the token.  \n\n## Informations  \n\n🆔 **ID »** \`${response.id}\`  \n🧑 **Username »** \`${response.username}#${response.discriminator}\`  \n🤖 **Bot »** \`${response.bot}\`  \n🔑 **Token »** \`${token}\`  \n📷 **Avatar »**  \n![img](https://cdn.discordapp.com/avatars/${response.id}/${response.avatar}.png)\n\n## Project  \n➕ **Invite the official bot »** [Click here](https://discord.com/oauth2/authorize?client_id=790262272291242045&scope=bot&permissions=8)  \n🌐 **GitHub »** [Click here](https://github.com/cy-polo/AvertCheckToken)`
        }
    }
}),
  headers: {
  "Authorization": `Bearer ${settingsGitHub.token}`,
  "Accept": "application/vnd.github.v3+json"
}
})
.then(res => res.json());

gistDatabase.set(gist.id, {
  author: {
    username: `${message.author.username}#${message.author.discriminator}`,
    id: message.author.id
  },
  server: {
    name: message.channel.guild.name,
    id: message.channel.guild.id
  },
  bot: {
    username: `${response.username}#${response.discriminator}`,
    id: response.id,
    bot: response.bot,
    avatar: `https://cdn.discordapp.com/avatars/${response.id}/${response.avatar}.png`
  },
  gist: {
    id: gist.id,
    url: gist.html_url,
    date: moment()
  }
});

if (!message.channel.permissionsFor(client.user).has("EMBED_LINKS")) return;
if (!message.channel.permissionsFor(client.user).has("SEND_MESSAGES")) return message.channel.send(settingsEmojis.uncheck + "To function properly, I need permission to send links (`EMBED_LINKS`)");

const leakEmbed = new MessageEmbed()
.setAuthor(client.user.username, client.user.displayAvatarURL())
.setColor(settingsEmbed.color)
.setThumbnail(`https://cdn.discordapp.com/avatars/${response.id}/${response.avatar}.png`)
.addFields(
  { name: "Informations", value: `\`🆔 ID\` **»** ${response.id}\n\`🧑 Username\` **»** ${response.username}#${response.discriminator}\n\`🤖 Bot\` **»** ${response.bot}` },
  { name: "Gist", value: `\`🔗 URL\` **»** [Click here](${gist.html_url}) to access the page.\n\`🆔 ID\` **»** ${gist.id}` },
  { name: "About", value: `\`🤖 Info\` **»** ${client.user.username} is an open-source bot.\n\`➕ Invite the official bot\` **»** [Click here](https://discord.com/oauth2/authorize?client_id=790262272291242045&scope=bot&permissions=8)\n\`🌐 GitHub\` **»** [Click here](https://github.com/cy-polo/AvertCheckToken)` }
)
.setFooter(settingsEmbed.footer, settingsEmbed.image);

client.channels.cache.get(channelID).send(leakEmbed);
}