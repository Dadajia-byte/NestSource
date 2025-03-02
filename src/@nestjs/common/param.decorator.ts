import "reflect-metadata"

export const createParamDecorator=(key:string)=> {
  // target 控制器原型 propertykey 方法名 handleRequest parameterIndex 先走1再走0
  return ()=>(target:any,propertyKey:string,parameterIndex:number)=>{
    // 给控制器类的原型的propertykey也就是handleRequest方法属性上添加元数据
    // 属性名是params：handleRequest的值是一个数组，数组里应该放置数据，表示哪个位置使用哪个装饰器
    const existingParameters = Reflect.getMetadata(`params`,target,propertyKey) || [];
    existingParameters.push({parameterIndex,key});
    // existingParameters[parameterIndex] = key;
    Reflect.defineMetadata(`params`,existingParameters,target,propertyKey);
  }
}

export const Request = createParamDecorator("Request");
export const Req = createParamDecorator("Req");