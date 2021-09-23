const axios = require("axios");
/**
 *
 * @param provider
 * @returns {Promise<*>}
 */
module.exports.run = async (provider) => {
    return axios(`${provider.destination}${provider.endpoint}`).then(function(result){
        return result.data.url
    });
}

module.exports.help = {
    name: "waifupics"
};