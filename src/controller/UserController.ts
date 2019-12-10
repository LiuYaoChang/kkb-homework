// import * as Router from 'koa-router';
// const router = new Router({ prefix: '/user'});
// import { ResultJson } from '../common/ResultJson';
// let secret: string = 'shared-secret';
import { Controller, methodMap } from '../common/Controller';
const { post, get } = methodMap;
var jwt = require('jsonwebtoken');
import { SECRET } from '../common/Token';
// import { Validate } from '../common/ValidateDecorator';
// let jwt: koaJwt.Middleware = koaJwt({
//   secret
// });
console.log('***********加载controller*********')
@Controller('/user')
class UserController {
  @post('/login')
  async login(ctx: any) {
    
    let postData = ctx.request.body
    console.log(ctx)
    
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
  }
  @get('/list')
  async getUserList(ctx: any) {
    let postData = ctx.request.query
    console.log(ctx.state)
    // const data = { name: body.userName, pswd: body.password };
    ctx.body = postData;
  }
}
