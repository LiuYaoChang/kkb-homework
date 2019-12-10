import * as Koa from 'koa';
var bodyParser = require('koa-bodyparser');
const path = require('path')
import * as koaJwt from 'koa-jwt';
// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
import { Route } from './common/Controller';
import { SECRET, getToken } from './common/Token';

const app = new Koa();
const apiPath = path.resolve(__dirname, './controller')
// const app = new Koa();
app.use(bodyParser());

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
process.nextTick(() => {
  const router = new Route(app, apiPath)
  router.init();
})
// app.use(UserController.routes());
app.listen(3000);

console.log('服务启动成功： 3000');
