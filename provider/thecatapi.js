const axios = require("axios");
/**
 *
 * @param provider
 * @returns {Promise<*>}
 */
module.exports.run = async (provider) => {
    return axios({
        method: 'get',
        url: `${provider.destination}&api_key=${provider.api_key}`,
    }).then(function(result){
        return result.data[0].url
    }).catch(function (error) {
        console.log(error);
    });
}

module.exports.help = {
    name: "thecatapi"
};