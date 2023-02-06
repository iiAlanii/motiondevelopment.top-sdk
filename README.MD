# Motiondevelopment SDK for Discord.JS

This is an SDK package for interacting with the Motiondevelopment API using Discord.JS. The package includes a set of tools to easily perform API requests, such as posting server count, fetching information about bots, and receiving hasVoted responses.

# Links
***
[Documentation](https://motiondevelopment.top/docs/api/intro)  
[API Reference](https://motiondevelopment.top/docs/api/intro) | [Github](https://github.com/iiAlanii/motiondevelopment.top-sdk) | [NPM](https://www.npmjs.com/package/motiondevelopment.top-sdk) | [Discord Server](https://discord.gg/2Z8Y4Z4)


# Requirements

To use the Motiondevelopment SDK, you will need:
- A [Motiondevelopment](https://motiondevelopment.top/) API key.
  You can find your Motiondevelopment.top api token at `https://motiondevelopment.top/bots/(BOT_ID)/edit/api` and clicking on the "Show" button.
- Your Discord.js bot ID.
- Your bot approved on [Motiondevelopment](https://motiondevelopment.top/)
- At least [Node.JS@18](https://nodejs.org/dist/v18.14.0/node-v18.14.0-x64.msi) installed on your machine
- At least Discord.JS V14 installed on your machine

# Installation
***
To install the Motiondevelopment SDK, simply run the following command in your terminal:
```bash
npm install motiondevelopment.top-sdk
```

# Usage

## Posting server count
We have simplified the process of posting server count to Motiondevelopment. That's why we have created a class called "AutoPoster". This class will automatically post your server count to Motiondevelopment every 15 minutes. (The interval cannot be changed at the moment.)

Below is a full example:
```js
//Your Discord.JS Client
const Discord = require('discord.js');
const client = new Discord.Client();// Fill in your intents

//motionbotlist SDK
const AutoPoster = require('motiondevelopment.top-sdk');
//create a new instance of AutoPoster
const autoPoster = new AutoPoster('your_motiondevelopment_api_key', client);

    client.on('ready', () => {
        try{
            //post the server count
          autoPoster.postGuildCount().then(() => {
              console.log('Posted server count!');
          }).catch((error) => {
              //handle error if it could not log the message
              console.error(error);
          });
        } catch (err) {
            //handle error if the AutoPoster was unable to post guild count.
            console.error(err.message, err.status);
        }
    });


//Your bot token
client.login('your_bot_token');
```
## Fetching bot information

To fetch information about a bot on Motiondevelopment, you can use the "InfoGetter".
Below is a full example:
```js
//Your Discord.JS Client
const Discord = require('discord.js');
const client = new Discord.Client();// Fill in your intents

//motionbotlist SDK
const InfoGetter = require('motiondevelopment.top-sdk');
//create a new instance of InfoGetter
const infoGetter = new InfoGetter('your_motiondevelopment_api_key', 'your_bot_id');
//Get the bot information
infoGetter.getBotInfo().then((info) => {
    console.log(info);
    //handle the bot information
    //data.botName
    //data.botStatus
    //data.botOwnerId
    //data.botOwnerName
    //data.botPrefix
    //...etc
    
}).catch((error) => {
    //handle error
    console.error(error);
});

//Your bot token
client.login('your_bot_token');
```
Here are all the available methods for "data" in the example above:
```js
    data.botBigDescription //Gets the big description of the bot
    data.botSmallDescription //Gets the small description of the bot
    data.botAnnouncement //Gets the announcement of the bot
    data.botAvatar // Gets the avatar of the bot
    data.botId //Gets the id of the bot
    data.botName //Gets the name of the bot
    data.botStatus //Gets the status of the bot (if it's approved or awaiting approval')
    data.botDiscord //Gets the discord invite of the bot
    data.botInvite //Gets the invite of the bot
    data.botLibrary //Gets the library of the bot
    data.botListdate //Gets the list date of the bot
    data.botOwnerId //Gets the owner id of the bot
    data.botOwnerName //Gets the owner name of the bot
    data.botPrefix //Gets the prefix of the bot
    data.botPublicFlags //Gets the public flags of the bot
    data.botServers //Gets the servers of the bot
    data.botSite //Gets the site of the bot
    data.botApproval //Gets the approval of the bot
    data.botVanityUrl //Gets the vanity url of the bot
```
## Fetching bot votes

To see if a user voted your bot on Motiondevelopment, you can use the "VoteGetter".
Below is a full example:
```js
//Your Discord.JS Client
const Discord = require('discord.js');
const client = new Discord.Client();// Fill in your intents

//motionbotlist SDK
const VoteGetter = require('motiondevelopment.top-sdk');
//create a new instance of VoteGetter
const voteGetter = new VoteGetter(apiKey, botId);

const hasVoted = await voteGetter.hasVoted('user_id');
//with the user id, you can check if the user has voted for your bot or not.

//here is an example for using the hasVoted variable

client.on('messageCreate', message => {
    const userId = "user_id";
    if (message.content === '!vote') {
        voteGetter.hasVoted(userId).then(data => {
            if (data === true) {
                message.reply('You have voted!')
            } else {
                message.reply('You have not voted!')
            }
        }).catch((error) => {
            //handle error
            console.error(error);
        });
    }
});

//If a user voted, it will return true, otherwise it will return false.


//Your bot token
client.login('your_bot_token');
```

# Help

If you don't understand something in the documentation, or you are experiencing problems, please don't hesitate to join our official [motiondevelopment.top discord server](https://discord.gg/BB3ZwcVJDA).

# License

This project is licensed under the "Proprietary License" license. (This license could change in the future.)



