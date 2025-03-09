import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UserController } from "./user.controller";
import { LoggerService,UseValueService } from "./logger.service";
@Module({
  controllers: [AppController,UserController],
  providers: [
    LoggerService,
    {
      provide: 'StringToken', // 这是一个token，也称为标志/令牌
      useValue: new UseValueService()
    }
  ]
})
export class AppModule {}