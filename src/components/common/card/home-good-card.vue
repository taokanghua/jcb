<template>
  <!-- <div class="tabs-wrap row"> -->
    <router-link :to="'/goodsdetail?id='+info.productId" tag="div" class="tab-goods-card">
      <img :src="info.pic" alt="" />
      <div class="name e2">
        <span v-if="info.isPreSale==1">预售</span>
        {{info.productName}}
      </div>
      <div class="shop-name">{{info.storeName}}</div>
      <div class="price-wrap row sb">
        <div class="price">￥{{parseInt(info.paymentPrice).toFixed(0)}} <span style="text-decoration:line-through">￥{{parseInt(info.price).toFixed(0)}}</span></div>
      </div>
        <div class="sale">销量:{{info.saleCount}}</div>
    </router-link>
  <!-- </div> -->
</template>

<script>
export default {
  props:['info']
};
</script>

<style lang="less" scoped>
// .tabs-wrap {
//   padding: 0 0.25rem;
//   flex-wrap: wrap;
//   justify-content: space-between;
  .tab-goods-card {
    width: 48.5%;
    // height: 4.24rem;
    background-color: #ffffff;
    border-radius: 0.11rem;
    padding-bottom: 0.19rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 0.18rem;
    img {
      width: 2.82rem;
      height: 2.82rem;
    }
    .name {
      font-size: 0.21rem;
      color: #1a1a1a;
      margin-left: 0.19rem;
      margin-top: 0.11rem;
      margin-bottom: 0.11rem;
      span {
        display: inline-flex;
        align-items: center;
        font-size: 0.18rem;
        justify-content: center;
        padding: 0.01rem 0.04rem;
        background-color: #2ecb62;
        border-radius: 0.03rem;
        color: #ffffff;
      }
    }
    .shop-name {
      font-size: 0.18rem;
      color: #a8a8a8;
      padding-left: 0.19rem;
      margin-bottom: 0.11rem;
    }
    .price-wrap {
      align-items: flex-end;
      padding: 0 0.19rem 0 0.19rem;
      .price {
        line-height: 1;
        font-size: 0.25rem;
        color: #fc0808;
        margin-bottom: 0.11rem;
        span {
          font-size: 0.18rem;
          color: #a8a8a8;
        }
      }
    }
        .sale {
          padding-left: 0.19rem;
          line-height: 1;
          font-size: 0.25rem;
          color: #a8a8a8;
          font-size: 0.17rem;
        }
  }
// }
</style>