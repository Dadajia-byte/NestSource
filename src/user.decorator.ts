import { createParamDecorator } from "@nestjs/common";
// 自定义装饰器
export const User = createParamDecorator((data:any, ctx:any) => {
  const request = ctx.switchToHttp().getRequest();
  return data ? request.user[data] : request.user;
});