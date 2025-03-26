import { Controller, Get,Inject } from "@nestjs/common";
import { LoggerService,UseValueService } from "./logger.service";
@Controller()
export class AppController {
  constructor( // 注入 service（其实是在module中解析每个controller的参数进行注入）
    private readonly loggerService: LoggerService,
    @Inject('StringToken') private useValueService: UseValueService
  ) {}
  @Get()
  index() { // 声明或使用 service类
    this.loggerService.log("Hello World");
    return "Hello World";
  }
}