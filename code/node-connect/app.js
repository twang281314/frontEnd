var connect = require('connect');
var cookieSession = require('cookie-session')
var serveStatic = require('serve-static')
var app = connect()
    .use(cookieSession({
        name: 'session',
        keys: ['key1', 'key2']
    }))
    .use(serveStatic('assets', {'index': ['index.html', 'index.htm']}))
    .use(function(req, res, next) {
        // Update views
        req.session.views = (req.session.views || 0) + 1

        // Write response
        res.end(req.session.views + ' views')
       // res.end('hello world\n');
    })
    .listen(3000);