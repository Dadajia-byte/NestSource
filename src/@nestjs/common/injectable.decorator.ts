import "reflect-metadata";
export const Injectable = (): ClassDecorator => {
  return (target: Function) => {
    // 给类添加元数据，数据名称为injectable，值为true，代表可以被注入
    Reflect.defineMetadata('injectable', true, target);
  };
}