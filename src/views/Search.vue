<template>
  <!-- 搜索界面 -->
  <div class="search">
    <!-- 搜索框所在盒子 -->
    <div class="search-box">
      <!-- 搜索图标 -->
      <img
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg=="
        alt=""
      />
      <!-- 搜索框 -->
      <input
        type="text"
        placeholder="搜索歌曲、歌手、专辑"
        v-model="keyWords"
        v-throttle="search"
      />
    </div>
    <!-- 搜索时候显示的匹配内容 -->
    <div class="search-suggest" v-show="keyWords !== ''">
      <ScrollView>
        <ul>
          <li
            v-for="value in songs"
            :key="value.id"
            @click.stop="selectMusic(value.id)"
          >
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg=="
              alt=""
            />
            <p>{{ value.name }} - {{ value.artists[0].name }}</p>
          </li>
        </ul>
      </ScrollView>
    </div>
    <!-- 热门搜索 -->
    <div class="search-hot">
      <h3>热门搜索</h3>
      <ul>
        <li
          v-for="value in hots"
          :key="value.first"
          @click.stop="selectdHot(value.first)"
        >
          {{ value.first }}
        </li>
      </ul>
    </div>
    <!-- 搜索历史 -->
    <ul class="search-history">
      <li v-for="value in searchHistory" :key="value">
        <div class="history-left">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+"
            alt=""
          />
          <p>{{ value }}</p>
        </div>
        <div class="history-right">
          <!-- 删除图标 -->
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4="
            alt=""
            @click.stop="delHistory(value)"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ScrollView from "../components/ScrollView";
import { setLocalStorage, getLocalStorage } from "../tools/tools";
import { mapActions } from "vuex";
import MetaInfo from "../../vue-meta-info";

// import { getSearchList,getSearchHot } from "../api/index";
export default {
  metaInfo: MetaInfo.search,
  components: {
    ScrollView,
  },
  data() {
    return {
      keyWords: "",
      songs: [],
      hots: [],
      searchHistory: [],
    };
  },
  created() {
    // 拿到热搜列表
    this.getSearchHot();
    // 查看有无搜索历史
    if (
      getLocalStorage("searchHistory") === undefined ||
      getLocalStorage("searchHistory") === null
    ) {
      return;
      // 有的话 赋值给 searchHistory
    } else {
      this.searchHistory = getLocalStorage("searchHistory");
    }
  },
  methods: {
    ...mapActions(["setFullScreen", "setSongDetail"]),
    // 搜索匹配项 的点击
    selectMusic(id) {
      this.setFullScreen(true);
      this.setSongDetail([id]);

      if (this.searchHistory.includes(this.keyWords)) {
        return;
      } else {
        this.searchHistory.push(this.keyWords);
        setLocalStorage("searchHistory", this.searchHistory);
        this.keyWords = "";
      }
    },
    // 把点击的热搜返回给输入框
    selectdHot(words) {
      this.keyWords = words;
      this.search();
    },
    // 删除搜索历史
    delHistory(name) {
      this.searchHistory = this.searchHistory.filter((item) => {
        return item !== name;
      });
      setLocalStorage("searchHistory", this.searchHistory);
    },
    // 通过自定义指令节流
    search() {
      // console.log('发送请求');
      this.getSearchList();
    },
    // 获取搜索内容的ajax请求
    async getSearchList() {
      // const { data: res } = await this.$http.get( `search?keywords=${this.keyWords}` );
      const { data: res } = await this.$http.get(`search`, {
        params: {
          keywords: this.keyWords,
        },
      });
      // console.log(res);
      this.songs = res.result.songs;
    },
    // 获取热搜列表内容
    async getSearchHot() {
      const { data: res } = await this.$http.get(`/search/hot`);
      // console.log(res);
      this.hots = res.result.hots;
      // console.log(this.hots);
    },
  },
  // 在vue中通过自定义指令实现函数节流节流
  directives: {
    throttle: {
      // 指令的定义
      inserted(el, obj) {
        // 清空定时器
        let timerId = null;
        let flag = true;
        // 给绑定的元素添加一个
        el.addEventListener("input", function () {
          if (!flag) return;
          flag = false;
          timerId && clearTimeout(timerId);
          timerId = setTimeout(() => {
            flag = true;
            obj.value();
          }, 1500);
        });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/mixin";
@import "../assets/css/variable";
.search {
  position: fixed;
  left: 0;
  right: 0;
  top: 184px;
  bottom: 0;
  @include bg_sub_color();
  // 搜索框所在盒子
  .search-box {
    display: flex;
    align-items: center;
    margin: 40px 20px;
    background: #ebecec;
    border-radius: 30px;
    border-bottom: 1px solid #cccccc;
    // height: 60px;
    img {
      width: 40px;
      height: 40px;
      margin-left: 20px;
    }
    input {
      border: none;
      outline: none;
      background: transparent;
      @include font_size($font_medium);
      height: 60px;
      margin-left: 20px;
    }
  }
  // 搜索时候显示的匹配内容
  .search-suggest {
    position: fixed;
    left: 0;
    right: 0;
    top: 300px;
    bottom: 0;
    overflow: hidden;
    @include bg_sub_color();
    li {
      display: flex;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #cccccc;
      img {
        width: 40px;
        height: 40px;
      }
      p {
        margin-left: 20px;
        @include font_color();
        @include font_size($font_medium);
      }
    }
  }
  // 热门搜索
  .search-hot {
    h3 {
      @include font_color();
      @include font_size($font_medium);
      padding: 10px 20px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
    }
    li {
      height: 60px;
      line-height: 60px;
      border: 1px solid #cccccc;
      border-radius: 30px;
      @include font_color();
      @include font_size($font_medium_s);
      padding: 0 20px;
      margin: 10px 20px;
    }
  }
  // 搜索历史
  .search-history {
    margin-top: 20px;
    li {
      padding: 20px 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #cccccc;
      .history-left {
        display: flex;
        align-items: center;
        img {
          width: 40px;
          height: 40px;
        }
        p {
          margin-left: 20px;
          @include font_color();
          @include font_size($font_medium_s);
        }
      }
      .history-right {
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
</style>