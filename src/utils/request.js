import axios from 'axios'
import {  Message } from 'element-ui'
import router from '../router/index'

// console.log(window.g.BASE_API)
const service = axios.create({
    baseURL: window.g.BASE_API,
    withCredentials: false,
    timeout: 100000
})
// 在请求前做什么
// if (store.getters.token) {
//     // let each request carry token
//     // ['X-Token'] is a custom headers key
//     // please modify it according to the actual situation
//     config.headers['access_token'] = getToken()
//   }
//   return config
// request interceptor
service.interceptors.request.use(config => {
  //在发送请求之前做什么
    // return configconfig => {
    // const token = store.getters.token
    // if (token) {
    //   config.headers.Authorization = token // 请求头部添加token
    // }
    if(localStorage.toke){
      config.headers['access_token'] = localStorage.toke
      // console.log(localStorage.toke)
    }
    return config
  }, error => {
    console.log(error);
    //对请求错误做些什么
    Promise.reject(error)
})
//添加响应拦截器
service.interceptors.response.use(
  response=>{
    if(response.data.code === 4011 || response.data.code === 4012 || response.data.code === 403){
      // Message.error("用户会话过期请从新登录")
      router.push({
        path: '/'
      })
      return
    }else{
      return response
    }
  },
  error => {
      Message({
          message: error.message,
          type: 'error',
          duration: 5 * 1000
      })
      return Promise.reject(error)
  }
  // response => response,
  // error => {
  //   if(error.response){
  //     switch(error.response.status){
  //       case 403:
  //       Message.error('用户会话过期，请重新登录。')//用户会话过期，请重新登录。
  //       router.replace({
  //         path: '/'
  //       })
  //       break
  //     }
  //     Message({
  //       message: error.message,
  //       type: 'error',
  //       duration: 5 * 1000
  //     })
  //     if (error.message == '户会话过期，请重新登录。'){//用户会话过期，请重新登录。哈哈
  //       router.replace({
  //         path: '/'
  //       })
  //     }
  //   }
  //   return Promise.reject(error)
  // }
)

export default service
