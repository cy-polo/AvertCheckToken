exports.run = (client, message) => {

let beginning = Date.now();
message.channel.send("Ping")
.then((m) => m.edit(`Pong : **${Date.now() - beginning}**ms`));
};
    
exports.help = {
    name: "ping"
};
