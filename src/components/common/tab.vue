<template>
<div>
  <div class="tab-box" ref="tabBox" :class="{'fixed':fixed}">
    <div
      v-for="(item,index) in tabs"
      :key="index"
      :class="{'showing-tab':index==current}"
      @click="switchTab(index)"
    >{{item}}</div>
    <div class="indicator" ref="indicatorEl" :style="`transform:translateX(${offsetLeft})`"></div>
  </div>
  <div v-if="fixed" :style="`height:${tabHeight}px`"></div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: { type: Array, default: () => [] },
    fixed:{type:Boolean, default:false},
    current: { type: Number, default: () => 0 },
    onTabSwitch: { type: Function, default: index => {} }
  },
  data: () => {
    return {
      offsetLeft: 0,
      tabHeight:0,
    };
  },
  watch: {
    current(n) {
      this.updateIndicator(n);
    }
  },
  mounted() {
    this.updateIndicator(this.current);
    if (this.current != 0) {
      this.onTabSwitch(this.current);
    }
    if(this.fixed){
      this.tabHeight=this.$refs.tabBox.children[0].clientHeight
    }
  },
  methods: {
    switchTab(index) {
      if (this.current == index) return;
      this.updateIndicator(index);
      this.onTabSwitch(index);
    },
    updateIndicator(index) {
      let box = this.$refs.tabBox.children[index];
      let selfHalf = (this.$refs.indicatorEl.clientWidth / 2) | 0;
      this.offsetLeft =
        box.offsetLeft + ((box.clientWidth / 2) | 0) - selfHalf + "px";
    }
  }
};
</script>

<style lang="less" scoped>
.tab-box {
  position: relative;
  display: flex;
  justify-content: space-around;
  background: white;
  height: 2em;
  line-height: 2em;
  box-shadow: inset 0 -1px #e2e2e2;
}
.fixed {
  position: fixed;
  z-index: 2;
  width: 100%;
}
.indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  width: 1.5em;
  height: 2px;
  background: var(--primary);
}
.showing-tab {
  color: var(--primary);
}
</style>
