function logged3(value,context) {
  console.log(value,context);
  if(context.kind === 'class') {
    return class extends value {
      constructor(...args) {
        super(...args);
        console.log(`对 ${context.name} 类构造函数赋值 ${args.join(',')}`);
      }
    }
  }
}

// @ts-ignore
// @logged3
class Class3 {
  a:number;
  constructor(a) {
    this.a = a;
  }
}
let NewClass3 = logged3(Class3,{kind:'class',name:'Class3'});
new NewClass3(1);