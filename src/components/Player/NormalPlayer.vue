<template>
  <transition :css="false" @enter="enter" @leave="leave">
    <!-- 默认播放界面 -->
    <!-- <div class="normal-player" v-show="this.$store.getters.isFullScreen"> -->
    <div class="normal-player" v-show="this.isFullScreen">
      <div class="player-warpper">
        <PlayerHeader></PlayerHeader>
        <PlayerMiddle :currentTime="currentTime"></PlayerMiddle>
        <PlayerBottom
          :totalTime="totalTime"
          :currentTime="currentTime"
        ></PlayerBottom>
      </div>
      <div class="player-bg">
        <img :src="currentSong.picUrl" alt="" />
      </div>
    </div>
  </transition>
</template>

<script>
import PlayerHeader from "./PlayerHeader";
import PlayerMiddle from "./PlayerMiddle";
import PlayerBottom from "./PlayerBottom";
import { mapGetters, mapActions } from "vuex";
import Velocity from "velocity-animate";
import "velocity-animate/velocity.ui";
export default {
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom,
  },
  computed: {
    ...mapGetters(["isFullScreen", "currentSong"]),
  },
  methods: {
    enter(el, done) {
      Velocity(el, "transition.shrinkIn", { duration: 500 }, function () {
        done();
      });
    },
    leave(el, done) {
      Velocity(el, "transition.shrinkOut", { duration: 500 }, function () {
        done();
      });
    },
    ...mapActions(["getSongLyric"]),
  },
  // 监听器
  watch: {
    // 监听全局变量，当前歌曲的变化
    currentSong(newValue, oldValue) {
      // console.log(newValue);
      if (newValue.id === undefined) {
        return;
      }
      this.getSongLyric(newValue.id);
    },
  },
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true,
    },
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
.normal-player {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  @include bg_sub_color();
  .player-warpper {
    // 注意！！！
    // background-color: pink;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 999;
  }
  .player-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      filter: blur(10px);
    }
  }
}
</style>