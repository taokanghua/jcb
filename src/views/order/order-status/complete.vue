<template>
  <div class="complete-wrap">
    <top-header status="交易成功" :info="orderInfo">
      <span></span>
    </top-header>

    <div class="content">
      <!-- 内容区 padding -->
      <goods-info :info="orderInfo"></goods-info>
      <!-- 结算 -->
      <settlement :info="orderInfo"></settlement>
      <!-- 物流信息 -->
      <other-info all :info="orderInfo"></other-info>
    </div>
    <div class="footer">
      <order-btn type="plain" @click="evaluate" v-if="orderInfo.isComment!=1">去评价</order-btn>
    </div>
  </div>
</template>

<script>
import api from '../../../api/order'
import topHeader from '../../../components/common/order/top-header'
import goodsInfo from '../../../components/common/order/goods-info'
import settlement from '../../../components/common/order/settlement'
import otherInfo from '../../../components/common/order/other-info'
import orderBtn from '../../../components/common/order/order-btn'
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
    evaluate(){
      this.$router.push({name:'orderEvaluate', query:{orderId: this.orderInfo.orderCode}})
    }
  },
  created(){
    this.orderId = this.$route.query.orderId
    this.getOrderInfo()
  },
  components:{
    topHeader,
    goodsInfo,
    settlement,
    otherInfo,
    orderBtn,
  }
}
</script>

<style lang="less" scoped>
.complete-wrap{
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