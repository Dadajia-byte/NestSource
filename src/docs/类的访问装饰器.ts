function logged1(value,context) {
  if (context.kind === 'getter' || context.kind === 'setter') {
    return function(...args) {
      console.log(`${context.name} with ${args.join(',')}`);
      const result = value.call(this,...args);
      return result;
    }
  }
}
class Class1 {
  // @logged
  set x(args) {}

  // @logged
  get x() {
    return 2
  }
}



let {set,get} = Object.getOwnPropertyDescriptor(Class1.prototype,'x'); // 获取类的原型上的get和set方法

set = logged1(set, {
  kind: 'setter',
  name: 'x',
  static: false,
  private: false,
});
get = logged1(get, {
  kind: 'getter',
  name: 'x',
  static: false,
  private: false,
});
Object.defineProperty(Class1.prototype,'x',{set,get}); // 重新定义类的原型上的get和set方法
let class1 = new Class1();
class1.x = 1;
console.log(class1.x);


