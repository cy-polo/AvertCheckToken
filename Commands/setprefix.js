const { settingsEmojis, settingsBot } = require("../config");

exports.run = (client, message, args) => {

if (!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.channel.send(settingsEmojis.uncheck + " You don't have permission to manage the server! (`MANAGE_GUILD`)");

const database = client.database.servers;
const server = database.get(message.guild.id);

const prefix = args.join(" ");

if (!prefix) return message.channel.send(`${settingsEmojis.uncheck} Please specify the prefix.\n\n__Syntax :__ \`${server.prefix}setprefix <prefix/reset>\`\n__Exemple :__ \`${server.prefix}setprefix ?\``);

if (prefix.length > 5) return message.channel.send(settingsEmojis.uncheck + " The prefix cannot have more than 5 characters!");

if (prefix === "reset" || prefix === settingsBot.defaultPrefix) {
    database.update(message.guild.id, {
        prefix: settingsBot.defaultPrefix
    });

    return message.channel.send(`${settingsEmojis.check} The prefix is now reset!\n:arrow_right: The new prefix is \`${settingsBot.defaultPrefix}\`.`);
}

database.update(message.guild.id, {
    prefix: prefix
});

message.channel.send(`${settingsEmojis.check} The prefix of the bot is now \`${prefix}\`.`);

};

exports.help = {
    name: "setprefix"
};