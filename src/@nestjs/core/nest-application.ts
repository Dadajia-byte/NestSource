import express,{Express} from 'express'
import { Logger } from "./logger";
export class NestApplication {
  // 内部私有化一个express实例
  private readonly expressApp: Express = express();
  constructor(protected readonly module) {
  } 
  // 配置初始化
  async init() {

  }
  // 启动http服务器
  async listen(port:number|string, callback?:() => void) {
    // 调用express实例的listen方法，启动一个http服务器，监听port端口
    this.expressApp.listen(port, ()=>{
      callback && callback()
      Logger.log(`Application is running on https://localhost:${port}`, `NestApplication`)
    })
  }
}