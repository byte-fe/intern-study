<template>
  <div class="index-mod-list">
    <el-row class="control-bar" :gutter="20">
      <el-col :span="13">
        <el-input size="small" prefix-icon="el-icon-search" v-model="input" placeholder="请输入模块名"></el-input>
      </el-col>
      <el-col :span="5">
        <el-dropdown>
          <el-button size="small" type="info" plain>
            最新创建<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>最后创建</el-dropdown-item>
            <el-dropdown-item>最新更新</el-dropdown-item>
            <el-dropdown-item>最后更新</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-tabs type="card" :activeName.sync="activeName" @tab-click="handleClick">
      <el-tab-pane name="first">
        <span slot="label"><i class="el-icon-anticon anticon icon-switcher"></i> 全部模块</span>
        <div>
          <el-card v-for="(mod, key) in modules" :key="key" class="box-card">
            <nuxt-link v-if="!mod.meta.path" :to="mod.to" class="left">
              <span class="icon">
                <i :class="mod.meta.icon || 'el-icon-anticon anticon icon-scan1'"></i>
              </span>
              <em>{{mod.meta.title}}</em><span>/{{mod.path}}</span>
              <p>{{mod.meta.description}}</p>
            </nuxt-link>
            <a target="_blank" v-else :href="mod.meta.path" class="left">
              <span class="icon">
                <i :class="mod.meta.icon || 'el-icon-anticon anticon icon-link'"></i>
              </span>
              <em>{{mod.meta.title}}</em><span>/{{mod.path}}</span>
              <p>{{mod.meta.description}}</p>
            </a>
            <div class="right"><i class="el-icon-star-off"></i><i class="el-icon-setting"></i></div>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我关注的项目" name="second"><span slot="label"><i class="el-icon-star-off"></i> 我关注的项目</span>我关注的项目</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="系统设置" name="fourth">
        <span slot="label"><i class="el-icon-setting">系统设置</i></span>
        <Settings />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style lang="stylus">
.control-bar
  position absolute
  right 0
  z-index 1

.index-mod-list
  .box-card
    margin-bottom 15px
    .el-card__body
      flex 1
      display flex
      padding 10px 20px
      &:hover
        background #ffe
    .left
      flex 1
      line-height 1.7
      color #999
      font-size 13px
      em
        font-weight bold
        margin-right 10px
        color #444
        font-size 14px
      .icon
        float left
        font-size 2em
        margin-right 15px
        color #409EFF
    .right
      display flex
      align-items center
      i
        margin-left 10px
</style>
<script>
import Settings from './Settings'
export default {
  props: {
    routes: Array,
    activeName: String,
    meta: Object
  },
  data() {
    return {
      input: ''
    }
  },
  methods: {
    handleClick() {}
  },
  computed: {
    modules() {
      const subModules = this.routes
      // .filter(route => /\/.+\//.test(route.path))
      let result = {}

      /*
      to 策略

      1. 目录 / 文件:
      2. 没有 index, 匹配第一个
      */
      this.routes.map(route => {
        const ret = route.path.split('/').filter(item => item)
        if (ret[0]) {
          result[ret[0]] = result[ret[0]] || {}
          // TODO @track https://github.com/nuxt/nuxt.js/pull/2707
          let meta = this.meta[`/${ret[0]}/`] || this.meta[`/${ret[0]}`] || {}
          meta.title = meta.title || route.name
          result[ret[0]].meta = meta
          result[ret[0]].path = ret[0]
          result[ret[0]].to = result[ret[0]].to || route.path
          if (!ret.length > 1) {
            result[ret[0]].to = route.path
          }
        }
      })
      return result
    }
  },
  components: {
    Settings
  }
}
</script>
