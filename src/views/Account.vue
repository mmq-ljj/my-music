<template>
  <!-- 个人中心 -->
  <transition appear>
    <div class="account">
      <AccountHeader @switchItem="switchItem"></AccountHeader>
      <AccountBottom :switchNum="switchNum"></AccountBottom>
    </div>
  </transition>
</template>

<script>
import AccountHeader from "../components/Account/AccountHeader";
import AccountBottom from "../components/Account/AccountBottom";
export default {
  name: "Account",
  components: {
    AccountHeader,
    AccountBottom,
  },
  methods: {
    switchItem(num) {
      this.switchNum = num;
    },
  },
  data() {
    return {
      switchNum: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/mixin";
@import "../assets/css/variable";
.account {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  // background-color: #f00;
  @include bg_sub_color();
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