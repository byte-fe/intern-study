<template>
  <div>
    <h1>{{hi}} {{data.hello}}</h1>
    <h2>SSR: {{server}}</h2>
    <p>{{userAgent}}</p>
    <div class="box">
      box
    </div>
    <div>GOTO: <nuxt-link to="/">index</nuxt-link> / detail</div>
  </div>
</template>
<script>
export default {
  // default
  // layout: 'default',
  head: {
    title: '健康词典'
  },
  data() {
    return {
      hi: 'Detail Hello'
    }
  },
  async asyncData({ req, app }) {
    await app.$axios.$post('/api', {
      name: 'name',
      hi: 'xx'
    })
    const data = await app.$axios.$get('/api')
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { data, server: !!process.server, userAgent }
  }
}
</script>
<style scoped lang="stylus">
@import '~assets/helper.styl'

h1
  color gray(85)

.box
  retina-border(0 0 1px, solid, #999)
  width 100px
  height 100px
  background #eee
  font-size 50px
</style>
