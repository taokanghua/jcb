<template>
  <div class="btns row ac jc" :class="[type?type:'']" @click.stop="handleClick">
    <slot>test</slot>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  props:{
    type:{
      type: String,
      default:'primary'
    }
  },
  methods:{
    handleClick(evt){
      this.$emit('click', evt)
    }
  }
}
</script>

<style lang="less" scoped>
.btns{
  width: 1.24rem;
	height: 0.51rem;
	border-radius: 0.25rem;
  box-sizing: border-box;
  font-size: 0.21rem;
}
.primary{
  background-color: #2ecb62;
  color: #ffffff;
}
.plain{
  border: solid 0.01rem #a8a8a8;
  color: #a8a8a8;
}
</style>