// 类的自动访问装饰器是一种新的类元素类型
// 它在类的字段前面添加accessor关键字
// 自动访问器自动为字段创建setter和getter方法，并将默认值保存在上一个私有的槽中


class C {
  #x = 1; // 使用私有字段存储值
  get x() {
    return this.#x;
  }
  set x(value) {
    this.#x = value;
  }
}
function logged4(value, context) {
  console.log(value, context);
  if (context.kind ==='accessor') {
    const {get,set} = value;
    return {
      get() {
        console.log(`get ${context.name}`);
        return get.call(this);
      },
      set(val) {
        console.log(`set ${context.name} = ${val}`);
        return set.call(this,val);
      },
      init(initialValue) {
        console.log(`init ${context.name} = ${initialValue}`);
        return initialValue+1;
      }
    }
  }
  
}
class Class4 {
  // @logged4 accessor x = 1;
  #x = initializeX.call(this,1);
  get x() {
    return this.#x;
  }
  set x(value) {
    this.#x = value;
  }

}
let {get:oldGet,set:oldSet} = Object.getOwnPropertyDescriptor(Class4.prototype,'x');
let {
  get: newGet=oldGet,
  set: newSet=oldSet,
  init:initializeX=(val)=>val+1
} = logged4({get:oldGet,set:oldSet}, {kind:'accessor',name:'x'});
Object.defineProperty(Class4.prototype,'x',{get:newGet,set:newSet});
const class4 = new Class4();
class4.x = 2;
console.log(class4.x);