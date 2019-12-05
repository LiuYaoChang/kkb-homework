"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const router = new Router();
router.get('/*', async (ctx) => {
    ctx.body = 'Hello World!';
});
app.use(router.routes());
app.listen(3000);
console.log('用力启动成功： 3000');
//# sourceMappingURL=app.js.map