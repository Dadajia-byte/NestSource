import clc from 'cli-color'; // 可以在控制台打印颜色 
export class Logger {
  private static lastTimestamp = Date.now();
  // 定义了一个用来打印日志的工具方法
  static log(message: string, context: string='') {
    // 获取当前时间戳
    const timestamp = new Date().toLocaleString();
    // 获取当前pid
    const pid = process.pid;
    const currentTimestamp = Date.now();
    // 计算时间差
    const diff = currentTimestamp - this.lastTimestamp;
    console.log(`[${clc.green('Nest')}] ${clc.green(pid.toString())}  - ${clc.yellow(timestamp)}  ${clc.green('LOG ')} [${clc.yellow(context)}]  ${clc.green(message)} +${clc.green(diff.toString())}ms`);
    this.lastTimestamp = currentTimestamp
  }
}