// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './utils/rem'
// import { getToken } from '@/utils/cookieset'
import 'element-ui/lib/theme-chalk/index.css';
import './overall/css/global-style.css'
import './overall/css/iconfont.css'

//  ---- 跨域设置----
// import axios from 'axios'
// Vue.prototype.$axios = axios
// axios.defaults.baseURL = '/api'

Vue.use(ElementUI)
Vue.config.productionTip = false


const whiteList = ['/login'] // 不重定向白名单
//校验token 免登录
router.beforeEach((to, from, next) => {
    // chrome

    document.body.scrollTop = 0

    // firefox

    document.documentElement.scrollTop = 0

    // safari

    window.pageYOffset = 0

    next()
    // console.log(to.matched)
    // 判断是否有登录过
    // if (getToken()) {
    //     // 如果有token从登录页面跳转 直接跳转到首页 /
    //     if (to.path === '/') {
    //         // next({ path: '/' })
    //     } else {
    //         if (to.matched.length === 0) {
    //             next('/404') // 判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
    //         }
    //         next() // 如果匹配到正确跳转
    //     }
    //     // 没有登录
    // } else {
    //     if (whiteList.indexOf(to.path) !== -1) {
    //         next()
    //     } else {
    //         // 还没有登录过 则跳转到登录界面
    //         // next('/login')
    //         if(next('/')){
    //             next();
    //         }else{
    //             if (to.path.slice(1) !== '') {
    //                 if (to.matched.length === 0) {
    //                     router.push({
    //                         path: '/'
    //                     })
    //                 } else {
    //                     router.push({
    //                         path: '/',

    //                     })
    //                 }
    //             } else {
    //                 router.push({
    //                     path: '/'
    //                 })
    //             } 
    //         }
            
    //     }
    // }
})

// 防抖处理-立即执行 
// 释：触发某事件时，一定时间间隔内没有再触发事件时，事件处理函数才会执行一次，如果设定的时间间隔到来之前，又一次触发了事件，就重新开始延时。
const on = Vue.prototype.$on
Vue.prototype.$on = function (event, func) {
  let timer;
  let flag = true;
  let newFunc = func
  if (event == 'click') {
    newFunc = function () {
      if(flag) {
        func.apply(this, arguments)
        flag = false
      }
      clearTimeout(timer)
      timer = setTimeout(function () {
        flag = true
      }, 500)
    }
  }
  on.call(this, event, newFunc)
}
// 节流 多少时长内执行一次  此处为1秒
// 释：当持续触发事件时，有规律的每隔一个时间间隔执行一次事件处理函数。
Vue.prototype.$on = function (event, func) {
  let previous = 0
  let newFunc = func
  if (event === 'click') {
    newFunc = function () {
      const now = new Date().getTime()
      if (previous + 1000 <= now) {
        func.apply(this, arguments)
        previous = now
      }
    }
  }
  on.call(this, event, newFunc)
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
