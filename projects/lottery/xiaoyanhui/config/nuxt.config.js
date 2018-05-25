module.exports = (config, runtime) => {
  config.loading = {
    color: '#409EFF'
  }
  config.plugins = [
    ...(config.plugins || [])
    // '~/plugins/element-ui'
    // '~/plugins/font-awesome'
  ]
  config.css = [
    ...(config.css || [])
    // 'element-ui/lib/theme-chalk/index.css',
    // 'antd-iconfont/iconfont.css'
    // '@fortawesome/fontawesome/styles.css',
    // 'ionicons/dist/css/ionicons.css'
  ]
  // config.modules = [...(config.modules || []), '@nuxtjs/font-awesome']

  // config.router = config.router || {}
  // config.router.middleware = config.router.middleware || []
  // config.router.middleware.push('meta')
  return config
}
