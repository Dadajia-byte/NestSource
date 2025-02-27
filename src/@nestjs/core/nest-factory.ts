import { Logger } from "./logger";
import { NestApplication } from "./nest-application";
export class NestFactory {
  static async create(module:any) {
    // 启动Nest应用
    Logger.log('Starting Nest Application。。。','NestFactory');
    // 创建Nest应用实例并返回
    const app = new NestApplication(module)
    return app;
  }
}