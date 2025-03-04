|包名|介绍|
|:--|:--|
|@nestjs/common|NestJs 的公共模块，包含各种装饰器、工具函数和中间件|
|@nestjs/core|NestJs 的核心模块，提供创建各种 NestJs 应用程序的基础设施，包括依赖注入、模块系统|
|express-session|用于 Express 框架的会话中间件，支持会话数据的存储和管理|
|reflect-metadata|用于在 TS 和 JS 中实现反射的库，支持元数据的定义和读取|
|rxjs|Reactive Extension for JavaScript，提供基于 Observable 的响应式编程库|
|nodemon|一个 Node.js 工具，用于在检测到文件内容发生改变时自动重新启动应用程序|
|ts-node|一个 TypeScript 执行引擎，允许直接运行 TS 代码而无需预先编译|
|tsconfig-paths|一个工具，用于解析 TS 配置文件中的路径映射，支持模块路径的别名|
|typescript|TS 的编译器，提供静态类型检查和最新的 JS 特性|

#### Decorator stage3
- TS5.x 就使用 stage3 的写法了
- 关闭 tsconfig文件中的 `"emitDecoratorMetadata": fales` 和 `"experimentalDecorators": true,` 实现

#### intelliSense
- 指的是 vscode 智能代码补全功能，也可以进行错误检查
- vscode 内部使用 tsServer服务器调用 tsdlk 检查
- 具体的tsdlk文件配置检查，可以右下角选择配置，也可以自己配