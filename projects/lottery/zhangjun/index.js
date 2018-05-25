module.exports = async (app, options) => {
  app.get('/api/lottery', async (req, res) => {
    const list = [
      {
        id: 1,
        name: '10元话费', // 奖品名称
        weight: 10 // 权重
      },
      {
        id: 2,
        name: '40积分',
        weight: 32 // 权重
      },
      {
        id: 3,
        name: '10元话费',
        weight: 10 // 权重
      },
      {
        id: 4,
        // icon: require("../assets/img/point_five.png"),
        name: '易趣豆5',
        weight: 8 // 权重
      },
      {
        id: 5,
        name: '易趣豆5',
        weight: 8 // 权重
      },
      {
        id: 6,
        name: '易趣豆5',
        weight: 8 // 权重
      },
      {
        id: 7,
        name: '1元话费',
        weight: 6 // 权重
      },
      {
        id: 8,
        name: '1元话费',
        weight: 6 // 权重
      },
      {
        id: 9,
        name: '1元话费',
        weight: 6 // 权重
      },
      {
        id: 10,
        name: '1元话费',
        weight: 6 // 权重
      }
    ] //奖品列表
    let randomList = []
    list.forEach((item, index) => {
      for (var j = 0; j < list[index].weight; j++) {
        randomList.push({
          id: list[index].id,
          name: list[index].name
        })
      }
      let randomValue = randomList[Math.floor(Math.random() * 100)]
      console.log('randomList', randomValue)
    })
    return {
      prize_list: list,
      randomList: randomList,
      num: randomList[Math.floor(Math.random() * randomList.length)]
    }
  })

  app.post('/api', async (req, res) => {
    return {
      hello: 'ServerData-post'
    }
  })

  app.register(require('./server/modules/user/'), { prefix: '/api/user' })
}
