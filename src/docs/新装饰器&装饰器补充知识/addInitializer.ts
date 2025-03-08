/**
 * addInitializer
 * 是一个允许在类或类成员完成定义后运行额外的初始化逻辑的函数
 */
function withLogging(value, context) {
  if(context.kind === 'class') {
    context.addInitializer(function(){
      console.log(`对 ${context.name} 类构造函数赋值`);
    })
  }
}

@withLogging
class Class5 {
  constructor() {
    console.log('Class5 constructor');
  }
}
new Class5();