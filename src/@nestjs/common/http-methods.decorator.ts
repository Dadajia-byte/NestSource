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
    Reflect.defineMetadata('method', 'get', descriptor.value);
  }
}