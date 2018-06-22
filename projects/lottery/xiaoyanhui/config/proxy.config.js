// Proxies for devServer
// usage @see http-proxy-middleware
module.exports = (config, runtime) => {
  const dev = process.env.NODE_ENV !== 'production'

  // Only in dev mode
  // For production use `app.use(proxy)` in business modules
  dev &&
    Object.assign(config, {
      '/__api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/__api': '/api' }
      }
    })
  return config
}
