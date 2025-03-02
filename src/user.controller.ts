import { Controller, Get, Req, Request,Query,Headers,Session,Ip,Param,Post,Body,Response } from "@nestjs/common";
import {Request as ExpressRequest, Response as ExpressResponse} from "express"
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
  @Get('session')
  handleSession(@Session() session:any,@Session('pageView') pageView:string):string {
    console.log('session',session);
    console.log('pageView',pageView);
    if(session.pageView) {
      session.pageView++;
    } else {
      session.pageView = 1;
    }
    return `handleSession session:${session} pageView:${session.pageView}` 
  }
  @Get('ip')
  handleIp(@Ip() ip:string):string {
    return `handleIp ip:${ip}` 
  }
  @Get(':username/info/:age')
  getUserInfo(@Req() req:ExpressRequest,@Param() params:any, @Param('username') username:string,@Param('age') age:string):string {
    console.log('url',req.url);
    console.log('params',params);
    console.log('username',username);
    console.log('age',age);
    return `getUserInfo username:${username} age:${age}`
  }
  @Get('star/ab*de')
  handleWildcard():string {
    return `handleWildcard`
  }
  @Post('create')
  createUser(@Body() createUserDto:any,@Body('username') username:string):string {
    console.log('createUserDto',createUserDto);
    console.log('username',username);
    return `createUser username:${username}`
  }
  @Post('response') 
  handleResponse(@Response() response:ExpressResponse) { // 如果使用@Response装饰器，服务将会被挂起，直到你自己调用res.send()方法
    console.log('response',response);
    response.send('handleResponse');
  }
  @Post('passthrough')
  handlePassthrough(@Response({passthrough:true}) response:ExpressResponse) { // 如果使用@Response装饰器，需要你全权处理请求
    // 但有时候我只想添加一个响应头，仅此而已，不想负责响应体的发送
    response.setHeader('x-powered-by','NestJs');
    // 还是想返回一个值，让nest帮我发送响应体操作,那么就需要使用passthrough:true
    return 'handlePassthrough';
  }
}
/**
 * 在使用NestJs时，一般来说一个实体会定义两个类型，一个是dto，一个是interface
 * dto 客户端向服务器提交的数据对象，比如说用户注册的时候「用户名，密码」
 * 然后服务端一般会获取此dto，然后保存到数据库中，保存的时候可能还会加入一些默认值，时间戳，对密码加密
 * 还可能过滤掉一些字段，比如注册的时候密码和确认米啊米，但是保存的时候只保存密码
 * 这个时候就需要一个interface来定义保存到数据库的数据结构
 * userDto 「用户名 密码 确认密码」
 * userInterface 「用户名 密码 创建时间 更新时间」
 */