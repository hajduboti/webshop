require("dotenv/config");
const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient( 6379 , process.env.REDIS_IP, { password : process.env.REDIS_PASSWORD } );

client.on('connect', function() {
    console.log('Connected to Redis server.');
});
client.on('error', function(err) {
    console.log(err);
});

module.exports = client;