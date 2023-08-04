// app.js or agent.js
const dotenv = require('dotenv');
const path = require('path');

// 加载 .env 文件
dotenv.config({ path: path.resolve(__dirname, '.env') });

class App {
}

module.exports = App;
