const path = require('path');
const Koa = require('koa');
const logger = require('koa-logger');
const koaBody = require('koa-body');
const static = require('koa-static');
const send = require('koa-send');

const response = require('./middlewares/response');
const router = require('./routes/router')

const app = new Koa();

app.use(logger());

app.use(static(
    path.join(__dirname, './public')
));

app.use(koaBody({ multipart: true }));

app.use(response.restify());

app.use(router.routes()).use(router.allowedMethods())

app.use(async (ctx) => {
  await send(ctx, './public/index.html');
});

module.exports = app;
