var redis = require('redis');
var client = redis.createClient('6379', '168.61.83.239' );

client.on('connect', function() {
    console.log('Redis client connected');
});
client.on('error', function() {
    console.log('Redis client asdasd');
});