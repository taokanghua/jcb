<template>
  <div class="login-wrap">
    <div class="tour">先去逛逛</div>
    <h3>欢迎回来</h3>

    <div class="login-way">
      <tabs background="none" color="#2ecb62" v-model="type">
        <tab title="密码登录" name="password" >
          <div class="filed">
            <span>手机号码</span>
            <input type="text" placeholder="请输入手机号码" v-model="phone">
          </div>
          <div class="filed">
            <span>密码</span>
            <input type="password" placeholder="请输入密码" v-model="password">
          </div>
          <div style="padding:0 0.27rem">
            <div class="forget" @click="forget">忘记密码</div>
          </div>
        </tab>
        <tab title="短信登录" name="message">
          <div class="filed">
            <span>手机号码</span>
            <input type="text" placeholder="请输入手机号码" v-model="phone">
          </div>
          <div class="filed">
            <span>验证码</span>
            <div style="position:relative">
              <input type="text" placeholder="请输入验证码" v-model="verifyMsg">
              <div class="send-msg" @click="getMessage">{{waitText}}</div>
            </div>
          </div>
        </tab>
      </tabs>
    </div>


    <div class="login-btn row ac jc" @click="loginIn">登录</div>
    <div class="footer-text">
      还没有账号?<router-link tag="span" :to="{name:'register'}">立即注册</router-link>
    </div>
  </div>
</template>

<script>
import {Tab,Tabs} from 'vant';
export default {
  name:'login',
  data(){
    return{
      type:'password', //登录类型
      second: 60,
      timer:null,
      waitText:'获取验证码',

      phone:'',
      password:'',
      verifyMsg:''
    }
  },
  methods:{
    getMessage(){
      if(this.timer) return
      //发送请求
      // console.log('send msg')
      this.timer = setInterval(()=>{
        if(this.second==0){
          clearInterval(this.timer)
          this.waitText = '获取验证码'
        }
        this.second -= 1
        this.waitText = `${this.second}S后重新获取`
      }, 1000)
    },
    forget(){ //忘记密码
      this.$router.push({name:'forget'})
    },
    loginIn(){
      this.$router.push({name:'home'})
    }
  },
  watch:{
    // second()
  },
  components:{
    Tabs,
    Tab
  }
};
</script>

<style lang="less" scoped>

.login-wrap {
  background-color: #ffffff;
  height: 100vh;
  overflow: hidden;
}
.tour {
  margin-top: 0.41rem;
  text-align: right;
  margin-right: 0.4rem;
  font-size: 0.21rem;
  color: #a8a8a8;
}
h3 {
  font-size: 0.36rem;
  color: #000;
  font-weight: bold;
  margin-left: 0.4rem;
}
.login-way {
  margin: auto;
  margin-top: 1.03rem;
  .filed{
    padding: 0 0.27rem;
    margin-top: 0.34rem;
    span{
      font-size: 0.21rem;
      color: #000;
    }
    input{
      outline: none;
      box-sizing: border-box;
      background-color: none;
      color: #1a1a1a;
      font-size: 0.24rem;
      margin-top: 0.28rem;
      padding-bottom: 0.25rem;
      // border-bottom: 1px solid ;
    }
    .send-msg{
      position: absolute;
      right: 0;
      bottom: 10px;
      color: #2ecb62;
      font-size: 0.24rem;
    }
  }
  .forget{
    font-size: 0.24rem;
    color: #1a1a1a;
    padding: 0.16rem 0;
    border-top: 1px solid #cccccc;
  }
}
.login-btn{
  width: 5.81rem;
  height: 0.68rem;
  color: #ffffff;
	background-color: #2ecb62;
  border-radius: 0.34rem;
  margin: 1.24rem auto 0 auto;
}
.footer-text{
  margin: 0.33rem auto;
  font-size: 0.21rem;
  color: #1a1a1a;
  text-align: center;
  span{
    color: #2ecb62;
    margin-left: 0.08rem;
    // text-align: center;
  }
}
/deep/ .van-tab{
  font-size: 0.27rem;
}
/deep/ .van-tabs__nav{
  padding: 0 1.4rem;
  box-sizing: border-box;
}
/deep/ .van-tabs__line{
  bottom:0.08rem;
}
</style>