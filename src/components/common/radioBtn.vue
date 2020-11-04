<template>
  <div class="y-radio" :class="{'radio-checked':checked}" @click="handleClick">
    <div></div>
  </div>
</template>
<script>
export default {
  name:"radioBtn",
  props: { checked: { type: Boolean, default: false } },
  methods:{
    handleClick(){
      this.$emit('oncheck')
    }
  }

};
</script>

<style scoped>
.y-radio {
  height: 0.3rem;
  width: 0.3rem;
  border-radius: 50%;
  border: 1px solid;
  border-color: gray;
  display: flex;
  box-sizing: initial;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}
.y-radio > div {
  width: 70%;
  height: 70%;
  background: gray;
  border-radius: 50%;
  transition: transform 225ms;
  transform: scale(0);
}
.radio-checked {
  border-color: var(--primary);
}
.radio-checked > div {
  background: var(--primary);
  transform: scale(0.8);
}
</style>