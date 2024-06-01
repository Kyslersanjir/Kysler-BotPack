module.exports.config = {
  name: "autoreply",
  author: "ericsonpascua",
  version: "1.0.0",
  hasPermission: 0,
  credits: "ericsonpascua",
  description: "Talk with bot using reply",
  usePrefix: true,
  commandCategory: "system",
  cooldowns: 0,
};

const axios = require("axios");

module.exports.handleEvent = async function({
  api,
  event
}) {

  const userChat = event.body;

  if (userChat == undefined) {
      return;
  } else if (userChat.startsWith(`${global.config.PREFIX}`)) {
      return;
  } else if (!isNaN(userChat.charAt(0))) {
      return;
  } else if (/^[a-d]$/i.test(userChat)) {
      return;
  } else if (event.messageReply && event.messageReply.senderID == api.getCurrentUserID()) {
      try {
          const encodedUserChat = encodeURIComponent(userChat);
        //   const akiResponse = (await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=ph&message=${encodedUserChat}&filter=false`)).data.success;
          // const akiResponse = (await axios.get(`http://fi1.bot-hosting.net:6378/sim?query=${encodedUserChat}`)).data.respond;
          const akiResponse = (await axios.get(`https://azeu-api-official-1.onrender.com/SimsimiChat?message=${encodedUserChat}`)).data.Reply;
          api.sendMessage(akiResponse, event.threadID, event.messageID);
      } catch (err) {
          console.error("Error:", err);
          // Handle errors if needed
      }
  }
};

module.exports.run = function({
}) {}
