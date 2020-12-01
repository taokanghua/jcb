<template>
  <div class="setpwd-wrap">
    <h3>设置新密码</h3>
    <div class="form">
      <div class="filed bottom-border">
        <span>新密码</span>
        <input placeholder="请输入新密码 (6 - 12 字母、数字)" type="password" v-model="oldPwd" />
      </div>
      <div class="filed">
        <span>再次输入</span>
        <input type="password" placeholder="请再次输入新密码" v-model="newPwd" />
      </div>
    </div>

    <div class="btn row ac jc" @click="confirm">确定</div>
    <div class="btn btn-plain row ac jc" @click="$router.push({name:'login'})">返回</div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import api from '../../api/login'
export default {
  data() {
    return {
      oldPwd: "",
      newPwd: "",
      phone:'',
      voucher:'',
      openId: sessionStorage.getItem('openid')
    };
  },
  methods:{
    async confirm() {
      if(!this.oldPwd || !this.newPwd){
        this.showToast('请输入密码')
        return
      }
      if(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(this.oldPwd)){
        //格式验证通过
        if(this.oldPwd == this.newPwd){
          //修改密码
          let params = {
            password: this.newPwd,
            phone:this.phone,
            voucher:this.voucher,
            openId: this.openId
          }
          let res = await api.update(params)
          if(res.success){
            this.showToast('修改成功！')
            this.$router.replace({path:'/login'})
          }else{
            this.showToast(res.message)
          }
        }else{
          this.showToast('两次密码不一致')
        }
      }else{
        Toast('请输入6~12位字母加数字密码');
      }
    },
  },
  created(){
    let {phone, code } = this.$route.query
    this.phone = phone
    this.voucher = code
  }
};
</script>

<style lang="less" scoped>
.setpwd-wrap {
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
  margin-top: 2rem;
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