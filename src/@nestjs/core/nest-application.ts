import express,{Express,Request as ExpressRequest,Response as ExpressResponse,NextFunction} from 'express'
import { Logger } from "./logger";
import path from 'path'
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
 
      const controllPrototype = Reflect.getPrototypeOf(controller);
      // 遍历类原型上的方法名
      for (const methodName of Object.getOwnPropertyNames(controllPrototype)) {
        // 获取原型上的方法，index
        const method = controllPrototype[methodName];
        // 获取方法上的元数据(方法名，请求方法，请求路径)
        const httpMethod = Reflect.getMetadata('method', method);
        const pathMetadata = Reflect.getMetadata('path', method);

        if (!httpMethod) continue; // 如果没有方法名，跳过
        const routePath = path.posix.join('/',prefix,pathMetadata); // 使用内置的path模块处理，可以超级智能的处理路径
        // 配置路由，当客户端以httpMethod请求routePath时，执行对应路径的函数进行处理
        this.expressApp[httpMethod.toLowerCase()](routePath,(res:ExpressResponse,req:ExpressRequest,next:NextFunction)=>{
          const result = method.call(controller);
          res.send(result)
        })
        Logger.log(`Mapped {${routePath}, ${httpMethod}} route`, 'RoutesResolver');
      }
      Logger.log(`AppModule dependencies initialized`, 'InstanceLoader');
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