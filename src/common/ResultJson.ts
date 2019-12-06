export class ResultJson {
  private code: number;
  private data: object;
  private message: string;

  setDate(data: object):void {
    this.data = data;
  }

  getData():object {
    return this.data;
  }

  setCode(code: number):void {
    this.code = code;
  }
  getCode():number {
    return this.code;
  }

  setMessage(message: string):void {
    this.message = message;
  }

  getMessage(): string {
    return this.message;
  }
}
