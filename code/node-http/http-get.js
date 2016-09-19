/**
 * node 发送http get 请求
 */

var http = require('https');

var options = {
    // protocol:'https:',
    hostname: 'cnodejs.org',
    port: '443',
    path: '/api/v1/topics',
    method: 'get'
};

var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
        console.log('BODY: ' + chunk);
    });
});

req.on('error', function(e) {
    console.log('请求出错' + e.message);
});
req.end();