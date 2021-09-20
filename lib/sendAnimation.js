const rp = require('request-promise');
const axios = require("axios");
/**
 *
 * @param token
 * @param chat_id
 * @param caption
 * @param document
 * @returns {Promise<*>}
 */
module.exports.run = async (token, chat_id, caption, document) => {
    return axios(`https://api.telegram.org/bot${token}/sendAnimation`, {
        params: {
            chat_id: chat_id,
            animation: document,
            caption: `[Link to ${caption}](${document})`,
            parse_mode: "Markdown"
        }
    });
}

module.exports.help = {
    name: "sendAnimation"
};
