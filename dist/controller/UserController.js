"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const router = new Router({ prefix: '/user' });
// import { ResultJson } from '../common/ResultJson';
// let secret: string = 'shared-secret';
var jwt = require('jsonwebtoken');
let secret = 'shared-secret';
// let jwt: koaJwt.Middleware = koaJwt({
//   secret
// });
router.post('/login', async (ctx) => {
    // const { body } = ctx.request;
    let postData = ctx.request.body;
    console.log(ctx.state);
    let result = {
        code: 1,
        data: {
            userInfo: postData,
            token: jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: postData.userName
            }, secret)
        },
        message: '登录成功'
    };
    // const data = { name: body.userName, pswd: body.password };
    ctx.body = result;
});
router.get('/list', async (ctx) => {
    // const { body } = ctx.request;
    let postData = ctx.request.body;
    console.log(ctx.state);
    // const data = { name: body.userName, pswd: body.password };
    ctx.body = '获取用户列表数据';
});
exports.default = router;
//# sourceMappingURL=UserController.js.map