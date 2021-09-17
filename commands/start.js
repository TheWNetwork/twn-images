module.exports.run = async (botconfig, dbclient, bot, message, args) => {
    if (msg.chat.type !== 'private') {
        return;
    }

    bot.sendMessage(message.chat.id, "Welcome to WNetwork - Images. \n\n" +
        "You can check our services on @TheWNetwork.");
};

module.exports.help = {
    name: "start"
};