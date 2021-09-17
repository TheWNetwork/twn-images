const rp = require('request-promise');
/**
 *
 * @param token
 * @param chat_id
 * @param document
 * @param caption
 * @returns {Promise<*>}
 */
module.exports.run = async (token, chat_id) => {
    const options = {
        method: 'GET',
        uri: `https://api.telegram.org/bot${token}/getChatMembersCount`,
        qs: {
            chat_id: chat_id,
        }
    };
    console.log(options);
    return rp(options);
}


module.exports.help = {
    name: "getChatMembersCount"
};