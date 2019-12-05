import * as Koa from 'koa';
import * as Router from 'koa-router';
var bodyParser = require('koa-bodyparser');
import * as koaJwt from 'koa-jwt';
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
const app = new Koa();
const router = new Router();
import { ResultJson } from './commit/ResultJson';
let secret: string = 'shared-secret';
// let jwt: koaJwt.Middleware = koaJwt({
//   secret
// });
router.post('/user/login', async (ctx: any) => {
  // const { body } = ctx.request;
  let postData = ctx.request.body
  console.log(ctx.state)
  let result: ResultJson = {
    code: 1,
    data: {
      userInfo: postData,
      token: jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: postData.userName
      }, secret)
    },
    message: '登录成功'
  }
  // const data = { name: body.userName, pswd: body.password };
  ctx.body = result;
});


router.get('/user/list', async (ctx: any) => {
  // const { body } = ctx.request;
  let postData = ctx.request.body
  console.log(ctx.state)


  // const data = { name: body.userName, pswd: body.password };
  ctx.body = '获取用户列表数据';
});

app.use(bodyParser());

// app.use((ctx: any, next: Function): void => {
//   let reg: RegExp = /^\/user\/login/;
//   let url: string = ctx.url;
//   let token: string = ctx.state;
//   // 不是登录接口
//   if (!reg.test(url)) {
//     console.log('不是登录接口', token);
//   }
//   next();
// });
// 错误处理
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

/**
 * 获取请求头中的token
 * @param ctx 
 * @param opt 
 */
function getToken(ctx: any, opt: any): string {
  if (!ctx.header || !ctx.header.token) {
    return null;
  }

  return ctx.header.token;
}


app.use(koaJwt({
  secret: secret,
  getToken: getToken
}).unless({
  path: [/\/user\/login/]
}));
app.use(router.routes());

app.listen(3000);

console.log('服务启动成功： 3000');
