export const state = () => ({
  // 为 path 配置渐进增强的详细描述信息, 用于:
  // 1. dashboard
  // 2. navMenu
  meta: {
    '/help': {
      title: '帮助',
      icon: 'el-icon-anticon anticon icon-questioncircleo',
      description: '系统帮助'
    },
    '/auth/': {
      title: '权限管理',
      icon: '',
      description: '为所有功能设置权限'
    },
    '/auth': {
      title: '权限管理页',
      icon: ''
    },
    '/auth/feature1': {
      title: '其他功能页1',
      icon: ''
    },
    '/auth/feature2': {
      title: '其他功能页2',
      icon: ''
    },
    '/auth/sub': {
      title: '二级功能页',
      icon: ''
    },

    '/stock/': {
      title: '股票',
      icon: '',
      description: '股票业务配置管理'
    },
    '/stock/news': {
      title: '新闻列表',
      path: 'https://cjcms.bytedance.net/web/stock/news',
      icon: ''
    },
    '/insurance/': {
      title: '保险',
      icon: '',
      path: 'https://cjcms.bytedance.net/web/insurance/product',
      description: '保险业务配置管理'
    }
  },
  user: {
    name: '潘机智'
  },
  counter: 0
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}
