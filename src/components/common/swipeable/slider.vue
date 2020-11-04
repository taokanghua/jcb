<template>
  <div class="slider">
      <slot/>
  </div>
</template>
<style scoped>
.slider {
  width: 100%;
  flex-shrink: 0;
  overflow: auto;
  height:max-content;
}
</style>

<script>
export default {
    name:'slider'
}
</script>