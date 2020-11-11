<template>
  <div class="preparation column" @click="changeStatus">
    <!-- <i class="iconfont iconshangxia"></i> -->
    <i class="iconfont iconshang" :class="{active:status==1}"></i>
    <i class="iconfont iconxia" :class="{active: status==2}"></i>
  </div>
</template>

<script>
export default {
  data(){
    return{
      status:0
    }
  },
  methods:{
    changeStatus(){
      if(this.status>1){
        this.status = 0
      }else{
        this.status += 1
      }
      // this.status = status
      this.$emit('update:status', this.status)
      // console.log(this.status)
    },
    reset(){ //父重置专用
      this.status = 0
    }
  }
}
</script>

<style lang="less" scoped>
.preparation{
  height: 0.18rem;
  transform: translateY(-10%);
  // justify-content: flex-start;
  i{
    transform: scale(.7);
    font-size: 0.14rem;
    color: #1a1a1a;
    &:last-child{
      transform: translateY(-40%) scale(.7);
    }
  }
}
.active{
  color: #2ecb62!important;
}
</style>