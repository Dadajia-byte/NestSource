import { Injectable } from '@nestjs/common';
@Injectable() // 这个装饰器是用来标记一个类为可注入的服务，声明他是一个可被IoC容器管理的类
export class LoggerService {
  log(message: string) {
    console.log(message);
  }

}
@Injectable()
export class UseValueService {
  log(message: string) {
    console.log(message);
  }

}