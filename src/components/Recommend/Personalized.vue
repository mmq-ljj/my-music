<template>
  <!-- 推荐歌单组件 -->
  <div class="Personalized">
    <!-- 推荐歌单标题 -->
    <div class="Personalized-top">
      <h3>{{ title }}</h3>
    </div>
    <!-- 推荐歌单的内容 -->
    <div class="Personalized-list">
      <div
        class="item"
        v-for="value in personalized"
        :key="value.id"
        @click="selectItem(value.id)"
      >
        <!-- 每张推荐歌单图片 -->
        <!-- <img :src="value.picUrl" alt="" />  -->
        <img v-lazy="value.picUrl" alt="" />
        <!-- 每张推荐歌单简介 -->
        <p>{{ value.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Personalized",
  // 推荐组件传递过来的数据
  props: {
    personalized: {
      type: Array,
      default: [],
      required: true,
    },
    title: {
      type: String,
      default: "",
      required: true,
    },
    type: {
      type: String,
      default: "",
      required: true,
    },
  },
  methods: {
    selectItem(id) {
      // console.log(id);
      this.$emit("select", id, this.type);
    },
  },
};
</script>

<style scoped lang='scss'>
@import "../../assets/css/mixin";
@import "../../assets/css/variable";
.Personalized {
  @include bg_sub_color();
  .Personalized-top {
    width: 100%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color();
    border-bottom: 1px solid #ccc;
    padding: 0 20px;
    h3 {
      @include font_size($font_large);
      font-weight: bold;
      @include font_color();
    }
  }
  .Personalized-list {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 20px 0;
    .item {
      width: 200px;
      padding-bottom: 20px;
      img {
        width: 200px;
        height: 200px;
        border-radius: 20px;
      }
      p {
        @include clamp(2);
        @include font_color();
        @include font_size($font_medium_s);
        text-align: center;
      }
    }
  }
}
</style>