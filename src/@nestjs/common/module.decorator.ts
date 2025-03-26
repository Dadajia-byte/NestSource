import 'reflect-metadata'
// 模块的元数据
interface ModuleMetadata {
  controllers?: Function[],
  providers?: any[]
}
// 模块装饰器
export function Module(metadata:ModuleMetadata): ClassDecorator {
  return (target:Function)=>{
    // 给模块类添加元数据 AppModule, 元数据名字叫controllers，值是controllers数组[AppController]
    Reflect.defineMetadata('controllers', metadata.controllers, target)
    // 给模块类添加元数据 AppModule, 元数据名字叫providers，值是providers数组[LoggerService]
    Reflect.defineMetadata('providers', metadata.providers, target)
  }
}