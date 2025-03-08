/**
 * 在ts中，emitDecoratorMetadata生成元数据的方式主要有以下三种
 * design:type 用于属性的类型元数据
 * design:paramtypes 用于构造函数或方法参数的类型元数据
 * design:returntype 用于方法的返回值类型元数据
 * 
 * 在vscode中写代码时，关于ts的处理分为
 * tsServer 和 ts compiler
 * 把ts代码转换成js代码的过程是由ts compiler完成的
 * tsServer是一个独立的进程，用于提供代码提示、错误检查等功能
 */
import 'reflect-metadata';
function classDecorator(target) {

}
function paramDecorator(target,propertyKey,parameterIndex) {

}
function methodDecorator(target,propertyKey,descriptor) {

}
function propertyDecorator(target,propertyKey) {

}
@classDecorator
class Example {
  @propertyDecorator
  myProperty:string;
  constructor(@paramDecorator serviceA:string,@paramDecorator serviceB:string){}
  @methodDecorator
  myMethod(@paramDecorator a:number,@paramDecorator b:string):string {
    return 'hello';
  }
}

const propertyType = Reflect.getMetadata('design:type',Example.prototype,'myProperty'); // 获取属性类型
console.log(propertyType); // String

const paramTypes = Reflect.getMetadata('design:paramtypes',Example); // 获取构造函数参数类型
console.log(paramTypes); // [Function: String, Function: String]

const paramTypes2 = Reflect.getMetadata('design:paramtypes',Example.prototype,'myMethod'); // 获取方法参数类型
console.log(paramTypes2); // [Function: Number, Function: String]

const returnType = Reflect.getMetadata('design:returntype',Example.prototype,'myMethod'); // 获取方法返回值类型
console.log(returnType);  // Function: String