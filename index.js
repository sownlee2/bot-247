const http = require('http');
const mineflayer = require('mineflayer');

// Tạo web server ảo để giữ Render không bị tắt (Bot 24/7)
http.createServer((req, res) => {
    res.write('Bot is running!');
    res.end();
}).listen(process.env.PORT || 3000);

// Cấu hình thông tin kết nối vào server MagmaNode
const botArgs = {
    host: 'SNPW.ddns.net',
    port: 25980,
    username: 'SNPWSMP36',
    version: '1.21.11'
};

let bot;

function initBot() {
    bot = mineflayer.createBot(botArgs);

    // Khi bot vào server thành công
    bot.on('spawn', () => {
        console.log('Bot đã vào server thành công!');
    });

    // Tự động nhận diện lệnh từ plugin AuthMe để Register/Login
    bot.on('message', (jsonMsg) => {
        const message = jsonMsg.toString().toLowerCase();

        // Nếu AuthMe yêu cầu đăng ký
        if (message.includes('register') || message.includes('đăng ký')) {
            setTimeout(() => {
                bot.chat('/register sonbot123 sonbot123');
                console.log('Bot đã tự động đăng ký với mật khẩu: sonbot123');
            }, 2000);
        }
        
        // Nếu AuthMe yêu cầu đăng nhập
        if (message.includes('login') || message.includes('đăng nhập')) {
            setTimeout(() => {
                bot.chat('/login sonbot123');
                console.log('Bot đã tự động đăng nhập!');
            }, 2000);
        }
    });

    // Tự động kết nối lại nếu bot bị kick hoặc server restart
    bot.on('end', () => {
        console.log('Bot bị mất kết nối, đang tiến hành kết nối lại sau 5 giây...');
        setTimeout(initBot, 5000);
    });

    // Báo lỗi ra console nếu có sự cố để dễ sửa
    bot.on('error', (err) => {
        console.log('Gặp lỗi: ', err);
    });
}

// Chạy bot
initBot();
