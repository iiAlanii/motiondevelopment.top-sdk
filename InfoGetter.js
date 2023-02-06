const ApiError = require("./src/utils/ApiError");
const ErrorHandler = require('./src/utils/ErrorHandler');
const fetch = require("node-fetch");

/**
 * Class for InfoGetter
 * @param apiKey Motiondevelopment API Token
 * @param botId ID of your bot
 * @example
 * const InfoGetter = require('motiondevelopment.top-sdk')
 * const info = new InfoGetter('motiondevelopment api token', ' your botId');
 */

class InfoGetter {
    constructor(apiKey, botId) {
        this.botId = botId;
        this.apiKey = apiKey;
        this.baseURL = "https://motiondevelopment.top/api/v1.2/bots/";
    }

    /**
     * get the bot information
     * @returns {Promise<{botStatus: (*|string), botAnnouncement: (*|string), botName: (*|string), botLibrary: (*|string), botServers: (*|string), botOwnerId: (*|string), botVanityUrl: (*|string), botDiscord: (*|string), botApproval: (*|string), botPublicFlags: (*|string), botInvite: (*|string), botListdate: (*|string), botBigDescription: (*|string), botSmallDescription: (*|string), botPrefix: (*|string), botSite: (*|string), coOwnersArray: *[], botOwnerName: (*|string), botId: (*|string), coOwners: (*|*[]), botAvatar: (*|string)}>} Returns the bot information in JSON format, then you can parse it
     * @example
     * const InfoGetter = require('motionbotlist-sdk')
     * const info = new InfoGetter('motiondevelopment api token', ' your botId');
     * info.getBotInfo().then((data) => {
     * console.log(data);
     * });
     */

    async getBotInfo() {
        if (!this.apiKey) {
            throw new ApiError('Missing API key', 400);
        }
        if(!this.botId) {
            throw new Error('Missing bot ID');
        }
        try {
            const response = await fetch(`${this.baseURL}${this.botId}`, {
                method: "GET",
                headers: { key: this.apiKey },
            });

            if (!response.ok) {
                throw new Error(`[MotionBotList]: Failed to retrieve bot information`);
            }

            const data = await response.json();

            const botBigDescription = data.Big_desc ? data.Big_desc : "None";
            const botSmallDescription = data.Small_desc ? data.Small_desc : "None";
            const botAnnouncement = data.announcement ? data.announcement : "None";
            const botAvatar = data.avatar ? data.avatar : "None";
            const botId = data.id ? data.id : "None";
            const botName = data.bot_name ? data.bot_name : "None";
            const botStatus = data.status ? data.status : "None";

            const coOwners = data.co_owners ? data.co_owners : [];
            const coOwnersArray = [];

            for (const coOwner of coOwners) {
                const discriminator = coOwner.discriminator ? coOwner.discriminator : "None";
                const id = coOwner.id ? coOwner.id : "None";
                const publicFlags = coOwner.public_flags ? coOwner.public_flags : "None";
                const username = coOwner.username ? coOwner.username : "None";

                coOwnersArray.push({ discriminator, id, publicFlags, username });
            }
            const botDiscord = data.discord ? data.discord : "None";
            //const botBotId = data.id ? data.id : "None";
            const botInvite = data.invite ? data.invite : "None";
            const botLibrary = data.lib ? data.lib : "None";
            const botListdate = data.list_date ? data.list_date : "None";
            const botOwnerId = data.owner_id ? data.owner_id : "None";
            const botOwnerName = data.owner_name ? data.owner_name : "None";
            const botPrefix = data.prefix ? data.prefix : "None";
            const botPublicFlags = data.public_flags ? data.public_flags : "None";
            const botServers = data.servers ? data.servers : "None";
            const botSite = data.site ? data.site : "None";
            const botApproval = data.status ? data.status : "None";
            const botVanityUrl = data.vanity_url ? data.vanity_url : "None";

            return {
                coOwnersArray,
                botBigDescription,
                botSmallDescription,
                botAnnouncement,
                botAvatar,
                botId,
                botName,
                botStatus,
                botDiscord,
                botInvite,
                botLibrary,
                botListdate,
                botOwnerId,
                botOwnerName,
                botPrefix,
                botPublicFlags,
                botServers,
                botSite,
                botApproval,
                botVanityUrl,
                coOwners
            };
        } catch (err) {
            const errorHandler = new ErrorHandler();
           return errorHandler.handleError(err);
        }
    }
}

module.exports = InfoGetter;
