require('dotenv').config();

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const cron = require('node-cron');
const { isHoliday } = require('nyse-holidays');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});
function isTradingDay() {
    return !isHoliday(new Date());
}
// ==========================
// AUTO WELCOME NEW MEMBERS
// ==========================

client.on('guildMemberAdd', async (member) => {

    try {

        const channel = await client.channels.fetch('1098243247584854028');

        // The link below is what makes Discord show the image preview card
        // at the bottom of the message, so keep it in the message text.
        await channel.send(
`👋 Hi ${member}, welcome to BigShort!

⚠️ **SCAM WARNING:** Just reminding you that the founders: Tae, Andrew & Sara (or anyone affiliated with BigShort) would never DM you to solicit anything! It’s a scam!

If you're already subscribed, you can join our Members‑Only Discord channels by following this guide:

https://help.bigshort.com/en/articles/10372185-how-to-join-our-members-only-discord-channels

📓 Need help getting started? Feel free to visit #bigshort-tutoring and ask questions. Our community is always happy to help.

🚀 We're glad to have you here. Happy trading!`
        );

        console.log(`✅ Welcomed ${member.user.tag}`);

    } catch (error) {

        console.error('Welcome message failed:', error);

    }

});
// ==========================
// PREMIUM SUBSCRIBER WELCOME
// ==========================

client.on('guildMemberUpdate', async (oldMember, newMember) => {

    const subscriberRoleId = '1193587147807133786';

    const hadRole = oldMember.roles.cache.has(subscriberRoleId);
    const hasRole = newMember.roles.cache.has(subscriberRoleId);

    // User just became a subscriber
    if (!hadRole && hasRole) {

        try {

            const channel = await client.channels.fetch('1175182341220605983');

            await channel.send(
`🎉 Welcome to BigShort Premium, ${newMember}!

Your subscription is now active and you now have access to our Members‑Only channels.

📊 market-chat
🔥 spy-trades
📈 other-trades
👑 official-tae-recs
💡 product-feedback

Take some time to explore the community and don't hesitate to ask questions.

Happy trading and welcome aboard! 🚀📈`
            );

            console.log(`✅ Premium Welcome Sent to ${newMember.user.tag}`);

        } catch (error) {

            console.error('Premium welcome failed:', error);

        }
    }

});
client.once('clientReady', async () => {

    console.log(`✅ Logged in as ${client.user.tag}`);
// ==========================
// MORNING ROLL CALL MESSAGES
// ==========================

const morningMessages = [
`☀️ **Good morning, BigShort traders!** ☕

Get your charts ready and your game plan in place. Trading starts in **10 minutes**. Let's stay disciplined, follow the data, and have a great trading day! 📈🚀`,

`☀️ **Good morning, BigShort traders!**

The market will be opening soon. Stay patient, stay selective, and let the setups come to you. Trading begins in **10 minutes**. ☕📊🔥`,

`☀️ **Good morning, BigShort traders!**

A new trading day means new opportunities. Trust your process, protect your capital, and trade your edge. We're live in **10 minutes**! ☕⏰📈`,

`☀️ **Good morning, BigShort traders!** ☕

Trading starts in **10 minutes**. Take a moment to review your levels, check the flows, and come in with a plan. Let's have a focused and profitable session. 📊🔥🚀`,

`☀️ **Good morning, BigShort traders!** ☕

Trading begins in **10 minutes**. Grab your coffee, review your charts, and get ready for the day ahead. Stay disciplined, trust the data, and let the market come to you. 📈🔥⏰`
];

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
// WEEKDAY MORNING ROLL CALL
// ==========================

// Monday-Friday 9:20 AM Eastern
cron.schedule(
    '20 9 * * 1-5',
    async () => {

        if (!isTradingDay()) {
    console.log('⛔ NYSE Holiday - Morning Roll Call skipped');
    return;
}
const channel = await client.channels.fetch('1286480342009774080');

const randomMessage =
    morningMessages[Math.floor(Math.random() * morningMessages.length)];

await channel.send(randomMessage);

        console.log('✅ Morning Roll Call Sent');

    },
    {
        timezone: 'America/New_York'
    }
);
    // ==========================
    // WEEKDAY POWER HOUR
    // ==========================

    const powerHourEmbed = new EmbedBuilder()
        .setColor('#2563EB')
        .setTitle('⚡ Power Hour')
        .setDescription(`The last hour of the trading day when institutional activity often distorts typical patterns; requires cautious interpretation.`)
        .setImage('https://raw.githubusercontent.com/Jesroi8810/bigshort-community-bot/main/Images/powerhour.png')
        .setFooter({ text: 'BigShort Community Bot' })
        .setTimestamp();

    // Monday-Friday 3:00 PM Eastern
    cron.schedule(
        '0 15 * * 1-5',
        async () => {

            if (!isTradingDay()) {
    console.log('⛔ NYSE Holiday - Power Hour skipped');
    return;
}

const channel = await client.channels.fetch('1286480342009774080');

await channel.send({
    embeds: [powerHourEmbed]
});

            console.log('✅ Weekday Power Hour Sent');

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
    console.log('📅 Weekday 9:20AM Morning Roll Call schedule loaded');
    console.log('📅 Weekday 3PM Power Hour schedule loaded');
    console.log('📅 Thursday schedule loaded');

});

// Login must come last, after the client and all event handlers are set up
client.login(process.env.BOT_TOKEN);