<template>
  <button @click="showRipple">
    <span class="ripple-label">
      <slot />
    </span>
    <span class="ripple-root" ref="rippleRoot"></span>
  </button>
</template>
<script>
export default {
  name: "rippleBtn",
  data() {
    return {
      lastX: -1,
      lastY: -1
    };
  },
  methods: {
    showRipple(e) {
      // e.preventDefault();
      let el = this.$refs.rippleRoot;
      let rect = el.getBoundingClientRect();
      // let t = e.touches[0];
      let ev = e;
      let x = ev.clientX - rect.left;
      let y = ev.clientY - rect.top;

      let ripple;
      if (el.childElementCount && this.lastX == x && this.lastY == y) {
        ripple = el.children[0].cloneNode(true);
      } else {
        let w, h, t, l;
        let max = Math.max(rect.width, rect.height);
        h = w = max;

        t = y - max / 2;
        l = x - max / 2;

        ripple = this.createRipple(w, h, t, l);
        this.lastX = x;
        this.lastY = y;
      }
      el.append(ripple);
      let circle = ripple.children[0];
      ripple.classList.add("ripple-rippleVisible");

      ripple.addEventListener("animationend", function() {
        this.remove();
      });
    },
    createRipple(w, h, t, l) {
      let el = document.createElement("span");
      el.classList.add("ripple-box");
      el.style.cssText = `width:${w}px;height:${h}px;top:${t}px;left:${l}px`;
      return el;
    }
  }
};
</script>
<style scoped>
button {
  user-select: none;
  color: inherit;
  border: 0;
  cursor: pointer;
  margin: 0;
  display: inline-flex;
  outline: 0;
  padding: 0;
  position: relative;
  align-items: center;
  border-radius: 0;
  vertical-align: middle;
  -moz-appearance: none;
  justify-content: center;
  text-decoration: none;
  background-color: transparent;
  overflow: hidden;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
}
</style>
<style>
/** ripple 是动态添加的 所以它所使用的类 不能是scoped*/
.ripple-label {
  width: 100%;
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
}
.ripple-root {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  position: absolute;
  border-radius: inherit;
  pointer-events: none;
}
.ripple-box {
  opacity: 0;
  position: absolute;
}

.ripple-rippleVisible {
  opacity: 0.3;
  transform: scale(0);
  animation: ripple-effect 550ms cubic-bezier(0.4, 0, 0.2, 1);
  /* animation: ripple-effect 450ms linear; */
  background-color: currentColor;
  border-radius: 50%;
}
@keyframes ripple-effect {
  100% {
    opacity: 0; 
    transform: scale(2);
  }
}
</style>