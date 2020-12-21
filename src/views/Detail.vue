<template>
  <!-- 详情界面 -->
  <!-- 推荐歌单里每一页歌单详情 -->
  <div class="detail">
    <!-- 头部导航栏 -->
    <DetailHeader :title="playlist.name"></DetailHeader>
    <!-- 歌单详情页顶部图片 -->
    <DetailTop :path="playlist.coverImgUrl" ref="top"></DetailTop>
    <!-- 通过盒子包裹底部歌单列表，并且通过给这个盒子固定定位覆盖住图片 -->
    <div class="bottom">
      <!-- 把需要滚动的内容放到滚动组件当中 -->
      <ScrollView ref="scrollview">
        <!-- 歌单详情页底部歌单列表 -->
        <DetailBottom :playlist="playlist.tracks"></DetailBottom>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import DetailHeader from "../components/Detail/DetailHeader";
import DetailTop from "../components/Detail/DetailTop";
import DetailBottom from "../components/Detail/DetailBottom";
import ScrollView from "../components/ScrollView";
// import {getArtistsSongs,getTopList} from '../api/index'
export default {
  name: "Detail",
  components: {
    DetailHeader,
    DetailTop,
    DetailBottom,
    ScrollView,
  },
  data() {
    return {
      playlist: {},
    };
  },
  created() {
    // console.log(this.$route.params.id); // 拿到 通过编程式导航 传递的 id值
    console.log(this.$route.params.type); // 拿到 通过编程式导航 传递的 type
    // 通过type确定 类型调用不同的函数 发送不同ajax请求
    if (this.$route.params.type === "personalized") {
      this.getPlayList();
    } else if (this.$route.params.type === "album") {
      this.getPlayListAlbum();
    } else if (this.$route.params.type === "singer") {
      this.getArtistsSongs();
    } else if (this.$route.params.type === "rank") {
      this.getTopList();
      //  this.getPlayList();
    }
  },
  methods: {
    // 歌单详情页 发送ajax请求拿到数据
    async getPlayList() {
      const { data: res } = await this.$http.get(
        `playlist/detail?id=${this.$route.params.id}`
      );
      this.playlist = res.playlist;
    },
    // 最新专辑 发送ajax请求拿到数据
    async getPlayListAlbum() {
      const { data: res } = await this.$http.get(
        `/album?id=${this.$route.params.id}`
      );
      // console.log(res);
      this.playlist = {
        name: res.album.name,
        coverImgUrl: res.album.picUrl,
        tracks: res.songs,
      };
    },
    // 获取歌手歌单
    async getArtistsSongs() {
      const { data: res } = await this.$http.get(
        `/artists?id=${this.$route.params.id}`
      );
      this.playlist = {
        name: res.artist.name,
        coverImgUrl: res.artist.picUrl,
        tracks: res.hotSongs,
      };
    },
    // 获取排行榜歌单
    async getTopList() {
      const { data: res } = await this.$http.get(
        `top/list?id=${this.$route.params.id}`
      );
      this.playlist = {
        name: res.playlist.name,
        coverImgUrl: res.playlist.creator.backgroundUrl,
        tracks: res.playlist.tracks,
      };
    },
  },
  mounted() {
    // 拿到顶部图片的高度  this.$refs.top是拿到DetailTop这个组件  $el这个组件的根元素也就是这个图片
    let defaultHeight = this.$refs.top.$el.offsetHeight;
    // console.log(defaultHeight);
    this.$refs.scrollview.scrolling((offsetY) => {
      // console.log(offsetY);
      if (offsetY < 0) {
        // console.log("向上滚动");
        // let scale = (20 * Math.abs(offsetY)) / defaultHeight;
        let scale = Math.abs(offsetY) / defaultHeight;
        // console.log(scale);
        // 注意点：高斯模糊效果是非常消耗性能的，不推荐在移动端使用
        //  如果要在移动端使用，那么建议只设置一次
        // this.$refs.top.$el.style.filter = `blur(${scale}px)`;
        this.$refs.top.changeMask(scale);
      } else {
        // console.log("向下滚动");
        let scale = 1 + offsetY / defaultHeight;
        // console.log(scale);
        this.$refs.top.$el.style.transform = `scale(${scale})`;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/mixin";
.detail {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  @include bg_sub_color();
  .bottom {
    position: fixed;
    top: 500px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>