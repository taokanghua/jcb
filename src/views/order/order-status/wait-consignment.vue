<template>
  <div class="wait-consignment-wrap">
    <top-header status="待发货" :info="orderInfo">
      <span>等待商家发货</span>
    </top-header>

    <div class="content">
      <!-- 内容区 padding -->
      <goods-info :info="orderInfo"></goods-info>
      <!-- 结算 -->
      <settlement :info="orderInfo"></settlement>
      <!-- 物流信息 -->
      <other-info :info="orderInfo"></other-info>
    </div>
    <div class="footer">
      <!-- <order-btn type="plain" @click="refund(orderInfo.orderCode)">申请退款</order-btn> -->
      <!-- <order-btn type="primary" @click="confirm">确认收货</order-btn> -->
    </div>
  </div>
</template>

<script>
import api from '../../../api/order'
import statusMix from '../../../minix/order-status'
import topHeader from '../../../components/common/order/top-header'
import goodsInfo from '../../../components/common/order/goods-info'
import settlement from '../../../components/common/order/settlement'
import otherInfo from '../../../components/common/order/other-info'
import orderBtn from '../../../components/common/order/order-btn'
export default {
  data(){
    return{
    }
  },
  mixins:[statusMix],
  methods:{
    refund(orderId){
      this.$router.push({path:'/refund/money', query:{orderId}})
    }
  },
  components:{
    topHeader,
    goodsInfo,
    settlement,
    otherInfo,
    orderBtn
  }
}
</script>

<style lang="less" scoped>
.wait-consignment-wrap{
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