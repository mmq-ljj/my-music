<template>
  <!-- 播放详情页中间部分 -->
  <swiper :options="swiperOption" class="banner">
    <swiper-slide class="cd">
      <div class="cd-warpper" ref="cdWarpper">
        <img :src="currentSong.picUrl" alt="" />
      </div>
      <p>{{ getFirstLyric() }}</p>
    </swiper-slide>
    <!-- 歌词区域 -->
    <swiper-slide class="lyric" ref="lyric">
      <ScrollView ref="scrollView">
        <ul>
          <li
            v-for="(value, key) in currentLyric"
            :key="key"
            :class="{ active: currentLineNum === key }"
          >
            {{ value }}
          </li>
        </ul>
      </ScrollView>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import ScrollView from "../ScrollView";
import { mapGetters } from "vuex";
export default {
  components: {
    Swiper,
    SwiperSlide,
    ScrollView,
  },
  data() {
    return {
      swiperOption: {
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
          bulletClass: "my-bullet",
          bulletActiveClass: "my-bullet-active",
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
      },
      currentLineNum: "0", // 当前歌曲播放时间整数
    };
  },
  computed: {
    ...mapGetters(["isPlaying", "currentSong", "currentLyric"]),
  },
  watch: {
    isPlaying(newValue, oldValue) {
      if (newValue) {
        this.$refs.cdWarpper.classList.add("active");
      } else {
        this.$refs.cdWarpper.classList.remove("active");
      }
    },
    // 监听当前播放歌曲的当前时间的变化   currentTime里的值不是整数
    currentTime(newValue, oldValue) {
      // 1.高亮歌词的同步
      let lineNum = Math.floor(newValue) + ""; // 拿到lineNum歌词播放的对应整数时间
      this.currentLineNum = this.getActiveLineNum(lineNum);
      // 2.歌词滚动同步
      let currentLyricTop = document.querySelector("li.active").offsetTop; // 拿到当前播放歌词距离顶部的高度
      let lyricHeight = this.$refs.lyric.$el.offsetHeight; // 拿到当前歌词播放界面的高度
      // 如果当前高亮的歌词距离顶部的距离 > 当前歌词播放界面的高度的一半
      if (currentLyricTop > lyricHeight / 2) {
        console.log("开始滚动");
        this.$refs.scrollView.scrollTo(
          0,
          lyricHeight / 2 - currentLyricTop,
          100
        );
      } else {
        this.$refs.scrollView.scrollTo(0, 0, 100);
      }
    },
    // 监听歌词的变化
    currentLyric(newValue, oldValue) {
      for (let key in newValue) {
        this.currentLineNum = key;
        return;
      }
    },
  },
  methods: {
    // 获取第一行歌词
    getFirstLyric() {
      for (let key in this.currentLyric) {
        return this.currentLyric[key];
      }
    },
    // 通过递归查找上一行歌词
    getActiveLineNum(lineNum) {
      if (lineNum < 0) {
        return this.currentLineNum;
      }
      // 拿到当前时间所对应的歌词
      let result = this.currentLyric[lineNum + ""];
      // 如果该时间对应的歌词未定义 或 为空字符串
      if (result === undefined || result === "") {
        // 改时间-1
        lineNum--;
        return this.getActiveLineNum(lineNum); // 再去调用这个函数
      } else {
        // 知道返回的时间有对应的歌词
        return lineNum + "";
      }
    },
  },
  props: {
    // 当前歌曲播放的时间
    currentTime: {
      type: Number,
      default: 0,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.banner {
  position: fixed;
  top: 150px;
  bottom: 250px;
  left: 0;
  right: 0;
  // background-color: skyblue;
  .cd {
    .cd-warpper {
      display: block;
      margin: 0 auto;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      border: 30px solid #ffffff;
      overflow: hidden;
      animation: sport 3s linear infinite;
      animation-play-state: paused;
      &.active {
        animation-play-state: running;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      text-align: center;
      @include font_size($font_medium);
      @include font_color();
      margin-top: 50px;
    }
  }
  .lyric {
    li {
      text-align: center;
      @include font_size($font_medium);
      @include font_color();
      margin: 10px 0;
      &:last-of-type {
        padding-bottom: 50%;
      }
      &.active {
        color: #fff;
      }
    }
  }
}
@keyframes sport {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
<style lang="scss">
@import "../../assets/css/mixin";
.my-bullet {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10%;
  background-color: #fff;
  margin: 0 20px;
}
.my-bullet-active {
  width: 60px;
  @include bg_color();
}
</style>