const http = require('http');
const mineflayer = require('mineflayer');

// Tạo web server ảo giữ Render chạy 24/7
http.createServer((req, res) => {
    res.write('Bot is running!');
    res.end();
}).listen(process.env.PORT || 3000);

// Cấu hình kết nối server MagmaNode
const botArgs = {
    host: 'dynamic-8.magmanode.com',
    port: 25976,
    username: 'SNPW',
    version: '1.21.11'
};

let bot;
let isConnecting = false;

function initBot() {
    if (isConnecting) return;
    isConnecting = true;

    console.log('--- ĐANG TIẾN HÀNH KẾT NỐI VÀO SERVER... ---');
    
    // Nếu có bot cũ đang chạy thì hủy hẳn để tránh trùng lặp
    if (bot) {
        try { bot.quit(); } catch(e) {}
    }

    bot = mineflayer.createBot(botArgs);

    // Khi bot vào server thành công
    bot.on('spawn', () => {
        console.log('Bot đã vào server thành công!');
        isConnecting = false;
    });

    // Tự động vượt qua plugin AuthMe
    bot.on('message', (jsonMsg) => {
        const message = jsonMsg.toString().toLowerCase();

        if (message.includes('register') || message.includes('đăng ký')) {
            setTimeout(() => {
                bot.chat('/register sonbot123 sonbot123');
                console.log('Đã tự động đăng ký mật khẩu mới.');
            }, 2000);
        }
        
        if (message.includes('login') || message.includes('đăng nhập')) {
            setTimeout(() => {
                bot.chat('/login sonbot123');
                console.log('Đã tự động đăng nhập thành công.');
            }, 2000);
        }
    });

    // Xử lý khi dính lỗi kết nối
    bot.on('error', (err) => {
        console.log('Lỗi bot: ', err.message);
        isConnecting = false;
    });

    // Xử lý khi bị ngắt kết nối thông thường
    bot.on('end', () => {
        console.log('Bot mất kết nối thông thường. Sẽ kết nối lại qua vòng lặp check...');
        isConnecting = false;
    });
}

// VÒNG LẶP KIỂM TRA THẦN THÁNH: Cứ mỗi 5 giây check 1 lần
setInterval(() => {
    // Nếu bot chưa được tạo, hoặc đã mất thực thể entity (bị văng), hoặc server sập
    if (!bot || !bot.entity || !bot.entity.position) {
        if (!isConnecting) {
            console.log('Phát hiện bot đang ở ngoài server hoặc server vừa sập/reset! Đang tự động kết nối lại sau 5s...');
            initBot();
        }
    }
}, 5000);

// Chạy bot lần đầu tiên
initBot();
