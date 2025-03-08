
import 'reflect-metadata';
// 此函数可以不用写任何代码，这个装饰器不用进行任何操作，只是用来生成元数据
function Injectable(target: any) { 
}
@Injectable
class Engine {
  start() {
    console.log('Engine start');
  }
}

@Injectable
class Car {
  constructor(private engine: Engine) {
    console.log('Car constructor');
  }
  run() {
    this.engine.start();
  }
}

// 定义一个依赖注入容器类
class DIContainer {
  // 定义一个存储所有的服务的map对象
  private service = new Map<string, any>();
  // 注册服务,将服务的名字和服务的构造函数存储到map对象中
  register<T>(name: string, Service: any) {
    // 将服务的名字和服务的构造函数(也可能是个类，里面有自定义的工厂函数或者直接实例化好的value对象)存储到map对象中
    this.service.set(name, Service);
  }
  // 解析服务,根据服务的名字从map对象中获取服务的构造函数,并实例化服务
  resolve<Car>(name:string) {
    // 获取服务的构造函数
    const Service = this.service.get(name);
    if (Service instanceof Function) {
      // 获取服务的构造函数的参数的类型列表 [Engine]
      const params = Reflect.getMetadata('design:paramtypes', Service);
      // 如果服务的构造函数没有参数,直接实例化服务
      if (!params || params.length === 0) {
        return new Service();
      } else {
        // 如果服务的构造函数有参数,递归解析参数
        console.log(params);
        const args = params.map((param: any) => this.resolve(param.name));
        // 实例化服务
        return new Service(...args);
      }
    } else if(Service.useFactory) {
      const {inject} = Service;
      return Service.userFactory(...inject)
    } else if(Service.useValue) {
      return Service.useValue
    }
  }
}

// 创建一个依赖注入的容器实例
const container = new DIContainer();
container.register<Engine>('Engine',Engine);
container.register<Engine>('Engine1',{
  inject:[100],
  useFactory:()=>{
    console.log(111);
  }
})
container.register<Engine>('Engine2',{
  useValue: new Engine()
})
container.register<Car>('Car',Car);


const car = container.resolve<Car>('Car');
car.run(); // Engine start