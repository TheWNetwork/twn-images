const rp = require('request-promise');
/**
 *
 * @param provider
 * @returns {Promise<*>}
 */
module.exports.run = async (provider) => {
    const options = {
        method: 'GET',
        uri: `${provider.destination}${provider.endpoint}`,
    };
    console.log(options);
    return rp(options);
}


module.exports.help = {
    name: "NekosLife"
};