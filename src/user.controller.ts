import { Controller, Get, Req, Request } from "@nestjs/common";
import {Request as ExpressRequest} from "express"
@Controller('users')
export class UserController {
  @Get('req')
  handleRequest(@Request() request:ExpressRequest, @Req() req:ExpressRequest):string { // @Req 和 @Request 一摸一样，用于获取req对象
    console.log(req.url);
    console.log(req.path);
    console.log(req.method);
    return 'handleRequest'
  }
}