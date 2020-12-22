<template>
  <!-- 排行榜界面 -->
  <div class="rank">
    <div class="rank-wrapper">
      <ScrollView>
        <ul>
          <!-- 第一层li for循环出榜单标题 -->
          <li v-for="(value, key) in category.titles" :key="key">
            <h3 class="group-title">{{ value }}</h3>
            <!-- 第一组排行榜 -->
            <ul class="normal-group" v-if="value === '官方榜'">
              <!-- 第二层li for循环出每歌榜单里的内容 -->
              <li
                v-for="obj in category[key]"
                :key="obj.rank.id"
                @click.stop="selectedItem(obj.id)"
              >
                <!-- 左边排行榜图片 -->
                <div class="rank-left">
                  <img v-lazy="obj.rank.coverImgUrl" alt="" />
                  <p>{{ obj.rank.updateFrequency }}</p>
                </div>
                <!-- 右边排行榜 -->
                <div class="rank-right">
                  <p v-for="(song, index) in obj.rank.tracks" :key="song.first">
                    {{ index }}.{{ song.first }}-{{ song.second }}
                  </p>
                </div>
              </li>
            </ul>
            <!-- 其他榜单 -->
            <!-- 推荐榜 -->
            <ul class="other-group" v-else>
              <li
                v-for="obj in category[key]"
                :key="obj.rank.id"
                @click.stop="selectedItem(obj.id)"
              >
                <div class="rank-top">
                  <img v-lazy="obj.rank.coverImgUrl" alt="" />
                  <p>{{ obj.rank.updateFrequency }}</p>
                </div>
                <div class="rank-bottom">
                  <p>{{ obj.rank.name }}</p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </ScrollView>
    </div>
    <!-- 切换到歌单详情页动画效果 -->
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import ScrollView from "../components/ScrollView";
import { getTopListDetail } from "../api/index";
export default {
  name: "Rank",
  components: {
    ScrollView,
  },
  data() {
    return {
      category: {},
      keys: [],
    };
  },
  created() {
    getTopListDetail()
      .then((data) => {
        // console.log(data);
        this.category = data;
        // console.log(this.category);
        // console.log(this.category["officialList"]);
        // console.log(this.getKeys);
        this.keys = this.getKeys;
        // console.log(this.keys);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    getKeys() {
      return Object.keys(this.category.titles);
    },
  },
  methods: {
    selectedItem(id) {
      this.$router.push(`/rank/detail/${id}/rank`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/mixin";
@import "../assets/css/variable";
.rank {
  width: 100%;
  height: 100%;
  .rank-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 184px;
    bottom: 0;
    overflow: hidden;
    @include bg_sub_color();
    .group-title {
      padding: 10px 20px;
      @include font_color();
      @include font_size($font_large);
      font-weight: bold;
    }
    // 默认排行榜
    .normal-group {
      li {
        display: flex;
        align-items: center;
        padding: 10px 20px;
        box-sizing: border-box;
        .rank-left {
          position: relative;
          img {
            width: 200px;
            height: 200px;
            border-radius: 10px;
          }
          p {
            position: absolute;
            left: 10px;
            bottom: 10px;
            color: #fff;
            @include font_size($font_medium_s);
          }
        }
        .rank-right {
          margin-left: 20px;
          p {
            @include font_color();
            @include font_size($font_medium_s);
            padding: 10px 0;
          }
        }
      }
    }
    // 其他排行榜
    .other-group {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        padding: 10px 20px;
        box-sizing: border-box;
        .rank-top {
          position: relative;
          img {
            width: 200px;
            height: 200px;
            border-radius: 10px;
          }
          p {
            position: absolute;
            left: 10px;
            bottom: 10px;
            color: #fff;
            @include font_size($font_medium_s);
          }
        }
        .rank-bottom {
          width: 200px;
          @include no-wrap();
          p {
            padding: 10px;
            @include font_color();
            @include font_size($font_medium_s);
          }
        }
      }
    }
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