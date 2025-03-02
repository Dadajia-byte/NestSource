import 'reflect-metadata';
export function Get(path:string=''):MethodDecorator {
  /**
   * target: 类原型，AppController.prototype
   * propertyKey: 方法名，index
   * descriptor: index方法的属性描述符
   */
  return (target:any, propertyKey:string, descriptor:PropertyDescriptor)=>{
    // 给index方法添加元数据
    Reflect.defineMetadata('path', path, descriptor.value); // 等效于使用descriptor.value.path = path;但是这样写污染数据，不如元数据
    Reflect.defineMetadata('method', 'GET', descriptor.value);
  }
}

export function Post(path:string=''):MethodDecorator {
  return (target:any, propertyKey:string, descriptor:PropertyDescriptor)=>{
    Reflect.defineMetadata('path', path, descriptor.value);
    Reflect.defineMetadata('method', 'POST', descriptor.value);
  }
}

export function Put(path:string=''):MethodDecorator {
  return (target:any, propertyKey:string, descriptor:PropertyDescriptor)=>{
    Reflect.defineMetadata('path', path, descriptor.value);
    Reflect.defineMetadata('method', 'PUT', descriptor.value);
  }
}

export function Delete(path:string=''):MethodDecorator {
  return (target:any, propertyKey:string, descriptor:PropertyDescriptor)=>{
    Reflect.defineMetadata('path', path, descriptor.value);
    Reflect.defineMetadata('method', 'DELETE', descriptor.value);
  }
}

export function Patch(path:string=''):MethodDecorator {
  return (target:any, propertyKey:string, descriptor:PropertyDescriptor)=>{
    Reflect.defineMetadata('path', path, descriptor.value);
    Reflect.defineMetadata('method', 'PATCH', descriptor.value);
  }
}