const router = require('koa-router')()
const fs = require('fs.promised')
const path = require('path')
let jsonData = require(path.join(__dirname, '..', 'public/mock/data.json'))
// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {
//     title: 'Hello Koa 2!'
//   })
// })
router.get('/', async (ctx, next) => {
  ctx.type = 'html'
  ctx.response.body = await fs.readFile(
    path.join(__dirname, '..', 'public/html/index.html')
  )
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string  dddddd'
})

router.get('/json', async (ctx, next) => {
  ctx.type = 'json'
  ctx.body = { code: 0, data: jsonData }
})

module.exports = router
