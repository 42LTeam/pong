var redis = require('redis-url');
module.exports = function(config){
  var cache = {};
  var client = redis.connect(config.url);
  cache.client = client;
  cache.set = function(key, value, cb){
    client.set(key, value, function(err){
      client.expire(key, config.expiry, function(err){
        if (typeof cb !== 'undefined')
          cb(err);
      });
    });
  }
  cache.get = function(key, cb){
    client.get(key, cb);
  }
  cache.del = function(key, cb){
    client.del(key, cb);
  }
  return cache;
}
