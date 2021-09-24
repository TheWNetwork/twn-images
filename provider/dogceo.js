const axios = require("axios");
/**
 *
 * @param provider
 * @returns {Promise<*>}
 */
module.exports.run = async (provider) => {
    return axios(`${provider.destination}`)
        .then(function (result) {
            return result.data.message
        });
}

module.exports.help = {
    name: "dogceo"
};