### IOC
IOC 就是控制反转 Inversion of Control 是一种设计原则，用于减少代码之间的耦合，在传统的编程方式中，程序直接控制所依赖的对象的创建和管理。使用了 IOC 之后，对象的创建和管理权交由给了容器，程序不再主动负责创建对象，而是被动地接受容器注入和对象

DI 依赖注入 Dependency Injection 是实现IOC的一种手段，通过DI，我们将类的依赖项注入到类中，而不是在类里面实例化这些对象

- IOC 设计理念
- DI 手段

```ts
// 传统方式
class Engine {
  start(){}
}
class Car {
  private engine:Engine;
  constructor() {
    this.engine = new Engine();
  }
  drive() {
    this.engine.start();
  }
}
const car = new Car();
car.drive();

// 通过构造函数注入解藕
const engine = new Engine();
class Car1 {
  private engine:Engine;
  constructor(engine:Engine) {
    this.engine = engine;
  }
  drive() {
    this.engine.start();
  }
}
const car = new Car1(engine);
car.drive();

// IOC 实现
// 见1.ts
```