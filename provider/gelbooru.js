const axios = require("axios");
/**
 *
 * @param provider
 * @returns {Promise<*>}
 */
module.exports.run = async (provider) => {
    return axios({
        method: 'get',
        url: `${provider.destination}?api_key=${provider.api_key}&user_id=${provider.api_user}&page=dapi&s=post&json=1&q=index&limit=1&tags=${provider.endpoint} sort:random`,
        headers: {
            'content-type': 'application/json'
        },
        maxRedirects: 0
    }).then(function (result) {
        return result.data.post[0].file_url
    }).catch(function (error) {
        console.log(error.status);
    });
}

module.exports.help = {
    name: "gelbooru"
};
