type ClassMethodDecorator = (value:Function,context: {
  kind: 'method', // 被装饰值的类型
  name: string,
  static?: boolean,
  private?: boolean,
})=> Function | void
function logged0(value,{kind,name}) {
  if (kind === 'method') {
    return function(...args) {
      console.log(`${name} ${args.join(',')}`);
      const result = value.call(this,...args);
      return result;
    }
  }
}
class Class {
  @logged0
  private static sum(a,b) {
    return a + b;
  }

  @logged0
  public static getSum(a,b) {
    return this.sum(a,b);
  }

}

const result = Class.getSum(1,2); // getSum 1,2 sum 1,2