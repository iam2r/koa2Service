exports.invoke = async (path, ctx, next) => {//统一获取无论get还是post请求的参数放到ctx.data上，并确定走对应的方法
    const { object, method } = ctx.params;
    console.log(`///invoke:${object}->${method}===${ctx.request.method}`);
    ctx.data = { ...ctx.query, ...ctx.request.body };
    console.log('<===========req===========>')
    console.log(ctx.data);
    ctx.body = await require(`${path}${object}`)[method](ctx, next);
    console.log('<===========res===========>')
    console.log(ctx.body)
}