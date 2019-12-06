export const SECRET: string = 'shared-secret';


/**
 * 获取请求头中的token
 * @param ctx 
 * @param opt 
 */
export function getToken(ctx: any, opt: any): string {
  if (!ctx.header || !ctx.header.token) {
    return null;
  }
  return ctx.header.token;
}
