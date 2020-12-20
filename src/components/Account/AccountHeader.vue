<template>
  <!-- 个人中心顶部 -->
  <div class="header" @click="changeTheme">
    <div class="header-left" @click.stop="back"></div>
    <ul class="header-title">
      <li :class="{ active: switchNum === 0 }" @click.stop="switchItem(0)">
        我的喜欢
      </li>
      <li :class="{ active: switchNum === 1 }" @click.stop="switchItem(1)">
        播放历史
      </li>
    </ul>
    <div class="header-right"></div>
  </div>
</template>
<script>
export default {
  name: "AccountHeader",
  //   props: {
  //     title: {
  //       type: String,
  //       default: "",
  //       required: true,
  //     },
  //   },
  data() {
    return {
      themes: ["theme", "theme1", "theme2"],
      index: 0,
      switchNum: 0,
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
    back() {
      window.history.back();
    },
    // 切换我的喜欢和历史播放
    switchItem(num) {
      this.switchNum = num;
      this.$emit("switchItem", num);
    },
  },
};
</script>
<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.header {
  position: relative;
  z-index: 999;
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
    @include bg_img("../../assets/images/back");
  }
  .header-right {
    @include bg_img("../../assets/images/more");
  }
  .header-title {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: bold;
    border: 1px solid #fff;
    border-radius: 10px;
    @include font_size($font_medium);
    @include no-wrap();
    height: 60px;
    margin-top: 20px;
    li {
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      &:nth-of-type(1) {
        border-right: 1px solid #fff;
      }
      &.active {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
  }
}
</style>