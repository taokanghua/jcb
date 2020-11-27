<template>
  <div class="goods-card row ac">
    <img :src="info.productPic" alt="" />
    <div class="info column sb">
      <div>
        <div class="name e2">{{info.productName}}</div>
        <span class="spec ">{{info.propertyName}}</span>
      </div>
      <div class="row sb" style="line-height:1">
        <span class="price">￥{{info.skuPrice}}</span>
        <span class="num">x{{info.number}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    info:{
      type: Object,
      default:() => ({})
    }
  }
};
</script>

<style lang="less" scoped>
.goods-card{
  margin-top: 0.22rem;
      img{
        width: 1.41rem;
	      height: 1.41rem;
        border-radius: 0.11rem;
        margin-left: 0.1rem;
        flex-shrink: 0;
      }
      .info{
        margin-left: 0.2rem;
        height: 1.48rem;
        flex:1;
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