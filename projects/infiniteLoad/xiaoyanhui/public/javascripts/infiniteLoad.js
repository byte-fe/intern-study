;(function(window) {
  //检查underscore插件
  if (!window._) {
    throw new Error('请在使用该模块前引入underscore.js插件：')
  }
  //需要用到的变量声明:
  let observerDom = undefined //监视的页尾栏
  let endDom = null //如果是下拉刷新，在document最后面加一个dom,用来调节滚动
  let newData = [] //缓存每一次新加载的数据
  let newFrament = null //缓存每一次新加载的dom片段
  let clientWidth = window.innerHeight || document.documentElement.clientHeight
  let rootDom = document.documentElement
  rootDom.style.overflowY = 'auto'
  let page = 0 //加载的次数
  let liObserver = new IntersectionObserver(visiableCallBack) //插入的子元素的监视
  let inputParams = {} //外面输入的参数
  //通用函数
  function queryAll(string) {
    return Array.from(document.querySelectorAll(string))
  }

  //函数
  function visiableCallBack(entries) {
    let index = 0 //可见时候li在所有li中的index
    let content = '' //li对应的数据
    entries.forEach(item => {
      index = item.target.dataset.index
      if (item.intersectionRatio <= 0) {
        item.target.style.visibility = 'hidden'
      } else {
        item.target.style.visibility = 'visible'
      }
    })
  }

  //页尾栏可见触发的函数
  async function load() {
    newData = await inputParams.cb.call(window, {
      limit: inputParams.options.limit,
      offset: inputParams.options.offset
    })
    inputParams.options.limit++
    inputParams.options.offset = page * inputParams.options.limit
    page++
    updateUI(newData)
  }

  //渲染函数
  function updateUI(data) {
    let contentDom = queryAll(inputParams.fatherString)[0]
    newFrament = document.createDocumentFragment()
    data.forEach(item => {
      let li = document.createElement(inputParams.childString || 'li')
      let compiled = _.template(inputParams.template)
      let innerHtml = compiled(item)
      li.innerHTML = innerHtml
      newFrament.appendChild(li)
      liObserver.observe(li)
    })
    if (inputParams.scollDirection === 'down') {
      contentDom.innerHTML = ''
      contentDom.appendChild(newFrament)
      rootDom.scrollTop = endDom.offsetTop - clientWidth
    } else {
      contentDom.appendChild(newFrament)
    }
  }

  //生成一个函数
  function infiniteLoad({
    domString,
    fatherString,
    childString,
    template,
    options,
    cb,
    scollDirection = 'up'
  }) {
    inputParams = {
      domString,
      childString,
      template,
      options,
      fatherString,
      cb,
      scollDirection
    }
    //解决触发观察函数的dom

    if (!domString) {
      //生成观察的dom
      observerDom = document.createElement('div')
      observerDom.setAttribute('id', 'XYHSentinels')
      observerDom.innerHTML = '加载中......'
      observerDom.style.textAlign = 'center'
      if (scollDirection === 'down') {
        document.body.prepend(observerDom)
        endDom = document.createElement('div')
        document.body.appendChild(endDom)
      } else {
        document.body.appendChild(observerDom)
      }
    } else {
      observerDom = queryAll(domString)[0]
    }

    let intersectionObserver = new IntersectionObserver(function(entries) {
      // 如果不可见，就返回
      if (entries[0].intersectionRatio <= 0) return
      load()
    })

    // 开始观察
    intersectionObserver.observe(observerDom)
    return this
  }
  if (!window.infiniteLoad) window.infiniteLoad = infiniteLoad
  else throw new Error('window上已经有插件infiniteLoad')
})(window)
