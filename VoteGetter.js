const ApiError = require('./src/utils/ApiError');
const ErrorHandler = require('./src/utils/ErrorHandler');
const fetch = require('node-fetch');

/**
 * Class for VoteGetter
 * @param apiKey Motiondevelopment API Token
 * @param botId ID of your bot
 * @example
 * const VoteGetter = require('motiondevelopment.top-sdk')
 *
 * const vote = new VoteGetter('motiondevelopment api token', ' your botId');
 */
class VoteGetter {
    constructor(apiKey, botId) {
        this.apiKey = apiKey;
        this.botId = botId;
        this.baseURL = 'https://motiondevelopment.top/api/v1.2/bots';
    }

    /**
     * Check if a user has voted for the bot
     * @param userId Discord user ID of the user
     * @returns {Promise<Boolean>} True if the user has voted for the bot, False otherwise
     * @example
     * const VoteGetter = require('motionbotlist-sdk')
     * const vote = new VoteGetter('motiondevelopment api token', ' your botId');
     * vote.hasVoted('user id').then((data) => {
     * console.log(data);
     * });
     */

    async hasVoted(userId) {
        if (!this.apiKey) {
            throw new ApiError('Missing motiondevelopment.top API key', 400);
        }
        if(!this.botId) {
            throw new Error('Missing bot ID');
        }
        if(!userId) {
            throw new Error('Missing user ID');
        }
        try {
          // Perform the API request to check if the user has voted for the bot
            const response = await fetch(`${this.baseURL}/${this.botId}/votes/${userId}`, {
                headers: {
                    'key': `${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                if (response.status === 404) {
                    return false;
                }
                let errorMessage;
                try {
                    const error = await response.json();
                    errorMessage = error.message;
                } catch (err) {
                    errorMessage = response.statusText;
                }
                throw new Error(errorMessage);
            }

            let result;
            try {
                result = await response.json();
            } catch (err) {
                throw new Error(`[Motiondevelopment]: Failed to parse response as JSON: ${err.message}`);
            }

            return true;
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            } else {
                throw new ApiError('[Motiondevelopment]: Failed to check if user has voted', 500);
            }
        }
    }
}

module.exports = VoteGetter;
