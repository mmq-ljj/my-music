import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './assets/css/base.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import VConsole from 'vconsole'
import Loading from './plugin/loading/index'
import MetaInfo from 'vue-meta-info'
import { Swipe, SwipeItem } from 'vant';

Vue.use(Swipe);
Vue.use(SwipeItem);

Vue.use(MetaInfo)
// 注意点: 如果想通过use的方式来注册组件, 那么必须先将组件封装成插件
Vue.use(Loading, {
  title: '喵喵正在加载中...'
})

// const vconsole = new VConsole();
// Vue.use(vconsole)
// 图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  // 可以通过配置loading来设置图片还未加载好之前的站位图片
  loading: require('./assets/images/loading.png')
})

// 导入axios这个包
import axios from 'axios'
// 配置请求更路径
axios.defaults.baseURL = 'http://127.0.0.1:3000/'
// 请求超时时间
axios.defaults.timeout = 5000
// 把这个包挂载到vue的原型对象上
Vue.prototype.$http = axios

let count = 0
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  count++
  Vue.showLoading()
  return config
}, function (error) {
  // 对请求错误做些什么
  Vue.hiddenLoading()
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  count--
  if (count === 0) {
    Vue.hiddenLoading()
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  Vue.hiddenLoading()
  return Promise.reject(error)
})

Vue.use(ElementUI)

fastclick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App), //把APP这个组件推到index.html显示,
  // 以下代码是安装了预渲染的插件之后自动添加的
  mounted: () => document.dispatchEvent(new Event("x-app-rendered")),
}).$mount('#app')
