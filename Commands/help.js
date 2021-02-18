const { MessageEmbed } = require("discord.js");
const { settingsEmbed, settingsBot } = require("../config");

module.exports.run = (client, message) => {
  const helpEmbed = new MessageEmbed()

    .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
    .setDescription(`Welcome to ${client.user.username}, my prefix is \`${settingsBot.prefix}\`.\nIf a token leaks in a message, I'll regenerate it.\n\nI will soon do the analysis in embeds, images and several tokens in the same message.`)
    .addFields(
      { name: "Bot", value: "`help`, `ping`" },
      { name: "Gist", value: "`get`, `delete`" },
      { name: "Owner", value: "`logout`" }
    )
    .setColor(settingsEmbed.color)
    .setTimestamp()
    .setFooter(settingsEmbed.footer, settingsEmbed.image);

  message.channel.send(helpEmbed);
};

module.exports.help = {
  name: "help"
};
