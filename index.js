const Discord = require('discord.js');

const client = new Discord.Client();

 

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('voiceStateUpdate', (oldMember, vcmember) => {
 // console.log(vcmember);
 if(vcmember.channel !== null){
 if(vcmember.channel.id ==='723950348359958630'){
 memberz=vcmember.guild.members.cache.get(vcmember.id);
 if(!memberz.roles.cache.find(r => r.id === "722195300378476554"))
 	memberz.voice.setChannel(null)
}
}
});
client.on('message', message => {
	console.log(message.content)
    if (message.content.includes('<@!647966435716366396>')) {

       message.reply('Stop pinging Ryan from PC you idiot');

       }
      if (message.content.includes('<@647966435716366396>')) {

       message.reply('Stop pinging Ryan from your phone you idiot');

       }
});

 
 
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
