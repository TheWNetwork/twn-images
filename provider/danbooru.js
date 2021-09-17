const axios = require("axios");
/**
 *
 * @param provider
 * @returns {Promise<*>}
 */
module.exports.run = async (provider) => {
    return axios({
        method: 'get',
        auth: {
            'username': `${provider.api_user}`,
            'password': `${provider.api_key}`,
        },
        url: `${provider.destination}`,
        data: {
            tags: `${provider.command}`,
            random: 1,
            limit: 1,
        }
    }).then(function(result){
        return result.data[0].file_url
    }).catch(function (error) {
        console.log(error);
    });
}

module.exports.help = {
    name: "Danbooru"
};