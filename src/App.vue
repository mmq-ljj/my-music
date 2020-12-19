<template>
  <div id="app">
    <!-- 头部组件 -->
    <Header></Header>
    <!-- 导航栏组件 -->
    <Tabbar></Tabbar>
    <!-- 路由占位符 导航栏对应的内容 -->
    <router-view></router-view>
    <Player></Player>
  </div>
</template>
 
<script>
// 导入头部 导航栏组件
import Header from "./components/Header";
import Tabbar from "./components/Tabbar";
import Player from "./views/Player";
export default {
  name: "App",
  // 注册组件
  components: {
    Header,
    Tabbar,
    Player,
  },
};
</script>

<style lang="scss" scoped>
@import "assets/css/variable";
.theme {
  position: fixed;
  left: 0;
  bottom: 0;
  button {
    width: 100px;
    height: 100px;
    &:nth-of-type(1) {
      background-color: $background-color-theme;
    }
    &:nth-of-type(2) {
      background-color: $background-color-theme1;
    }
    &:nth-of-type(3) {
      background-color: $background-color-theme2;
    }
  }
}
</style>
