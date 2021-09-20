module.exports.run = async (botconfig, dbclient, bot, message, provider) => {
    try {
        let providerQuery = require(`../provider/${provider.code}.js`);
        let promise = providerQuery.run(provider);
        return await promise;
    } catch (e) {

    }
};

module.exports.help = {
    name: "request"
};
