module.exports.run = async (botconfig, dbclient, bot, message, provider) => {
    bot.sendMessage(message.chat.id, `@${botconfig.name} is a bot to send anime images. \nCheck commands using /\commands. \n\nDid you expect something else? Sorry better go to @TheWNetwork to ask.\n`);
};

module.exports.help = {
    name: "help"
};
