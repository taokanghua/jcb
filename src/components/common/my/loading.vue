<template>
  <div class="loading-wrap" v-show="isShow">
    <!-- 遮罩层 开盖即用 -->
    <!-- <overlay :show="isShow"/> -->
    <div class="loading-box column ac jc" v-show="isShow">
      <img src="../../../assets/img/loading.gif" alt="">
      <span><slot>{{msg}}</slot></span>
    </div>
  </div>
</template>

<script>
import { Overlay } from 'vant';
export default {
  data(){
    return{
      isShow:false,
      msg:'加载中...'
    }
  },
  methods:{
    load(){
      this.isShow = true
    },
    hide(){
      this.isShow = false
    }
  },
  components:{
    Overlay
  }
}
</script>

<style lang="less" scoped>
.loading-wrap{
  height: 100vh;
  width: 100vw;
  position: absolute;
  left: 0;
  top: 0;
  .loading-box{
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.3rem;
    border-radius: 0.11rem;
    // width: 1.2rem;
    // height: 1.2rem;
    background-color: rgba(0, 0, 0, .8);
    img{
      width: 1.2rem;
      height: 1.2rem;
    }
    span{
      font-size: 0.21rem;
      color: #ffffff;
    }
  }
}
</style>