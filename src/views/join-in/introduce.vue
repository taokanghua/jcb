<template>
  <div class="introduce-wrap">
    <img src="../../assets/img/招商banner.png" alt="" />
    <img src="../../assets/img/关于我们.png" alt="" />
    <img src="../../assets/img/遇到的问题.png" alt="" />
    <img src="../../assets/img/摆脱困境.png" alt="" />
    <img src="../../assets/img/关键服务.png" alt="" />
    <img src="../../assets/img/加盟条件.png" alt="" />
    <img src="../../assets/img/底部.png" alt="" />

    <div class="join-btn row ac jc" @click="goInfomation" v-if="joinStatus==0">申请加盟</div>
    <div class="join-btn enable row ac jc" v-if="joinStatus==1">你已有门店</div>
    <div class="join-btn enable row ac jc" v-if="joinStatus==2">申请审核中</div>

  </div>
</template>

<script>
import api from '../../api/home'
export default {
  data() {
    return {
      s_token: "",
      s_alone: false,
      joinStatus:-1, // 0可以申请  1 已有门店  2审核中
    };
  },
  methods: {
    goInfomation() {
      console.log(this.s_token, this.s_alone)
      let { openid } = this.$route.query;
      if (this.s_alone) {
        //单独进来的
        if (this.s_token.length<10) {
          this.showToast("请先注册账号");
          this.$router.push({
            path: "/register",
            query: { alone: true, openid },
          });
        }else{
          this.$router.push({ path: "/information", query: {alone:true} });
        }
      }else {
          this.$router.push({ path: "/information", query: {} });
        }
    },
    async getStatus(){
      let openid = this.$route.query.openid||sessionStorage.getItem('openid')
      let res = await api.getJoinState(openid)
      this.joinStatus = res.result
    }
  },
  created() {
    this.s_token = this.$route.query.token || false;
    this.s_alone = this.$route.query.router || false;

    this.getStatus()
  },
};
</script>

<style lang="less" scoped>
.introduce-wrap {
  height: 100vh;
  overflow: auto;
  box-sizing: border-box;
  padding-bottom: 1rem;
  position: relative;
}
.join-btn {
  width: 5.81rem;
  height: 0.56rem;
  background-color: #2ecb62;
  border-radius: 0.28rem;
  margin: 0.22rem auto;
  font-size: 0.21rem;
  color: #ffffff;
  position: fixed;
  bottom: 0.02rem;
  left: 50%;
  transform: translateX(-50%);
}
.enable{
  background-color: #dddddd;
  color: #a8a8a8;
}
</style>