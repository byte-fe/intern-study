<template>
<div class="lottery-box">
  <div class="outer-box">
   <img class="title" src="../assets/title.png" />
   <!-- <div class="cicle" id="cicle"></div> -->
    <div class="wheel-main">
        <div class="wheel-pointer-box">
            <div class="wheel-pointer" @click="rotate_handle()" >
                <img class="arrow" src="../assets/arrow.png">
                <img class="oval" src="../assets/Oval 1.png">
                <img class="ovalbg" src="../assets/Ovalbg.png">
            </div>
        </div> 
        <div class="wheel-bg" :style="{transform:rotate_angle,transition:rotate_transition}">
          <div class="prize-list">
            <!-- asdsa -->
            <div class="prize-item"  v-for="(item,index) in prize_list" :key="index">
              <div class="prize-count">
                  {{item.name}}
              </div>
            </div>
          </div>
        </div>
    </div> 
    <div v-if="isshow" class="confirm">恭喜你获得了{{getprize}}</div>
  </div>
</div>
</template>
<script>

export default {
  head: {
    title: '健康词典'
  },
  data() {
    return {
      hi: 'Detail Hello',
      isshow:false,
      toast_control: true,
      click_flag: true,
      showMask:true,
      start_rotating_degree:0,
      rotate_angle: 0, 
      hasPrize: false,
      rotate_angle_pointer: 0, 
      rotate_transition: "transform 6s ease-in-out", 
      click_flag: true, 
      i: 0, 
      data:'',
      prize_list:[],
      num: '',
      getprize: ''
    }
  },
  created() {
    console.log('=====', this.data)
    this.getprize = this.data.num.name
    this.prize_list = this.data.prize_list;
    this.num = this.data.num.id
    // const data = await app.$axios.$get('/api/lottery')
    // console.log
  },
  methods: {
    rotate_handle(){
      this.rotating();
    },
    rotating(index) {
      if(!this.click_flag) return;
      // let that =this;
      var type = 0; 
      var during_time = 5; 
      var random = Math.floor(Math.random() * 7);
      var result_index = index || random; 
      var result_angle = [360,324,288,260,228,198,170,134,98,62,36,0]; 
      var rand_circle = 6; 
      this.click_flag = false; 
      if (type == 0) {
        var rotate_angle =
          this.start_rotating_degree +
          rand_circle * 360 +
          result_angle[this.num-1] -
          this.start_rotating_degree % 360;
        this.start_rotating_degree = rotate_angle;
        console.log('rotate_angle', rotate_angle)
        this.rotate_angle = "rotate(" + rotate_angle + "deg)";
        var that = this;
        setTimeout(function() {
          that.click_flag = true;
          that.game_over(this.i);
          that.goon()
        }, during_time * 1000 + 1500); 
        
      } else {
        //
      }
    },
    goon() {
      this.showMask = true
      this.isshow = true
    },
    game_over() {
      this.hasPrize = this.prize_list[this.i].isPrize
    },
  },
  async asyncData({ req, app }) {
    const data = await app.$axios.$get('/api/lottery')
    return { data }
  }
}
</script>
<style scoped lang="stylus">
@import '~assets/helper.styl'


.box
  retina-border(0 0 1px, solid, #999)
  width 100px
  height 100px
  background #eee
  font-size 50px

.outer-box{
    width 100%
    height 1400px
    padding 100px 20px
    background url('../assets/lottery_bg.jpg')
    background-size cover 
}
.title{
    width 90%
    height 210px
    margin 0 5%
    margin-bottom 100px
}
.wheel-main {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.wheel-pointer-box {
  position: absolute;
  top: 51%;
  width: 12vw;
  height: 12vw;
  z-index: 100;
  transform: translateY(-50%);
}
.wheel-pointer{
    // position relative;
    .arrow {
        width 3vw
        height 3vw
        position absolute
        top -2.767vw 
        left 4.833vw
    }
    .oval{
        width 10vw
        height 10vw
        position absolute
        z-index 22
        left 1vw
        top 1vw

    }
    .ovalbg{
        width 12vw
        height 12vw
        position absolute
    }
}
.wheel-bg {
  width 95vw;
  height 95vw;
  background url('../assets/group.png') no-repeat center top;
  background-size 100%;
  color #fff
  font-weight 500;
  display flex;
  flex-direction column;
  justify-content center;
  align-content center;
  transition transform 3s ease;
}
.circle{
  width 400px
  height 400px
  border-radius 50%
  border 2px solid red
  position absolute
  top: -206%
  left:-196%
}
.prize-list{
  width 100%
  height 100%
  position absolute;
  // background red
}
.prize-list .prize-item {
  position absolute;
  display block;
  margin 0;
  width 300px;
  height 300px;
  color #F44336;
  font-size 4vw;
  line-height 1.4;
  font-weight bold;
  text-align center;
  list-style none;
  left 27.7vw;
  top 6.7vw;
  padding-top 40px;
  transform-origin 50% 100%;
}
.c1{
  top:0;
  left 50%;
}
.prize-list .prize-item:first-child {
  transform rotate(0deg)
}
.prize-list .prize-item:nth-child(2) {
 transform rotate(36deg)
}
.prize-list .prize-item:nth-child(3) {
  transform rotate(75deg)
}
.prize-list .prize-item:nth-child(4) {
  transform rotate(112deg)
}
.prize-list .prize-item:nth-child(5) {
  transform rotate(146deg)
}
.prize-list .prize-item:nth-child(6) {
  transform rotate(180deg)
}
.prize-list .prize-item:nth-child(7) {
 transform rotate(213deg)
}
.prize-list .prize-item:nth-child(8) {
  transform rotate(248deg)
  // transform: rotate(-111deg);
}
.prize-list .prize-item:nth-child(9) {
  transform rotate(283deg)
}
.prize-list .prize-item:nth-child(10) {
 transform rotate(321deg);
  // transform: rotate(-38deg);
}
.mask {
  position fixed;
  display block;
  top 0;
  left 0;
  background rgba(0, 0, 0, 0.6);
  z-index 10000;
  width 100%;
  height 100%
}
.confirm{
  font-weight bold;
  color red
}
.toast{
  position absolute
  top 40%
  left 15%;
  width 500px
  height 500px
  // background 
  background-image url('../assets/modal_bg.png')
  background-size cover 
  z-index:11111
}
</style>
