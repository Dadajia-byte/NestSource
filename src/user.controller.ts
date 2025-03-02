import { Controller, Get, Req, Request,Query,Headers } from "@nestjs/common";
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
  @Get('query')
  handleQuery(@Req() req:ExpressRequest,@Query('id') id:string):string {
    console.log('url',req.url);
    console.log('id',id);
    return `handleQuery id:${id}` 
  }
  @Get('headers')
  handleHeaders(@Req() req:ExpressRequest,@Headers('accept') accept:string):string {
    console.log('url',req.url);
    console.log('accept',accept);
    return `handleHeaders accept:${accept}` 
  }
}