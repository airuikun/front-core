const { promisify } = require("util");
const redis = require("redis");
const client = redis.createClient(6379, '127.0.0.1');
// promise化
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

async function redisData() {

    // 先获取缓存数据，有数据就读缓存，没数据就去拉取girls数据
    let data = await getAsync('key');
    
    if ( !data ) {
        // 获取数据
        const root = require('./girls.json');
        data = JSON.stringify(root);
        // 设置数据
        await setAsync("key", data);
        console.log('###### 将数据写入缓存 ######：', data);
        return data;
    }
     
    console.log('###### 从缓存中读取数据 ######：', data);
    return data;
}

async function main() {
    // 将数据打入缓存
    await redisData();
    // 从缓存中读取数据
    await redisData();
}

main();
