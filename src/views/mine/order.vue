<template>
  <div class="order-wrap">
    <tabs v-model="tabIdx" color="#2ecb62" class="tab" ref="tabs">
      <tab title="全部" name="0">
        <div class="common-wrap">
          <!-- 已完成 -->
          <order-status-card>
            <order-btn type="plain" @click="goEvaluate">去评价</order-btn>
          </order-status-card>

          <!-- 待支付  字蓝-->
          <order-status-card>
            <span class="count-d">
              剩余时间 
              <count-down endTime="2020/11/17" crowd color="#1a1a1a" fontSize="0.21rem"></count-down> 
            </span>
            <order-btn type="primary">立即支付</order-btn>
          </order-status-card>

          <!-- 待发货 字蓝 -->
          <order-status-card>
            <order-btn type="plain" style="margin-right:0.17rem" @click="goApplyRefund">申请退款</order-btn>
            <order-btn type="primary">确认收货</order-btn>
          </order-status-card>

          <!-- 待收货 字蓝 -->
          <order-status-card>
            <order-btn type="plain" style="margin-right:0.17rem">查看物流</order-btn>
            <order-btn type="plain" style="margin-right:0.17rem">申请退款</order-btn>
            <order-btn type="primary">确认收货</order-btn>
          </order-status-card>

          <!-- 退款中 字蓝 -->
          <order-status-card>
            <order-btn type="primary">撤销退款</order-btn>
          </order-status-card>

          <!-- 已取消 -->
          <order-status-card></order-status-card>

          <!-- 待自提 字蓝 -->
          <order-status-card>
            <order-btn type="plain" style="margin-right:0.17rem">申请退款</order-btn>
            <order-btn type="primary" @click="goSelfTake">取货码</order-btn>
          </order-status-card>
        </div>
      </tab>
      <tab title="待支付" name="1">待支付</tab>
      <tab title="待发货" name="2">待发货</tab>
      <tab title="已完成" name="3">已完成</tab>
    </tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant';
import orderStatusCard from '../../components/common/order/order-status-card'
import orderBtn from '../../components/common/order/list-item-btn'
import countDown from '../../components/common/count-down'
export default {
  data(){
    return{
      tabIdx:0
    }
  },
  methods:{
    goEvaluate(){
      this.$router.push({name:'orderEvaluate'})
    },
    goSelfTake(){
      this.$router.push({name:'selfTake'})
    },
    goApplyRefund(){
      this.$router.push({name:'applyRefund'})
    }
  },
  created(){
    let type = this.$route.query.type||0
    this.tabIdx = type
  },
  components:{
    Tab,
    Tabs,
    orderStatusCard,
    orderBtn,
    countDown
  }
}
</script>

<style lang="less" scoped>
.order-wrap{
  height: 100vh;
  background-color: #f6f6f6;
  overflow: scroll;
}
.tab{
  height: 0.68rem;
}
.common-wrap{
  height: calc(100vh - 0.68rem);
  padding: 0.23rem 0.27rem;
  box-sizing: border-box;
}
.count-d{
  font-size: 0.21rem;
  margin-right: 0.17rem;
}
/deep/.van-tab{
  color: #1a1a1a;
}
</style>