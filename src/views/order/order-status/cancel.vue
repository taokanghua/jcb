<template>
  <div class="wait-consignment-wrap">
    <top-header status="已取消" :info="orderInfo">
      <!-- 这里两种 要么超时 要么不显示 -->
      <span v-if="orderInfo.timeout==1">取消原因:超时未支付</span>
      <span></span>
    </top-header>

    <div class="content">
      <!-- 内容区 padding -->
      <goods-info :info="orderInfo"></goods-info>
      <!-- 结算 -->
      <settlement :info="orderInfo"></settlement>
      <!-- 物流信息 -->
      <other-info cancel :info="orderInfo"></other-info>
    </div>
    <!-- <div class="footer">
      <order-btn type="plain">申请退款</order-btn>
      <order-btn type="primary">确认收货</order-btn>
    </div> -->
  </div>
</template>

<script>
import api from '../../../api/order'
import topHeader from '../../../components/common/order/top-header'
import goodsInfo from '../../../components/common/order/goods-info'
import settlement from '../../../components/common/order/settlement'
import otherInfo from '../../../components/common/order/other-info'
export default {
  data(){
    return{
      orderId:'',
      orderInfo:{}
    }
  },
  methods:{
    async getOrderInfo(){
      let res = await api.getOrder(this.orderId)
      this.orderInfo = res.result
      this.endTime = new Date(this.orderInfo.commitTime).valueOf()+86400000
    },
  },
  created(){
    this.orderId = this.$route.query.orderId
    this.getOrderInfo()
  },
  components:{
    topHeader,
    goodsInfo,
    settlement,
    otherInfo
  }
}
</script>

<style lang="less" scoped>
.wait-consignment-wrap{
  height: 100vh;
  overflow: scroll;
  background-color: #f6f6f6;
}
.content{
  margin-top: 0.23rem;
  padding: 0 0.27rem;
}

</style>