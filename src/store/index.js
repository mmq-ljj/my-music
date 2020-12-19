import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  // 在实际开发过程中会把 state mutations actions 这些单独放在一个文件里 导入进来
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters

  // state: 用于保存全局共享的数据
  /*  state: {
     isFullScreen: false
   },
   //  mutations: 用于修改全局共享的数据的方法
   mutations: {
     // state这个参数就是上面用于保存全局共享的数据
     // flag 传递其他额外的参数
     changeFullScreen(state, flag) {
       state.isFullScreen = flag
     }
   },
   //  actions: 用于保存触发 mutations 中(修改全局共享数据)的方法 的方法
 
   // 以后只需要调用 actions 的  setFullScreen 方法 这个方法就会 自动触发 mutations 里的 changeFullScreen方法
   // 在changeFullScreen方法 中 就会修改 保存全局共享的数据
   actions: {
     // 第一个参数 { commit } 
     // flag 传递其他额外的参数
     setFullScreen({ commit }, flag) {
       // 调用commit 触发mutations 里面那个一方法
       commit('changeFullScreen', flag)
     }
   },
   // 获取全局共享的数据
   getters: {
     isFullScreen(state) {
       return state.isFullScreen
     }
   }, */
  // modules: {
  // }
})
