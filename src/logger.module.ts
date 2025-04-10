import { Module } from "@nestjs/common";
import { LoggerClassService, LoggerService, UseFactory, UseValueService } from "./logger.service";

@Module({

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
  ],
  exports: [ // 导出服务(其实是providers的子集，没有在exports中定义的服务就算别的模块import了这个模块，也不能使用)
    LoggerClassService, 
    'StringToken',
  ]
})
export class LoggerModule {}