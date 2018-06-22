<template>
  <el-container>
    <el-header>
      <Header :routes="routes"
        :meta="meta"
        :route="route"
        :user="user" />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>
<style lang="stylus">
@import '~assets/reset.styl'
#__layout > .el-container {
  height: 100vh;
  font-size: 14px;
}
.el-container {
  display: flex;
  flex: 1;
}
.el-main {
  width: 1100px;
  position: relative;
  margin: 0 auto;
}
.el-header,
.el-footer {
  height: auto !important;
  padding: 0;
}
.anticon
  font-size inherit
</style>
<script>
import { mapState, mapMutations } from 'vuex'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
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
  computed: {
    ...mapState(['user', 'meta']),
    routes() {
      return this.$router.options.routes
    },
    route() {
      return this.$nuxt.$route.matched[0]
    }
  },
  components: {
    Header,
    Footer
  }
}
</script>
