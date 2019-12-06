"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
var bodyParser = require('koa-bodyparser');
const koaJwt = require("koa-jwt");
// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
const app = new Koa();
// const router = new Router();
const UserController_1 = require("./controller/UserController");
// import { ResultJson } from './common/ResultJson';
let secret = 'shared-secret';
// let jwt: koaJwt.Middleware = koaJwt({
//   secret
// });
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
app.use((ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        }
        else {
            throw err;
        }
    });
});
/**
 * 获取请求头中的token
 * @param ctx
 * @param opt
 */
function getToken(ctx, opt) {
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
app.use(UserController_1.default.routes());
app.listen(3000);
console.log('服务启动成功： 3000');
//# sourceMappingURL=app.js.map