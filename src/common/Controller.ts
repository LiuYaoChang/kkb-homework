// import { getParsedCommandLineOfConfigFile } from "typescript";
import * as KoaRouter from 'koa-router';
import * as Koa from 'koa';
const glob = require('glob');
const path = require('path');
// 路由前缀
const PREFIX = 'prefix';

interface RouterConfig {
  method: string,
  path: string
}
const routerMap = new Map();

const formatPath = (path: string): string => (path.startsWith('/') ? path : `/${path}`);

const isArray = (obj: object): any => (Array.isArray(obj) ? obj : [obj]); 

/**
 * 路由的类装饰器
 * @param path
 */
function Controller(path: string):Function {
  return function (target: any) {
    console.log(target)
    target.prototype[PREFIX] = path;
  }
}


/**
 * 路由方法装饰器
 * @param config
 */
function router(config: RouterConfig):Function {
  return function (target: any, name: string, desc: PropertyDescriptor):void {
    config.path = formatPath(config.path);
    routerMap.set({ target, ...config}, target[name])
  }
}

let methodMap: any = {};
const methods: string[] = ['get', 'post', 'delete', 'put'];

for (let method of methods) {
  methodMap[method] = (path: string): any => {
    return router({
      method,
      path
    })
  }
}


class Route {
  private app: Koa;
  private apiPaht: string;
  private router: any;
  constructor(app: any, apiPaht: string) {
    this.app = app;
    this.apiPaht = apiPaht;
    this.router = new KoaRouter();
  }

  // 加载路由配置
  init (): void {
    console.log('******* 初始化路由 ******')
    // 加载controller目录下的所有文件， 注册装饰器
    // console.log('apiPaht', this.apiPaht)
    const filePaths = glob.sync(path.join(this.apiPaht, './*ts'))
    // console.log('files', JSON.stringify(filePaths))
    filePaths.forEach(require)

    for (let [config, value] of routerMap) {
      let constroller: any = isArray(value);
      let method: string = config.method;
      const prefixPath: string = config.target[PREFIX] ? formatPath(config.target[PREFIX]) : '';
      const routerPath: string = prefixPath + config.path;
      this.router[method](routerPath, ...constroller);
      // this.router[method]();
    }
    this.app.use(this.router.routes())
    this.app.use(this.router.allowedMethods())
    console.log('>>>>>>')
  } 
}

const middleware = (...mids: any[]) => {
  return (...args: any[]) => {
    const [target, name, descriptor] = args
    target[name] = isArray(target[name])
    target[name].unshift(...mids)
    return descriptor
  }
}

export { Controller, middleware, Route, methodMap }
