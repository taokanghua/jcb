<template>
    <div class="coupon-center-wrap">
      <div class="tab row sb ac">
        <div :class="{active:tabIdx==0}" @click="tabIdx=0">平台</div>
        <div :class="{active:tabIdx==1}" @click="tabIdx=1">店铺</div>
      </div>
      <div class="coupon-wrap-t">
        <!-- 单张优惠券 -->
        <div class="coupon-common row sb" v-for="item in 5" :key="item">
          <div class="left column jc ac">
            <div class="tag row ac jc">满减券</div>
            <div class="discount">￥20</div>
            <span class="rule">满1000可用</span>
          </div>
          <div class="mid column sb">
            <span class="name">平台满减券</span>
            <span class="com">全部商品均可使用</span>
            <span class="com">有效期至2020-10-30</span>
          </div>
          <div class="right row ac jc">
            <div class="take-btn">立即领取</div>
          </div>
        </div>
        <div class="coupon-common discount-coupon row sb">
          <div class="left column jc ac">
            <div class="tag row ac jc">满减券</div>
            <div class="discount">￥20</div>
            <span class="rule">满1000可用</span>
          </div>
          <div class="mid column sb">
            <span class="name">平台满减券</span>
            <span class="com">全部商品均可使用</span>
            <span class="com">有效期至2020-10-30</span>
          </div>
          <div class="right row ac jc">
            <div class="take-btn">立即领取</div>
          </div>
        </div>
        <div class="coupon-common took discount-coupon row sb">
          <div class="left column jc ac">
            <div class="tag row ac jc">满减券</div>
            <div class="discount">￥20</div>
            <span class="rule">满1000可用</span>
          </div>
          <div class="mid column sb">
            <span class="name">平台满减券</span>
            <span class="com">全部商品均可使用</span>
            <span class="com">有效期至2020-10-30</span>
          </div>
          <div class="right row ac jc">
            <div class="take-btn">立即领取</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data(){
    return{
      tabIdx:0
    }
  }
}
</script>

<style lang="less" scoped>
.coupon-center-wrap{
  height: 100vh;
  background-color: #f6f6f6;
  overflow: scroll;
}
.tab{
  width: 6.36rem;
	height: 0.68rem;
  background-color: #ffffff;
  padding: 0 2.29rem;
  box-sizing: border-box;
  div{
    color: #1a1a1a;
    font-size: 0.21rem;
    height: 100%;
    line-height: 0.68rem;
    box-sizing: border-box;
  }
  .active{
    border-bottom: 0.07rem solid #2ecb62;
    font-weight: bold;
  }
}
.coupon-wrap-t{
  padding: 0.23rem 0.27rem;
  box-sizing: border-box;
}
//满减样式 & 公共样式
.coupon-common{
  height: 1.59rem;
  border-radius: 0.11rem;
  padding: 0.27rem 0;
  margin-bottom: 0.23rem;
  box-sizing: border-box;
  background-image: url('../../assets/img/领券中心优惠券.png');
  background-size: cover;
  .left{
    flex: 1;
    // background-color: red;
    position: relative;
    .tag{
      width: 1.02rem;
      height: 0.27rem;
      background-color: #e1fdd2;
      border-radius: 0rem 0rem 0.06rem 0.06rem;
      font-size: 0.18rem;
      color: #2ecb62;
      position: absolute;
      left: 50%;
      top: -0.27rem;
      transform: translateX(-50%);
    }
    .discount{
      font-size: 0.41rem;
      color: #2ecb62;
      font-weight: bold;
    }
    .rule{
      font-size: 0.21rem;
      color: #1a1a1a;
    }
  }
  .mid{
    flex: 2;
    // background-color: green;
      color: #1a1a1a;
      margin-left: 0.22rem;
    .name{
      font-size: 0.27rem;
      font-weight:bold;
    }
    .com{
      font-size: 0.21rem;
    }
  }
  .right{
    flex: 1;
    // background-color: blue;
    .take-btn{
      width: 1.24rem;
      height: 0.45rem;
      background-color: #2ecb62;
      border-radius: 0.23rem;
      font-size: 0.21rem;
      color: #ffffff;
      text-align: center;
      line-height: 0.45rem;
      margin-right: 0.16rem;
    }
  }
}
//折扣券样式
.discount-coupon{
  .left{
    .tag{
      background-color: #ffdede;
      color: #fc0808;
    }
    .discount{
      color: #fc0808;
    }
  }
  .right{
    .take-btn{
      background-color: #fc0808;
    }
  }
}
//已领取优惠券
.took{
  .left{
    .tag{
      background-color: #dddddd;
      color: #a8a8a8;
    }
    .discount{
      color: #a8a8a8;
    }
    .rule{
      color: #a8a8a8;
    }
  }
  .mid{
    .name,.com{
      color: #a8a8a8;
    }
  }
  .right{
    .take-btn{
      background-color: #a8a8a8;
    }
  }
  // filter: grayscale(100%);
}
</style>