<template>
  <!-- 歌单详情页底部歌单列表 -->
  <ul class="detail-bottom" @click="selectAllMusic">
    <li class="bottom-top">
      <div class="bottom-icon"></div>
      <div class="bottom-title">播放全部</div>
    </li>
    <!-- 渲染出来的每一首歌 -->
    <li
      v-for="value in playlist"
      :key="value.id"
      class="item"
      @click="selectMusic(value.id)"
    >
      <h3>{{ value.name }}</h3>
      <p>{{ value.al.name }}-{{ value.ar[0].name }}</p>
    </li>
  </ul>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "DetailBottom",
  props: {
    playlist: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  methods: {
    // 把actions里的setFullScreen方法映射为局部方法
    ...mapActions(["setFullScreen", "setSongDetail"]),
    selectMusic(id) {
      // 通过 this.$store.dispatch('方法') 触发 vuex里 actions里的方法
      // this.$store.dispatch("setFullScreen", true);
      this.setFullScreen(true);
      this.setSongDetail([id]);
    },
    selectAllMusic() {
      this.setFullScreen(true);
      let ids = this.playlist.map((item) => {
        return item.id;
      });
      console.log(ids);
      this.setSongDetail(ids);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.detail-bottom {
  width: 100%;
  li {
    width: 100%;
    height: 100px;
    padding: 20px;
    box-sizing: border-box;
    @include bg_sub_color();
    border-bottom: 1px solid #ccc;
  }
  .bottom-top {
    display: flex;
    align-items: center;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    .bottom-icon {
      width: 60px;
      height: 60px;
      @include bg_img("../../assets/images/small_play");
      margin-right: 20px;
    }
    .bottom-title {
      @include font_color();
      @include font-size($font_large);
    }
  }
  .item {
    h3 {
      @include font-color();
      @include font-size($font_medium);
    }
    p {
      @include font-color();
      @include font-size($font_samll);
      margin-top: 10px;
      opacity: 0.8;
    }
  }
}
</style>