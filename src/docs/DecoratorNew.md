以下将介绍 Stage3 中的新版装饰器语法
### 参数含义

调用装饰器，接受两个参数：
1. **value**：被装饰的值，对于类字段为 `undefined`
2. **context**：一个包含有关被装饰值信息的上下文对象

上下文对象的属性包括
- **kind**：被装饰值的类型。可以是 `class`, `method`, `getter`, `setter`, `field`, `accessor` 之一
- **name**：被装饰值的名称
- **access**：包含访问值的方法的对象（可选），如 `get()` 和 `set(value)`
- **static**：指示值是否为静态类元素（可选）
- **private**：指示值是否含有私有元素（可选）
- **addInitializer**：允许添加额外的初始化逻辑函数

类装饰器示例：
```ts
type ClassMethodDecorator = (value:Function,context: {
  kind: 'method', // 被装饰值的类型
  name: string,
  static?: boolean,
  private?: boolean,
})=> Function | void
function logged(value,{kind,name}) {
  if (kind === 'method') {
    return function(...args) {
      console.log(`${name} ${args.join(',')}`);
      const result = value.call(this,...args);
      return result;
    }
  }
}
class Class {
  @logged
  private static sum(a,b) {
    return a + b;
  }

  @logged
  public static getSum(a,b) {
    return this.sum(a,b);
  }

}

const result = Class.getSum(1,2); // getSum 1,2 sum 1,2
```