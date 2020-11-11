<template>
  <div class="wait-pay-wrap">
    <top-header status="待支付">
      <span>剩余: <count-down endTime="2020/11/11" crowd colonColor="#fff"></count-down> </span>
    </top-header>

    <div class="content">
      <!-- 内容区 padding -->
      <goods-info></goods-info>
      <!-- 结算 -->
      <settlement></settlement>
      <!-- 物流信息 -->
      <other-info></other-info>
    </div>
    <div class="footer">
      <order-btn type="plain">取消订单</order-btn>
      <order-btn type="primary">立即支付</order-btn>
    </div>
  </div>
</template>

<script>
import topHeader from '../../../components/common/order/top-header'
import countDown from '../../../components/common/count-down'
import goodsInfo from '../../../components/common/order/goods-info'
import settlement from '../../../components/common/order/settlement'
import otherInfo from '../../../components/common/order/other-info'
import orderBtn from '../../../components/common/order/order-btn'
// import goodsCard from '../../../components/common/card/order-goods-card'
export default {
  data(){
    return{

    }
  },
  methods:{},
  components:{
    topHeader,
    countDown,
    goodsInfo,
    settlement,
    otherInfo,
    orderBtn
    // goodsCard
  }
}
</script>

<style lang="less" scoped>
.wait-pay-wrap{
  height: 100vh;
  padding-bottom: 1rem;
  overflow: scroll;
  background-color: #f6f6f6;
}
.content{
  margin-top: 0.23rem;
  padding: 0 0.27rem;
}
.footer{
  height: 0.83rem;
  background-color: #ffffff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>