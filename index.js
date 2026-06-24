const mineflayer = require('mineflayer');
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot Minecraft 24/7\n');
});
server.listen(3000);

function createBot() {
    const bot = mineflayer.createBot({
        host: 'snpw812.mcsh.io',
        username: 'BotTreoServer247',
        version: '1.21.1'
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
        setTimeout(createBot, 5000);
    });

    bot.on('error', (err) => console.log(err));
}

createBot();
