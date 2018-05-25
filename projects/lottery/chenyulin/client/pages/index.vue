<template>
    <div class='main'>
    <div class="title">
      <img src="~assets/group-2@3x.png">
    </div>
    <div class="lottery-box">
      <ul id="iluminationbox" :class="illumination">
        <li v-for="(item,index) in new Array(10)" :key="index"></li>
      </ul>
      <ul class="lottery-sector">
        <li v-for="(item,index) in gifts" :key="index" v-bind:style="{backgroundColor:bgc(index),transform:transformStyle(index)}"></li>
      </ul>
      <ul class="lottery-gift" >
        <li v-for="(item,index) in gifts" :key="index" v-bind:style="{transform: transformGift(index)}">{{item}}</li>
      </ul>
    </div>
    <div class='pointer' @click="chou">
      <img src='~assets/2.png'>
    </div>
  <div class='result'>{{result}}</div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  head: {
    title: '抽奖'
  },
  data() {
    return {
      illumination: 'illumination1',
      gifts: [],
      deg: 0,
      result: ''
    }
  },
  mounted: function() {
    axios
      .get('api/lottery/lottery')
      .then(response => {
        let n = parseInt(response.data)
        const arr = []
        response.data.data.forEach((element, index, array) => {
          arr[index] = response.data.data[index].name
        })
        this.gifts = arr
        console.log(this.gifts)
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  methods: {
    bgc: function(index) {
      let backgroundColor
      if (index % 2 == 0) {
        backgroundColor = 'rgb(254, 246, 225)'
      } else {
        backgroundColor = '#fff'
      }
      return backgroundColor
    },
    transformStyle: function(index) {
      let angle = 360 / this.gifts.length
      let skewAngel = 90 - angle
      return `rotate(${index * angle}deg) skew(${skewAngel}deg)`
    },
    transformGift: function(index) {
      let angle = 360 / this.gifts.length
      return `rotate(${360 / (2 * this.gifts.length) - 90 + angle * index}deg)`
    },
    async chou() {
      let myPanel = document.getElementsByClassName('lottery-box')[0]
      let myMain = document.querySelector('.main')
      myMain.style.height = document.querySelector('body').height
      this.illumination = 'illumination2'
      myPanel.style.transition = 'none'
      myPanel.style.transform = 'rotate(0)'
      await axios
        .get('api/lottery/lottery')
        .then(response => {
          let n = parseInt(response.data.result)
          let myResult = ''
          this.result = '结果马上出来～'
          let deg = 0 //实际要转的角度
          window.setTimeout(() => {
            this.illumination = 'illumination1'
          }, 7000)
          switch (n) {
            case 0: //给指针定到转多少度时是安慰奖
              deg += [0, 144, 252][Math.floor(Math.random() * 3)] + 72
              myResult = '😄谢谢参与，也许好运就在下次哦😄'
              break
            case 1: //给指针定到转多少度时是一等奖（100元话费）
              deg = 180 + 72
              myResult = '😊牛逼了！恭喜获得：100元话费😊'
              break
            case 2: //给指针定到转多少度时是二等奖（1元现金）
              deg = 36 * 11 + 72
              myResult = '🌹恭喜获得：1元现金🌹'
              break
            case 3: //给指针定到转多少度时是三等奖（10元话费）
              deg = -36 * 2 + 72
              myResult = '✨恭喜获得：10元话费✨'
              break
            case 4:
              deg = -36 + 72
              myResult = '✨哎呦不错哦，恭喜获得：50积分✨'
              break
          }
          window.setTimeout(() => {
            this.result = myResult
          }, 5000)
          //使指针最后不指在中间
          this.deg = deg + 1080 - 360 + (Math.random() - 0.5) * 32
          myPanel.style.transition = '5s ease'
          myPanel.style.transform = 'rotate(' + this.deg + 'deg)'
        })
        .catch(function(error) {
          console.log(error)
        })
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
<style>
html,
body,
#__nuxt,
#__layout {
  width: 100%;
  height: 100%;
}
</style>

<style scoped lang="stylus">
@keyframes twinkling {
  0% {
    background: #fefdfc;
    border: 1px solid #fefdfc;
  }

  25% {
    background: #fefdfc;
    border: none;
    box-shadow: 0px 0px 0 2px #eb6f21;
  }

  75% {
    background: #fefe00;
    border: 1px solid #fefe00;
  }

  100% {
    background: #fefe00;
    border: none;
    box-shadow: 0px 0px 0 2px #eb6f21;
  }
}
@keyframes twinkling2 {
  0% {
    background: #fefdfc;
    border: 1px solid #fefdfc;
  }

  25% {
    background: #fefdfc;
    border: none;
    box-shadow: 0px 0px 0 2px yellow;
  }

  75% {
    background: #eb6f21;
    border: 0 solid #eb6f21;
  }

  100% {
    background: #eb6f21;
    border: none;
    box-shadow: 0px 0px 0 2px yellow;
  }
}

.main
  position: relative;
  overflow: hidden;
  width: auto;
  height: 100%;
  background-color: rgb(215, 73, 73);
  background: radial-gradient(white, red);
  .title
    position: fixed;
    font-size: 100px;
    top: 10%;
    color: white;
    width: 80vw;
    left: 50%;
    margin-left: -40vw;
    font-style: italic;
  .lottery-box
    position: absolute;
    left: 2.5vw;
    top: 65vw;
    border-radius: 50%;
    border: 15px rgb(193, 56, 32);
    width: 720px;
    height: 720px;
    background-color: rgb(193, 56, 32);
    transition: 5s ease;
  .pointer 
    position: absolute;
    top: 98vw;
    left: 40vw;
    width: 150px;
    height: 183px;
    z-index: 105;
  .result 
    position: fixed;
    color: white;
    font-size: 40px;
    top: 93%;
    left: 30px;

#iluminationbox,.illumination1 
  list-style: none;
  for row in 1..10 
    li:nth-child({row}) 
      transform: rotate((row - 1) * 36 deg) translateY(-45vw);
  li
    display: block;
    width: 30px;
    height: 30px;
    background: #fff;
    position: absolute;
    top: 49%;
    left: 48.5%;
    margin: -4px 0 0 -4px;
    border-radius: 15px;

.illumination2 li:nth-child(even) 
  animation: twinkling 1.2s infinite ease-in-out;

.illumination2 li:nth-child(odd)
  animation: twinkling2 1.2s infinite ease-in-out;

.lottery-sector 
  list-style : none;
  width :630px;
  height: 630px;
  position: absolute;
  overflow: hidden;
  top: 45px;
  left: 45px;
  border-radius: 50%;
  li
    margin: 0;
    width: 315px;
    height: 315px;
    position: absolute;
    transform-origin: 100% 100%;

.lottery-gift 
  list-style: none;
  width: 630px;
  height: 630px;
  position: absolute;
  top: 4.8vw;
  left: 45px;
  li
    top: 28px;
    // transform: rotate((36 * (item - 1))deg);
    position: absolute;
    display: block;
    margin: 0;
    width: 10vw;
    height: 300px;
    color: #F44336;
    font-size: 4vw;
    line-height: 1.4;
    font-weight: bold;
    text-align: center;
    list-style: none;
    left: 36.7vw;
    padding-top: 40px;
    transform-origin: 50% 100%;

img
  height: 100%;
  width: 100%;
</style>