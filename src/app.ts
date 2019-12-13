import * as Koa from 'koa';
var bodyParser = require('koa-bodyparser');
// const bodyParser = require('./lib/bodyparser.js')
const KoaBody = require('koa-body');
const path = require('path')
import * as koaJwt from 'koa-jwt';
// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
import { Route } from './common/Controller';
import { SECRET, getToken } from './common/Token';
// import * as KoaRouter from 'koa-router';
const PORT: number = 3008;
// const router = new KoaRouter({prefix: '/user'})
const app = new Koa();
const apiPath = path.resolve(__dirname, './controller')
const router = new Route(app, apiPath)
// const app = new Koa();
// app.use(async (ctx: any) => {
//   const body = ctx.request.body;
//   console.log('中间处理', typeof body, ctx.disableBodyParser)
//   console.log(JSON.stringify(body, null, 2));
//   ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
//   // the parsed body will store in ctx.request.body
//   // if nothing was parsed, body will be an empty object {}
//   // ctx.body = body;
//   // next();
// });
app.use(KoaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024	// 设置上传文件大小最大限制，默认2M
  }
}));

// app.use(async (ctx: any, next: Function) => {
//   const body = ctx.request.body;
//   console.log('中间处理', typeof body, ctx.disableBodyParser)
//   console.log(JSON.stringify(body, null, 2));
//   // ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
//   // the parsed body will store in ctx.request.body
//   // if nothing was parsed, body will be an empty object {}
//   // ctx.body = body;
//   next();
// });

app.use((ctx: any, next: Function): void => {
  return next().catch((err: any): void => {
      if(err.status === 401){
          ctx.status = 401;
        ctx.body = 'Protected resource, use Authorization header to get access\n';
      }else{
          throw err;
      }
  })
})

app.use(koaJwt({
  secret: SECRET,
  getToken: getToken
}).unless({
  path: [/\/user\/login/]
}));

// router.post('/login', (ctx: any) => {
//   console.log(ctx.url)
//   ctx.body = ctx.request.body;
// })
// process.nextTick(() => {
router.init();
// })
// app.use(router.routes());
app.listen(PORT, () => {
  console.log('服务启动成功：' + PORT);
});

