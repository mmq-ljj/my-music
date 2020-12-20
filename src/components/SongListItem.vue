<template>
  <ul class="song-list">
    <li
      v-for="value in songs"
      :key="value.id"
      class="item"
      @click="selectMusic(value.id)"
    >
      <!-- <img :src="value.picUrl" alt="" /> -->
      <!-- 图片懒加载 -->
      <img v-lazy="value.picUrl" alt="" />
      <div>
        <h3>{{ value.name }}</h3>
        <p>{{ value.singer }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "SongListItem",
  props: {
    songs: {
      type: Array,
      default: [],
      required: true,
    },
  },
  methods: {
    // 把actions里的setFullScreen方法映射为局部方法
    ...mapActions(["setFullScreen", "setSongDetail"]),
    selectMusic(id) {
      this.setFullScreen(true);
      this.setSongDetail([id]);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/mixin";
@import "../assets/css/variable";
.song-list {
  width: 100%;
  overflow: hidden;
  .item {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    img {
      width: 150px;
      height: 150px;
      border-radius: 20px;
      margin-right: 20px;
    }
    div {
      width: 70%;
      h3 {
        @include font_size($font_large);
        @include font_color();
        @include no_wrap();
      }
      p {
        @include font_size($font_samll);
        margin-top: 20px;
        @include font_color();
        @include no_wrap();
        opacity: 0.6;
      }
    }
  }
}
</style>