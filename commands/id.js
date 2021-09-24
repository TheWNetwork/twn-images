module.exports.run = async (botconfig, pool, bot, message, args) => {
    bot.sendMessage(message.chat.id, `Group Id: ${message.chat.id}\n\nYou can check our services on @TheWNetwork.`);
};

module.exports.help = {
    name: "id"
};