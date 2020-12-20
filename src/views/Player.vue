<template>
  <!-- 播放详情页 -->
  <div class="player">
    <NormalPlayer
      :totalTime="totalTime"
      :currentTime="currentTime"
    ></NormalPlayer>
    <MiniPlayer></MiniPlayer>
    <ListPlayer ref="listPlayer"></ListPlayer>
    <audio
      :src="currentSong.url"
      ref="audio"
      @timeupdate="timeupdate"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import NormalPlayer from "../components/Player/NormalPlayer";
import MiniPlayer from "../components/Player/MiniPlayer";
import ListPlayer from "../components/Player/ListPlayer";
import { mapGetters, mapActions } from "vuex";
import mode from "../store/modeType";
import {
  getRandomIntInclusive,
  setLocalStorage,
  getLocalStorage,
} from "../tools/tools";
export default {
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer,
  },
  computed: {
    ...mapGetters([
      "currentSong",
      "isPlaying",
      "currentIndex",
      "curTime",
      "modeType",
      "songs",
      "favoriteList",
      "historyList",
    ]),
  },
  watch: {
    // 监听是否播放或暂停
    isPlaying(newValue, oldValue) {
      if (newValue) {
        this.$refs.audio.play(); // 播放
        this.setHistorySong(this.currentSong);
      } else {
        this.$refs.audio.pause(); // 暂停
      }
    },
    // 监听当前播放歌曲索引的变化
    currentIndex() {
      // 问题:在ios系统中不会自动加载歌曲，所以oncanplay永远都不会执行
      //      在pc端和Android端，系统会自动加载歌曲，所以 oncanplay会自动执行
      // 解决方案：如何监听ios 中Audio的歌曲是否已经准备好了，通过ondurationchange事件来监听
      // ondurationchange事件什么时候执行，当歌曲加载完成之后执行，因为只有当歌曲加载完成之后才能获取到歌曲的总时长
      // 给audio注册一个 canplay 的事件
      this.$refs.audio.oncanplay = () => {
        // console.log("2");
        // 更新当前播放歌曲总时长
        this.totalTime = this.$refs.audio.duration;
        // this.isPlaying 为真说明需要播放
        if (this.isPlaying) {
          this.setHistorySong(this.currentSong);
          this.$refs.audio.play(); // 播放
        } else {
          this.$refs.audio.pause(); // 暂停
        }
      };
    },
    // 监听当前播放歌曲的当前播放时间
    curTime(newValue, oldValue) {
      // 让audio当前播放时间 = 全局变量curTime的newValue
      this.$refs.audio.currentTime = newValue;
    },
    // 监听 喜欢列表里的变化
    favoriteList(newValue, oldValue) {
      // setItem 里的值 只能存储字符串
      // window.localStorage.setItem("favoriteList", JSON.stringify(newValue));
      setLocalStorage("favoriteList", newValue);
    },
    // 监听 历史播放记录列表的变化
    historyList(newValue, oldValue) {
      // window.localStorage.setItem("historyList", JSON.stringify(newValue));
      setLocalStorage("historyList", newValue);
    },
  },
  // 在下一次打开网页的时候 获取喜欢列表 但获取到的是字符串
  created() {
    // 先拿到locaStorage里的喜欢列表 并且转换为数组形式
    // let favoriteList = JSON.parse(window.localStorage.getItem("favoriteList"));
    let favoriteList = getLocalStorage("favoriteList");
    if (favoriteList === null) {
      return;
    }
    // 在created生命周期里 调用setFavoriteList方法 再通过commit去调用mutations里的方法修改state里的喜欢列表
    this.setFavoriteList(favoriteList);
    // 2.在生命周期 调用sethistoryList的方法 给历史播放列表添加歌曲
    // let historyList = JSON.parse(window.localStorage.getItem("historyList"));
    let historyList = getLocalStorage("historyList");
    if (historyList === null) {
      return;
    }
    this.setHistoryList(historyList);
  },
  mounted() {
    // this.$refs.audio.oncanplay
    this.$refs.audio.ondurationchange = () => {
      // console.log("1");
      this.totalTime = this.$refs.audio.duration; // 拿到当前歌曲的总时长(秒)
    };
  },
  data() {
    return {
      totalTime: 0,
      currentTime: 0,
    };
  },
  methods: {
    ...mapActions([
      "setCurrentIndex",
      "setFavoriteList",
      "setHistorySong",
      "setHistoryList",
    ]),
    // 监听歌曲播放 触发事件
    timeupdate(e) {
      // console.log(e.target.currentTime);
      this.currentTime = e.target.currentTime; // 拿到当前歌曲播放的时间
    },
    // 监听歌曲结束 触发事件
    end() {
      // 判断播放模式
      if (this.modeType === mode.loop) {
        // 如果是列表循环播放 就让播放歌曲的索引 + 1
        this.setCurrentIndex(this.currentIndex + 1);
      } else if (this.modeType === mode.one) {
        // 单曲循环 再次播放这首歌
        this.$refs.audio.play();
      } else if (this.modeType === mode.random) {
        // 1.拿到歌曲播放列表有几首歌曲
        // 2.生成一个歌曲索引范围内 随机索引
        let index = getRandomIntInclusive(0, this.songs.length - 1);
        this.setCurrentIndex(index);
      }
    },
    // 生成随机数
  },
};
</script>

<style lang="scss" scoped>
</style>