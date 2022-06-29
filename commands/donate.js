module.exports.run = async (botconfig, pool, bot, message, args) => {
    try {
        await bot.sendMessage(message.chat.id, `Donate to improve and pay our servers\n\nYou can check our services on @TheWNetwork.`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'My Donate Options',
                                url: botconfig.donate.paypal
                            }
                        ],
                        [
                            {text: 'Paypal', url: botconfig.donate.paypal},
                            {text: 'Patreon/Ko-Fi', url: botconfig.donate.other},
                        ],
                        [
                            {text: 'TWN Developer', url: 'https://t.me/TheWNetwork'}
                        ],
                        [
                            {text: 'Paypal', url: 'https://www.paypal.me/elsalundqvist'},
                            {text: 'LiberPay (Preferred)', url: 'https://liberapay.com/TheWNetwork/donate'}
                        ],
                        [
                            {text: 'Github', url: 'https://github.com/TheWNetwork/twn-images'}
                        ],
                    ]
                }
            }
        );
    } catch (e) {
        await bot.sendMessage(message.chat.id, `Donate to improve and pay our servers and get better licenses\n\nYou can check our services on @TheWNetwork.`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {text: 'LiberPay (Preferred)', url: 'https://liberapay.com/TheWNetwork/donate'},
                            {text: 'Paypal', url: 'https://www.paypal.me/elsalundqvist'},
                            {text: 'Patreon', url: 'https://www.patreon.com/TheWNetwork'}
                        ],
                        [
                            {text: 'Github Repository', url: 'https://github.com/TheWNetwork/twn-images'}
                        ]
                    ]
                }
            }
        );
    }
};

module.exports.help = {
    name: "donate"
};