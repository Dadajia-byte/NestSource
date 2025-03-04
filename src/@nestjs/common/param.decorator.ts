import "reflect-metadata"
export const createParamDecorator=(keyOrFactory:string|Function)=> { // 也可以用于创建自定义装饰器
  // target 控制器原型 propertykey 方法名 handleRequest parameterIndex 先走1再走0
  return (data?:any)=>(target:any,propertyKey:string,parameterIndex:number)=>{
    // 给控制器类的原型的propertykey也就是handleRequest方法属性上添加元数据
    // 属性名是params：handleRequest的值是一个数组，数组里应该放置数据，表示哪个位置使用哪个装饰器
    const existingParameters = Reflect.getMetadata(`params`,target,propertyKey) || [];
    if (keyOrFactory instanceof Function) {
      // 如果传过来的是一个函数的话，存放参数索引，key定死为DecoratorFactory，factory存放函数，data存放装饰器的数据
      existingParameters[parameterIndex] = {parameterIndex,key:'DecoratorFactory',factory:keyOrFactory,data};
    } else {
      existingParameters[parameterIndex] = {parameterIndex,key:keyOrFactory,data}; // 避免某参数不使用装饰器而出现的错误
    }
    Reflect.defineMetadata(`params`,existingParameters,target,propertyKey);
  }
}
export const Request = createParamDecorator("Request");
export const Req = createParamDecorator("Req");
export const Query = createParamDecorator("Query");
export const Headers = createParamDecorator("Headers");
export const Session = createParamDecorator("Session");
export const Ip = createParamDecorator("Ip");
export const Param = createParamDecorator("Param");
export const Body = createParamDecorator("Body");
export const Response = createParamDecorator("Response");
export const Res = createParamDecorator("Res");
export const Next = createParamDecorator("Next");