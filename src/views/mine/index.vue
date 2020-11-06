<template>
  <div class="mine-wrap">
    <!-- 头部 -->
    <div class="top-info">
      <div class="info row sb ac">
        <div class="row">
          <img src="../../assets/img/个人中心头像.png" alt="" />
          <div class="user-info column sb">
            <span class="name">每一个明天</span>
            <div class="member row ac jc">
              一级会员 <i class="iconfont iconARROW"></i>
            </div>
          </div>
        </div>
        <i class="iconfont iconARROW strong"></i>
      </div>
    </div>

    <div class="mine-content">
      <!-- 数量卡片 -->
      <div class="card row">
        <div class="item">
          <span>4</span>
          <span class="word">优惠券</span>
        </div>
        <div class="item">
          <span>4</span>
          <span class="word">关注商品</span>
        </div>
        <div class="item">
          <span>4</span>
          <span class="word">关注店铺</span>
        </div>
      </div>
      <!-- 我的订单 -->
      <div class="common-card my-order column sb">
        <div class="top row sb">
          <span class="title">我的订单</span>
          <span class="all-order">全部订单 <i class="iconfont icongengduo"></i></span>
        </div>
        <div class="icon-wrap row sb ac">
          <div class="order-item column ac jc">
            <i class="iconfont iconweizhifu"></i>
            <span>待支付</span>
          </div>
          <div class="order-item column ac jc">
            <i class="iconfont iconyiwancheng"></i>
            <span>待收获</span>
          </div>
          <div class="order-item column ac jc">
            <i class="iconfont icondingdan"></i>
            <span>已完成</span>
          </div>
          <div class="order-item column ac jc">
            <i class="iconfont iconshouhou"></i>
            <span>售后/退货</span>
          </div>
        </div>
      </div>
      <!-- 推广中心 -->
      <div class="common-card promotion-center column sb">
        <span class="title">推广中心</span>
        <div class="wrap row ">
          <div class="info-item column ac sb f1">
            <span>3000</span>
            <div>集采分</div>
          </div>
          <div class="info-item column ac jc f1">
            <span>302</span>
            <div>推广人数</div>
          </div>
          <div class="info-item column ac jc f1">
            <span>22</span>
            <div>推广人订单</div>
          </div>
        </div>
      </div>
          <!-- 其他服务 -->
          <div class="common-card other-serve">
            <span class="title">其他服务</span>
            <div class="other-wrap">
              <div class="other-item">
                <i class="iconfont iconyouhuiquan"></i>
                <span>领券中心</span>
              </div>
              <div class="other-item">
                <i class="iconfont icondizhi"></i>
                <span>收获地址</span>
              </div>
              <div class="other-item">
                <i class="iconfont iconkefu_1"></i>
                <span>联系我们</span>
              </div>
              <div class="other-item">
                <i class="iconfont iconxiaoxi"></i>
                <span>意见反馈</span>
              </div>
              <div class="other-item">
                <i class="iconfont iconeye"></i>
                <span>浏览记录</span>
              </div>
              <div class="other-item">
                <i class="iconfont iconliaotian"></i>
                <span>我的评价</span>
              </div>
            </div>
          </div>
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
import myFooter from "../../components/common/my/footer";
export default {
  name: "mine",
  data() {
    return {};
  },
  methods: {},
  components: {
    myFooter,
  },
};
</script>

<style lang="less" scoped>
.strong {
  font-weight: bold;
}
.f1{
  flex:1;
}
.mine-wrap {
  height: 100vh;
  background-color: #f6f6f6;
  overflow: auto;
}
.common-card{
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 0.11rem;
  padding: 0.22rem;
  margin-bottom: 0.23rem;
  .title{
      font-size: 0.26rem;
    }
}


.top-info {
  height: 2.71rem;
  background-color: #2ecb62;
  padding: 0 0.27rem;
  border: 1px solid transparent;
  color: #ffffff;
  .info {
    margin-top: 0.56rem;
    img {
      width: 0.81rem;
      height: 0.81rem;
    }
    .user-info {
      margin-left: 0.18rem;
      .name {
        font-size: 0.27rem;
      }
      .member {
        width: 1.24rem;
        height: 0.31rem;
        background-color: #1c9544;
        border-radius: 0.15rem;
        font-size: 0.2rem;
        i {
          font-weight: bold;
        }
      }
    }
  }
}
.mine-content{
  padding: 0 0.27rem 0.82rem 0.27rem;
}
.card {
  height: 1.36rem;
	background-color: #ffffff;
  border-radius: 0.11rem;
  transform: translateY(-50%);
  margin-bottom: -0.45rem;
  .item{
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.27rem;
    color: #1a1a1a;
    // height: 0.66rem;
    .word{
      font-size: 0.24rem;
      margin-top: 0.1rem;
    }
  }
}
.my-order{
  height: 1.82rem;
  .top{
    
    .all-order{
      font-size: 0.18rem;
      color: #a8a8a8;
      i{
        font-size: 0.1rem;
        color: #a8a8a8;
      }
    }
  }
  .icon-wrap{
    font-size: 0.24rem;
    i{
      color: #2ecb62;
      font-size: 0.4rem;
      margin-bottom: 0.1rem;
    }
  }
}
.promotion-center{
  height: 1.78rem;
	background-color: #ffffff;
  border-radius: 0.11rem;
  font-size: 0.27rem;
  .info-item{
    // flex-shrink: 0;
    // height: 0.44rem;
    div{
      font-size: 0.24rem;
      margin-top: 0.12rem;
    }
  }
}
.other-serve{
  .other-wrap{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    // grid-gap: 0.2rem;
    .other-item{
      margin-top: 0.27rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      i{
        font-size: 0.4rem;
      }
      span{
        font-size: 0.24rem;
        margin-top: 0.1rem;
      }
    }
  }
}
</style>