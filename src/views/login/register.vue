<template>
  <div class="register-wrap">
    <h3>新用户注册</h3>
    <div class="form">
      <div class="filed">
        <span>手机号码</span>
        <input type="text" placeholder="请输入手机号码" v-model="phone" />
      </div>
      <div class="filed">
        <span>验证码</span>
        <div style="position: relative">
          <input type="text" placeholder="请输入验证码" v-model="verifyMsg" />
          <div class="send-msg" @click="getMessage">{{ waitText }}</div>
        </div>
      </div>
      <div class="filed bottom-border">
        <span>密码</span>
        <input type="text" placeholder="请输入密码 (6 - 12 字母、数字)" v-model="password" />
      </div>
    </div>
    <div class="btn row ac jc" @click="register">注册</div>
    <div class="btn btn-plain row ac jc" @click="$router.push({name:'login'})">返回</div>
  </div>
</template>

<script>
import {Toast} from 'vant'
import api from '../../api/login'
import tokenHolder from '../../utils/tokenHolder';
export default {
  data() {
    return {
      second: 60,
      timer: null,
      waitText: "获取验证码",
      openid:'',
      phone: "",
      password: "",
      verifyMsg: "",

      s_alone:false
    };
  },
  methods: {
    async getMessage() {
      if (this.timer) return;
      //发送请求
      // console.log('send msg')
      this.timer = setInterval(() => {
        if (this.second <= 0) {
          clearInterval(this.timer);
          this.waitText = "获取验证码";
          this.timer = null
          this.second = 60
          return
        }
        this.second -= 1;
        this.waitText = `${this.second}S后重新获取`;
      }, 1000);
      let params = {
            openId:this.openid,
            phone: this.phone,
            service:2 //1登录 2注册 3找回
      }
      let res = await api.getMsgCode(params)
      if(!res.success){
        this.showToast(res.message)
      }
    },
    async register() {
      let isPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(this.password)
      if(!isPwd) return Toast('密码格式错误!')
      let r = [this.phone, this.password, this.verifyMsg].some(v=>!v)
      if(r) return Toast('请按要求填写内容')
      let params ={
        openId: this.openid,
        password:this.password,
        phone: this.phone,
        code: this.verifyMsg
      } 
      let res = await api.register(params)
      if(!res.success)return this.showToast(res.message)
      tokenHolder.set(res.result)
      if(this.s_alone){
        //如果单独招盟进来
        let {openid} = this.$route.query
        this.$router.replace({path:'/introduce', query:{token:res.result, openid, router:true}})
        return
      }
      this.$router.replace({path:'/home'})
    },
  },
  created(){
    this.openid = sessionStorage.getItem('openid')||this.$route.query.openid||''
    this.s_alone = this.$route.query.alone //单独进招商 并且未注册用户
  }
};
</script>

<style lang="less" scoped>
.register-wrap {
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
}
h3 {
  font-size: 0.36rem;
  color: #000;
  font-weight: bold;
  margin-left: 0.4rem;
  margin-top: 0.85rem;
}
.form {
  padding: 0 0.27rem;
  margin-top: 1.2rem;
  margin-bottom: 1.5rem;
  .filed {
    // padding: 0 0.27rem;
    margin-top: 0.34rem;
    span {
      font-size: 0.21rem;
      color: #000;
    }
    input {
      outline: none;
      box-sizing: border-box;
      background-color: none;
      color: #1a1a1a;
      font-size: 0.24rem;
      margin-top: 0.28rem;
      padding-bottom: 0.25rem;
      // border-bottom: 1px solid ;
    }
    .send-msg {
      position: absolute;
      right: 0;
      bottom: 10px;
      color: #2ecb62;
      font-size: 0.24rem;
    }
  }
  .bottom-border {
    border-bottom: 1px solid #dddddd;
  }
}
.btn {
  width: 5.81rem;
  height: 0.68rem;
  background-color: #2ecb62;
  border-radius: 0.34rem;
  color: white;
  font-size: 0.21rem;
  margin: 0.33rem auto 0 auto;
}
.btn-plain {
  background-color: #ffffff;
  border: 1px solid #2ecb62;
  color: #2ecb62;
}
</style>