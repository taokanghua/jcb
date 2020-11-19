<template>
  <div class="login-wrap">
    <router-link to="/home" tag="div" class="tour">先去逛逛</router-link>
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

    
    <div class="login-btn row ac jc" @click="clear">clear token</div>
    <div class="login-btn row ac jc" @click="loginIn">登录</div>
    <div class="footer-text">
      还没有账号?<router-link tag="span" :to="{name:'register'}">立即注册</router-link>
    </div>
  </div>
</template>

<script>
import {Tab,Tabs} from 'vant';
import api from '../../api/login'
import tokenHolder from '../../utils/tokenHolder';
export default {
  name:'login',
  data(){
    return{
      type:'password', //登录类型
      second: 60,
      timer:null,
      waitText:'获取验证码',
      openid:'',

      phone:'',
      password:'',
      verifyMsg:''
    }
  },
  methods:{
    clear(){ //开发清除token专用
      tokenHolder.remove()
      this.showToast('清除token成功！🎉')
    },
    getMessage(){
      if(this.timer) return
      //发送请求
      // console.log('send msg')
      this.timer = setInterval(()=>{
        if(this.second<=0){
          clearInterval(this.timer)
          this.timer = null
          this.waitText = '获取验证码'
          this.second = 60
          return
        }
        this.second -= 1
        this.waitText = `${this.second}S后重新获取`
      }, 1000)
      //发送请求
          let params ={
            openId:this.openid,
            phone: this.phone,
            service:1 //1登录 2注册 3找回
          }
          api.getMsgCode(params)
    },
    forget(){ //忘记密码
      this.$router.push({name:'forget', query:{phone:this.phone}})
    },
    async loginIn(){
      let access = false
      let phone = /^1[0-9]{10}$/.test(this.phone)
      if(this.type=='password'){
        //如果是密码登录  true 表示不通过
        access = [phone, this.password].some(v=>!v)
      }else{
        access = [phone, this.verifyMsg].some(v=>!v)
      }
      if(!access){
        let res = {}
        if(this.type=='password'){
          res = await this.pwdWay()
        }else{
          res = await this.verifyWay()
        }
        //拿结果做判断
        if(res.success){
          tokenHolder.set(res.result)
          this.$router.replace({name:'home'})
        }else{
          this.showToast(res.message, 2500)
        }
      }else{
        this.showToast('请输入完整的内容！')
      }
      //console.log(access)
    },
    pwdWay(){ //密码登录
      let params = {
          openId: this.openid,
          password: this.password,
          phone: this.phone,
          type: 1 //1密码 2 验证码
      }
      return api.loginIn(params)
    },
    verifyWay(){//验证码登录
      let params = {
          openId: this.openid,
          code: this.verifyMsg,
          phone: this.phone,
          type: 2 //1密码 2 验证码
      }
      return api.loginIn(params)
    }
  },
  watch:{
    // second()
  },
  created(){
    this.openid = this.$store.state.openid
    // console.log(this.openid)
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