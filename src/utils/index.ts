const pathParser = require('path');
/**
 * 生成绝对路径
 * @param {string} path
 */
export function resolve(path: string) {
  return pathParser.join(__dirname, path);
}
