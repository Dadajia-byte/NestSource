import "reflect-metadata"
// 可以给controller传递路径前缀
// 前缀可以为空，也可以是空串，也可以是非空字符串，也可以写成一个对象
interface ControllerOptions {
  prefix?:string
}
export function Controller():ClassDecorator
export function Controller(prefix:string):ClassDecorator
export function Controller(option:ControllerOptions):ClassDecorator
export function Controller(prefixOrOptions?:string|ControllerOptions):ClassDecorator {
  let options:ControllerOptions = {}
  if(typeof prefixOrOptions === 'string') { // 如果传递的是字符串,则设置前缀
    options.prefix = prefixOrOptions
  } else if(typeof prefixOrOptions === 'object') { // 如果传递的是对象,则设置前缀
    options = prefixOrOptions
  }
  return (target:Function)=>{
    Reflect.defineMetadata('path', options.prefix, target); // 给控制器类添加元数据
  }
  
}