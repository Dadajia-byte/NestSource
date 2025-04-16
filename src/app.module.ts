import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UserController } from "./user.controller";
import { CommonModule } from "./common.module";
import { OtherModule } from "./other.module";
import { LoggerModule } from "./logger.module";
import { CoreModule } from "./core.module";
@Module({
  imports: [ CommonModule, OtherModule/* LoggerModule */ ], // 导入其他模块
  controllers: [AppController/* , UserController */],
})
export class AppModule {}