const axios = require("axios");
/**
 *
 * @param provider
 * @returns {Promise<*>}
 */
module.exports.run = async (provider) => {
    return axios(`${provider.destination}?page=dapi&s=post&json=1&q=index&random=1&limit=1&api_key=${provider.api_key}&user_id=${provider.api_user}&tags=sort:random ${provider.endpoint}`)
        .then(function (result) {
            return result.data.file_url
        });
}

module.exports.help = {
    name: "gelbooru"
};