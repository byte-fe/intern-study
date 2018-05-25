<template>
  <el-menu
    :default-active="active"
    class="menu"
    @open="handleOpen"
    @close="handleClose">
    <div v-for="(route, i) in tree">
      <div :key="i" v-if="!route.sub">
        <nuxt-link v-if="!/^https?:/.test(route.path)" :to="route.path">
          <el-menu-item :index="route.name">
            <i :class="route.icon || 'el-icon-anticon anticon icon-filetext1'"></i>
            <span slot="title">{{ route.title}}</span>
          </el-menu-item>
        </nuxt-link>
        <a target="_blank" v-else :href="route.path">
          <el-menu-item :index="route.name">
            <i :class="route.icon || 'el-icon-anticon anticon icon-link'"></i>
            <span slot="title">{{ route.title}}</span>
          </el-menu-item>
        </a>
      </div>
      <el-submenu v-else :index="route.name">
        <template slot="title">
          <i :class="route.icon || 'el-icon-anticon anticon icon-folderopen'"></i>
          <span>{{ route.title }}</span>
        </template>
        <div v-for="(sub, n) in route.sub">
          <nuxt-link v-if="!/^https?:/.test(sub.path)" :to="sub.path" :key="n">
            <el-menu-item :key="n" :index="sub.name">
              <i :class="route.icon || 'el-icon-anticon anticon icon-filetext1'" />
              <span slot="title">{{ sub.title }}</span>
            </el-menu-item>
          </nuxt-link>
          <a target="_blank" v-else :href="sub.path">
            <el-menu-item :key="n" :index="sub.name">
              <i :class="route.icon || 'el-icon-anticon anticon icon-link'"></i>
              <span slot="title">{{ sub.title }}</span>
            </el-menu-item>
          </a>
        </div>
      </el-submenu>
    </div>
  </el-menu>
</template>
<style lang="stylus" scoped>
.menu
  width 100%
</style>
<script>
/*
1. 完全匹配高亮
2. 完全匹配展开上级

/stock/index.vue => 渲染默认1个

curRet = []
curRet[0] match

{
  path: 'auth',
  meta: {},
  children: [
    {
      path: 'settings',
      meta: {},
      children: []
    }
  ]
}

*/
// import Icon from '@fortawesome/vue-fontawesome'
export default {
  props: {
    routes: Array,
    route: Object,
    meta: Object
  },
  computed: {
    active() {
      return this.route ? this.route.name : ''
    },
    tree() {
      let result = []
      if (!this.routes || !this.route) return result
      let map = {}
      this.routes
        .filter(
          route =>
            !route.path.indexOf(
              `/${this.route.path.split('/').filter(item => item)[0]}`
            )
        )
        .forEach(route => {
          let meta = {
            ...this.meta[route.path]
          }
          meta.title = meta.title || route.name
          let extRoute = {
            ...route,
            ...meta,
            paths: route.path
              .split('/')
              .filter(item => item)
              .slice(1)
          }
          if (!extRoute.paths.length) {
            result.push(extRoute)
          } else if (extRoute.paths.length === 1) {
            result.push(extRoute)
          } else {
            let key = extRoute.paths[0]
            if (map[key] === undefined) {
              meta = this.meta[extRoute.path.replace(/\/[^/]*$/, '')] || {}
              meta.title = meta.title || extRoute.name
              result.push({
                name: key,
                path: null,
                sub: [extRoute],
                ...meta
              })
              map[key] = result.length - 1
            } else {
              result[map[key]].sub.push(extRoute)
            }
          }
        })
      return result
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  },
  components: {
    // Icon
  }
}
</script>
