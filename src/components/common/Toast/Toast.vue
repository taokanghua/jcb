<template>
  <div
    v-show="show"
    class="row sb ac snack-bar"
    :class="{[position]:true,[type]:true,'close':!open}"
  >
    <div class="btn">
      <svg viewBox="0 0 24 24">
        <path
          id="leadIcon"
          d="M 12 2 C 6.48 2 2 6.48 2 12 s 4.48 10 10 10 s 10 -4.48 10 -10 S 17.52 2 12 2 Z m -2 15 l -5 -5 l 1.41 -1.41 L 10 14.17 l 7.59 -7.59 L 19 8 l -9 9 Z"
        />
      </svg>
    </div>
    <div class="text-box">{{msg}}</div>
    <div class="btn" @click="onClose">
      <svg viewBox="0 0 24 24">
        <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        />
      </svg>
    </div>
  </div>
</template>
<script>
export default {
  name: "Toast",
  data() {
    return {
      open: false,
      msg: "",
      type: "succese", // succese,warn,error,info
      position: "center", //top,center,bottom
      duration: 3000,
      onClose: () => {},
      show: false
    };
  }
};
</script>


<style scoped>
.snack-bar {
  padding: 1% 2%;
  min-width: 5rem;
  color: white;
  width: max-content;
  height: max-content;
  position: fixed;
  left: 50%;
  animation-duration: 225ms;
  animation-fill-mode: forwards;
  min-height: 0.8rem;
  border-radius: 0.04rem;
  max-width: 85%;
  box-sizing: border-box;
  transform: translateX(-50%);
  z-index: 9999999;
}
.btn {
  display: block;
  width: 0.35rem;
  height: 0.35rem;
  padding: 0.1rem;
  flex-shrink: 0;
}
svg {
  fill: currentColor;
  width: 100%;
  height: 100%;
}
.text-box {
  text-align: left;
}

.snack-bar.top {
  animation-name: top-in;
}
.top.close {
  animation-name: top-out;
}
.snack-bar.center {
  animation-name: center-in;
}
.center.close {
  animation-name: center-out;
}
.snack-bar.bottom {
  animation-name: bottom-in;
}
.bottom.close {
  animation-name: bottom-out;
}

.warn {
  background-color: #ffa000;
}
.error {
  background-color: #d32f2f;
}
.success {
  background-color: #43a047;
}
.info {
  color: black;
  background: #f3f3f3;
}

.error #leadIcon {
  d: path(
    "M 12 2 C 6.48 2 2 6.48 2 12 s 4.48 10 10 10 s 10 -4.48 10 -10 S 17.52 2 12 2 Z m 1 15 h -2 v -2 h 2 v 2 Z m 0 -4 h -2 V 7 h 2 v 6 Z"
  );
}
.warn #leadIcon {
  d: path(
    "M 1 21 h 22 L 12 2 L 1 21 Z m 12 -3 h -2 v -2 h 2 v 2 Z m 0 -4 h -2 v -4 h 2 v 4 Z"
  );
}
.info #leadIcon {
  d: path(
    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
  );
}

@keyframes top-in {
  from {
    top: -5%;
    opacity: 0;
  }
  to {
    opacity: 1;
    top: 5%;
  }
}
@keyframes top-out {
  0% {
    opacity: 1;
    top: 5%;
  }
  100% {
    opacity: 0;
    top: -5%;
  }
}
@keyframes center-in {
  from {
    top: 40%;
    opacity: 0;
  }
  to {
    opacity: 1;
    top: 50%;
  }
}
@keyframes center-out {
  0% {
    opacity: 1;
    top: 50%;
  }
  100% {
    opacity: 0;
    top: 40%;
  }
}
@keyframes bottom-in {
  from {
    bottom: -5%;
    opacity: 0;
  }
  to {
    opacity: 1;
    bottom: 5%;
  }
}
@keyframes bottom-out {
  0% {
    opacity: 1;
    bottom: 5%;
  }
  100% {
    opacity: 0;
    bottom: -5%;
  }
}
</style>