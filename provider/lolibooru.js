const axios = require("axios");
/**
 *
 * @param provider
 * @returns {Promise<*>}
 */
module.exports.run = async (provider) => {
    return axios({
        method: 'get',
        url: `${provider.destination}`,
        data: {
            "api_key": provider.api_key,
            "login": provider.api_user,
            "tags": "order:random",
            "limit": 1,
        },
        headers: {
            'content-type': 'application/json'
        },
        maxRedirects: 0
    }).then(function (result) {
        return result.data[0].file_url;
    }).catch(function (error) {
        console.log(error);
        console.log(error.status);
    });
}

module.exports.help = {
    name: "Lolibooru"
};