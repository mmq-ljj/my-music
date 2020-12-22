<template>
  <Header class="header">
    <div slot="left" class="header-left"></div>
    <p slot="center" class="header-title">喵喵音乐</p>
    <div slot="right" class="header-right" @click.stop="accountClick"></div>
  </Header>
</template>

<script>
import Header from "./Header";
export default {
  components: {
    Header,
  },
  methods: {
    // 点开展开个人中心的方法
    accountClick() {
      this.$router.push("/account");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/variable";
@import "../assets/css/mixin";
.header {
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