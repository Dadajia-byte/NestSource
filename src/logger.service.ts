import { Injectable, Inject } from '@nestjs/common';
@Injectable() // 这个装饰器是用来标记一个类为可注入的服务，声明他是一个可被IoC容器管理的类
export class LoggerService {
  constructor(@Inject('SUFFIX') private suffix: string) {
    console.log(this.suffix);
  }
  log(message: string) {
    console.log(message);
  }
}

@Injectable()
export class LoggerClassService {
  log(message: string) {
    console.log(message);
  }
}
@Injectable()
export class UseValueService {
  constructor(private message: string) {
    console.log(this.message);
  } // 这里的message是一个普通的参数
  log(message: string) {
    console.log(message);
  }

}

@Injectable()
export class UseFactory {
  log(message: string) {
    console.log(message);
  }
}