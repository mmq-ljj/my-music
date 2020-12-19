<template>
  <!-- 歌单详情页顶部图片 -->
  <div class="detail-top">
    <div class="img-container">
      <img :src="path" alt="" />
      <div class="mask" ref="mask"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      default: "",
      required: true,
    },
  },
  methods: {
    changeMask(opacity) {
      this.$refs.mask.style.opacity = opacity;
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-top {
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
  }
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    background-color: #000;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
</style>