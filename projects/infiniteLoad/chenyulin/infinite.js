/**
 * mock数据用
 */
const serve = require('koa-static')
const Koa = require('koa')
const app = new Koa()
const myjson = require('./config.json')

function rnd(n, m) {
  return Math.floor(Math.random() * (m - n) + n)
}

app.use(function*(next) {
  if (this.req.url == '/load') {
    this.body = myjson
  } else {
    yield next
  }
})

// $ GET /package.json
app.use(serve('.'))

// // $ GET /1.html
// app.use(serve('www'))

// or use absolute paths
app.use(serve(__dirname + '/www'))

app.listen(3000)

console.log('listening on port 3000')
