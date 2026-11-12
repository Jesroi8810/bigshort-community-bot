require('dotenv').config();

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const cron = require('node-cron');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once('clientReady', async () => {

    console.log(`✅ Logged in as ${client.user.tag}`);

    // ==========================
    // TUESDAY FRIENDLY REMINDER
    // ==========================

    const reminderEmbed = new EmbedBuilder()
        .setColor('#F59E0B')
        .setTitle('📢 Friendly Reminder')
        .setDescription(`💬 Need help? Always feel free to tag us here.

🤝 Not sure how to get started? Reply here and we'll show you.

🚪 Don't know how to trade? There's the door... Kidding! 😄 Welcome to all! We're here to help!

📓 Do try to use the #bigshort-tutoring channel when possible 🙂

Thank you for your attention to this matter!`)
        .setFooter({ text: 'BigShort Community Bot' })
        .setTimestamp();

    // Tuesday 9:00 AM Eastern
    cron.schedule(
        '0 9 * * 2',
        async () => {

            const channel = await client.channels.fetch('1248083166028238949');

            await channel.send({
                embeds: [reminderEmbed]
            });

            console.log('✅ Tuesday Reminder Sent');

        },
        {
            timezone: 'America/New_York'
        }
    );

    // ==========================
    // DAILY POWER HOUR
    // ==========================

    const powerHourEmbed = new EmbedBuilder()
        .setColor('#2563EB')
        .setTitle('⚡ Power Hour')
        .setDescription(`The last hour of the trading day when institutional activity often distorts typical patterns; requires cautious interpretation.`)
        .setImage('https://raw.githubusercontent.com/Jesroi8810/bigshort-community-bot/main/Images/powerhour.png')
        .setFooter({ text: 'BigShort Community Bot' })
        .setTimestamp();

    // Daily 3:00 PM Eastern
    cron.schedule(
        '0 15 * * *',
        async () => {

            const channel = await client.channels.fetch('1286480342009774080');

            await channel.send({
                embeds: [powerHourEmbed]
            });

            console.log('✅ Daily Power Hour Sent');

        },
        {
            timezone: 'America/New_York'
        }
    );

    // ==========================
    // THURSDAY WELCOME MESSAGE
    // ==========================

    const welcomeEmbed = new EmbedBuilder()
        .setColor('#00D26A')
        .setTitle('🎉 Welcome to BigShort NEW Subscribers!')
        .setDescription(`💬 Need help? Don't hesitate to tag us here. We're always around.

🤝 Not sure how to start? Just reply here and we'll guide you step by step.

🚀 First time trading? No worries! Everyone starts somewhere. We've got your back.

📓 Pro tip: Use the #bigshort-tutoring channel whenever possible. It's built for learning.

✨ Reminder: This is a community space. Share ideas, ask questions, and grow together.

📚 Helpful Resources for You

• New Users: Start Here
https://help.bigshort.com/docs/category/new-users-start-here

• The Complete Noob's Guide to BigShort
https://www.youtube.com/watch?v=0j3ypldk4cw&list=PLYz2ezRUoAXFvzfwyAgkDip-A_tCforMH&index=1&pp=iAQB

• BigShort: User Q&A 7/16/2026
https://youtu.be/8s9m5_bPRnw

🎁 Referral Program

To all our subscribers: join our referral program and help BigShort grow while sharing the rewards with your network.

https://app.bigshort.com/referrals

Thank you for joining us, and welcome aboard!`)
        .setFooter({ text: 'BigShort Community Bot' })
        .setTimestamp();

    // Thursday 9:00 AM Eastern
    cron.schedule(
        '0 9 * * 4',
        async () => {

            const channel = await client.channels.fetch('1248083166028238949');

            await channel.send({
                embeds: [welcomeEmbed]
            });

            console.log('✅ Thursday Welcome Message Sent');

        },
        {
            timezone: 'America/New_York'
        }
    );

    console.log('📅 Tuesday schedule loaded');
    console.log('📅 Daily 3PM Power Hour schedule loaded');
    console.log('📅 Thursday schedule loaded');

});

client.login(process.env.BOT_TOKEN);