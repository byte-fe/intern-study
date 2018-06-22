<template>
  <div class="wrap">
    <img src="@/assets/group-2.png"
      class="logo">
    <img src="@/assets/group@3x.png"
      class="begin"
      @click="beginLottery">
    <div class="text-center roll">
      <!--转盘层的canvas-->
      <canvas id="canvas"
        width="1200"
        height="1200"
        class="canvas"
        ref="canvas"></canvas>
      <!--指针所在的canvas-->
      <canvas id="canvas2"
        width="1200"
        height="1200"
        class="canvas"
        ref="canvas2"></canvas>
    </div>
    <p class="description">{{description}}</p>
  </div>
</template>

<script>
// import '~/utils/index.js'
import axios from 'axios'
export default {
  layout: 'mobileAward',
  data() {
    var colors = ['#fff', '#fef4dd']
    return {
      description: '恭喜您获得:',
      awardItems1: [
        { name: '50元积分', color: colors[0] },
        { name: '10元话费', color: colors[1] },
        { name: '谢谢参与', color: colors[0] },
        { name: '50元积分', color: colors[1] },
        { name: '谢谢参与', color: colors[0] },
        { name: '100元话费', color: colors[1] },
        { name: '50积分', color: colors[0] },
        { name: '谢谢参与', color: colors[1] },
        { name: '100元话费', color: colors[0] },
        { name: '谢谢参与', color: colors[1] }
      ],
      sector: null,
      hand: null,
      canvas: null,
      canvas2: null,
      width: 1200,
      height: 1200
    }
  },
  computed: {
    awardItems: function() {
      var colors = ['#fff', '#fef4dd']
      let newItems = this.awardItems0.map((v, index) => {
        v.color = colors[index % 2]
        return v
      })
      return newItems.concat(newItems, newItems)
    }
  },
  methods: {
    //绘制转盘
    paintName(data) {
      var len = data.length
      var angle = Math.PI * 2 / len
      for (var i = 0; i < data.length; i++) {
        var item = data[i]
        this.sector.beginPath()
        this.sector.moveTo(this.width / 2, this.height / 2)
        this.sector.lineTo(this.width - 50, this.height / 2)
        this.sector.arc(
          this.width / 2,
          this.height / 2,
          this.height / 2 - 50,
          0,
          angle
        )
        this.sector.lineTo(this.width / 2, this.height / 2)
        this.sector.fillStyle = item.color
        this.sector.fill()
        this.sector.translate(600, 600) // 设置原点为画布中心
        this.sector.rotate(angle)
        this.sector.translate(-600, -600) // 恢复画布中心到（0，0）
        this.sector.save()
        //绘制文字
        this.sector.translate(900, 600)
        this.sector.font = '70px Georgia'
        // this.sector.textAlign = 'center'
        // this.sector.textBaseline = 'middle'
        this.sector.fillStyle = '#c93e2c'
        this.sector.fillText(item.name, -80, -60)
        // this.sector.translate(-1000, -600)
        this.sector.restore()
      }
    },
    beginLottery() {
      axios.get('/api/award/select').then(res => {
        let selectedIndex = res.data.selectedIndex
        // let selectedIndex = 0
        // console.log('这次抽中的是:', selectedIndex)
        let angleInterval = Math.PI * 2 / this.awardItems.length
        let stopBeginAngle = selectedIndex * angleInterval
        let anglePLus =
          stopBeginAngle -
          Math.min(0.9, Math.max(0.1, Math.random())) * angleInterval
        let totalS =
          2 * Math.PI * 10 +
          anglePLus +
          3 * Math.PI / 2 +
          selectedIndex * angleInterval * 2
        let a0 = 4 * totalS / (3000 * 3000)
        this.go(a0, selectedIndex)
      })
    },
    go(a0, selectedIndex) {
      // this.sector.setTransform(
      //   Math.cos(0),
      //   Math.sin(0),
      //   -1 * Math.sin(0),
      //   Math.cos(s),
      //   600 - Math.cos(0) * 600 + Math.sin(0) * 600,
      //   600 - Math.sin(0) * 600 - Math.cos(0) * 600
      // )
      this.paintName(this.awardItems)
      var time = 3000
      var time1 = time
      var ht = time / 2
      // var a0 = (Math.random() + 5) / 200000
      var clock = 20
      var s = 0
      var interval = setInterval(() => {
        this.paintLamp(this.awardItems)
        var a = time >= ht ? a0 : -a0
        var v = time >= ht ? a * (time1 - time) : a0 * ht + a * (ht - time)
        // console.log('v:', v)
        s += v * clock
        // console.log('s:', s)
        // this.sector.translate(600, 600)
        // this.sector.rotate(Math.PI / 180 * s)
        // this.sector.translate(-600, -600)
        this.sector.setTransform(
          Math.cos(s),
          Math.sin(s),
          -1 * Math.sin(s),
          Math.cos(s),
          600 - Math.cos(s) * 600 + Math.sin(s) * 600,
          600 - Math.sin(s) * 600 - Math.cos(s) * 600
        )
        this.sector.clearRect(0, 0, 1200, 1200)
        this.paintName(this.awardItems)
        time -= clock
        if (time == 0) {
          // let angleInterval = Math.PI * 2 / this.awardItems.length
          // let stopBeginAngle =
          //   (this.awardItems.length / 3 * 2 + index) * angleInterval
          // let remain = s % (Math.PI * 2)
          // if (stopBeginAngle < remain < stopBeginAngle + angleInterval) {
          //   window.clearInterval(interval)
          // }
          window.clearInterval(interval)
          window.setTimeout(() => {
            this.paintLamp(this.awardItems)
          }, 1000)
          window.setTimeout(() => {
            this.paintLamp(this.awardItems)
          }, 1500)
          window.setTimeout(() => {
            this.paintLamp(this.awardItems)
          }, 2000)
          this.description = `恭喜您获得:  ${
            this.awardItems[selectedIndex].name
          }`
        }
      }, clock)
    },
    paintLamp(data) {
      var len = data.length
      var angle = Math.PI * 2 / len
      let colorLamps = ['#0ff', '#0f0', 'yellow', '#00f']
      let colorLamp = colorLamps[Math.floor(Math.random() * colorLamps.length)]
      this.hand.save()
      data.forEach(item => {
        this.hand.translate(600, 600)
        this.hand.beginPath() // 设置原点为画布中心
        this.hand.arc(
          this.width / 2 - 40,
          (this.width / 2 - 50) * Math.sin(angle / 2),
          25,
          0,
          Math.PI * 2
        )
        this.hand.fillStyle = colorLamp
        this.hand.fill()
        // this.hand.fillStyle = item.color
        this.hand.rotate(angle)
        this.hand.translate(-600, -600) // 恢复画布中心到（0，0）
      })
      this.hand.restore()
    }
  },
  mounted: function() {
    this.canvas = this.$refs.canvas //转盘所在画布
    this.canvas2 = this.$refs.canvas2 //指针所在画布
    // this.$refs.canvas.style.width = this.$refs.canvas2.style.width = '100%'
    // this.$refs.canvas.style.height = this.$refs.canvas2.style.height = '100%'
    // this.canvas.width = this.canvas2.width = 1200
    // this.canvas.height = this.canvas2.height = 1200
    this.sector = canvas.getContext('2d') //每一个区域块
    this.hand = canvas2.getContext('2d') //灯泡
    this.width = canvas.width
    this.height = canvas.height
    this.paintName(this.awardItems)
    this.paintLamp(this.awardItems)
    // this.hand.fillStyle = '#f00'
    // this.hand.fillRect(600 - 5, 50, 10, 600)
    // this.hand.arc(this.weight / 2, this.height / 2, 30, 0, Math.PI * 2)
    // this.hand.fill()
    // this.go()
    CanvasRenderingContext2D.prototype.wrapText = function(
      text,
      x,
      y,
      maxWidth,
      lineHeight
    ) {
      if (
        typeof text != 'string' ||
        typeof x != 'number' ||
        typeof y != 'number'
      ) {
        return
      }
      var context = this
      var canvas = context.canvas

      if (typeof maxWidth == 'undefined') {
        maxWidth = (canvas && canvas.width) || 300
      }
      if (typeof lineHeight == 'undefined') {
        lineHeight =
          (canvas && parseInt(window.getComputedStyle(canvas).lineHeight)) ||
          parseInt(window.getComputedStyle(document.body).lineHeight)
      }
      // 字符分隔为数组
      var arrText = text.split('')
      var line = ''

      for (var n = 0; n < arrText.length; n++) {
        var testLine = line + arrText[n]
        var metrics = context.measureText(testLine)
        var testWidth = metrics.width
        if (testWidth > maxWidth && n > 0) {
          context.fillText(line, x, y)
          line = arrText[n]
          y += lineHeight
        } else {
          line = testLine
        }
      }
      context.fillText(line, x, y)
    }
  },
  async asyncData({ app }) {
    let data = await app.$axios.$get('/api/award/award')
    return { awardItems0: data.award }
  }
}
</script>
<style lang="stylus">
.wrap
  position relative
  width 750px
  height 1332px
  background radial-gradient(closest-corner at 50% 60%,white 1%, #cb1e1e 65%)
.logo
  width 602px
  height 244px
  position absolute
  top 119px
  left 82px
.begin
  width 136px
  height 168px
  position absolute
  top 706px
  left 306px
  z-index 3
.roll
  width 662px
  height 662px
  position absolute
  top 463px
  left 45px
  background-color red
  border 3px red solid
  border-radius 331px
.canvas
  width 100%
  height 100%
  position absolute
  top 0
  left 0
.text-center
  text-align center
.description
  position absolute
  top 1240px
  left 43px
  font-family: PingFangSC;
  font-size: 32px;
  font-weight normal;
  font-style normal;
  font-stretch normal;
  line-height normal;
  letter-spacing normal;
  color: #ffffff;
</style>
