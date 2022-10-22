const axios = require("axios");
/**
 *
 * @param provider
 * @returns {Promise<*>}
 */
module.exports.run = async (provider) => {
    return axios({
        method: 'get',
        url: `${provider.destination}?limit=1&tags=order:random`,
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
    name: "lolibooru"
};