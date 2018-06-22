let { award } = require('./awardSetting.js')

module.exports = async (app, options) => {
  app.get('/award', async (req, res) => {
    return {
      award
    }
  })
  app.get('/select', async (req, res) => {
    let selected = Math.random() * 100
    let selectedIndex = null
    let value = 0
    for ([index, oneItem] of award.entries()) {
      value += oneItem.weight
      if (value > selected) {
        selectedIndex = index
        break
      }
    }
    return { selectedIndex }
  })
}
