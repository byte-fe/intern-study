module.exports = async (app, options) => {
  app.get('/api', async (req, res) => {
    return {
      hello: 'ServerData'
    }
  })

  app.post('/api', async (req, res) => {
    return {
      hello: 'ServerData-post'
    }
  })

  app.register(require('./server/modules/user/'), { prefix: '/api/user' })
  app.register(require('./server/modules/lottery/'), { prefix: '/api/lottery' })
}
