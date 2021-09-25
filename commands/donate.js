module.exports.run = async (botconfig, pool, bot, message, args) => {
    await bot.sendMessage(message.chat.id, `Donate to improve and pay our servers\n\nYou can check our services on @TheWNetwork.`,
        {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Paypal', callback_data: 'https://www.paypal.com/paypalme/elsalundqvist'},
                    {text: 'Ko-Fi', callback_data: 'https://ko-fi.com/thewnetwork'}]
                ]
            }
        }
    );
};

module.exports.help = {
    name: "donate"
};