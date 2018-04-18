var redis = require("redis"),
    client = redis.createClient('6380');

// //写入JavaScript(JSON)对象
client.hmset('sessionid', { username: 'anytao', password: '123321' }, function(err) {
  console.log(err)
})

//读取JavaScript(JSON)对象
client.hgetall('sessionid', function(err, object) {
  console.log(object)
})