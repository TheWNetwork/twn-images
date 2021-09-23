module.exports.run = async (botconfig, dbclient, bot, message, args) => {
    bot.sendMessage(message.chat.id, "Pong. \n\n" +
        "You can check our services on @TheWNetwork.");
};

module.exports.help = {
    name: "ping"
};