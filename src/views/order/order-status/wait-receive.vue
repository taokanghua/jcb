<template>
  <div class="wait-consignment-wrap">
    <top-header status="待收货">
      <span>商家已发货，等待送货上门</span>
    </top-header>

    <div class="content">
      <!-- 内容区 padding -->
      <goods-info></goods-info>
      <!-- 结算 -->
      <settlement></settlement>
      <!-- 物流信息 -->
      <other-info plus></other-info>
    </div>
    <div class="footer">
      <order-btn type="plain">查看物流</order-btn>
      <order-btn type="plain">申请退款</order-btn>
      <order-btn type="primary">确认收货</order-btn>
    </div>
  </div>
</template>

<script>
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
  methods:{},
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