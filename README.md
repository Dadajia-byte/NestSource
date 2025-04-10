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

#### Provider
- 定义provider类
- 在module里注册provider类
- 在控制器里面声明或者使用provider类

#### 结构

所谓的 module 其实是一个 DIContainer，用于管理 controller 和 provider；在 module 中写明 provider 相当于注册服务，随后根据 controller 中的 constructor 的参数来依次注入服务到对应 controller中。

在注入的过程中，其中包含 普通构造函数的注入 和 @Inject token注入，区别如下：

- 普通构造函数基于**类型自动解析**，@Inject注入基于**标识符token**解析
- 普通构造函数注入适用于**注入类服务**，@Inject注入适用于**注入非类对象、动态服务或区分多个服务**
- 普通构造函数其实是语法糖，他的 token 值其实是类本身

每个 module 本身其实是一个单例，如果有多个别的模块依赖了同一个模块，本质上是依赖的同一个模块