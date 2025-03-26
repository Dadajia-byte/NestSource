import 'reflect-metadata';
import { INJECT_TOKENS } from './constants';
export const Inject = (token: string):ParameterDecorator => {
  return (target:Object,key:string,index:number)=>{
    // 取出被注入到此类的【构造函数】的token数组
    const existingInjectedTokens =  Reflect.getMetadata(INJECT_TOKENS,target)??[];
    existingInjectedTokens[index] = token;
    Reflect.defineMetadata(INJECT_TOKENS,existingInjectedTokens,target);
  }
}