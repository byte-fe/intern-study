<template>
  <div>
    <!-- <h1>{{hi}} {{data.hello}}</h1>
    <h2>SSR: {{server}}</h2>
    <p>{{userAgent}}</p>
    <div class="box">
      box
    </div>
    <div>GOTO: index / <nuxt-link prefetch to="/detail">detail</nuxt-link></div>
    <<nuxt-link to="lottery">进入抽奖</nuxt-link></div> -->
    <div class="box">
      <nuxt-link to="lottery">点击进入抽奖</nuxt-link>
    </div>
    <!-- <img width="100%" src="~assets/lark.png" alt="">
    <img width="100%" src="/public/lark.png" alt=""> -->
  </div>
</template>
<script>
export default {
  // default
  // layout: 'default',
  head: {
    title: '转盘抽奖'
  },
  data() {
    return {
      hi: 'Hello'
    }
  },
  // async asyncData({ req, app }) {
  //   await app.$axios.$post('/api', {
  //     name: 'name',
  //     hi: 'xx'
  //   })
  //   const data = await app.$axios.$get('/api')
  //   const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  //   return { data, server: !!process.server, userAgent }
  // }
}
</script>
<style scoped lang="stylus">
@import '~assets/helper.styl'

h1
  color gray(85)

.box
 text-align center
 padding 10vm 
 padding-top 200px;
</style>
