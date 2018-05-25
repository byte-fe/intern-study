# feinit 开发指南

## 目录结构

`pages/index.vue` => dashboard

`pages/[module]/` => 模块 => 显示在 dashboard

`pages/[module]/*.vue` => 模块入口页面 => 显示在左侧导航树

## 开发流程

以开发 "股票" 模块下的 "新闻列表"(/stock/news) 为例:

1.  创建入口文件 `pages/stock/news.vue`

访问 `/stock/news` => `pages/stock/news.vue`

2.  [可选]资源划分

    * 私有 store `store/stock/news.js`
    * 私有 components `components/stock/*.vue`
    * 私有 assets `assets/stock/*.vue`

3.  [可选]添加友好的模块/页面描述

在 `store/index.js` 中添加 `meta`

```js
{
  '/stock/': {
    title: '模块名',
    icon: '模块 icon',
    description: '模块描述'
  },
  '/stock/news': {
    title: '页面名',
    icon: ''
  },
}
```

4.  组织后端代码

* 添加对应模块 `server/modules/stock/index.js`

```js
module.exports = async (app, options) => {
  app.get('/all', async (req, res) => {
    return {
      hello: 'ServerData'
    }
  })
}
```

* 在 `index.js` 中注册模块

```js
module.exports = async (app, options) => {
  app.register(require('./server/modules/stock/'), { prefix: '/api/stock' })
}
```

访问 `api/stock` => `server/modules/stock/index.js`

## 使用图标

内置了 element-ui + ant-design-icons

```html
<i class="el-icon-anticon icon-stepforward"></i>
<i class="el-icon-menu" />
```

> https://ant.design/components/icon-cn/#%E5%9B%BE%E6%A0%87%E5%88%97%E8%A1%A8

## 权限相关

1.  router => middleware
2.  dashboard => hide
3.  navMenu => hide
