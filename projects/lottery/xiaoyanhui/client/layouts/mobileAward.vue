<template>
  <div>
    <!-- <el-header>

    </el-header> -->
    <!-- <el-main> -->
    <nuxt />
    <!-- </el-main> -->
    <!-- <el-footer>
      <Footer />
    </el-footer> -->
  </div>
</template>
<style lang="stylus">
@import '~assets/reset.styl'

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
