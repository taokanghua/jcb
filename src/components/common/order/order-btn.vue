<template>
  <div class="btn row ac jc" :class="[type?type:'primary']" @click="handleClick">
    <slot></slot>
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
      type:String,
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
.btn{
  width: 1.24rem;
	height: 0.51rem;
  border-radius: 0.25rem;
  font-size: 0.21rem;
  margin-right: 0.27rem;
  box-sizing: border-box;
}
.plain{
  color: #a8a8a8;
  border: solid 0.01rem #a8a8a8;
}
.primary{
  background-color: #2ecb62;
  color: #ffffff;
}
</style>