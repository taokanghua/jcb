<template>
  <div class="sharing-posters">
    <div class="content column ac">
      <span class="invite"> <strong v-show="type">注册成功!</strong> <span v-show="!type">你已注册金材宝平台</span> <br> 请扫一扫下方二维码进入公众号</span>
      <img src="../../../assets/img/已注册时.png" alt="" class="qr-code">
      <span class="tip">长按识别二维码扫描进入</span>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      type: null
    }
  },
  created(){
    //获取type 判断是否已经注册过
    this.type = this.$route.query.type||null
  }
}
</script>

<style lang="less" scoped>
.sharing-posters{
  height: 100vh;
  background-image: url('../../../assets/img/bg.png');
  //background-position: 1rem 0;
  background-size: 100% 100%;
  position: relative;
}
.content{
  width: 5.55rem;
	height: 5.13rem;
	background-color: #ffffff;
	box-shadow: 0rem 0rem 0.23rem 0rem rgba(0, 0, 0, 0.16);
	border-radius: 0.27rem;
  border: solid 0.08rem #518bf9;
  position: absolute;
  top: 4.32rem;
  left: 50%;
  transform: translateX(-50%);
  .invite{
    font-size: 0.24rem;
    color: #222222;
    text-align: center;
    margin-top: 0.5rem;
  }
  .qr-code{
    margin-top: 0.45rem;
    width: 2.26rem;
	  height: 2.26rem;
  }
  .tip{
    font-size: 0.21rem;
    color: #666666;
    margin-top: 0.45rem;
  }
}

</style>