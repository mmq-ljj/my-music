<template>
  <!-- <div class="header" @click="changeTheme">
    <div class="header-left"></div>
    <p class="header-title">喵喵音乐</p>
    <div class="header-right" @click.stop="accountClick"></div>
  </div> -->
  <div class="header" @click="changeTheme">
    <!-- 注意点：不能直接给插槽设置样式(class) -->
    <div class="left"><slot name="left">左边</slot></div>
    <slot name="center">中间</slot>
    <div class="right"><slot name="right">右边</slot></div>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      themes: ["theme", "theme1", "theme2"],
      index: 0,
    };
  },
  methods: {
    // 点击头部切换主题(背景颜色)
    changeTheme() {
      this.index++;
      if (this.index >= this.themes.length) {
        this.index = 0;
      }
      document.documentElement.setAttribute(
        "data-theme",
        this.themes[this.index]
      );
    },
  },
};
</script>
<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";
.header {
  width: 100%;
  height: 100px;
  @include bg_color();
  display: flex;
  justify-content: space-between;
  .left,
  .right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
    * {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

