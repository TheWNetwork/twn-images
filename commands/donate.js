module.exports.run = async (botconfig, pool, bot, message, args) => {
    await bot.sendMessage(message.chat.id, `Donate to improve and pay our servers\n\nYou can check our services on @TheWNetwork.`,
        {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Paypal', url: 'https://www.paypal.com/paypalme/elsalundqvist'},
                    {text: 'Ko-Fi', url: 'https://ko-fi.com/thewnetwork'}]
                ]
            }
        }
    );
};

module.exports.help = {
    name: "donate"
};