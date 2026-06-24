const http = require('http');

http.createServer((req, res) => {
    res.write('Bot is running!');
    res.end();
}).listen(process.env.PORT || 3000);

const mineflayer = require('mineflayer');

const botArgs = {
    host: 'SNPW.ddns.net', 
    port: 14377,
    username: 'AfkBotSNWP', 
    version: '1.21.11' 
};

let bot;

function initBot() {
    bot = mineflayer.createBot(botArgs);

    bot.on('spawn', () => {
        console.log('Bot đã vào server thành công!');
    });

    bot.on('message', (jsonMsg) => {
        const message = jsonMsg.toString().toLowerCase();
        
        if (message.includes('register') || message.includes('đăng ký')) {
            setTimeout(() => {
                bot.chat('/register sonbot123 sonbot123');
            }, 2000);
        }
        
        if (message.includes('login') || message.includes('đăng nhập')) {
            setTimeout(() => {
                bot.chat('/login sonbot123');
            }, 2000);
        }
    });

    bot.on('end', () => {
        console.log('Bot bị mất kết nối, đang thử vào lại sau 5 giây...');
        setTimeout(initBot, 5000);
    });

    bot.on('error', (err) => {
        console.log('Lỗi Bot: ', err);
    });
}

initBot();
