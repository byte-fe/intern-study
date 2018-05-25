# draw

抽奖的小demo

> psm: 1.1.2

### 0.0 线上入口

- http://???

### 0.1 相关人员

负责人 zj

| 角色     | 人员        |
| -------- | ----------- |
| 产品经理 | xxx,yyy     |
| 前端开发 | xxx         |
| 后台开发 | xxx,yyy,zzz |
| 交互设计 | xxx,yyy     |

### 0.2 需求 & 设计图

*   [需求文档](xxx)
*   [设计图](xxx)

----

## 1. 如何运行

### 1.0 安装依赖

```sh

# 安装 node
$ brew install node

# 安装 fe
$ npm i fe -g

# 安装 yarn (可选)
$ npm i yarn -g
```

> node 版本 [8.0+]

严格使用 [prettier](https://prettier.io/), 请基于自己的编辑器配置 [Editor Support](https://prettier.io/docs/en/editors.html)

### 1.1 开发环境配置

#### 1.1.1 项目配置

`fe.json`

示例:

```json
{
  "CLIENT_DIR": "client",
  "ENTRY_FILE": "index.js",
  "CLIENT_MODE": "vue"
}
```

参考完整配置: https://code.byted.org/fe/fe/blob/master/config/fe.json

#### 1.1.2 生产环境配置

所有生产环境变量请在 `.env` 中配置

```yaml
## .env

# production | development
NODE_ENV=production
SERVER_PORT=4000
SERVER_IP=127.0.0.1
CORS_ORIGIN=*
CORS_METHODS=GET,HEAD,PUT,PATCH,POST,DELETE
```

### 1.2 开发过程

工作流

`fe dev` > `fe build` > `fe start`

升级依赖

```sh
# 查看更新版本
$ yarn outdated
# 安全升级
$ yarn update
# 升级到 latest
$ yarn upgrade --latest
```

#### 1.2.1 命令

```sh
$ cd draw

# 开发
$ fe dev

# 编译
$ fe build

# 在生产环境启动(自动编译)
$ fe start
```

#### 1.2.2 代理配置

`config/proxy.config.js`

```js
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
```

#### 1.2.3 自定义 postcss

`config/postcss.config.js`

```js
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
```

> 注意: 使用的插件请安装并保存到 `package.json`

#### 1.2.4 自定义 polyfills

`config/polyfills.js`

默认已集成:

- Promise
- fetch
- Object.assign
- vh|vw|vmin|vmax

#### 1.2.5 自定义 nuxt

`config/nuxt.config.js`

示例:

```js
module.exports = (config, runtime) => {
  return config
}
```

参考完整配置: https://code.byted.org/fe/fe/blob/master/config/plugins/nuxt.config.js

### 1.3 发布

> TODO

### 1.4 错误告警及监控

> TODO
