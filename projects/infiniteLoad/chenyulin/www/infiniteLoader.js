;(function(win, doc) {
  let defaultSettings = {
    container: '#tpl',
    myinterface: '/load',
    dataList: '',
    loadingContainer: '#result',
    loadingContent: "<div id='loadingLi' class='loading'>加载中...</div>",
    loadingID: '#loadingLi'
  }

  function infiniteLoader(options) {
    let self = this
    if (!options) {
      throw new Error('请传入配置参数')
    }
    self = Object.assign(self, defaultSettings, options)
    self.container =
      doc.querySelector(self.container) || doc.querySelectorAll(self.container)
    self.loadingContainer =
      doc.querySelector(self.loadingContainer) ||
      doc.querySelectorAll(self.loadingContainer)
    self.myLoad()
  }

  infiniteLoader.prototype = {
    myLoad: function() {
      let self = this
      let fetching = false
      let page = 1
      let slideCache = []
      let lastScrollY = window.pageYOffset
      let scrollY = window.pageYOffset
      let innerHeight
      let topViewPort
      let bottomViewPort
      let idflag = 0
      function isVisible(id) {
        let offTop
        let offsetHeight
        let data
        let node

        // 设置该节点，并且设置节点属性：node，offTop，offsetHeight
        node = document.getElementById(id)
        // offsetHeight是自身元素的高度
        offsetHeight = parseInt(node.offsetHeight)
        // 元素的上外缘距离最近采用定位父元素内壁的距离
        offTop = parseInt(node.offsetTop)

        if (offTop + offsetHeight > topViewPort && offTop < bottomViewPort) {
          return true
        } else {
          return false
        }
      }

      /**
       * 更新DOM缓存
       **/
      function updateItemCache(node) {
        let list = node.querySelectorAll('.slide')
        let len = list.length
        slideCache = []
        let obj
        for (let i = 0; i < len; i++) {
          obj = {
            node: list[i],
            img: list[i].querySelector('.img')
          }
          obj.img.src = obj.img.getAttribute('data-src')
          slideCache.push(obj)
        }
      }

      /**
       * 动态加载内容
       **/
      function fetchContent() {
        if (self.loadingContainer) {
          let Loading = document.querySelector(self.loadingID)
          if (!Loading) {
            let result = self.loadingContainer
            result.innerHTML = self.loadingContent
          }
        }
        if (fetching) {
          return
        } else {
          fetching = true
        }
        // 如果用数据接口的方式获取数据
        if (self.myinterface) {
          axios
            .get(self.myinterface)
            .then(function(result) {
              let dataList = result.data.data
              let len = dataList.length
              let ulContainer = document.getElementById('expList')
              let frag = document.createElement('div')
              frag.setAttribute('id', idflag++)
              frag.setAttribute('class', 'father')

              let tpl = self.container.innerHTML
              frag.innerHTML = template(tpl, { dataList })
              ulContainer.appendChild(frag)

              // 更新缓存
              updateItemCache(frag)
              // 已经拉去完毕，设置标识为true
              fetching = false
              // 强制触发
              handleScroll(null, true)
              page++
            })
            .catch(function(error) {
              console.log(error)
            })
        }
      }

      /**
       * 懒加载实现
       **/
      function handleDefer() {
        // 获取dom缓存
        let list = slideCache
        // 对于遍历list里的每一项，都使用一个变量，而不是在循环内部声明。节省内存，把性能高效，做到极致。
        let thisImg
        for (let i = 0, len = list.length; i < len; i++) {
          thisImg = list[i].img

          let deferSrc = list[i].img.src
          if (isVisible(list[i].node.parentNode.id)) {
            // 这个函数是图片onload逻辑
            let handler = function() {
              if (thisImg) {
              }
              let node = thisImg
              let src = deferSrc
              return function() {
                node.src = src
                node.style.opacity = 1
              }
            }
            let img = new Image()
            img.onload = handler()
            img.src = list[i].img.src
          }
        }
      }

      /**
       * 处理滚动
       **/
      function handleScroll(e, force) {
        // 如果时间间隔内，没有发生滚动，且并未强制触发加载，则do nothing，再次间隔100毫秒之后查询
        if (!force && lastScrollY === window.scrollY) {
          window.setTimeout(handleScroll, 100)
          return
        } else {
          // 更新文档滚动位置
          lastScrollY = window.scrollY
        }
        scrollY = window.scrollY
        // 浏览器窗口的视口（viewport）高度赋值
        innerHeight = window.innerHeight
        // 计算isVisible上下阈值
        topViewPort = scrollY - 1000
        bottomViewPort = scrollY + innerHeight + 600

        // 判断是否需要加载
        // document.body.offsetHeight;返回当前网页高度
        if (window.scrollY + innerHeight + 200 > document.body.offsetHeight) {
          fetchContent()
        }
        // 实现懒加载
        handleDefer()
        window.setTimeout(handleScroll, 100)
      }
      window.setTimeout(handleScroll, 100)
      fetchContent()
    }
  }
  win.infiniteLoader = infiniteLoader
})(window, document)
