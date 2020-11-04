<template>
  <div class="bottom-bar" :class="{'lift-up':shouldLiftUp()}">
    <slot></slot>
    <div class="same" v-html="same"></div>
  </div>
</template>
<style scoped>
.bottom-bar {
  position: fixed;
  bottom: 0%;
  width: 100%;
  min-height: 0.6rem;
}
.same {
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
}

.lift-up {
  padding-bottom: 0.2rem;
}
.lift-up > .same:not(:empty) {
  display: block;
}
</style>
<script>
import { shouldLiftUp } from "../../utils/iosOnly";
export default {
  name: "safeBottomBar", //ios全面屏 底部自动根据情况升高一点点
  props: { sameBg: { type: String, default: undefined } }, //空白处与指定子元素保持相同的颜色
  data() {
    return { same: "", nodeArr: [] };
  },
  methods: {
    shouldLiftUp,
    bgColorSyncChild(childSelector) {
      let sameEl = this.$children[0].$el;
      if (!this.$el.classList.contains("lift-up")) return;
      let box = this.$el.getBoundingClientRect();
      let nodeArr = Array.from(this.$el.querySelectorAll(childSelector));
      let kidsRect = nodeArr.map((v) => v.getBoundingClientRect());
      if (kidsRect.some((v) => v.width != box.width)) {
        //如果内部有多个不同宽度的元素
        let str = kidsRect.reduce((pre, v, i) => {
          let sty = ["width", "left"]
            .map(
              (k) => `${k}:${v[k]}px;height:${box.height}px;position: absolute;`
            )
            .join(";");
          return `${pre}<div style="${sty};background:${
            getComputedStyle(nodeArr[i]).background
          }"></div>`;
        }, "");
        this.same = str;
        nodeArr.forEach((v) => {
          v.style.cssText = `background:unset;z-index:2`;
        });
        this.nodeArr = nodeArr;
        return;
      }
      sameEl = nodeArr[0];
      this.$el.style.background = getComputedStyle(sameEl).background;
      sameEl.style.background = "unset";
    },
  },
  mounted() {
    if (this.sameBg == undefined) return;
    this.bgColorSyncChild(this.sameBg);
  },
  beforeDestroy() {
    this.nodeArr.forEach((v) => (v.style.cssText = ""));
  },
};
</script>