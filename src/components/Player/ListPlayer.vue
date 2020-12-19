<template>
  <!-- 列表播放界面 -->
  <transition :css="false" @enter="enter" @leave="leave">
    <!-- 列表播放器右侧展开小列表按钮 -->
    <div class="list-player" v-show="isShowListPlayer">
      <div class="player-warpper">
        <!-- 顶部区域 左侧播放顺序 右侧删除按钮  -->
        <div class="play-top">
          <div class="top-left">
            <div class="mode loop" @click="mode" ref="mode"></div>
            <p v-if="this.modeType === 1">单曲循环</p>
            <p v-else-if="this.modeType === 0">列表循环</p>
            <p v-else>随机播放</p>
          </div>
          <div class="top-right">
            <div class="del" @click="delAll"></div>
          </div>
        </div>
        <!-- 中间部分  左侧播放按钮和歌曲名字 右侧 喜欢 和 叉 -->
        <div class="play-middle">
          <ScrollView ref="scrollView">
            <ul ref="play">
              <li
                class="item"
                v-for="(value, index) in songs"
                :key="value.id"
                @click="selectMusic(index)"
              >
                <div class="item-left">
                  <div
                    class="item-play"
                    @click.stop="play"
                    v-show="currentIndex === index"
                  ></div>
                  <p>{{ value.name }}</p>
                </div>
                <div class="item-right">
                  <!-- 喜欢按钮 -->
                  <div
                    class="item-favorite"
                    @click.stop="favorite(value)"
                    :class="{ active: isFavorite(value) }"
                  ></div>
                  <!-- 列表播放界面删除按钮 -->
                  <div class="item-del" @click.stop="del(index)"></div>
                </div>
              </li>
            </ul>
          </ScrollView>
        </div>
        <!-- 底部关闭 该展开列表 -->
        <div class="play-bottom">
          <p @click.stop="hidden">关闭</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ScrollView from "../ScrollView";
import Velocity from "velocity-animate";
import "velocity-animate/velocity.ui";
import { mapActions, mapGetters } from "vuex";
import modeType from "../../store/modeType";
export default {
  // 注册的组件
  components: {
    ScrollView,
  },
  // 方法
  methods: {
    hidden() {
      this.setListPlayer(false);
    },
    // 进入的动画
    enter(el, done) {
      Velocity(el, "transition.slideRightIn", { duration: 800 }, function () {
        done();
      });
    },
    // 离开的动画
    leave(el, done) {
      Velocity(el, "transition.slideRightOut", { duration: 800 }, function () {
        done();
      });
    },
    // 映射控制全局变量的方法
    ...mapActions([
      "setIsPlaying",
      "setModeType",
      "setListPlayer",
      "setDelSong", // 根据索引 删除列表播放页面 对应歌曲
      "setCurrentIndex", // 通过改变索引 实现切换列表的歌曲
      "setFavoriteSong", // 设置喜欢的歌曲
    ]),
    play() {
      this.setIsPlaying(!this.isPlaying);
    },
    // 切换播放模式方法
    mode() {
      if (this.modeType === modeType.loop) {
        this.setModeType(modeType.one);
        console.log(this.modeType);
      } else if (this.modeType === modeType.one) {
        this.setModeType(modeType.random);
        console.log(this.modeType);
      } else if (this.modeType === modeType.random) {
        this.setModeType(modeType.loop);
        console.log(this.modeType);
      }
    },
    // 根据索引 删除列表播放页面 对应歌曲
    del(index) {
      this.setDelSong(index);
    },
    // 删除所有歌曲
    delAll() {
      this.setDelSong();
    },
    // 根据索引 切换当前播放的歌曲
    selectMusic(index) {
      this.setCurrentIndex(index);
    },
    // 喜欢 传过来的value是songs列表渲染出来被点击的一首歌
    favorite(value) {
      this.setFavoriteSong(value);
    },
    // 是否添加喜欢样式的方法
    isFavorite(song) {
      let result = this.favoriteList.find((currentValue) => {
        return currentValue.id === song.id;
      });
      // 在喜欢歌曲列表里有该歌曲 才加active这个类
      return result !== undefined;
    },
  },
  computed: {
    // 映射全局变量为局部变量
    ...mapGetters([
      "isPlaying",
      "modeType",
      "isShowListPlayer",
      "songs",
      "currentIndex",
      "favoriteList",
    ]),
  },
  // 监听全局变量的变化
  watch: {
    // 是否播放
    isPlaying(newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add("active");
      } else {
        this.$refs.play.classList.remove("active");
      }
    },
    // 播放模式
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
    // 是否展示列表播放界面
    isShowListPlayer(newValue, oldValue) {
      if (newValue) {
        this.$refs.scrollView.refresh();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.list-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  @include bg_sub_color();
  .player-warpper {
    //  顶部区域 左侧播放顺序 右侧删除按钮
    .play-top {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top-left {
        display: flex;
        align-items: center;
        padding-left: 20px;
        .mode {
          width: 56px;
          height: 56px;
          margin-right: 20px;
          &.loop {
            @include bg_img("../../assets/images/small_loop");
          }
          &.one {
            @include bg_img("../../assets/images/small_one");
          }
          &.random {
            @include bg_img("../../assets/images/small_shuffle");
          }
        }
        p {
          @include font_size($font_medium_s);
          @include font_color();
        }
      }
      .top-right {
        .del {
          width: 84px;
          height: 84px;
          @include bg_img("../../assets/images/small_del");
        }
      }
    }
    // 中间部分  左侧播放按钮和歌曲名字 右侧 喜欢 和 叉叉
    .play-middle {
      height: 700px;
      overflow: hidden;
      ul {
        &.active {
          .item {
            .item-play {
              @include bg_img("../../assets/images/small_pause");
            }
          }
        }
      }
      .item {
        border-top: 1px solid #ccc;
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
        .item-left {
          display: flex;
          align-items: center;
          .item-play {
            width: 56px;
            height: 56px;
            margin-right: 20px;
            @include bg_img("../../assets/images/small_play");
          }
          p {
            @include font_size($font_medium_s);
            @include font_color();
          }
        }
        .item-right {
          display: flex;
          align-items: center;
          .item-favorite {
            width: 56px;
            height: 56px;
            @include bg_img("../../assets/images/small_un_favorite");
            &.active {
              @include bg_img("../../assets/images/small_favorite");
            }
          }
          .item-del {
            width: 52px;
            height: 52px;
            margin-left: 20px;
            @include bg_img("../../assets/images/small_close");
          }
        }
      }
    }
    // 底部关闭 该展开列表
    .play-bottom {
      width: 100%;
      height: 100%;
      line-height: 100px;
      @include bg_color();
      p {
        text-align: center;
        color: #fff;
        @include font_size($font_medium);
      }
    }
  }
}
</style>