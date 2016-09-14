/**
 * node 发送post请求
 */

var http = require('http');

var qs = require('querystring');

var postData = {
    name: 'anytao',
    time: new Date().getTime()
};

var content = qs.stringify(postData);

var options = {
    hostname: '127.0.0.1',
    port: '8081',
    path: '/base/loginTest',
    method: 'post'
};

var req = http.request(options, function(res) {
    console.log('STATUCODE' + res.statusCode);
    res.on('data', function(chunk) {
        console.log('BODY: ' + chunk);
    });
});

req.on('error', function(e) {
    console.log('post请求出错:' + e.message);
});

req.write(content);

req.end();