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

    // Tự động đọc tin nhắn của server để gõ lệnh đăng nhập/đăng ký chuẩn xác
    bot.on('message', (jsonMsg) => {
        const message = jsonMsg.toString();
        
        // Nếu server yêu cầu đăng ký tài khoản mới (lần đầu vào)
        if (message.includes('/register')) {
            setTimeout(() => {
                bot.chat('/register sonbot123 sonbot123');
            }, 2000);
        }
        
        // Nếu server yêu cầu đăng nhập (từ lần thứ 2 trở đi)
        if (message.includes('/login')) {
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
