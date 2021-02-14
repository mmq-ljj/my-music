<template>
  <!-- 轮播图 -->
  <div class="clearfix">
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      @change="onChange"
    >
      <van-swipe-item
        v-for="value in banners"
        :key="value.bannerId"
        class="item"
      >
        <a :href="value.url">
          <img :src="value.pic" alt="" />
        </a>
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/4</div>
      </template>
      <div style="clear: both"></div>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "Banner",
  data() {
    return {
      current: 0,
    };
  },
  props: {
    banners: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
  },
};
</script>

<style scoped lang="scss">
.my-swipe .van-swipe-item {
  float: left;
  img {
    width: 100%;
    height: 300px;
  }
}
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
// .clearfix::after {
//   content: "";
//   display: block;
//   clear: both;
// }
</style>

