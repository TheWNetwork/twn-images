const rp = require('request-promise');
/**
 *
 * @param token
 * @param chat_id
 * @param caption
 * @param document
 * @returns {Promise<*>}
 */
module.exports.run = async (token, chat_id, caption, document) => {
    const options = {
        method: 'GET',
        uri: `https://api.telegram.org/bot${token}/sendMessage`,
        qs: {
            chat_id,
            caption
        }
    };
    return rp(options);
}

module.exports.help = {
    name: "sendMessage"
};
