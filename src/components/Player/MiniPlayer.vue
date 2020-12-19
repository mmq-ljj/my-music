<template>
  <!-- transition过渡动画效果 -->
  <transition :css="false" @enter="enter" @leave="leave">
    <!-- 小播放器 -->
    <div class="mini-player" v-show="this.isShowMiniPlayer">
      <div class="player-warpper">
        <div class="player-left" @click="showNormalPlayer">
          <img :src="currentSong.picUrl" alt="" ref="cd" />
          <div class="player-title">
            <h3>{{ currentSong.name }}</h3>
            <p>{{ currentSong.singer }}</p>
          </div>
        </div>
        <div class="player-right">
          <div class="play" @click="play" ref="play"></div>
          <!-- 迷你播放器右侧展开小列表按钮 -->
          <div class="list" @click.stop="showList"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Velocity from "velocity-animate";
import "velocity-animate/velocity.ui";
export default {
  methods: {
    showList() {
      this.setListPlayer(true);
    },
    // 把actions里的setFullScreen方法映射为局部方法
    ...mapActions([
      "setFullScreen",
      "setMiniPlayer",
      "setListPlayer",
      "setIsPlaying",
    ]),
    showNormalPlayer() {
      this.setFullScreen(true);
      this.setMiniPlayer(false);
    },
    enter(el, done) {
      Velocity(el, "transition.bounceUpIn", { duration: 700 }, function () {
        done();
      });
    },
    leave(el, done) {
      Velocity(el, "transition.bounceDownOut", { duration: 700 }, function () {
        done();
      });
    },
    play() {
      this.setIsPlaying(!this.isPlaying);
    },
  },
  computed: {
    // 把全局属性映射为局部属性
    ...mapGetters(["isShowMiniPlayer", "isPlaying", "currentSong"]),
  },
  watch: {
    isPlaying(newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add("active");
        this.$refs.cd.classList.add("active");
      } else {
        this.$refs.play.classList.remove("active");
        this.$refs.cd.classList.remove("active");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.mini-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 150px;
  .player-warpper {
    width: 100%;
    height: 100%;
    @include bg_color();
    display: flex;
    align-items: center;
    justify-content: space-between;
    // 小播放器左侧按钮样式
    .player-left {
      display: flex;
      padding-left: 30px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 20px;
        // background-color: skyblue;
        animation: sport 3s linear infinite;
        animation-play-state: paused;
        &.active {
          animation-play-state: running;
        }
      }
      .player-title {
        display: flex;
        flex-direction: column;
        // align-items: center;
        justify-content: center;
        h3 {
          @include font_size($font_medium);
          @include font_color();
        }
        p {
          @include font_size($font_medium_s);
          @include font_color();
        }
      }
    }
    // 小播放器右侧按钮样式
    .player-right {
      display: flex;
      align-items: center;
      .play {
        width: 84px;
        height: 84px;
        @include bg_img("../../assets/images/play");
        &.active {
          @include bg_img("../../assets/images/pause");
        }
      }
      .list {
        width: 120px;
        height: 120px;
        @include bg_img("../../assets/images/list");
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