const schedule = require('node-schedule');
const { promisify } = require("util");
const redis = require("redis");
const client = redis.createClient(6379, '127.0.0.1');
// promise化
const setAsync = promisify(client.set).bind(client);

// 每个小时更新一次缓存
schedule.scheduleJob('* * 0 * * *', async () => {
    const data = require('./girls.json');
    // 设置redis缓存数据
    await setAsync("缓存", JSON.stringify(data));
});

console.log('每个小时更新一次缓存');