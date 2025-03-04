express 中的 `next` 是一个用于处理中间件链的函数，每个中间件接受三个参数 `req`、`res`、`next`。中间件函数通过调用 `next` 可以将控制权传递给下一个中间件函数，如果中间没有调用 `next`，请求将会挂起。

```js
class Request {
  url;
  constructor(url) {
    this.url = url
  }
}
class Response {
  send(mes) {
    console.log(mes);
  }
}
class Express {
  middlewares = []
  use(middleware) {
    this.middlewares.push(middleware);
  }
  handleRequest(req,res) {
    const {middleware} = this;
    let index = 0;
    function next() {
      if(index<middleware.length) {
        const middleware = middlewares[index++];
        middleware(req,res,next)
      }
    }
    next()
  }
}
const app = new Express();
app.use((req,res,next)=>{
  console.log('middleware1');
  next();
})
app.use((req,res,next)=>{
  console.log('middleware2');
  next();
})
app.use((req,res,next)=>{
  console.log('middleware3');
  res.send('hello';)
})
const req = new Request('/users');
const res = new Response();
app.handleRequest(req,res);
```
