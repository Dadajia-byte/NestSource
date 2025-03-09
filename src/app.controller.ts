import { Controller, Get,Inject } from "@nestjs/common";
import { LoggerService,UseValueService } from "./logger.service";
@Controller()
export class AppController {
  constructor(
    private readonly loggerService: LoggerService,
    @Inject('StringToken') private useValueService: UseValueService
  ) {}
  @Get()
  index() {
    this.loggerService.log("Hello World");
    return "Hello World";
  }
}