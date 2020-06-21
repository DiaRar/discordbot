const Discord = require('discord.js');
const client = new Discord.Client();
const { Users } = require('./dbObjects');
const { Op } = require('sequelize');
const currency = new Discord.Collection();
const PREFIX = '/';
const cooldowns = new Discord.Collection()
/*
 * Make sure you are on at least version 5 of Sequelize! Version 4 as used in this guide will pose a security threat.
 * You can read more about this issue On the [Sequelize issue tracker](https://github.com/sequelize/sequelize/issues/7310).
 */

Reflect.defineProperty(currency, 'add', {
	value: async function add(id, amount) {
		const user = currency.get(id);
		if (user) {
			user.balance += Number(amount);
			return user.save();
		}
		const newUser = await Users.create({ user_id: id, balance: amount });
		currency.set(id, newUser);
		return newUser;
	},
});

Reflect.defineProperty(currency, 'getBalance', {
	value: function getBalance(id) {
		const user = currency.get(id);
		return user ? user.balance : 0;
	},
});

client.once('ready', async () => {
	const storedBalances = await Users.findAll();
	storedBalances.forEach(b => currency.set(b.user_id, b));
	console.log(`Logged in as ${client.user.tag}!`);
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
client.on('message', async message => {
	if (message.author.bot) return;
	const input = message.content.slice(PREFIX.length).trim();
	if (!input.length) return;
	const [, command, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/);

	if (command === 'balance'|| command === 'bal') {
		const target = message.mentions.users.first() || message.author;
		return message.channel.send(`<@${target.id}> has ${currency.getBalance(target.id)} sunbeam`);
	}else if(command === 'claim'){
		return message.channel.send(`Dm <@468388958599118848> to claim your sunbeam, you need at least 100 sunbeam`)
	}else if (message.content.includes('<@!647966435716366396>')|| message.content.includes('<@647966435716366396>')) {
       if (!cooldowns.has(ryangei)) {
        cooldowns.set(ryangei, new Discord.Collection())
    }

    let now = Date.now()
    let timestamps = cooldowns.get(ryangei)
    let cooldownAmount = 300000

    if (timestamps.has(message.author.id)) {
        let expirationTime = timestamps.get(message.author.id) + cooldownAmount

        if (now < expirationTime) {
            let timeleft = (expirationTime - now) / 1000
            return message.reply(`please wait ${timeleft.toFixed(1)} before pinging getting sunbeam again`); 
        }
    }
    timestamps.set(message.author.id, now)
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
       try {
       	currency.add(message.author.id, 1);
      	message.reply('well done pinging Ryan, you get 1 sunbeam');
    } catch (error) {
        console.error(error)
        message.reply('Lmao Errorz!')
    }

       }
});
let ryangei = 'ryangei';
client.on('ready', () => {

    console.log('I am ready!');

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);
