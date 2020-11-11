<template>
  <div class="order-other-info column">
        <div class="other-feild row sb ac">
          <span>订单单号</span>
          <span>1000001</span>
        </div>
        <div class="other-feild row sb ac">
          <span>支付方式</span>
          <span>微信支付</span>
        </div>
        <div class="other-feild row sb ac">
          <span>配送方式</span>
          <span>快递</span>
        </div>
        <div class="other-feild row sb ac" v-if="plus||cancel||all">
          <span>物流单号</span>
          <span>SF493772984929 <span class="copy">复制</span></span>
        </div>
        <div class="other-feild row sb ac">
          <span>下单时间</span>
          <span>2020-10-20  12:00</span>
        </div>
        <div class="other-feild row sb ac" v-if="plus||cancel||all">
          <span>发货时间</span>
          <span>2020-10-20  12:00</span>
        </div>
        <div class="other-feild row sb ac" v-if="cancel">
          <span>退货时间</span>
          <span>2020-10-20  12:00</span>
        </div>
        <div class="other-feild row sb ac" v-if="all">
          <span>收货时间</span>
          <span>2020-10-20  12:00</span>
        </div>

      </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  methods:{},
  props:{
    plus:{
      // 增加显示 物流单号/发货时间
      type:Boolean,
      default:false
    },
    cancel:{
      //取消订单
      type: Boolean,
      default:false
    },
    all:{
      //所有项
      type: Boolean,
      default:false
    }
  }
}
</script>

<style lang="less" scoped>
.order-other-info{
  padding: 0.24rem;
  margin-bottom: 0.23rem;
  box-sizing: border-box;
  background-color: #fff;
  .other-feild{
    margin-bottom: 0.28rem;
    span{
      line-height: 1;
     font-size: 0.21rem;
     color: #1a1a1a;
   }
   .copy{
     margin-left: 0.2rem;
     color: #13438c;
   }
  }
  .other-feild:last-child{
    margin-bottom: 0;
  }
}
</style>