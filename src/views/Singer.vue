<template>
  <!-- 歌手页面 -->
  <div class="singer">
    <div class="singer-wrapper">
      <ScrollView ref="scrollView">
        <!-- 第一个ul li 是渲染出 歌手标题 热 a-z -->
        <ul class="list-wrapper">
          <li
            class="list-group"
            v-for="(value, index) in list"
            :key="index"
            ref="group"
          >
            <!-- 歌手标题 热 a-z -->
            <h2 class="group-title">{{ keys[index] }}</h2>
            <!-- 第二个ul li 是渲染出标题 热 a-z 对应的歌手-->
            <ul>
              <li
                class="group-item"
                v-for="obj in list[index]"
                :key="obj.id"
                @click.stop="switchSinger(obj.id)"
              >
                <img v-lazy="obj.img1v1Url" alt="" />
                <p>{{ obj.name }}</p>
              </li>
            </ul>
          </li>
        </ul>
      </ScrollView>
      <!-- 右边 热门 a-z 的侧边栏 -->
      <ul class="list-keys">
        <!-- <li
        v-for="(key, index) in keys"
        :key="key"
        @click.stop="keyDown(index)"
        :class="{ active: currentIndex === index }"
      >
        {{ key }}
      </li> -->
        <li
          v-for="(key, index) in keys"
          :key="key"
          :data-index="index"
          @touchstart.stop.prevent="touchstart"
          @touchmove.stop.prevent="touchmove"
          :class="{ active: currentIndex === index }"
        >
          {{ key }}
        </li>
      </ul>
      <div class="fix-title" v-show="fixTitle !== ''" ref="fixTitle">
        {{ fixTitle }}
      </div>
    </div>

    <!-- 切换到歌单详情页动画效果 -->
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getAllArtists } from "../api/index";
import ScrollView from "../components/ScrollView";
export default {
  name: "Singer",
  components: {
    ScrollView,
  },
  computed: {
    fixTitle() {
      if (this.scrollY >= 0) {
        return "";
      } else {
        return this.keys[this.currentIndex];
      }
    },
  },
  created() {
    // 在生命周期发送ajax请求拿到热门歌手
    getAllArtists()
      .then((result) => {
        console.log(result);
        this.keys = result.keys;
        this.list = result.list;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {
    this.$refs.scrollView.scrolling((y) => {
      this.scrollY = y;
      // 处理第一个区域
      if (y >= 0) {
        this.currentIndex = 0;
        return;
      }
      // 处理中间区域
      for (let i = 0; i < this.groupsTop.length - 1; i++) {
        let preTop = this.groupsTop[i];
        let nextTop = this.groupsTop[i + 1];
        if (-y >= preTop && -y <= nextTop) {
          this.currentIndex = i;

          // 1.用下一组标题的偏移位 + 当前滚动出去的偏移位
          let diffOffsetY = nextTop + y;
          let fixTitleOffsetY = 0;
          // 2.判断计算的结果是否是0 ~ 分组标题高度的值
          if (diffOffsetY >= 0 && diffOffsetY <= this.fixTitleHeight) {
            fixTitleOffsetY = diffOffsetY - this.fixTitleHeight;
          } else {
            fixTitleOffsetY = 0;
          }
          if (fixTitleOffsetY === this.fixTitleOffsetY) {
            return;
          }
          this.fixTitleOffsetY = fixTitleOffsetY;
          this.$refs.fixTitle.style.transfrom = `translateY(${fixTitleOffsetY}px)`;
          return;
        }
      }
      // 处理最后一个区域
      this.currentIndex = this.groupsTop.length - 1;
    });
  },
  data() {
    return {
      keys: [],
      list: [],
      groupsTop: [],
      currentIndex: 0,
      beginOffsetY: 0,
      moveOffsetY: 0,
      scrollY: 0, // 当前滚动偏移位
    };
  },
  methods: {
    keyDown(index) {
      this.currentIndex = index;
      // console.log(index);
      let offsetY = this.groupsTop[index];
      // console.log(offsetY);
      this.$refs.scrollView.scrollTo(0, -offsetY);
    },
    // 手指刚触碰到屏时
    touchstart(e) {
      // console.log(e.target.dataset.index);
      let index = parseInt(e.target.dataset.index);
      this.keyDown(index);
      this.beginOffsetY = e.touches[0].pageY;
    },
    // 手指在屏幕移动时
    touchmove(e) {
      this.moveOffsetY = e.touches[0].pageY;
      let offsetY =
        (this.moveOffsetY - this.beginOffsetY) / e.target.offsetHeight;
      // console.log(offsetY);
      let index = parseInt(e.target.dataset.index) + Math.floor(offsetY);
      if (index < 0) {
        index = 0;
      } else if (index > this.keys.length - 1) {
        index = this.keys.length - 1;
      }
      this.keyDown(index);
    },
    switchSinger(id) {
      this.$router.push(`/singer/detail/${id}/singer`);
    },
  },
  watch: {
    list() {
      // console.log(this.$refs.group);
      // 需要渲染完了再获取 第一层ul li
      // 注意点：watch只能监听数据的变化，数据变化的时候不一定已经渲染完了
      //         所以为了保证是渲染完成之后再去获取，我们可以利用Vue的$nextTick方法来实现
      //         也就是说在$nextTick回调函数中一定能拿到渲染完成之后的数据，
      //         因为$nextTick的回调函数只有渲染完成之后才会执行
      this.$nextTick(() => {
        // console.log(this.$refs.group);
        this.$refs.group.forEach((group) => {
          // 拿到每个标题(第一层ul li)距离顶部的高度
          this.groupsTop.push(group.offsetTop);
        });
        console.log(this.groupsTop);
      });
    },
    fixTitle() {
      this.$nextTick(() => {
        this.fixTitleHeight = this.$refs.fixTitle.offsetHeight;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/mixin";
@import "../assets/css/variable";
.singer {
  width: 100%;
  height: 100%;
  .singer-wrapper {
    position: fixed;
    top: 184px;
    bottom: 0;
    left: 0;
    right: 0;
    @include bg_sub_color();
    overflow: hidden;
    .list-wrapper {
      // width: 100%;
      // height: 100%;
      .list-group {
        .group-title {
          @include bg_color();
          @include font_size($font_medium);
          color: #fff;
          padding: 10px 20px;
          box-sizing: border-box;
        }
        .group-item {
          display: flex;
          justify-content: flex-start;
          padding: 10px 20px;
          border-bottom: 1px solid #ccc;
          img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
          }
          p {
            @include font_size($font_medium);
            @include font_color();
            display: flex;
            align-items: center;
            margin-left: 20px;
          }
        }
      }
    }
    .list-keys {
      position: fixed;
      right: 10px;
      top: 55%;
      transform: translate(0, -50%);
      li {
        @include font_color();
        @include font_size($font_medium_s);
        padding: 3px 0;
        &.active {
          text-shadow: 0 0 10px #000;
          color: pink;
        }
      }
    }
    .fix-title {
      height: 60px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      padding: 10px 20px;
      box-sizing: border-box;
      @include font_size($font_medium);
      color: #fff;
      @include bg_color();
    }
  }
}
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