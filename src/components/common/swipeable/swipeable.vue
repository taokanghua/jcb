<template>
  <div class="limit-box">
    <div
      class="swipeable animation-move"
      ref="swipableBox"
      :style="`transform: translateX(${offsetX}px);${currentHeight}`"
      @transitionend="afterMove"
    >
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    current: { type: Number, default: 0 },
    autoHeight: { type: Boolean, default: true },
    onChange: { type: Function, default: index => {} }, //如果detectHand 为true 必填
    detectHand: { type: Boolean, default: false },
    threshold: { type: Number, default: 0.3 }
  },
  data() {
    return {
      last: -1,
      max: 1,
      currentHeight: 0,
      baseWidth: 0,
      offsetX: 0,
      scrollY: false,
      points: [{ x: 0, y: 0 }, { x: 0, y: 0 }]
    };
  },

  mounted() {
    let el = this.$refs.swipableBox;
    let kids = el.querySelectorAll(".slider");
    let c = this.current;
    for (let i = 0; i < kids.length; i++) {
      if (i == this.current) continue;
      kids[i].children[0].style.display = "none";
    }
    // let temp = document.createDocumentFragment();
    // let i = 0;
    // while (kids.length > 0) {
    //   if (i != c) {
    //     kids[0].style.display = "none";
    //   }
    //   let wrapper = this.buildWrapper(cssKey);
    //   wrapper.appendChild(kids[0]);
    //   temp.appendChild(wrapper);
    //   i++;
    // }
    // el.appendChild(temp);

    this.baseWidth = el.clientWidth;
    this.max = kids.length - 1;
    this.offsetX = -(c * this.baseWidth);
    if (this.detectHand) {
      el.addEventListener("touchstart", this.handleTouchStart);
      el.addEventListener("touchmove", this.handleTouchMove);
      el.addEventListener("touchend", this.handleTouchEnd);
    }
  },
  watch: {
    current(n, o) {
      this.last = o;
      this.$refs.swipableBox.children[n].children[0].style.display = "block";
      this.offsetX = -(n * this.baseWidth);
      if (this.autoHeight) {
        this.updateHeight();
      }
    }
  },
  methods: {
    updateBaseWidth() {
      //主要供父组件在动画完毕之后调用
      let el = this.$refs.swipableBox;
      this.baseWidth = el.clientWidth;
    },
    buildWrapper(cssKey) {
      let div = document.createElement("div");
      div.setAttribute("data-" + cssKey, "");
      return div;
    },
    handleTouchStart(e) {
      let t = e.touches[0];
      this.points[0] = { x: t.pageX, y: t.pageY };
      this.toggleAnimation(); //关闭动画
    },
    handleTouchMove(e) {
      if (this.scrollY) return;
      let t = e.touches[0];
      let index = this.points[1].x != 0 ? 1 : 0;
      let start = this.points[index];
      let xd = t.pageX - start.x;
      let yd = t.pageY - start.y;
      if (Math.abs(xd) < Math.abs(yd)) return (this.scrollY = true); //垂直滚动 不处理

      let p = xd < 0 ? this.current + 1 : this.current - 1;
      p = p > 0 ? p : 0;
      p = p >= this.max ? this.max : p;
      this.$refs.swipableBox.children[p].children[0].style.display = "block";
      let m = this.offsetX + xd;

      this.offsetX = m;
      this.points[1] = { x: t.pageX, y: t.pageY };
    },
    handleTouchEnd(e) {
      this.toggleAnimation();
      if (this.scrollY) {
        this.offsetX = -(this.current * this.baseWidth);
        this.scrollY = false;
        return;
      }
      let t = e.touches[0],
        ps = this.points,
        xd = ps[1].x - ps[0].x,
        yd = ps[1].y - ps[0].y;

      if (
        Math.abs(xd) < Math.abs(yd) ||
        Math.abs(xd) < this.threshold * this.baseWidth
      ) {
        this.offsetX = -(this.current * this.baseWidth);
        return;
      }

      let p = xd < 0 ? this.current + 1 : this.current - 1;
      if (p < 0) {
        p = 0;
      } else if (p > this.max) {
        p = this.max;
      }
      if (p != this.current) {
        this.onChange(p);
      } else {
        this.offsetX = -(p * this.baseWidth);
      }
      this.points = [{ x: 0, y: 0 }, { x: 0, y: 0 }];
    },

    updateHeight() {
      let kids = this.$refs.swipableBox.children;
      this.currentHeight = "height:" + kids[this.current].scrollHeight + "px";
    },

    afterMove() {
      let last = this.last;
      if (last < 0) return;
      this.$refs.swipableBox.children[last].children[0].style.display = "none";
    },
    toggleAnimation() {
      this.$refs.swipableBox.classList.toggle("animation-move");
    }
  }
};
</script>
<style scoped>
.limit-box {
  max-width: 100%;
  overflow-x: hidden;
  height: max-content;
}
.swipeable {
  flex-direction: row;
  direction: ltr;
  display: flex;
  will-change: transform;
  transform: translate(-200%, 0px);
}
.animation-move {
  transition: transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s;
}
</style>
