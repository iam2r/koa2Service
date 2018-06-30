const Koa = require('koa')
const static = require('koa-static')
const mongoose = require('mongoose')
const cors = require('koa2-cors')
const cookieSession = require('koa-session')
const convert = require('koa-convert')
const bodyParser = require('koa-better-body')
const compress = require('koa-compress')
const apiRouter = require('./routers/apiRouter')
const { initDatabase } = require('./database')
const { host, port } = require('./config.js').appConfig;
const app = new Koa();
// 全局错误处理   注意await不能断 若中间件前没用await，promise链会断开，中间件内部错误不能捕获，如路由里的中间函数invoke
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
})

app.on("error", (err, ctx) => {//捕获异常记录错误日志
    console.log('<===========res===========>')
    console.log(new Date().toLocaleString(), ":", err);
});

//处理post请求 以及文件上传 包括formdata  data在ctx.request.fields
app.use(convert(bodyParser({
    uploadDir: './static/upload', //指定上传路径
    keepExtensions: true, //保留扩展名
    fields: 'body',//挂载到body上 ctx.requert.body
})))

// 设置gzip
app.use(compress({
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
}))

//跨域
app.use(cors())

//session
app.keys = ['some secret hurr']

app.use(cookieSession({
    key: 'koa:sess',   //cookie key (default is koa:sess)
    maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
    overwrite: true,  //是否可以overwrite    (默认default true)
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true,   //签名默认true
    rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false,  //(boolean) renew session when session is nearly expired,
}, app))
//静态资源
app.use(static(__dirname + '/static'));
//装载所有子路由
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())
//数据库初始化
initDatabase();

app.use(ctx => {
    if (ctx.path === '/favicon.ico') return;
    console.log(ctx.session.views)
    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    ctx.body = n + ' views';
});

app.listen(port, host, () => {
    console.log(`[Server] starting at http://${host}:${port}`);
});