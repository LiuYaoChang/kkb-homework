import * as Router from 'koa-router';
const router = new Router({ prefix: '/user'});
// import { ResultJson } from '../common/ResultJson';
// let secret: string = 'shared-secret';
var jwt = require('jsonwebtoken');
import { SECRET } from '../common/Token';
// let jwt: koaJwt.Middleware = koaJwt({
//   secret
// });
router.post('/login', async (ctx: any) => {
  // const { body } = ctx.request;
  let postData = ctx.request.body
  console.log(ctx.state)
  let result: object = {
    code: 1,
    data: {
      userInfo: postData,
      token: jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: postData.userName
      }, SECRET)
    },
    message: '登录成功'
  }
  // const data = { name: body.userName, pswd: body.password };
  ctx.body = result;
});

router.get('/list', async (ctx: any) => {
  // const { body } = ctx.request;
  let postData = ctx.request.query
  console.log(ctx.state)
  // const data = { name: body.userName, pswd: body.password };
  ctx.body = postData;
});

export default router;
