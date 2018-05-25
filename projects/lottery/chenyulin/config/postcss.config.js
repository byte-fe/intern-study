module.exports = (config, runtime) => {
  config.plugins = config.plugins.concat([
    // require('postcss-write-svg')({
    //   utf8: false
    // }),
    require('postcss-px-to-viewport')({
      viewportWidth: 750,
      viewportHeight: 1334,
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: ['.nvw', '.hairlines'],
      minPixelValue: 1,
      mediaQuery: false
    }),
    require('postcss-viewport-units')()
    // require('cssnano')({
    //   preset: 'advanced',
    //   autoprefixer: false,
    //   'postcss-zindex': false
    // })
  ])
  return config
}
