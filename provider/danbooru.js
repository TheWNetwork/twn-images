const axios = require("axios");
const FormData = require('form-data');

/**
 *
 * @param provider
 * @returns {Promise<*>}
 */
module.exports.run = async (provider) => {
    return axios({
        method: 'GET',
        maxBodyLength: Infinity,
        url: `${provider.destination}?api_key=${provider.api_key}&login=${provider.api_user}&limit=1&tags=order:random ${provider.endpoint}`,
        maxRedirects: 0
    }).then(function (result) {
        return result.data[0].file_url;
    }).catch(function (error) {
        console.log(error);
        console.log(error.status);
    });
}

module.exports.help = {
    name: "Danbooru"
};
