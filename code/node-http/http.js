var PORT = 3000;

var http = require('http');
var url = require('url');
var fs = require('fs');
var mine = require('./mine').types;
var path = require('path');
var ejs = require('ejs'); //视图引擎

var server = http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    if (pathname.charAt(pathname.length - 1) == "/") {
        //如果访问目录
        pathname += "index.html"; //指定为默认网页
    }
    var realPath = path.join("assets", pathname);
    //console.log(realPath);
    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(realPath, function(exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            ejs.renderFile(realPath, {
                "name": "wangtao",
                "city":"hangzhou"
            }, {}, function(err, str) {
                if (err) {
                    response.writeHead(500,{
                         'Content-Type':'text/plain'
                    });
                    response.end(err);
                } else {
                    var contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType,
                        'x-power-by': 'anytao'
                    });
                    response.write(str);
                    response.end();
                }
            });
            // fs.readFile(realPath, "binary", function(err, file) {
            //     if (err) {
            //         response.writeHead(500, {
            //             'Content-Type': 'text/plain'
            //         });
            //         response.end(err);
            //     } else {
            //         var contentType = mine[ext] || "text/plain";
            //         response.writeHead(200, {
            //             'Content-Type': contentType,
            //             'x-power-by': 'anytao'
            //         });
            //         response.write(file, "binary");
            //         response.end();
            //     }
            // });
        }
    });
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");