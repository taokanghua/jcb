<template>
  <div class="wait-consignment-wrap">
    <top-header status="退款中">
      <span>等待商家确认，剩余 <count-down endTime="2020/11/12" crowd colonColor="#fff"></count-down></span>
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
      <order-btn type="primary">撤销退款</order-btn>
    </div>
  </div>
</template>

<script>
import topHeader from '../../../components/common/order/top-header'
import goodsInfo from '../../../components/common/order/goods-info'
import settlement from '../../../components/common/order/settlement'
import otherInfo from '../../../components/common/order/other-info'
import orderBtn from '../../../components/common/order/order-btn'
import countDown from '../../../components/common/count-down'
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
    orderBtn,
    countDown
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