import * as Koa from 'koa';
var bodyParser = require('koa-bodyparser');
import * as koaJwt from 'koa-jwt';
// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
const app = new Koa();
// const router = new Router();
import UserController from './controller/UserController';

import { SECRET, getToken } from './common/Token';

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


app.use(koaJwt({
  secret: SECRET,
  getToken: getToken
}).unless({
  path: [/\/user\/login/]
}));
app.use(UserController.routes());

app.listen(3000);

console.log('服务启动成功： 3000');
