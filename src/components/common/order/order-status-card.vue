<template>
  <div class="order-item-wrap">
    <div class="top row ac sb">
      <div class="row ac">
        <i class="iconfont iconshangcheng"></i>
        <span>{{info.getApiVo&&info.getApiVo.name||'xx店铺'}}</span>
      </div>
      <span :class="{blue}">{{status}}</span>
    </div>
    <!-- 商品 -->
    <div class="goods-item row ac" v-for="item in info.productList" :key="item.productId">
        <img :src="item.productPic" alt="">
        <div class="right column sb">
          <div class="column">
            <span class="name">{{item.productName}}</span>
            <!-- <span class="sku">规格:220V    <span class="color">颜色:黑色</span></span> -->
            <span class="sku">{{item.propertyName}}</span>
          </div>
          <span class="num">x{{item.number}}</span>
        </div>
    </div>
    <!-- 数量 -->
    <div class="footer row ac">
      <span class="count">共{{info.productList&&info.productList.length}}件</span>
      <span class="price row ac"><span class="word">合计:</span>￥{{info.totalAmount}}</span>
    </div>
    <!-- 按钮 -->
    <div class="btn-wrap row ac">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  props:{
    info:{
      type: Object,
      default: ()=>({getApiVo:{},productList:[]})
    },
    blue:{
      // 状态文字颜色
      type: Boolean,
      default: false
    },
    status:{
      type: String,
      default: '待支付'
    }
  }
}
</script>

<style lang="less" scoped>
.order-item-wrap{
  background-color: #ffffff;
  padding:0 0.24rem 0.23rem 0.23rem;
  box-sizing: border-box;
  border-radius: 0.11rem;
  margin-bottom: 0.23rem;
}
.top{
  font-size: 0.2rem;
  color: #000000;
  line-height: 1;
  height: 0.67rem;
  margin-bottom: 0.19rem;
  border-bottom: 0.01rem solid #a8a8a8;
  i{
    font-size: 0.2rem;
    margin-right: 0.12rem;
  }
}
  .goods-item{
    margin-bottom: 0.4rem;
    img{
      width: 1.41rem;
      height: 1.41rem;
      border-radius: 0.11rem;
    }
    .right{
      height: 1.41rem;
      margin-left: 0.23rem;
      .name{
        font-size: 0.21rem;
        color: #1a1a1a;
      }
      .sku{
        margin-top: 0.1rem;
        .color{
          margin-left: 0.22rem;
        }
      }
      .sku, .num{
        font-size: 0.18rem;
        color: #a8a8a8;
      }
    }
  }
.footer{
  justify-content: flex-end;
  font-size: 0.21rem;
  .count, .word{
    color: #1a1a1a;
    margin-right: 0.34rem;
  }
  .word{
    margin-right: 0.1rem;
  }
  .price{
    color: #fc0808;
  }
}
.btn-wrap{
  margin-top: 0.37rem;
  justify-content: flex-end;
}
.blue{
  color: #2ecb62;
}
</style>