const { settingsBot } = require("../config");

module.exports = (client, guild) => {
    const database = client.database.servers;

    if (database.get(guild.id)) return;

    database.set(guild.id, {
        prefix: settingsBot.defaultPrefix
    });
    
}