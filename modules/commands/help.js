const fs = require("fs");
const axios = require("axios");

module.exports.config = {
  name: "help",
  version: "1.0.2", 
  hasPermission: 0,
  credits: "ericson//modified by Jonell Magallanes",
  description: "Beginner's Guide",
  usePrefix: "true",
  prefix: true,
  commandCategory: "system",
  usages: "[Name module]",
  cooldowns: 1,
  envConfig: {
    autoUnsend: false,
    delayUnsend: 20
  }
};

module.exports.run = async function ({ api, event, args, getText }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const command = commands.get((args[0] || "").toLowerCase());
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  const prefix = threadSetting.hasOwnProperty("PREFIX")
    ? threadSetting.PREFIX
    : global.config.PREFIX;

  if (!command) {
    const commandList = Array.from(commands.values());
    const categories = new Set(commandList.map((cmd) => cmd.config.commandCategory.toLowerCase()));
    const categoryCount = categories.size;

    const categoryNames = Array.from(categories);
    const itemsPerPage = 7;
    const totalPages = Math.ceil(categoryNames.length / itemsPerPage);

    let currentPage = 1;
    if (args[0]) {
      const parsedPage = parseInt(args[0]);
      if (
        !isNaN(parsedPage) &&
        parsedPage >= 1 &&
        parsedPage <= totalPages
      ) {
        currentPage = parsedPage;
      } else {
        return api.sendMessage(
          `◖Oops! You went too far! Please choose a page between 1 and ${totalPages}◗`,
          threadID,
          messageID
        );
      }
    }
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const visibleCategories = categoryNames.slice(startIdx, endIdx);

    let msg = `= 𝗕𝗢𝗧 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗟𝗜𝗦𝗧 =\n ❖━━━━━━━━━━━━❖\n╭┈ ❒ Use: ${prefix}\n╰┈➤ this prefix to run these commands\n❖━━━━━━━━━━━━❖\n\n`;
    for (let i = 0; i < visibleCategories.length; i++) {
      const category = visibleCategories[i];
      const categoryCommands = commandList.filter(
        (cmd) =>
          cmd.config.commandCategory.toLowerCase() === category
      );
      msg += `━━━━━━━━━━━━\n╭┈ ❒『 ${i + 1} 』• ${category.charAt(0).toUpperCase() + category.slice(1)}\n`;
      for (const cmd of categoryCommands) {
        msg += `╰┈➤ Name : ${cmd.config.name || "No name command available"}\n`;
        msg += `╰┈➤ Description : ${cmd.config.description || "No description available"}\n`;
        msg += `╰┈➤ Waiting Time: ${cmd.config.cooldowns || 0} seconds(s)\n`;
        msg += `╰┈➤ Category: ${cmd.config.commandCategory}\n`;
        msg += `╰┈➤ Usage: ${prefix}${cmd.config.name} ${cmd.config.usages || ""}\n`;
        msg += `━━━━━━━━━━━━\n`;
      }
    }

    msg += `━━━━━━━━━━━━\n╭┈ ❒ Page ${currentPage} of ${totalPages}\n`;
    msg += `╰┈➤ Type: "${prefix}help <command name>" for more details about that command\n`;
    msg += `╰┈➤ Currently available ${commands.size} commands on bot\n`;
    msg += `╰┈➤ Use ${prefix}help <Number of pages>\n❖━━━━━━━━━━━━❖\n Bot Owner: ${global.config.DESIGN.Admin}`;

    const sentMessage = await api.sendMessage(msg, threadID, messageID);

    if (autoUnsend) {
      setTimeout(async () => {
        await api.unsendMessage(sentMessage.messageID);
      }, delayUnsend * 1000);
    }
  } else {
    return api.sendMessage(
      getText(
        "moduleInfo",
        command.config.name,
        command.config.description,
        `${prefix}${command.config.name} ${
          command.config.usages ? command.config.usages : ""
        }`,
        command.config.commandCategory,
        command.config.cooldowns,
        command.config.hasPermission === 0
          ? getText("user")
          : command.config.hasPermission === 1
          ? getText("adminGroup")
          : getText("adminBot"),
        command.config.credits
      ),
      threadID,
      messageID
    );
  }
};
