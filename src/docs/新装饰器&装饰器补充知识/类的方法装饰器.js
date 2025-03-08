function logged(value,context) {
  if(context.value==='method') {
    return function(...args) {
      console.log('method',value);
      return value.apply(this,args);
    }
  }
}
class Test {
  sum(a,b) {
    return a+b;
  }
}
Class.prototype.sum = logged(Class.prototype.sum,{
  kind: 'method',
  value: 'method'
})?? Class.prototype.sum; // 先执行logged函数，如果有返回值，就返回这个返回值，如果没有，就返回原来的函数