<template>
  <!-- 播放详情页顶部 -->
  <div class="header">
    <div class="header-left" @click="hiddenNormalPlayer"></div>
    <div class="header-title">
      <h3>{{ currentSong.name }}</h3>
      <p>{{ currentSong.singer }}</p>
    </div>
    <div class="header-right"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "PlayerHeader",
  methods: {
    // 把actions里的setFullScreen方法映射为局部方法
    ...mapActions(["setFullScreen", "setMiniPlayer"]),
    hiddenNormalPlayer() {
      this.setFullScreen(false);
      this.setMiniPlayer(true);
    },
  },
  computed: {
    // 映射当前播放的歌曲
    ...mapGetters(["currentSong"]),
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
  // @include bg_color();
  display: flex;
  justify-content: space-between;
  .header-left,
  .header-right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
  }
  .header-left {
    @include bg_img("../../assets/images/down");
  }
  // .header-right {
  //   @include bg_img("../../assets/images/more");
  // }
  .header-title {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: #fff;
    @include font_size($font_medium);
    @include no-wrap();
  }
}
</style>