<template>
  <div class="self-take-wrap">
    <div class="top-head column">
      <div class="info row ac">
        <span class="title">取货人</span>
        <span class="title" style="margin-left: 0.45rem;">预留手机</span>
      </div>
      <div class="info2 row ac">
        <span class="title">{{orderInfo.createByName}}</span>
        <span class="con" style="margin-left: 0.45rem;">{{orderInfo.phone}}</span>
      </div>
    </div>

    <!-- 取货码 -->
    <div class="content-wrap">
      <div class="qr-wrap column ac">
        <span class="shop-name">{{orderInfo.getApiVo.name}}取货码</span>
        <!-- <img src="../../assets/img/取货码.png" alt="" class="take-qr"> -->
        <VueQrcode class="take-qr" :value="qr_value"></VueQrcode>
        <div class="take-number">取货码：{{orderInfo.selfCode||'666666'}}</div>
        <div class="tip">注意：上门自提时请出示取货码需要扫码取货以便完成交易</div>
        <i class="iconfont iconyishiyong took" v-if="orderInfo.selfCodeStatus==1 "></i>
      </div>

      <!-- 商品卡片 -->
      <div class="s-goods-card">
        <div class="top row sb ac"> 
          <!-- 待收货状态  状态文字为蓝色 -->
          <span>订单单号:{{orderInfo.orderCode}}</span>
          <span>已完成</span>
        </div>
        <div class="goods row" v-for="item in orderInfo.productList" :key="item.skuId">
          <img :src="item.productPic" alt="">
          <div class="right column sb">
            <div class="t column">
              <span class="name">{{item.productName}}</span>
              <span class="sku">{{item.propertyName}}</span>
            </div>
            <div class="row sb ac">
              <span class="price">￥{{item.skuPrice}}</span>
              <span class="count">x{{item.number}}</span>
            </div>
          </div> 
        </div>
        <div class="feild row ac sb">
          <span class="title">取货时间</span>
          <span class="feild-v">{{orderInfo.selfTime||'加载失败'}}</span>
        </div>
        <div class="feild row ">
          <span class="title">取货地址</span>
          <span class="feild-v">{{orderInfo.getApiVo.addressName}}</span>
        </div>
        <div class="feild row ac sb">
          <span class="title">联系电话</span>
          <span class="feild-v">{{orderInfo.getApiVo.phone}}</span>
        </div>
      </div>
    </div>
    
    <div class="tabbar row ac sb">
      <span class="s-money"><span class="word">合计:</span>￥{{orderInfo.totalAmount}}</span>
      <!-- <div class="refund-btn row ac jc">申请退款</div> -->
    </div>
  </div>
</template>

<script>
import orderMix from '../../minix/order-status'
import VueQrcode from '@chenfengyuan/vue-qrcode'
export default {
  data(){
    return{
      qr_value:''
    }
  },
  mixins:[orderMix],
  mounted(){
    this.qr_value = 'http://taokanghua.cn'
  },
  components:{
    VueQrcode
  }
}
</script>

<style lang="less" scoped>
.self-take-wrap{
  height: 100vh;
  padding-bottom: 1rem;
  box-sizing: border-box;
  overflow: scroll;
  background-color: #f6f6f6;
}
.top-head{
  height: 2.36rem;
  line-height: 1;
  background-image: url('../../assets/img/我的订单-订单详情.png');
  background-size: cover;
  padding-top: 0.42rem;
  padding-left: 0.27rem;
  box-sizing: border-box;
  color: #ffffff;
  .info{
    margin-right: 0.45rem;
    .title{
      font-size: 0.21rem;
    }
    .con{
      
    }
  }
  .info2{
    margin-top: 0.22rem;
    .con{
      font-size: 0.27rem;
      line-height: 1;
    }
  }
}
.content-wrap{
  padding: 0 0.27rem;
  .qr-wrap{
    padding-top: 0.51rem;
    box-sizing: border-box;
    height: 6.78rem;
    background-color: #ffffff;
    border-radius: 0.11rem;
    margin-bottom: -0.59rem;
    transform: translateY(-0.82rem);
    position: relative;
    .shop-name{
      text-align: center;
      font-size: 0.18rem;
      color: #1a1a1a;
      font-weight: bold;
      transform: translateY(-0.1rem);
    }
    .take-qr{
      width: 3.41rem !important;
      height: 3.46rem !important;
      margin-bottom: 0.23rem;
    }
    .take-number{
      font-size: 0.27rem;
      color: #1a1a1a;
      font-weight: bold;
      margin-bottom: 0.33rem;
    }
    .tip{
      width: 2.99rem;
      font-size: 0.21rem;
      color: #a8a8a8;
      text-align: center;
    }
    .took{
      font-size: 1.35rem;
      color: #a8a8a8;
      position: absolute;
      right: 0;
      top: 0;
      line-height: 1;
    }
  }
  .s-goods-card{
    background-color: #ffffff;
    border-radius: 0.11rem;
    padding: 0.24rem;
    box-sizing: border-box;
    .top{
      font-size: 0.21rem;
      color: #1a1a1a;
      margin-bottom: 0.28rem;
    }
    .goods{
      margin-bottom: 0.23rem;
      img{
        width: 1.41rem;
	      height: 1.41rem;
        border-radius: 0.11rem;
        flex-shrink: 0;
      }
      .right{
        flex: 1;
        height: 1.41rem;
        margin-left: 0.23rem;
        .name{
          font-size: 0.21rem;
          color: #1a1a1a;
        }
        .sku{
          font-size: 0.18rem;
          color: #a8a8a8;
          margin-top: 0.05rem;
        }
        .price{
          font-size: 0.27rem;
          color: #fc0808;
        }
        .count{
          font-size: 0.21rem;
          color: #a8a8a8;
        }
      }
    }
    .feild{
      margin-top: 0.28rem;
      font-size: 0.21rem;
      color: #1a1a1a;
      justify-content: baseline;
      .title{
        margin-right: 0.46rem;
        width: 1rem;
      }
      .feild-v{
        flex: 1;
        text-align: right;
      }
    }
  }
}
.tabbar{
  position: fixed;
  left: 0;
  bottom: 0;
  height: 0.83rem;
  padding: 0 0.27rem;
  width: 100%;
  background-color: #ffffff;
  box-sizing: border-box;
  .s-money{
    font-size: 0.27rem;
    font-weight: bold;
    color:#fc0a0a;
    .word{
      color:#1a1a1a;
    }
  }
  .refund-btn{
    width: 1.24rem;
    height: 0.51rem;
    font-size: 0.21rem;
    color: #a8a8a8;
    border-radius: 0.25rem;
    border: solid 0.01rem #a8a8a8;
  }
}
</style>