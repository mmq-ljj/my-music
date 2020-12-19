import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './assets/css/base.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 全局引入swiper
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/swiper-bundle.css'
// Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

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
// 把这个包挂载到vue的原型对象上
Vue.prototype.$http = axios
Vue.use(ElementUI)


fastclick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App) //把APP这个组件推到index.html显示
}).$mount('#app')
