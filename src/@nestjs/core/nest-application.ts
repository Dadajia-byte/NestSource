import express,{Express} from 'express'
import { Logger } from "./logger";
export class NestApplication {
  // 内部私有化一个express实例
  private readonly expressApp: Express = express();
  constructor(protected readonly module) {
  } 
  // 配置初始化
  async init() {
    // 取出模块里所有的控制器，然后做好路由映射
    const controlllers = Reflect.getMetadata('controllers', this.module) || [];
    Logger.log(`AppModule dependencies initialized`, 'NestApplication');
    for (const Controller of controlllers) {
      // 创建每个控制器的实例
      const controller = new Controller();  
      // 取出控制器的路径前缀
      const prefix = Reflect.getMetadata('prefix', Controller) || '/';
      // 开始解析路由
      Logger.log(`${Controller.name} {${prefix}}`, 'RoutesResolver');
    }
  }
  // 启动http服务器
  async listen(port:number|string, callback?:() => void) {
    // 调用express实例的listen方法，启动一个http服务器，监听port端口
    await this.init();
    this.expressApp.listen(port, ()=>{
      callback && callback()
      Logger.log(`Application is running on https://localhost:${port}`, `NestApplication`)
    })
  }
}