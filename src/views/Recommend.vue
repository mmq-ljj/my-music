<template>
  <!-- 推荐界面 -->
  <div class="recommend">
    <div class="recommend-warpper">
      <!-- 可以滚动的区域 -->
      <ScrollView>
        <div>
          <!-- 轮播图组件 -->
          <Banner :banners="banners"></Banner>
          <!-- 推荐歌单组件 -->
          <Personalized
            :personalized="personalized"
            :title="'推荐歌单'"
            @select="fatherSelectItem"
            :type="'personalized'"
          ></Personalized>
          <!-- 推荐专辑组件 -->
          <Personalized
            :personalized="albums"
            :title="'最新专辑'"
            @select="fatherSelectItem"
            :type="'album'"
          ></Personalized>
          <!-- 最新音乐组件 -->
          <SongList :songs="songs"></SongList>
        </div>
      </ScrollView>
    </div>
    <!-- 切换到歌单详情页动画效果 -->
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// import { getBanner } from "../api/index";
// 引入轮播图，推荐歌单组件 -
import Banner from "../components/Recommend/Banner";
import Personalized from "../components/Recommend/Personalized";
import SongList from "../components/Recommend/SongList";
import ScrollView from "../components/ScrollView";
export default {
  name: "Recommend",
  // 注册组件
  components: {
    Banner,
    Personalized,
    SongList,
    ScrollView,
  },
  data() {
    return {
      banners: [],
      personalized: [],
      albums: [],
      songs: [],
    };
  },
  // 在生命周期发送ajax请求，获得数据
  created() {
    this.getBanner();
    this.getPersonalized();
    this.getNewAlbum();
    this.getNewSong();
  },
  methods: {
    // 获得轮播图请求
    async getBanner() {
      const { data: res } = await this.$http.get("banner?type=2");
      this.banners = res.banners;
    },
    // 获得推荐歌单请求
    async getPersonalized() {
      const { data: res } = await this.$http.get("personalized?limit=6");
      this.personalized = res.result;
      // console.log(this.personalized);
    },
    // 获取最新专辑
    async getNewAlbum() {
      const { data: res } = await this.$http.get("album/newest");
      //  console.log(res);
      this.albums = res.albums.splice(0, 6);
      // console.log(this.albums);
    },
    // 获取推荐新音乐歌曲
    async getNewSong() {
      const { data: res } = await this.$http.get("/personalized/newsong");
      this.songs = res.result;
      // console.log(res.result);
      let list = [];
      res.result.forEach((value) => {
        let obj = {};
        obj.id = value.id;
        obj.name = value.name;
        obj.picUrl = value.song.album.picUrl;
        let singer = "";
        for (let i = 0; i < value.song["artists"].length; i++) {
          if (i === 0) {
            singer = value.song["artists"][i].name;
          } else {
            singer += "-" + value.song["artists"][i].name;
          }
        }
        obj.singer = singer;
        list.push(obj);
      });
      this.songs = list;
    },
    // 点击跳往推荐歌单和最新专辑详情页
    fatherSelectItem(id, type) {
      this.$router.push(`/recommend/detail/${id}/${type}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.recommend {
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  // overflow: hidden;
  .recommend-warpper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
// 切换到歌单详情页动画效果样式
.v-enter {
  transform: translateX(100%);
}
.v-enter-to {
  transform: translateX(0%);
}
.v-enter-active {
  transition: transform 1s;
}
.v-leave {
  transform: translateX(0%);
}
.v-leave-to {
  transform: translateX(100%);
}
.v-leave-active {
  transition: transform 1s;
}
</style>