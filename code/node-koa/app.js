const Koa = require('koa');
const app = new Koa();
var serve = require('koa-static');
var router = require('koa-router')();

// Middleware normally takes two parameters (ctx, next), ctx is the context for one request,
// next is a function that is invoked to execute the downstream middleware. It returns a Promise with a then function for running code after completion.

app.use((ctx, next) => {
    const start = new Date();
    return next().then(() => {
        const ms = new Date() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });
});

router.get('/', ctx => {
    ctx.body = 'Hello Koa';
    ctx.set('X-Powered-By', 'Koa-Router');
});

app.use(router.routes());

// // response
// app.use(ctx => {
//     ctx.body = 'Hello Koa';
//     ctx.set('X-Powered-By', 'Koa');
// });

// app.use(serve('static'));

app.listen(3000);

console.log('listening on port 3000');