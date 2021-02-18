const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { settingsEmbed, settingsEmojis, settingsGitHub } = require("../config");

module.exports.run = async(client, message, args) => {

const code = args.join(" ");
if (!args) return message.channel.send(settingsEmojis.uncheck + " Please specify the Gist ID.");

try {    
    
const response = await fetch(`https://api.github.com/gists/${code}`, {
    method: "GET",
    headers: {
    "Authorization": `Bearer ${settingsGitHub.token}`,
    "Accept": "application/vnd.github.v3+json"
}})
.then(res => res.json());

if (response.message === "Not Found") return message.channel.send(settingsEmojis.check + " Error : Invalid ID Gist.");
if (response.owner.html_url !== settingsGitHub.page) return message.channel.send("<:unchecked:765661976361304084> Erreur : Ce Gist ne provient pas du GitHub : https://github.com/cy-polo.");

const getEmbed = new MessageEmbed()

.setAuthor(client.user.username, client.user.displayAvatarURL())
.setColor(settingsEmbed.color)
.addFields(
  { name: "Informations", value: `ID : ${response.id}\nURL : ${response.html_url}\nPublié le : ${response.created_at}` },
  { name: "Content", value: `\`\`\`md\n${response.files["README.md"].content}\n\`\`\`` }
)
.setFooter(settingsEmbed.footer, settingsEmbed.image);

message.channel.send(getEmbed);
    
} catch {
    message.channel.send(settingsEmojis.uncheck + " An error has occurred!");
}

};

module.exports.help = {
    name: "get"
};
