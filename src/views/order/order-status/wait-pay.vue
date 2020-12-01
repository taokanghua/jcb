<template>
  <div class="wait-pay-wrap">
    <top-header status="待支付" :info="orderInfo">
      <span>剩余: <count-down :endTime="endTime" crowd colonColor="#fff"></count-down> </span>
      <!-- <CountDown :time="endTime"></CountDown> -->
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
      <order-btn type="plain" @click="cancelOrder">取消订单</order-btn>
      <order-btn type="primary" @click="goToPay">立即支付</order-btn>
    </div>
  </div>
</template>

<script>
import { CountDown, Dialog } from 'vant';
import {invokeWxPay} from '../../../utils/wxFn'
import api from '../../../api/order'
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
      orderId:'',
      orderInfo:{},
      endTime:''
    }
  },
  methods:{
    async getOrderInfo(){
      let res = await api.getOrder(this.orderId)
      this.orderInfo = res.result
      this.endTime = new Date(this.orderInfo.commitTime.replace(/-/g, '/')).valueOf()+86400000
    },
    async goToPay(){
      //去支付
      let res = await api.pay(this.orderInfo.orderCode)
      invokeWxPay(
        {
      ...res.result, 
      success:res=>{
        Dialog.alert({
          message: '支付成功!',
        }).then(() => {
          // on close
          this.$router.replace({path:'/orderList'})
        });
      }, 
      fail:err=>{
        Dialog.alert({
          message: '支付失败',
        })
      },
      cancel: c => {console.log(c)}
      })
      // this.$router.push({path:'/confirmorder', query:{orderId:this.orderInfo.mergeOrderCode}})
    },
    async cancelOrder(){
      let res = await api.cancelOrder({orderId: this.orderInfo.orderCode})
      if(res.success){
        this.showToast('取消订单成功')
        this.$router.replace({path:'/orderList'})
      }else{
        this.showToast(res.message)
      }
    }
  },
  components:{
    topHeader,
    countDown,
    goodsInfo,
    settlement,
    otherInfo,
    orderBtn,
    CountDown
    // goodsCard
  },
  created(){
    this.orderId = this.$route.query.orderId

    this.getOrderInfo()
    // console.log(new Date(this.orderInfo.commitTime).valueOf()+86400000)
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