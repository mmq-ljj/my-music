<template>
  <div class="header" @click="changeTheme">
    <div class="header-left"></div>
    <p class="header-title">喵喵音乐</p>
    <div class="header-right" @click.stop="accountClick"></div>
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
    // 点开展开个人中心的方法
    accountClick() {
      this.$router.push("/account");
    },
  },
};
</script>
<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";
.header {
  // position: relative;
  // z-index: 999;
  width: 100%;
  height: 100px;
  //   background-color: red;
  @include bg_color();
  display: flex;
  justify-content: space-between;
  .header-left,
  .header-right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
  }
  .header-left {
    @include bg_img("../assets/images/logo");
  }
  .header-right {
    @include bg_img("../assets/images/account");
  }
  .header-title {
    line-height: 100px;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium);
  }
}
</style>

