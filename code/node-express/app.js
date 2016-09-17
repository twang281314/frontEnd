//express demo
var express = require('express');
var app = express();

app.get('/', function(res, req) {
    req.send('welcome to use express');
});

app.listen(3000);