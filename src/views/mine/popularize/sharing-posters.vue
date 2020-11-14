<template>
  <div class="sharing-posters">
    <div class="content column ac">
      <img src="../../../assets/img/分享头像.png" alt="" class="avatar">
      <span class="invite">夜雨泪痕  邀请您加入金材宝</span>
      <img src="../../../assets/img/分享二维码.png" alt="" class="qr-code">
      <span class="tip">长按识别二维码扫描进入</span>
    </div>
    
    <div class="save-btn row ac jc">保存海报</div>
  </div>
</template>

<script>
export default {

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
  .avatar{
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 50%;
    transform: translateY(-50%);
    margin-bottom: -0.4rem;
  }
  .invite{
    font-size: 0.24rem;
    color: #222222;
  }
  .qr-code{
    margin-top: 0.45rem;
    width: 2.63rem;
	  height: 2.64rem;
  }
  .tip{
    font-size: 0.21rem;
    color: #666666;
    margin-top: 0.45rem;
  }
}
.save-btn{
  width: 5.81rem;
	height: 0.56rem;
	background-color: #7a75f6;
  border-radius: 0.28rem;
  font-size: 0.21rem;
  color: #ffffff;
  position: fixed;
  bottom: 0.66rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>