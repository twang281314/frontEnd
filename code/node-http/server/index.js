var http = require("http");

function start() {
    function onRequest(request, response) {
        response.writeHead(200, {
            "Content-Type": "text/plain"
        });
        response.write("Hellod Word");
        response.end();
    }
    http.createServer(onRequest).listen(4000);
    console.log('server start at port 4000');
}
exports.start = start;