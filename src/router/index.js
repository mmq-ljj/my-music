import Vue from 'vue'
import VueRouter from 'vue-router'
// 注意点：通过 import xxx from xxx的方式加载组件，无论有没有用到组件，都会被加载进来
// import Recommend from '../views/Recommend'
// import Singer from '../views/Singer'
// import Rank from '../views/Rank'
// import Search from '../views/Search'

// 实现Vue组件的按需(异步)加载
const Recommend = (resolve) => {
  import('../views/Recommend').then((module) => {
    resolve(module)
  })
}
const Detail = (resolve) => {
  import('../views/Detail').then((module) => {
    resolve(module)
  })
}
const Singer = (resolve) => {
  import('../views/Singer').then((module) => {
    resolve(module)
  })
}
const Rank = (resolve) => {
  import('../views/Rank').then((module) => {
    resolve(module)
  })
}
const Search = (resolve) => {
  import('../views/Search').then((module) => {
    resolve(module)
  })
}
const Account = (resolve) => {
  import('../views/Account').then((module) => {
    resolve(module)
  })
}


Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/recommend' },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      { path: 'detail/:id/:type', component: Detail }
    ]
  },
  {
    path: '/singer', component: Singer,
    children: [
      { path: 'detail/:id/:type', component: Detail }
    ]
  },
  {
    path: '/rank', component: Rank,
    children: [
      { path: 'detail/:id/:type', component: Detail }
    ]
  },
  { path: '/search', component: Search },
  { path: '/account', component: Account },
]

const router = new VueRouter({
  // mode: 'history', 刷新网页会出现404
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
