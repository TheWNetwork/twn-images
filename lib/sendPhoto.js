const rp = require('request');
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
        uri: `https://api.telegram.org/bot${token}/sendPhoto`,
        qs: {
            chat_id: chat_id,
            photo: document,
            caption: caption,
            parse_mode: "Markdown"
        }
    };
    return rp(options);
}

module.exports.help = {
    name: "sendPhoto"
};
