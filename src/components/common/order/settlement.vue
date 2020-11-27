<template>
  <div class="settlement-wrap column sb">
        <div class="set-feild row sb ac">
          <span>商品总价</span>
          <span>￥{{info.totalAmount}}</span>
        </div>
        <!-- <div class="set-feild row sb ac">
          <span>运费</span>
          <span>￥{{Number(info.freightAmount).toFixed(2)}}</span>
        </div>
        <div class="set-feild row sb ac">
          <span>运费险</span>
          <span>￥6.00</span>
        </div>
        <div class="set-feild row sb ac">
          <span>店铺优惠</span>
          <span>-￥10.00</span>
        </div>
        <div class="set-feild row sb ac">
          <span>平台优惠</span>
          <span>-￥10.00</span>
        </div>
        <div class="set-feild row sb ac">
          <span>会员折扣</span>
          <span>9.9折</span>
        </div> -->
        <div class="total">
          <span class="word">合计: </span>
          <span class="money">￥{{info.paymentAmount}}</span>
        </div>
      </div>
</template>

<script>
export default {
  props:{
    info:Object,
    default: () => ({})
  }
}
</script>

<style lang="less" scoped>
.settlement-wrap{
  padding: 0.24rem;
  // height: 3.66rem;
  margin: 0.23rem 0;
  box-sizing: border-box;
  background-color: #fff;
 .set-feild{
   margin-bottom: 0.28rem;
   &:last-child{
     margin-bottom: 0;
   }
   span{
     font-size: 0.21rem;
     color: #1a1a1a;
   }
 }
 .total{
   text-align: right;
   span{
     line-height: 1;
     font-size: 0.27rem;
     font-weight: bold;
     color: #1a1a1a;
   }
   .money{
     color: #fc0808;
   }
 }
}
</style>