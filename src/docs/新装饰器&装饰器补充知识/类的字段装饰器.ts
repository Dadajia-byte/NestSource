function logged(value,context) {
  console.log(value,context);
  if(context.kind === 'field') {
    return function(initialValue) {
      console.log(`对 ${context.name} 字段初始化赋值 ${initialValue}`);
      return initialValue;
    }
  }
}

const initializingX = logged(undefined,{kind:'field',name:'x'});
class Class2 {
  // @logged
  // x=1;
  x = initializingX.call(this,1)
}
