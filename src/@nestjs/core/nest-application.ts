import express,{Express,Request as ExpressRequest,Response as ExpressResponse,NextFunction} from 'express'
import { Logger } from "./logger";
import path from 'path'
export class NestApplication {
  // 内部私有化一个express实例
  private readonly expressApp: Express = express();
  constructor(protected readonly module) {
    // 用来将JSON格式的请求体对象绑定到req.body上
    this.expressApp.use(express.json()); // 使用express内置的json中间件
    this.expressApp.use(express.urlencoded({extended:true})); // 使用express内置的urlencoded中间件
  } 
  use(middleware: any) {
    // 使用express实例的use方法，将中间件注册到express实例上
    this.expressApp.use(middleware);
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
      const prefix = Reflect.getMetadata('pathPrefix', Controller) || '/';
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
        this.expressApp[httpMethod.toLowerCase()](routePath,(req:ExpressRequest,res:ExpressResponse,next:NextFunction)=>{
          const args = this.resolveParams(controller,methodName,req,res,next);
          // 执行路由处理函数，获取返回值
          const result = method.call(controller,...args);
          // 把序列化后的结果返回给客户端
          const responseMeta = this.getResponseMeta(controller,methodName);
          if (!responseMeta || (responseMeta?.data?.passthrough)) { // 判断controller的methodName上有没有使用@Response/@Res装饰器，如果使用则挂起服务交由用户自己返回;但是注入了passthrough参数，nest会自动返回
            res.send(result);
          }
        })
        Logger.log(`Mapped {${routePath}, ${httpMethod}} route`, 'RoutesResolver');
      }
    }
    Logger.log(`AppModule dependencies initialized`, 'InstanceLoader');
  }
  private getResponseMeta(controller:any,methodName:string) {
    const paramsMetaData = Reflect.getMetadata(`params`,controller,methodName)??[];
    return paramsMetaData.filter(Boolean).find((item:any)=>item.key === 'Response' || item.key === 'Res');
  }
  private resolveParams(instance:any,methodName:string,req:ExpressRequest,res:ExpressResponse,next:NextFunction) {
    // 获取参数的元数据
    const paramsMetaData = Reflect.getMetadata(`params`,instance,methodName)??[]; // 避免一个参数装饰器都没使用报错
    // 将数组升序排列，随后找出对应的key，如果是req则返回 request对象
    return paramsMetaData.map(paramsMetaData=>{
      const {key,data} = paramsMetaData; // {passthrough:true}
      switch(key) {
        case "Request":
        case "Req":
          return req;
        case "Query":
          return data?req.query[data]:req.query;
        case "Headers":
          return data?req.headers[data]:req.headers;
        case "Session":
          return data?req.session[data]:req.session;
        case "Ip":
          return req.ip;
        case "Param":
          return data?req.params[data]:req.params;
        case "Body":
          return data?req.body[data]:req.body;
        case "Response":
        case "Res":
          return res;
        default: 
          return null;
      }
    });
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