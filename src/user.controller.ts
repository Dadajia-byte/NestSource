import { Controller, Get, Req, Request } from "@nestjs/common";
import {Request as ExpressRequest} from "express"
@Controller('users')
export class UserController {
  @Get('req')
  handleRequest(@Request() request:ExpressRequest, age:number,@Req() req:ExpressRequest):string { // @Req 和 @Request 一摸一样，用于获取req对象
    console.log('url',req.url);
    console.log('age',age);
    console.log('method',req.method);
    return 'handleRequest'
  }
}