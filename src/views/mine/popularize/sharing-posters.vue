<template>
  <div class="sharing-posters">
    <div class="content column ac">
      <img :src="userInfo.headPortrait" alt="" class="avatar">
      <span class="invite">{{userInfo.nickname}}  邀请您加入金材宝</span>
      <VueQrcode class="qr-code" :value="qrContent"></VueQrcode>
      <!-- <img src="../../../assets/img/分享二维码.png" alt="" class="qr-code"> -->
      <span class="tip">长按识别二维码扫描进入</span>
    </div>
    
    <div class="save-btn row ac jc">保存海报</div>
  </div>
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode'
import config from '@/web.config.js'
export default {
  data(){
    return{
      qrContent:'',
      userInfo:{}
    }
  },
  methods:{
    qr(){
      let appid = config.appid
      this.userInfo = this.$store.state.user.info.memberUserInfoVo
      // let src = encodeURIComponent('http://192.168.2.139:8080/#/loginUp&memberId='+this.userInfo.id)
      let src = encodeURIComponent('https://china-jcb.com/jcb-collect/wechat/#/loginUp&memberId='+this.userInfo.id)
      // this.qrContent = `https://jincaibao-dev.utools.club/jcb-collect/api/login/${appid}/authorize?returnUrl=${src}`
      this.qrContent = `https://china-jcb.com/jcb-collect/api/login/${appid}/authorize?returnUrl=${src}`
    }
  },
  created(){
    this.qr()
  },
  components:{
    VueQrcode
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
    margin-top: 0.25rem;
    width: 2.8rem!important;
	  height: 2.8rem!important;
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