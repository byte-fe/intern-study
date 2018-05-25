<template>
  <nuxt/>
</template>
<style>
:root {
  --centered: {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  --mainColor: red;
}
</style>
<style lang="stylus">
@import '~assets/reset.styl'

// Note: The content hack may not work well on <img> and other replaced elements, even though it should compute to content: normal; on regular elements. If you find yourself in such a situation, this may be a way out:
img
  content normal !important
:root
  --mainColor red
  --centered
    display flex
    align-items center
    justify-content center
</style>
<script>
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
      ],
      // TODO: reset
      link: [
        // {
        //   rel: 'stylesheet',
        //   href: 'https://fonts.googleapis.com/css?family=Roboto'
        // }
      ]

      // TODO: jsBridge
      // script: [{ src: '/body.js', body: true }]
    }
  }
}
</script>
