<template>
  <el-row class="header" :gutter="20">
    <el-col class="nav" :span="16">
      <nuxt-link class="logo" to="/">
        <el-tag type="info"><i class="el-icon-anticon anticon icon-bank"></i>CMS | feinit</el-tag>
      </nuxt-link>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <template v-for="(li, i) in nav">
          <el-breadcrumb-item :key="i">
            <nuxt-link v-if="li.path" :to="li.path">{{ li.title || li.name }}</nuxt-link>
            <span class="text" v-else>{{ li.title || li.name }}</span>
          </el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </el-col>
    <el-col class="right" :span="8">
      <span class="action">
        <i class="el-icon-anticon anticon icon-questioncircleo"></i>
      </span>
      <el-dropdown>
        <i class="el-icon-setting"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown>
        <div><i class="el-icon-anticon anticon icon-user"></i>&nbsp;&nbsp;{{user.name}}</div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>
<style scoped>
.header {
  font-size: 13px;
}
.el-breadcrumb {
  font-size: 13px;
}
.nav {
  display: flex;
  align-items: center;
}
.nav .text {
  color: #aaa;
}
.nav a {
  font-weight: normal;
  color: #ccc;
}
.nav a:hover {
  color: #409eff;
}

.nav a.logo {
  margin-right: 15px;
}

.nav a.logo i {
  font-size: 14px;
  margin-right: 7px;
}

.nav a.logo .el-tag--info {
  color: #ccc !important;
}

.nav a.logo:hover .el-tag--info {
  color: #409eff !important;
  /*background: #444 !important;*/
}

.header {
  padding: 0 20px;
  height: 48px;
  background-color: #212121;
  color: #fff;
  display: flex;
  flex: 1;
  align-items: center;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
}
.nav-item {
  align-items: center;
  border-radius: inherit;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 0 16px;
}

.right {
  text-align: right;
}

.right .el-dropdown {
  color: #fff;
  /*background: #f0f;*/
  cursor: pointer;
  padding: 0 15px;
  line-height: 48px;
}
.right .el-dropdown:hover {
  background: #444;
}

.right .action {
  display: inline-block;
  /*background: #f0f;*/
  padding: 0 13px;
  line-height: 48px;
}
.right .action:hover {
  cursor: pointer;
  background: #444;
}
</style>
<script>
export default {
  props: {
    route: Object,
    routes: Array,
    meta: Object,
    user: {
      name: String
    }
  },
  computed: {
    nav() {
      let result = []
      let ret = ''
      if (!this.route || !this.route.path) return result
      this.route.path.replace(/[^/]*\//gm, p => {
        ret += p
        result.push(ret)
      })
      result.push(this.route.path)
      result = result
        .slice(1)
        .map(path => {
          let pre = path.replace(/\/$/, '') || '/'
          let meta = {
            ...(this.meta[pre] || {}),
            ...(this.meta[path] || {})
          }
          pre === this.route.path && (meta.path = null)
          return {
            ...this.routes.find(r => r.path === pre),
            ...meta
          }
        })
        .filter(route => route.path !== undefined)
      return result
    }
  },
  components: {}
}
</script>
