const axios = require("axios");
/**
 *
 * @param provider
 * @returns {Promise<*>}
 */
module.exports.run = async (provider) => {
    return axios({
        method: 'get',
        url: `${provider.destination}?page=dapi&s=post&json=1&q=index&random=1&limit=1&api_key=${provider.api_key}&user_id=${provider.api_user}&random=1tags=${provider.endpoint}`,
        headers: {
            'content-type': 'application/json'
        },
        maxRedirects: 0
    }).then(function (result) {
        return result.data[0].file_url
    });
}

module.exports.help = {
    name: "gelbooru"
};