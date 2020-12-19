<template>
  <!-- 默认播放界面底部 -->
  <div class="player-bottom">
    <!-- 歌曲播放进度 -->
    <div class="bottom-progress">
      <!-- 歌曲当前时长 -->
      <span ref="eleCurrentTime">00:00</span>
      <!-- 进度条背景 -->
      <div class="progress-bar" @click="progressClick" ref="progressBar">
        <!-- 进度条前景 -->
        <div class="progress-line" ref="progressLine">
          <!-- 进度条小圆点 -->
          <div class="progress-dot"></div>
        </div>
      </div>
      <!-- 歌曲总时长 -->
      <span ref="eleTotalTime">00:00</span>
    </div>
    <!-- 歌曲控制按钮 -->
    <div class="bottom-controll">
      <div class="mode loop" @click="mode" ref="mode"></div>
      <!-- 上一首按钮 -->
      <div class="prev" @click="prev"></div>
      <!-- 播放与暂停 -->
      <div class="play" @click="play" ref="play"></div>
      <!-- 下一首按钮 -->
      <div class="next" @click="next"></div>
      <div class="favorite" @click="favorite" :class="{active:isFavorite(currentSong)}"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import modeType from "../../store/modeType";
export default {
  // 方法
  methods: {
    // 映射方法
    ...mapActions([
      "setIsPlaying",
      "setModeType",
      "setCurrentIndex",
      "setCurrentTime",
      "setFavoriteSong",
    ]),
    // 播放与暂停
    play() {
      this.setIsPlaying(!this.isPlaying);
    },
    // 上一首
    prev() {
      this.setCurrentIndex(this.currentIndex - 1);
    },
    // 下一首
    next() {
      this.setCurrentIndex(this.currentIndex + 1);
    },
    // 播放模式
    mode() {
      if (this.modeType === modeType.loop) {
        this.setModeType(modeType.one);
      } else if (this.modeType === modeType.one) {
        this.setModeType(modeType.random);
      } else if (this.modeType === modeType.random) {
        this.setModeType(modeType.loop);
      }
    },
    // 喜欢
    favorite() {
      this.setFavoriteSong(this.currentSong);
    },
    // 是否添加喜欢样式的方法
    isFavorite(song) {
      let result = this.favoriteList.find((currentValue) => {
        return currentValue.id === song.id;
      });
      // 在喜欢歌曲列表里有该歌曲 才加active这个类
      return result !== undefined;
    },
    // 格式化时间的方法
    formartTime(time) {
      // 2.得到两个时间之间的差值(秒)
      let differSecond = time;
      // 3.利用相差的总秒数 / 每一天的秒数 = 相差的天数
      let day = Math.floor(differSecond / (60 * 60 * 24));
      day = day >= 10 ? day : "0" + day;
      // 4.利用相差的总秒数 / 小时 % 24;
      let hour = Math.floor((differSecond / (60 * 60)) % 24);
      hour = hour >= 10 ? hour : "0" + hour;
      // 5.利用相差的总秒数 / 分钟 % 60;
      let minute = Math.floor((differSecond / 60) % 60);
      minute = minute >= 10 ? minute : "0" + minute;
      // 6.利用相差的总秒数 % 秒数
      let second = Math.floor(differSecond % 60);
      second = second >= 10 ? second : "0" + second;
      return {
        day: day,
        hour: hour,
        minute: minute,
        second: second,
      };
    },
    // 点击改变滚动条位置的方法
    progressClick(e) {
      // 1.计算进度条的位置
      // 1.1 点击位置距离左边的位置 - 进度条距离左边的位置 = 点击位置在进度条中的位置
      // 1.2 点击位置在进度条中的位置 / 进度条的背景宽度 = 比例  把这个比例 设置为进度条前景的宽度比例
      // let normalLeft = e.target.offsetLeft;
      let normalLeft = this.$refs.progressBar.offsetLeft; //     进度条距离左边的位置
      let eventLeft = e.pageX; //                  点击位置距离左边的位置
      let clickLeft = eventLeft - normalLeft; //   点击位置在进度条中的位置
      // let progressWidth = e.target.offsetWidth; 因为当进度条前景有宽度之后就点不到 进度条的背景了
      let progressWidth = this.$refs.progressBar.offsetWidth; // 进度条的背景宽度
      let value = clickLeft / progressWidth;
      this.$refs.progressLine.style.width = value * 100 + "%";
      // 2.计算当前应该从什么地方开始播放
      let currentTime = this.totalTime * value; //当前播放的时间 = 总时间 * value(百分比)
      // console.log(currentTime);
      this.setCurrentTime(currentTime);
    },
  },
  computed: {
    // 映射属性
    ...mapGetters([
      "isPlaying",
      "modeType",
      "currentIndex",
      "currentSong",
      "favoriteList",
    ]),
  },
  // 监听
  watch: {
    isPlaying(newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add("active");
      } else {
        this.$refs.play.classList.remove("active");
      }
    },
    modeType(newValue, oldValue) {
      if (newValue === modeType.loop) {
        this.$refs.mode.classList.remove("random");
        this.$refs.mode.classList.add("loop");
      } else if (newValue === modeType.one) {
        this.$refs.mode.classList.remove("loop");
        this.$refs.mode.classList.add("one");
      } else if (newValue === modeType.random) {
        this.$refs.mode.classList.remove("one");
        this.$refs.mode.classList.add("random");
      }
    },
    // 监听当前歌曲的 总时长
    totalTime(newValue, oldValue) {
      let time = this.formartTime(newValue);
      this.$refs.eleTotalTime.innerHTML = time.minute + ":" + time.second;
    },
    // 监听当前歌曲播放时长
    currentTime(newValue, oldValue) {
      // 1.格式化当前播放的时间
      let time = this.formartTime(newValue);
      this.$refs.eleCurrentTime.innerHTML = time.minute + ":" + time.second;
      // 2.根据当前播放的时间计算比例 (当前的播放时间 / 歌曲播放总时长 = 百分比)
      // 实现进度条的加载 (进度条的小圆点 绝对定位于 进度条前景 通过改变进度条前景的宽度 实时改变小圆点的位置)
      let value = (newValue / this.totalTime) * 100;
      this.$refs.progressLine.style.width = value + "%";
    },
  },
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true,
    },
    currentTime: {
      type: Number,
      default: 0,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.player-bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  .bottom-progress {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      @include font_size($font_samll);
      @include font_color();
    }
    // 进度条背景
    .progress-bar {
      width: 100%;
      margin: 0 10px;
      height: 10px;
      background: #fff;
      // 进度条前景
      .progress-line {
        width: 0%;
        height: 100%;
        background: #ccc;
        position: relative;
        // 进度条小圆点
        .progress-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  .bottom-controll {
    width: 80%;
    margin: 0 auto;
    padding: 50px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      width: 84px;
      height: 84px;
    }
    .mode {
      &.loop {
        @include bg_img("../../assets/images/loop");
      }
      &.one {
        @include bg_img("../../assets/images/one");
      }
      &.random {
        @include bg_img("../../assets/images/shuffle");
      }
    }
    .prev {
      @include bg_img("../../assets/images/prev");
    }
    .play {
      @include bg_img("../../assets/images/play");
      &.active {
        @include bg_img("../../assets/images/pause");
      }
    }
    .next {
      @include bg_img("../../assets/images/next");
    }
    .favorite {
      @include bg_img("../../assets/images/un_favorite");
      &.active {
        @include bg_img("../../assets/images/favorite");
      }
    }
  }
}
</style>