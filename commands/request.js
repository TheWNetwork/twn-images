const rp = require("request-promise");
module.exports.run = async (botconfig, dbclient, bot, message, provider) => {
    try {
        let providerQuery = require(`../provider/${provider.code}.js`);
        let imagePromise = providerQuery.run(provider);
        let image =  JSON.parse(await imagePromise);
        return image.url;
    } catch (e) {

    }
};

module.exports.help = {
    name: "request"
};
