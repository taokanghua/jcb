<template>
  <div class="y-loading">
    <svg class="outside-ani" viewBox="22 22 44 44">
      <circle class="inside-ani" cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6" />
    </svg>
  </div>
</template>
<script>
export default {
  name: "loading",
};
</script>
<style scoped>
.y-loading {
  color: var(--primary);
  width: 0.6rem;
  height: 0.6rem;
  display: inline-block;
  line-height: 1;
  margin:auto;
}
svg {
  color: currentColor;
}
.outside-ani {
  animation: circular-rotate 1.4s linear infinite;
}
.inside-ani {
  animation: circular-dash 1.4s ease-in-out infinite;
  stroke-dasharray: 80px, 200px;
  stroke-dashoffset: 0px;
}

circle {
  stroke: currentColor;
}
@keyframes circular-rotate {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes circular-dash {
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0px;
  }
  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
}
</style>