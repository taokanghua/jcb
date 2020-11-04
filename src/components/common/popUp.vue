<template>
  <div class="pop-up" ref="pop">
    <div class="y-modal" :class="{'fade-show':liftUp}" @click="handelModalClick()"></div>
    <div class="y-menu" :class="{'up':liftUp,[position]:true}">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: { type: Boolean, default: false },
    position: { type: String, default: "bottom" }, //有限枚举，可接受 bottom center
  },
  data() {
    return {
      liftUp: false
    };
  },
  watch: {
    show(n) {
      n ? this.up() : this.down();
    }
  },
  methods: {
    up() {
      this.$refs.pop.style.display = "unset";
      setTimeout(() => {
        this.liftUp = true;
      }, 50);
    },
    down() {
      this.liftUp = false;
      setTimeout(() => {
        this.$refs.pop.style.display = "none";
      }, 300);
    },
    handelModalClick(){
      this.$emit('onModalClick')
    }
  }
};
</script>

<style scoped>
.pop-up {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: none;
  z-index: 999999;
}
.y-modal {
  opacity: 0;
  transition: opacity 225ms;
  background: rgba(0, 0, 0, 0.5);
  height: inherit;
}
.y-menu {
  position: absolute;
  width: 100vw;
  transition: transform 225ms;
}
.bottom {
  bottom: 0;
  left: 0;
  transform: translateY(100%);
}
.center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
}
.fade-show {
  opacity: 1;
}
.up {
  transform: translateY(0%);
}
.center.up {
  transform: translate(-50%, -50%) scale(1);
}
</style>