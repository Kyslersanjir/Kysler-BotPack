module.exports.config = {
    name: "greet",
    author: "ericson",
    version: "1.0.0",
    hasPermission: 0,
    credits: "ericson",
    description: "Bot automatic greetings",
    usePrefix: true,
    commandCategory: "No Prefix",
    cooldowns: 0,
};
const axios = require("axios");

module.exports.handleEvent = async function({
    api,
    event,
    client,
    __GLOBAL
}) {
    function getFirstName(fullName) {
        let names = fullName.split(' ');
        return names[0] || fullName;
    }
    if (!event.body) {
        return; // Return early if event body is undefined or empty
    }

    const userChat = event.body.toLowerCase();

    async function greet(userChat, api) {
        const greetings = [
            "gago", "putangina", "tangina", "tanginamo", "putangina", "putanginamo", "fuck", "stupid", "",
            "tanga", "tanga mo", "bobo", "ampt", "", "", "",
            "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "",
            "", "", ""
        ];

        if (greetings.includes(userChat)) {
            try {
                const userInfo = await api.getUserInfo(event.senderID);
                const userName = userInfo[event.senderID]?.name || "there";

                api.sendMessage({
                        body: `bawal mag mura ${userName} suntukin ko bunganga mo`,
                        mentions: [{ tag: userName, id: event.senderID }],
                    },
                    event.threadID,
                    (err) => {
                        if (err) {
                            console.error(err);
                            api.sendMessage(`bawal mag mura ${userName} suntukin ko bunganga mo`, event.threadID, event.messageID);
                        }
                    }
                );
            } catch (err) {
                console.error(err);
            }
        } else if (userChat == 'prefix') {
            try {
                const userInfo = await api.getUserInfo(event.senderID);
                const userName = userInfo[event.senderID]?.name;

                api.sendMessage({
                        body: `${userName}, my prefix is: ${global.config.PREFIX}`,
                        mentions: [{ tag: userName, id: event.senderID }],
                    },
                    event.threadID,
                    (err) => {
                        if (err) {
                            console.error(err);
                            api.sendMessage(`${userName}, my prefix is: ${global.config.PREFIX}`, event.threadID, event.messageID);
                        }
                    }
                );
            } catch (err) {
                console.error(err);
            }
        } else if (userChat == 'bot') {
            try {
                const userInfo = await api.getUserInfo(event.senderID);
                const userName1 = userInfo[event.senderID]?.name;
                let userName = getFirstName(userName1);

                api.sendMessage({
                        body: `ano putangina mo ${userName}`,
                        mentions: [{ tag: userName, id: event.senderID }],
                    },
                    event.threadID,
                    (err) => {
                        if (err) {
                            console.error(err);
                            api.sendMessage(`ano putangina mo ${userName}`, event.threadID, event.messageID);
                        }
                    }
                );
            } catch (err) {
                console.error(err);
            }
        }
    }
    await greet(userChat, api);
};

module.exports.run = function({
    api,
    event,
    client,
    __GLOBAL
}) {}
