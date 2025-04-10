import { Controller, Get,Inject } from "@nestjs/common";
import { LoggerService,UseValueService } from "./logger.service";
import { OtherService } from "./other.service";
import { CommonService } from "./common.service";
@Controller()
export class AppController {
  constructor( // 注入 service（其实是在module中解析每个controller的参数进行注入）
    private readonly loggerService: LoggerService,
    private readonly loggerClassService: LoggerService,
    @Inject('StringToken') private useValueService: UseValueService,
    @Inject('FactoryToken') private useFactory: UseValueService,
    private otherService:OtherService,
    private commonService:CommonService
  ) {}
  @Get()
  index() { // 声明或使用 service类
    this.otherService.log("Hello World");
    return "Hello World";
  }
  @Get('common')
  common() {
    return 'common'
  }
}