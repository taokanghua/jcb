<template>
  <div class="sharing-posters">
    <div class="content">
      <div class="title">注册</div>
      <div class="input-wrap">
        <input type="text" placeholder="请输入手机号码">
        <i class="iconfont iconphone"></i>
      </div>
      <div class="input-wrap row ac">
        <input type="text" placeholder="请输入验证码">
        <i class="iconfont iconmessage"></i>
        <div class="send-msg row ac jc" @click="getMessage">{{waitText}}</div>
      </div>
      <div class="input-wrap row ac">
        <input type="text" placeholder="请输入密码">
        <i class="iconfont iconlock"></i>
      </div>
      <router-link to="/registered?type=1" tag="div" class="btn row ac jc">注册并关注金材宝</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
       second: 5,
       timer:null,
       waitText:'获取验证码',
    }
  },
  methods:{
    getMessage(){
      if(this.timer) return
      this.timer = setInterval(()=>{
        if(this.second<=0){
          this.second = 60
          clearInterval(this.timer)
          this.timer = null //这里一定要放下面 并且重置状态
          this.waitText = '获取验证码'
          return
        }
        this.second -= 1
        this.waitText = `${this.second}S获取`
      }, 1000)
    },
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
	height: 6.21rem;
	background-color: #ffffff;
	box-shadow: 0rem 0rem 0.23rem 0rem rgba(0, 0, 0, 0.16);
	border-radius: 0.27rem;
  border: solid 0.08rem #518bf9;
  padding: 0.4rem 0.35rem;
  box-sizing: border-box;
  position: absolute;
  top: 4.32rem;
  left: 50%;
  transform: translateX(-50%);
  .title{
    font-size: 0.31rem;
    color: #222222;
    font-weight: bold;
    text-align: center;
    margin-bottom: 0.3rem;
  }

}
.input-wrap{
  position: relative;
  margin-bottom: 0.34rem;
  input{
    height: 0.75rem;
    background-color: #f5f5f5;
    border-radius: 0.11rem;
    font-size: 0.24rem;
    color: #a8a8a8;
    padding-left: 0.9rem;
    box-sizing: border-box;
  }
  i{
    font-size: 0.3rem;
    color: #a8a8a8;
    position: absolute;
    left: 0.23rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .send-msg{
    width: 2rem;
    height: 0.75rem;
    background-color: #7a75f6;
    border-radius: 0.11rem;
    margin-left: 0.11rem;
    color: #ffffff;
    font-size: 0.2rem;
  }
}
.btn{
	height: 0.75rem;
	background-color: #7a75f6;
  border-radius: 0.11rem;
  margin-top: 0.7rem;
  font-size: 0.24rem;
  color: #ffffff;
}
</style>