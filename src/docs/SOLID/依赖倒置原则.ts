// 依赖倒置原则要求高层模块不应该依赖底层模块，两者都应该依赖其抽象。
// 抽象不应该依赖细节，细节应该依赖抽象。

/* // 反例
class MYSQLDatabase {
  connect() {}
  save(user) {} 
}

class UserRespository {
  private db: MYSQLDatabase;

  constructor() {
    this.db = new MYSQLDatabase();
  }

  save(user) {
    this.db.connect();
    this.db.save(user);
  }
}
 */

interface IDatabase {
  connect():void;
  save(obj): void;
}
class UserRespository {
  private db: IDatabase;

  constructor(db: IDatabase) {
    this.db = db;
  }

  save(user) {
    this.db.connect();
    this.db.save(user);
  }
}
class MYSQLDatabase implements IDatabase {
  connect() {
    console.log('connect');
  }
  save(user) {
    console.log('save user');
  }
}

export {};

// IOC 和 依赖倒置
// 只要依赖的是一个接口而不是一个实例就是依赖倒置
// 依赖倒置原则是实现IOC的重要方式，但是并不等同于IOC，真正创建的时候还是需要一个实例，如果是通过容器来创建实例并注入的，那么就是IOC