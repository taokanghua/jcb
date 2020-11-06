<template>
  <safe-bar class="footer">
    <div @click="goTo(0, '/home')">
      <ripple>
        <i class="iconfont iconshouye" :class="{ active: current == 0 }"></i>
        <span :class="[current == 0 ? 'active' : '']">首页</span>
      </ripple>
    </div>
    <div @click="goTo(1, '/kinds')">
      <ripple>
        <i class="iconfont iconfenlei" :class="{ active: current == 1 }"></i>
        <span :class="[current == 1 ? 'active' : '']">分类</span>
      </ripple>
    </div>
    <div @click="goTo(2, '/shoppingCar')">
      <ripple>
        <i class="iconfont icongouwuche" :class="{ active: current == 2 }"></i>
        <span :class="[current == 2 ? 'active' : '']">购物车</span>
      </ripple>
    </div>

    <div @click="goTo(4, '/mine')">
      <ripple>
        <i class="iconfont iconwode" :class="{ active: current == 4 }"></i>
        <span :class="[current == 4 ? 'active' : '']">我的</span>
      </ripple>
    </div>
  </safe-bar>
</template>

<script>
import ripple from "./rippleBtn.vue";
import safeBar from "./safeBottomBar.vue";

export default {
  data() {
    return {
      isChoice: true,
      current: -1,
    };
  },
  watch: {
    $route(to, from) {
      if (!this.isDeep) {
        if (!sessionStorage.getItem("routerDeepIn")) {
          let deep = to.path.match(/\//gi).length;
          if (deep > 1) {
            this.isDeep = true;
            sessionStorage.setItem("routerDeepIn", 1);
          }
        } else {
          this.isDeep = true;
        }
      }
      this.current = ["/", "/kinds", "/shoppingCar", "/mine"].findIndex(
        (v) => v == to.path
      );
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
  created() {
    let n = this.$route.path;
    this.current = ["/", "/kinds", "/shoppingCar", "/mine"].findIndex(
      (v) => v == n
    );
  },
  methods: {
    goTo(index, path) {
      if (index == this.current) return;
      this.current = index;
      this.$router.replace(path);
    },
  },
  components: {
    ripple,
    safeBar,
  },
};
</script>
<style lang="less" scoped>
.footer-space {
  height: 0.83rem;
  background-color: #f5f5f5;
}
.footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  background: #fff;
  box-shadow: 0 -1px rgba(0, 0, 0, 0.04);
  z-index: 9;
  display: flex;
  height: 1rem;
}

.footer > div {
  flex: 1;
  text-align: center;
}
.footer /deep/ button {
  padding: 8% 0;
  width: 100%;
  color: var(--primary);
}
.footer /deep/.ripple-label {
  display: block;
  color: #b5b5b5;
}

.footer .ripple-label > i {
  font-size: 0.39rem;
  display: block;

  &.active {
    color: #6665dd;
    // color: linear-gradient(18deg, #91d4fe 100%);
    // background-image: linear-gradient(
    //     0deg,
    //     #fd595c 0%,
    //     #a586a9 0%,
    //     #4cb3f5 0%,
    //     #91d4fe 100%
    // );
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
  }
}

.footer .ripple-label > span {
  font-size: 0.17rem;
  display: block;
  padding-top: 0.03rem;

  &.active {
    color: #6665dd;
  }
}

.router-link-active .ripple-label > i,
.router-link-active .ripple-label > span {
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.icon-ceshi1 {
  transform: scale(1.1);
}
.icon-zixun1,
.icon-xuexi {
  transform: scale(1.3);
}
</style>
