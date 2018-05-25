// window.onload = function() {}

//画出转盘
function drawLottery(lottery_index) {
  if (canvas.getContext) {
    var arc = Math.PI / (_lottery.title.length / 2) //根据奖品个数计算圆周角度
    ctx.clearRect(0, 0, w, h) //在给定矩形内清空一个矩形
    ctx.strokeStyle = '#e95455' //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
    ctx.font = '16px Microsoft YaHei' //font 属性设置或返回画布上文本内容的当前字体属性
    for (var i = 0; i < _lottery.title.length; i++) {
      var angle = _lottery.startAngle + i * arc
      ctx.fillStyle = _lottery.colors[i]

      //创建阴影（两者同时使用） shadowBlur:阴影的模糊级数   shadowColor:阴影颜色 【注：相当耗费资源】
      //ctx.shadowBlur = 1;
      //ctx.shadowColor = "#fff";

      ctx.beginPath()
      //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
      ctx.arc(w / 2, h / 2, _lottery.outsideRadius, angle, angle + arc, false)
      ctx.arc(w / 2, h / 2, _lottery.insideRadius, angle + arc, angle, true)
      ctx.stroke()
      ctx.fill()
      ctx.save()

      //----绘制奖品开始----
      //中奖后改变背景色
      if (lottery_index != undefined && i == lottery_index) {
        ctx.fillStyle = _lottery.endColor
        ctx.fill()
      }
      ctx.fillStyle = '#fff'

      var text = _lottery.title[i],
        line_height = 17,
        x,
        y
      x = w / 2 + Math.cos(angle + arc / 2) * _lottery.textRadius
      y = h / 2 + Math.sin(angle + arc / 2) * _lottery.textRadius
      ctx.translate(x, y) //translate方法重新映射画布上的 (0,0) 位置
      ctx.rotate(angle + arc / 2 + Math.PI / 2) //rotate方法旋转当前的绘图
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0) //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
      ctx.restore() //把当前画布返回（调整）到上一个save()状态之前
      //----绘制奖品结束----
    }
  }
}
