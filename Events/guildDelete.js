module.exports = (client, guild) => {
    const database = client.database.servers;

    if (!database.get(guild.id)) return;
    
    database.delete(guild.id);
    
}