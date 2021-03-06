const axios = require("axios");

/**
 *
 * @param token telegram bot token
 * @param chat_id telegram id
 * @param caption text to send with photo, max 1024 chars
 * @param document url or base64
 * @returns {Promise<*>}
 */
module.exports.run = async (token, chat_id, caption, document) => {
    return axios.get(`https://api.telegram.org/bot${token}/sendAnimation`, {
        params: {
            chat_id: chat_id,
            animation: document,
            caption: `[Link to ${caption}](${document})`,
            parse_mode: "markdown"
        }
    });
}

module.exports.help = {
    name: "sendAnimation"
};
