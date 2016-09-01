var url = require('url');
var http = require('http');
var request = require('request');

var sizeOf = require('image-size');

var imgUrl = 'http://o4j806krb.qnssl.com/public/images/cnodejs_light.svg';
var options = url.parse(imgUrl);

http.get(options, function(response) {
  var chunks = [];
  response.on('data', function(chunk) {
    chunks.push(chunk);
  }).on('end', function() {
    var buffer = Buffer.concat(chunks);
    console.log(sizeOf(buffer));
  });
});

var requestOptions = {
  url: imgUrl,
  encoding: null
};

request.get(requestOptions, function(err, response, body) {
  console.log(sizeOf(body));
  // console.log(body);
});