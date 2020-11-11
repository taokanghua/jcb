<template>
  <div class="apply-refund-wrap">
    <router-link to="/refund/all" tag="div" class="big-card column ac">
      <img src="../../assets/img/退货退款.png" alt="">
      <span class="main">我要退货退款</span>
      <span class="desc">已收货到货物，需先退还货物</span>
    </router-link>
    
    <router-link to="/refund/money" tag="div" class="big-card column ac">
      <img src="../../assets/img/我要退款.png" alt="">
      <span class="main">我要退款(无需退货)</span>
      <span class="desc">未收到货物，或与商家协商后申请物</span>
    </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.apply-refund-wrap{
  padding: 0.23rem 0.27rem;
  height: 100vh;
  background-color: #f6f6f6;
}
.big-card{
  width: 5.81rem;
	height: 2.54rem;
	background-color: #ffffff;
  border-radius: 0.11rem;
  padding-top: 0.4rem;
  margin-bottom: 0.23rem;
  img{
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 50%;
    margin-bottom: 0.17rem;
  }
  .main{
    font-size: 0.27rem;
    color: #000000;
    font-weight: bold;
    margin-bottom: 0.21rem;
  }
  .desc{
    font-size: 0.21rem;
    color: #a8a8a8;
  }
}
</style>