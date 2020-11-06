<template>
  <!-- <div class="tabs-wrap row"> -->
    <div class="tab-goods-card">
      <img src="../../../assets/img/购物车.png" alt="" />
      <div class="name e2">
        <span>预售</span>
        博世 电动工具 3.6V锂电池充电起子 螺丝刀 IXO3
      </div>
      <div class="shop-name">豪迪五金店</div>
      <div class="price-wrap row sb">
        <div class="price">￥399 <span>￥399</span></div>
        <div class="sale">销量:888</div>
      </div>
    </div>
  <!-- </div> -->
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
// .tabs-wrap {
//   padding: 0 0.25rem;
//   flex-wrap: wrap;
//   justify-content: space-between;
  .tab-goods-card {
    width: 48.5%;
    height: 4.24rem;
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
      span {
        display: inline-block;
        width: 0.51rem;
        height: 0.21rem;
        background-color: #2ecb62;
        border-radius: 0.03rem;
        line-height: 0.21rem;
        text-align: center;
        color: #ffffff;
      }
    }
    .shop-name {
      font-size: 0.18rem;
      color: #a8a8a8;
      padding-left: 0.19rem;
    }
    .price-wrap {
      align-items: flex-end;
      padding: 0 0.19rem 0 0.19rem;
      .price {
        line-height: 1;
        font-size: 0.25rem;
        color: #fc0808;
        span {
          font-size: 0.18rem;
          color: #a8a8a8;
        }
      }
      .sale {
        line-height: 1;
        color: #a8a8a8;
        font-size: 0.17rem;
      }
    }
  }
// }
</style>