const ApiError = require('./src/utils/ApiError');
const ErrorHandler = require('./src/utils/ErrorHandler');
const fetch = require('node-fetch');
const Discord = require('discord.js');

/**
 * Class for AutoPoster
 * @param apiKey Motiondevelopment API Token
 * @param botId ID of your bot
 * @example
 * const AutoPoster = require('motiondevelopment.top-sdk')
 *
 * const poster = new AutoPoster('motiondevelopment api token', 'your botId');
 */
class AutoPoster {
    constructor(apiKey, client) {
        this.apiKey = apiKey;
        this.client = client;
        this.baseURL = 'https://motiondevelopment.top/api/v1.2/bots';
        this._guildCount = client.guilds.cache.size;

        this.client.once("ready", () => {
            this._guildCount = this.client.guilds.cache.size;
            this.postGuildCount().then(() => console.log('[Motiondevelopment]: Posted guild count')).catch(err => console.error(err));
        });

        // update guild count every minute
        setInterval(() => {
            this._guildCount = this.client.guilds.cache.size;
            this.postGuildCount().catch(err => console.error(err));
        }, 900000);

    }

    /**
     * Get the bot ID from the client
     * @returns {String} Bot ID
     *
     */
    get botId() {
        return this.client.user.id;
    }

    /**
     * Post the guild count to Motiondevelopment
     * @returns {Promise<void>}
     * @example
     * const AutoPoster = require('motiondevelopment-sdk')
     * const poster = new AutoPoster('motiondevelopment api token', 'your botId');
     * poster.postGuildCount().then(() => {
     * console.log('Posted guild count');
     * });
     */

    async postGuildCount() {
        if (!this.apiKey) {
            throw new ApiError('Missing API key', 400);
        }
        if(!this.client) {
            throw new Error('Missing client');
        }
        try {
            // Perform the API request to post the guild count
            const response = await fetch(`${this.baseURL}/${this.botId}/stats`, {
                method: 'POST',
                headers: {
                    'key': `${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ guilds: this._guildCount })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new ApiError(error.message, response.status);
            }
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            } else {
                throw new ApiError('[Motiondevelopment] Failed to post guild count', 500);
            }
        }
    }
}

module.exports = AutoPoster;
