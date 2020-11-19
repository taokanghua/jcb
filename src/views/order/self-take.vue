<template>
  <div class="self-take-wrap">
    <div class="top-head row">
      <div class="info column">
        <span class="title">取货人</span>
        <span class="con">张三</span>
      </div>
      <div class="info column">
        <span class="title">预留手机</span>
        <span class="con">12345678900</span>
      </div>
    </div>

    <!-- 取货码 -->
    <div class="content-wrap">
      <div class="qr-wrap column ac">
        <span class="shop-name">豪迪五金店取货码</span>
        <img src="../../assets/img/取货码.png" alt="" class="take-qr">
        <div class="take-number">取货码：860438</div>
        <div class="tip">注意：上门自提时请出示取货码需要扫码取货以便完成交易</div>
        <i class="iconfont iconyishiyong took"></i>
      </div>

      <!-- 商品卡片 -->
      <div class="s-goods-card">
        <div class="top row sb ac"> 
          <!-- 待收货状态  状态文字为蓝色 -->
          <span>订单单号:1000001</span>
          <span>已完成</span>
        </div>
        <div class="goods row">
          <img src="../../assets/img/购物车.png" alt="">
          <div class="right column sb">
            <div class="t column">
              <span class="name">博世 电动工具 3.6V锂电池充电起子 螺丝刀 IXO3</span>
              <span class="sku">规格:220V    颜色:黑色</span>
            </div>
            <div class="row sb ac">
              <span class="price">￥298</span>
              <span class="count">x50</span>
            </div>
          </div> 
        </div>
        <div class="feild row ac sb">
          <span class="title">取货时间</span>
          <span>2020-10-10  12:00</span>
        </div>
        <div class="feild row ac sb">
          <span class="title">取货地址</span>
          <span>广东省佛山市南海区新石大街22号附近</span>
        </div>
        <div class="feild row ac sb">
          <span class="title">联系电话</span>
          <span>12345678900</span>
        </div>
      </div>
    </div>
    
    <div class="tabbar row ac sb">
      <span class="s-money"><span class="word">合计:</span>￥14900</span>
      <div class="refund-btn row ac jc">申请退款</div>
    </div>
  </div>
</template>

<script>
export default {

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
      margin-top: 0.22rem;
      font-size: 0.27rem;
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
      font-size: 0.31rem;
      color: #1a1a1a;
      font-weight: bold;
    }
    .take-qr{
      width: 3.41rem;
      height: 3.46rem;
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
      }
      .right{
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
      .title{
        margin-right: 0.46rem;
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