import "reflect-metadata"

export const createParamDecorator=(key:string)=> {
  // target 控制器原型 propertykey 方法名 handleRequest parameterIndex 先走1再走0
  return (data?:any)=>(target:any,propertyKey:string,parameterIndex:number)=>{
    // 给控制器类的原型的propertykey也就是handleRequest方法属性上添加元数据
    // 属性名是params：handleRequest的值是一个数组，数组里应该放置数据，表示哪个位置使用哪个装饰器
    const existingParameters = Reflect.getMetadata(`params`,target,propertyKey) || [];
    existingParameters[parameterIndex] = {
      parameterIndex,
      key,
      data
    }; // 避免某参数不使用装饰器而出现的错误
    Reflect.defineMetadata(`params`,existingParameters,target,propertyKey);
  }
}

export const Request = createParamDecorator("Request");
export const Req = createParamDecorator("Req");
export const Query = createParamDecorator("Query");
export const Headers = createParamDecorator("Headers");