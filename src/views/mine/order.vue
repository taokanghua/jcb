<template>
  <div class="order-wrap">
    <tabs v-model="tabIdx" swipeable animated color="#2ecb62" class="tab" ref="tabs">
      <tab title="全部" name="">
        <listEnhand
          :req="getList"
          :params="params"
          ref="list"
          @reachBottom="ReceorderList">
        <div class="common-wrap">
          <div v-for="order in orderList" :key="order.id">
          <!-- 已完成 -->
          <order-status-card status="已完成" v-if="order.status==6" :info="order" @click.native="completeDetail(order.orderCode)">
            <order-btn type="plain" v-if="order.isComment!=1" @click="goEvaluate(order.orderCode)">去评价</order-btn>
          </order-status-card>

          <!-- 待支付 -->
          <order-status-card blue status="待支付" v-if="order.status==1" :info="order">
            <span class="count-d">
              剩余时间 
              <count-down :endTime="new Date(order.commitTime).valueOf()+86400000" crowd color="#1a1a1a" fontSize="0.21rem"></count-down> 
            </span>
            <order-btn type="primary" @click="$router.push({path:'/waitPay?orderId='+order.orderCode})">立即支付</order-btn>
          </order-status-card>

          <!-- 待发货 -->
          <order-status-card blue status="待发货" v-if="order.status==2" :info="order" @click.native="waitConsign(order.orderCode)">
            <order-btn type="plain" style="margin-right:0.17rem" @click="goRefund(order.orderCode)">申请退款</order-btn>
            <order-btn type="primary" @click="confirm(order.orderCode)">确认收货</order-btn>
          </order-status-card>

          <!-- 待收货 -->
          <order-status-card blue status="待收货" v-if="order.status==3" :info="order" @click.native="waitReceive(order.orderCode)">
            <!-- <order-btn type="plain" style="margin-right:0.17rem">查看物流</order-btn> -->
            <order-btn type="plain" style="margin-right:0.17rem" @click="goRefund(order.orderCode)">申请退款</order-btn>
            <order-btn type="primary" @click="confirm(order.orderCode)">确认收货</order-btn>
          </order-status-card> 

          <!-- 退款中 -->
          <order-status-card blue status="退款中" v-if="order.status==5" :info="order" @click.native="refundDetail(order.orderCode)">
            <order-btn type="primary" @click="cancelRefund(order.orderCode)">撤销退款</order-btn>
          </order-status-card>

          <!-- 已取消 -->
          <order-status-card status="已取消" v-if="order.status==0" :info="order" @click.native="cancelDetail(order.orderCode)">  
          </order-status-card>

          <!-- 待自提 -->
          <order-status-card blue status="待自提" v-if="order.status==7" :info="order">
            <order-btn type="plain" style="margin-right:0.17rem" @click="goRefund(order.orderCode)">申请退款</order-btn>
            <order-btn type="primary" @click="goSelfTake(order.orderCode)">取货码</order-btn>
          </order-status-card>
          </div>
        </div>
        </listEnhand>
      </tab>
      <tab title="待支付" name="1">
        <listEnhand
          :req="getList"
          :params="params"
          ref="1"
          @reachBottom="ReceorderList">
          <div class="common-wrap" v-for="order in orderList" :key="order.id">
          <order-status-card blue status="待支付" v-if="order.status==1" :info="order">
              <span class="count-d">
                剩余时间 
                <count-down :endTime="new Date(order.commitTime).valueOf()+86400000" crowd color="#1a1a1a" fontSize="0.21rem"></count-down> 
              </span>
              <order-btn type="primary" @click="$router.push({path:'/waitPay?orderId='+order.orderCode})">立即支付</order-btn>
            </order-status-card>
          </div>
        </listEnhand>
      </tab>
      <tab title="待发货" name="2">
        <listEnhand
          :req="getList"
          :params="params"
          ref="2"
          @reachBottom="ReceorderList">
          <div class="common-wrap">

          <order-status-card blue status="待发货" v-for="(order,i) in orderList" :key="i" :info="order" @click.native="waitConsign(order.orderCode)">
              <order-btn type="plain" style="margin-right:0.17rem" @click="goRefund(order.orderCode)">申请退款</order-btn>
              <order-btn type="primary" @click="confirm(order.orderCode)">确认收货</order-btn>
            </order-status-card>
          </div>
        </listEnhand>
      </tab>
      <tab title="已完成" name="6">
        <listEnhand
          :req="getList"
          :params="params"
          ref="6"
          @reachBottom="ReceorderList">
          <div class="common-wrap">

        <order-status-card status="已完成" v-for="order in orderList" :key="order.id" :info="order" @click.native="completeDetail(order.orderCode)">
            <order-btn type="plain" v-if="order.isComment!=1" @click="goEvaluate(order.orderCode)">去评价</order-btn>
          </order-status-card>
          </div>
        </listEnhand>
      </tab>
    </tabs>

    <empty
    v-if="empty"
    class="custom-image"
    image="https://img.yzcdn.cn/vant/custom-empty-image.png"
    description="暂无订单"
    />
  </div>
</template>

<script>
import api from '../../api/order'
import { Tab, Tabs, Empty, Dialog } from 'vant';
import {mapState} from 'vuex'
import orderStatusCard from '../../components/common/order/order-status-card'
import orderBtn from '../../components/common/order/list-item-btn'
import countDown from '../../components/common/count-down'
import listEnhand from '../../components/common/my/list-enhands'
export default {
  data(){
    return{
      empty:false,
      tabIdx:'',
      params:{
        sourceType:1,
        sourceId:'',
        status:null,
        pageNo:1,
        pageSize:10
      } ,
      orderList:[]
    }
  },
  methods:{
    getList:api.orderList,
    //0-已取消 1-待付款 2-待发货 3-待收货 4-待评价 5-售后/退款 6-已完成 7-待自提 8-已退款
    // async getOrderlist(){

    ReceorderList(result){
      this.orderList = [...this.orderList, ...result.records]
      result.total==0?this.empty = true:this.empty=false
    },
    // 下面为订单卡片跳转详情方法 -----------线割分丽华------------
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
    goEvaluate(orderId){
      this.$router.push({name:'orderEvaluate', query:{orderId}})
    },
    goSelfTake(orderId){
      this.$router.push({name:'selfTake', query:{orderId}})
    },
    // goApplyRefund(){
    //   this.$router.push({name:'applyRefund'})
    // },
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
          this.$refs.list.refresh()
        })
        .catch(() => {
          // on cancel
        });
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
  created(){
    let type = this.$route.query.type||0
    this.tabIdx = type

    this.params.sourceId = this.info.id

    //func
    // this.getOrderlist()
    // this.$nextTick(()=>{
    //   this.$refs.list.refresh()
    // })
  },
  watch:{
    tabIdx(n){
      this.params.status = n
      this.orderList=[]
      this.$nextTick(()=>{
        if(n.length==0) n = 'list'
        this.$refs[n].refresh()
      })
    }
  },
  computed:{
    ...mapState({info: state=>state.user.info.memberUserInfoVo})
  },
  components:{
    Tab,
    Tabs,
    orderStatusCard,
    orderBtn,
    countDown,
    listEnhand,
    Empty
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
  //height: calc(100vh - 0.68rem);
  padding: 0.23rem 0.27rem;
  box-sizing: border-box;
}
.count-d{
  display: inline-block;
  padding-right: 0.17rem;
  width: 50%;
  font-size: 0.21rem;
  // margin-right: 0.17rem;
  text-align: right;
}
/deep/.van-tab{
  color: #1a1a1a;
}
</style>