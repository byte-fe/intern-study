<template>
  <el-container>
    <el-header>
      <Header :user="user"
        :routes="routes"
        :route="route"
        :meta="meta" />
    </el-header>
    <el-container>
      <el-aside class="aside">
        <NavMenu :routes="routes"
          :route="route"
          :meta="meta" />
      </el-aside>
      <el-container>
        <el-main>
          <nuxt/>
        </el-main>
      </el-container>
    </el-container>
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>
<style lang="stylus">
@import '~assets/reset.styl'
#__layout > .el-container
  height 100vh
  font-size 14px

.el-container
  display flex
  flex 1

.el-main
  width 1100px
  position relative
  margin 0 auto

.el-header,
.el-footer
  height auto !important
  padding 0
</style>
<style lang="stylus" scoped>
.anticon
  font-size inherit
.aside
  width 220px !important
  display flex
  // box-shadow 2px 0 6px rgba(0,21,41,.01)
</style>
<script>
import { mapState, mapMutations } from 'vuex'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import NavMenu from '~/components/NavMenu'
export default {
  head() {
    return {
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content:
            'width=device-width,initial-scale=1,user-scalable=no,viewport-fit=cover'
        }
      ]
    }
  },
  data(ctx) {
    return {}
  },
  middleware: ['auth'],
  computed: {
    ...mapState(['user', 'meta']),
    routes() {
      return this.$router.options.routes
    },
    route() {
      return this.$nuxt.$route.matched[0]
    }
  },
  mounted: () => {},
  components: {
    Header,
    Footer,
    NavMenu
  }
}
</script>
