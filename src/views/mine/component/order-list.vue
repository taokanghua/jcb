<template>
  <div class="list-wrap">
    <list 
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad()"
    >
      <div class="common-wrap">
          <div v-for="(order,i) in orderList" :key="i">
          <!-- 已完成 -->
          <order-status-card status="已完成" v-if="order.status==6" :info="order" @click.native="completeDetail(order.orderCode)">
            <!-- <order-btn type="plain" v-if="order.isComment!=1" @click="goEvaluate(order.orderCode)">去评价</order-btn> -->
          </order-status-card>

          <!-- 待支付 -->
          <order-status-card blue status="待支付" v-if="order.status==1" :info="order" @click.native="$router.push({path:'/waitPay?orderId='+order.orderCode})">
            <span class="count-d">
              剩余时间 
              <count-down :endTime="new Date(order.commitTime).valueOf()+86400000" crowd color="#1a1a1a" fontSize="0.21rem"></count-down> 
            </span>
            <order-btn type="plain" @click="cancelOrder(order.orderCode, i)" style="margin-right:0.17rem">取消订单</order-btn>
            <order-btn type="primary" @click="$router.push({path:'/waitPay?orderId='+order.orderCode})">立即支付</order-btn>
          </order-status-card>

          <!-- 待发货 -->
          <order-status-card blue status="待发货" v-if="order.status==2" :info="order" @click.native="waitConsign(order.orderCode)">
            <!-- <order-btn type="plain" style="margin-right:0.17rem" @click="goRefund(order.orderCode)">申请退款</order-btn> -->
            <!-- <order-btn type="primary" @click="confirm(order.orderCode)">确认收货</order-btn> -->
          </order-status-card>

          <!-- 待收货 -->
          <order-status-card blue status="待收货" v-if="order.status==3" :info="order" @click.native="waitReceive(order.orderCode)">
            <!-- <order-btn type="plain" style="margin-right:0.17rem">查看物流</order-btn> -->
            <!-- <order-btn type="plain" style="margin-right:0.17rem" @click="goRefund(order.orderCode)">申请退款</order-btn> -->
            <!-- <order-btn type="primary" @click="confirm(order.orderCode)">确认收货</order-btn> -->
          </order-status-card> 

          <!-- 退款中 -->
          <order-status-card blue status="退款中" v-if="order.status==5" :info="order" @click.native="refundDetail(order.orderCode)">
            <!-- <order-btn type="primary" @click="cancelRefund(order.orderCode)">撤销退款</order-btn> -->
          </order-status-card>

          <!-- 已取消 -->
          <order-status-card status="已取消" v-if="order.status==0" :info="order" @click.native="cancelDetail(order.orderCode)">  
          </order-status-card>

          <!-- 待自提 -->
          <order-status-card blue status="待自提" v-if="order.status==7" :info="order" @click.native="waitSelfTake(order.orderCode)">
            <!-- <order-btn type="plain" style="margin-right:0.17rem" @click="goRefund(order.orderCode)">申请退款</order-btn> -->
            <order-btn type="primary" @click="goSelfTake(order.orderCode)">取货码</order-btn>
          </order-status-card>
          </div>
        </div>
    </list>
  </div>
</template>

<script>
import api from '../../../api/order'
import {mapState} from 'vuex'
import orderStatusCard from '../../../components/common/order/order-status-card'
import orderBtn from '../../../components/common/order/list-item-btn'
import countDown from '../../../components/common/count-down'
import {List, Dialog } from 'vant'
export default {
  data(){
    return{
      loading:false,
      finished:false,
      orderList:[],
      params:{
        sourceType:1,
        sourceId:'',
        status:null,
        pageNo:1,
        pageSize:10
      } ,
    }
  },
  props:['status'],
  methods:{
    refresh(){
      this.params.pageNo = 1
      this.onLoad()
    },
    onLoad() {
      this.loading = true;
      var timer = setTimeout(async () => {
          clearTimeout(timer);
          let res = await api.orderList(this.params);
          this.loading = false;
          if (
              !res.success ||
              !res.result ||
              res.result.records.length == 0
          ) {
              this.finished = true;
          } else {
              this.orderList = [...this.orderList, ...res.result.records];
          }
          if (!res.success) {
              Toast("获取数据失败!");
              return;
          }
          this.params.pageNo++;
      }, 500);
    },
    cancelDetail(orderId){
      this.$router.push({path:'/cancel', query:{orderId}})
    },
    waitConsign(orderId){
      //待发货
      this.$router.push({path:'/waitConsignment', query:{orderId}})
    },
    completeDetail(orderId){
      this.$router.push({path:'/complete', query:{orderId}})
    },
    waitReceive(orderId){
      this.$router.push({path:'/waitReceive', query:{orderId}})
    },
    refundDetail(orderId){
      this.$router.push({path:'/waitRefund', query:{orderId}})
    },

    //下面为订单按钮的各种方法 ---------华丽分割线-------------
    cancelOrder(orderId, i){
      Dialog.confirm({
      message: '确认取消订单?',
    })
      .then(async () => {
        // on confirm
        let res = await api.cancelOrder({orderId})
        if(res.success){
          this.showToast('取消订单成功')
          this.orderList[i].status = 0
        }else{
          this.showToast(res.message)
        }
      })
      .catch(() => {
        // on cancel
      });
      
    },
    goEvaluate(orderId){
      this.$router.push({name:'orderEvaluate', query:{orderId}})
    },
    goSelfTake(orderId){
      this.$router.push({name:'selfTake', query:{orderId}})
    },
    goRefund(orderId){
      this.$router.push({path:'/refund/money', query:{orderId}})
    },
    cancelRefund(orderId){
      Dialog.confirm({
        title: '撤销退款',
        message: '确认撤销退款?',
      })
        .then(async () => {
          // on confirm
          let res = await api.cancelRefund({orderId})
          if(!res.success) return this.showToast(res.message)
          this.showToast(res.result)
          //this.$refs.list.refresh()
          this.refresh()
        })
        .catch(() => {
          // on cancel
        });
    },
    waitSelfTake(orderId){
      this.$router.push({path:'/waitSelfTake', query:{orderId}})
    },
    confirm(orderId){ //确定收货
      Dialog.confirm({
        title: '提示',
        message: '请确认收到货物',
      })
        .then(async () => {
          // on confirm
          let res = await api.confirmGoods(orderId)
          if (!res.success) return this.showToast(res.message)
          this.showToast(res.result)
          this.$refs.list.refresh()
        })
        .catch(() => {
          // on cancel
        });
      
    }
  },
  mounted(){
    this.params.sourceId = this.info.id
    this.params.status = this.status
    this.onLoad()
  },
  computed:{
    ...mapState({info: state=>state.user.info.memberUserInfoVo})
  },
  components:{
    List,
    orderStatusCard,
    orderBtn,
    countDown
  }
}
</script>

<style lang="less" scoped>
.count-d{
  display: inline-block;
  padding-right: 0.17rem;
  width: 50%;
  font-size: 0.21rem;
  // margin-right: 0.17rem;
  text-align: right;
}
.tab{
  height: 0.68rem;
}
.common-wrap{
  //height: calc(100vh - 0.68rem);
  padding: 0.23rem 0.27rem;
  box-sizing: border-box;
}
</style>