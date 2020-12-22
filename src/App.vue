<template>
  <div id="app">
    <!-- 头部组件 -->
    <MainHeader></MainHeader>
    <!-- 导航栏组件 -->
    <Tabbar></Tabbar>
    <!-- keep-alive 缓存数据不常发生变化的组件 -->
    <keep-alive include="Singer,Search">
      <!-- 路由占位符 导航栏对应的内容 -->
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>
 
<script>
// 导入头部 导航栏组件
import MainHeader from "./components/MainHeader";
import Tabbar from "./components/Tabbar";
import Player from "./views/Player";
export default {
  name: "App",
  // 注册组件
  components: {
    MainHeader,
    Tabbar,
    Player,
  },
};
</script>

<style lang="scss" scoped>
</style>
