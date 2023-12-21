const { createClient } = require('redis');

const client = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    }
});


const connectRedis = async () => {
    try {
        client.on('error', (err) => {
            return "Redis Client Error";
        });
        await client.connect().then(async () => {
            console.log('Redis client connected');
        });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    connectRedis,
    client
}; 