module.exports.config = {
	name: "bday",
	version: "1.0.0",
	hasPermssion: 0,
  credits: "ericson",
	description: "See admin's birthday",
  usePrefix: true,
	commandCategory: "bday",
	cooldowns: 5
}

module.exports.run =  ({ api, event, args, client, Users, Threads, __GLOBAL, Currencies }) => {
  const axios = global.nodemodule["axios"];
  const request = global.nodemodule["request"];
  const fs = global.nodemodule["fs-extra"];
    const t = Date.parse("November 21, 2023 00:00:00") - Date.parse(new Date());
    const seconds = Math.floor( (t/1000) % 60 );
    const minutes = Math.floor( (t/1000/60) % 60 );
    const hours = Math.floor( (t/(1000*60*60)) % 24 );
    const days = Math.floor( t/(1000*60*60*24) );
    var callback = () => api.sendMessage(
  {body:`Time left until Admin - ericson終. birthday\n» ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds. «`, attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => 
    fs.unlinkSync(__dirname + "/cache/1.png"));  
      return request(encodeURI(`https://graph.facebook.com/100027279883548/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(
fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
    
      };
