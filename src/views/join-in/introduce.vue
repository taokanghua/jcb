<template>
  <div class="introduce-wrap">
    <img src="../../assets/img/招商banner.png" alt="">
    <img src="../../assets/img/关于我们.png" alt="">
    <img src="../../assets/img/遇到的问题.png" alt="">
    <img src="../../assets/img/摆脱困境.png" alt="">
    <img src="../../assets/img/关键服务.png" alt="">
    <img src="../../assets/img/加盟条件.png" alt="">
    <img src="../../assets/img/底部.png" alt="">

    <router-link to="/information" tag="div" class="join-btn row ac jc">申请加盟</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.introduce-wrap{
  height: 100vh;
  overflow: auto;
  box-sizing: border-box;
  padding-bottom: 1rem;
  position: relative;
}
.join-btn{
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
</style>