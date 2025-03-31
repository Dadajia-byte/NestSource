import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UserController } from "./user.controller";
import { LoggerClassService,LoggerService,UseValueService,UseFactory } from "./logger.service";
import { OtherModule } from "./other.module";
@Module({
  import: [ OtherModule ], // 导入其他模块
  controllers: [AppController,UserController],
  providers: [ // 注册服务
    {
      provide: 'SUFFIX',
      useValue: 'suffix'
    },
    LoggerClassService, // 这样定义provider的话，token值就是本身
    {
      provide: 'StringToken', // 这是一个token，也称为标志/令牌
      useValue: new UseValueService('hello world')
    },
    {
      provide: LoggerService,
      useClass: LoggerService
    },
    {
      provide: 'FactoryToken',
      inject: ['1','2'], // 依赖注入
      useFactory:()=>new UseFactory()
    }
  ]
})
export class AppModule {}