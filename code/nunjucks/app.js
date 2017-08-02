const Koa = require('koa');
const app = new Koa();
const koaNunjucks = require('koa-nunjucks-2');
const path = require('path');
const responseTime = require('koa-response-time');

app.use(koaNunjucks({
  ext: 'html',
  path: path.join(__dirname, 'views'),
  nunjucksConfig: {
    trimBlocks: true,
    autoescape:true
  }
}));

app.use(responseTime());

app.use(async (ctx) => {
  await ctx.render('home', {double: '<em>rainbow</em>'});
});

app.listen(3000);

