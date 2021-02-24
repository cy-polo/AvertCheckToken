const { MessageEmbed } = require("discord.js");
const { settingsEmbed } = require("../config");

exports.run = (client, message) => {

const database = client.database.servers;
const server = database.get(message.guild.id);

  const helpEmbed = new MessageEmbed()

    .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
    .setDescription(`Welcome to ${client.user.username}, my prefix is \`${server.prefix}\`.\nIf a token leaks in a message, I'll regenerate it.\n\nI will soon do the analysis in embeds, images and several tokens in the same message.`)
    .addFields(
      { name: "Bot", value: `\`${server.prefix}help\`, \`${server.prefix}ping\`, \`${server.prefix}setprefix\`` },
      { name: "Gist", value: `\`${server.prefix}get\`, \`${server.prefix}delete\`` },
      { name: "About", value: `\`🤖 Info\` **»** ${client.user.username} is an open-source bot.\n\`➕ Invite the official bot\` **»** [Click here](https://discord.com/oauth2/authorize?client_id=790262272291242045&scope=bot&permissions=8)\n\`🌐 GitHub\` **»** [Click here](https://github.com/cy-polo/AvertCheckToken)` }
    )
    .setColor(settingsEmbed.color)
    .setTimestamp()
    .setFooter(settingsEmbed.footer, settingsEmbed.image);

  message.channel.send(helpEmbed);
};

exports.help = {
  name: "help"
};
