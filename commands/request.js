const rp = require("request-promise");
module.exports.run = async (botconfig, dbclient, bot, message, provider) => {
    try {
        let providerQuery = require(`../provider/${provider.code}.js`);
        let sendPhotoLib = require(`../lib/sendPhoto.js`);
        let imagePromise = providerQuery.run(provider);
        let image = JSON.parse(await imagePromise);
        sendPhotoLib.run(botconfig.token, message.chat.id, '', image.url);
    } catch (e) {

    }
};

module.exports.help = {
    name: "request"
};
