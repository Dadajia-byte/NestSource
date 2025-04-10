import 'reflect-metadata'
// 模块的元数据
interface ModuleMetadata {
  controllers?: Function[],
  providers?: any[],
  exports?: any[], // 模块的导出，可以把自己的一部分providers导出给其他模块，别的模块只要导入自己的这个模块就可以使用这些导出的providers
  imports?: any[] // 导入的模块，可以导入别的模块，把别的模块的导出的providers给自己用
}
// 模块装饰器
export function Module(metadata:ModuleMetadata): ClassDecorator {
  return (target:Function)=>{
    // 给模块类添加元数据 AppModule, 元数据名字叫controllers，值是controllers数组[AppController]
    Reflect.defineMetadata('controllers', metadata.controllers, target);
    defineModule(target, metadata.controllers);

    // 给模块类添加元数据 AppModule, 元数据名字叫providers，值是providers数组[LoggerService]
    Reflect.defineMetadata('providers', metadata.providers, target);
    let providers = (metadata.providers??[]).filter(Boolean).map(provider => {
      if (provider instanceof Function) {
        return provider;
      } else if (provider.useClass instanceof Function) {
        return provider.useClass;
      } else {
        return null;
      }
    });
    defineModule(target, providers);

    // 当一个类使用Module装饰器的时候，可以添加标识它是一个模块的元数据
    Reflect.defineMetadata('isModule', true, target);
    Reflect.defineMetadata('exports', metadata.exports, target);
    Reflect.defineMetadata('imports', metadata.imports, target);
  }
};

export function defineModule(nestModule, targets=[]) {
  // 遍历targets数组，为每个元素添加元数据，key是'nestModule', value是nestModule模块
  targets.forEach(target =>{
    Reflect.defineMetadata('nestModule', nestModule, target);
  })
}