import clc from 'cli-color'; // 可以在控制台打印颜色 
export class Logger {
  // 定义了一个用来打印日志的工具方法
  static log(message: string, context: string='') {
    // 获取当前时间戳
    const timestamp = new Date().toLocaleString();
    // 获取当前pid
    const pid = process.pid;
    console.log(`[${clc.green('Nest')}] ${clc.green(pid.toString())}  - ${clc.yellow(timestamp)}}  ${clc.green('LOG ')} [${clc.yellow(context)}]  ${clc.green(message)}`);
  }


}