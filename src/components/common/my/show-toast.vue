<template>
  <div class="toast-wrap" :class="[isShow?'on':'off']">
    {{title}}
  </div>
</template>

<script>
export default {
  data(){
    return{
      isShow:false,
      title:''
    }
  },
  props:{
    // title:{
    //   type:String,
    //   default:''
    // },
    // duration:{
    //   type:[String, Number],
    //   default: 1500
    // }
  },
  // watch:{
  //   isShow(n){
  //     if(n){
  //       setTimeout(()=>{
  //         this.isShow = false
  //       }, this.duration)
  //     }
  //   }
  // }
}
</script>

<style lang="less" scoped>
.toast-wrap{
  position: fixed;
  left: 50%;
  top: 40%;
  transform: translateX(-50%);
  padding: 0.15rem 0.3rem;
  background: rgba(0, 0, 0, .8);
  color: #fff;
  font-size: 0.22rem;
  // background-color: red;
  border-radius: 0.12rem;
}
.on{
  opacity: 1;
  transition: all 1s;
}
.off{
  opacity: 0;
  transition: all .5s;
}
</style>