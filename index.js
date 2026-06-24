const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'snpw812.mcsh.io',
        username: 'BotTreoServer247'
    });

    bot.on('spawn', () => {
        console.log('Bot đã vào server thành công!');
    });

    setInterval(() => {
        if (bot.entity) {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }
    }, 10000);

    bot.on('end', () => {
        console.log('Bot bị mất kết nối, đang reconnect sau 5 giây...');
        setTimeout(createBot, 5000);
    });

    bot.on('error', (err) => console.log('Lỗi Bot: ', err));
}

createBot();
