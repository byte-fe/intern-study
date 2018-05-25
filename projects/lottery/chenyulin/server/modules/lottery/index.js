// [{name: "10元话费", weight: 1}, {name: "50积分", weight: 50}, ...]
const myjson = require('./config.json')
module.exports = async (app, options) => {
  app.get('/lottery', async (req, res) => {
    let n = Math.random()
    if (n < 0.02) {
      //2% 100元话费
      myjson.result = 1
    } else if (n < 0.04) {
      //2% 1元现金
      myjson.result = 2
    } else if (n < 0.07) {
      //3% 10话费
      myjson.result = 3
    } else if (n < 0.28) {
      //21% 50积分
      myjson.result = 4
    } else {
      //谢谢参与
      myjson.result = 0
    }
    return myjson
  })
}

function rnd(n, m) {
  return Math.floor(Math.random() * (m - n) + n)
}
