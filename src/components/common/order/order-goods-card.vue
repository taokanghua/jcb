<template>
  <div class="goods-card row ac sb">
    <div class="circle"></div>
    <img src="../../../assets/img/分类220x220.png" alt="" />
    <div class="info column sb">
      <div>
        <div class="name e2">博世 电动工具 3.6V锂电池充电起子 螺丝刀 IXO3</div>
        <span class="spec">规格:220V 颜色:黑色</span>
      </div>
      <div class="row sb" style="line-height:1">
        <span class="price">￥298</span>
        <span class="num">x1</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.goods-card{
  margin-top: 0.22rem;
      img{
        width: 1.41rem;
	      height: 1.41rem;
        border-radius: 0.11rem;
        margin-left: 0.1rem;
      }
      .info{
        margin-left: 0.2rem;
        height: 1.48rem;
        .name{
          color: #1a1a1a;
          font-size: 0.21rem;
        }
        .spec{
          font-size: 0.18rem;
          color: #a8a8a8;
          margin-top: 0.17rem;
        }
        .price{
          font-size: 0.27rem;
          color: #fc0808;
        }
        .num{
          font-size: 0.21rem;
          color: #a8a8a8;
        }
      }
    }
</style>