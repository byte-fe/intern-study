export default (ctx, next) => {
  for (var x in ctx) {
    console.log(x)
  }
  // console.log(ctx.app.router.options.routes)
  // console.log(111, routes, route)
  // context.userAgent = process.server
  //   ? context.req.headers['user-agent']
  //   : navigator.userAgent
  next()
}
