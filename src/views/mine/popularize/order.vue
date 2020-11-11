<template>
  <div class="popu-order-wrap">
    <div class="top row ac">
      <div class="column">
        <span class="title">推广人订单</span>
        <span class="num">48</span>
      </div>
    </div>
    <div class="list">
      <div class="tab row sb ac">
        <div :class="{active:tabIdx==0}" @click="tabIdx=0">平台</div>
        <div :class="{active:tabIdx==1}" @click="tabIdx=1">店铺</div>
      </div>

      <div class="order-list">
        <div class="o-card row sb" v-for="item in 4" :key="item">
          <div class="left column sb">
            <div class="row ac">
              <img src="../../../assets/img/推广中心-订单头像.png" alt="">
              <span class="name">用户姓名</span>
            </div>
            <span class="way">购买商品</span>
          </div>
          <div class="right column sb">
            <span class="money">+67.5</span>
            <span class="info">订单金额  4500</span>
          </div>
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
.popu-order-wrap{
  height: 100vh;
  background-color: #f6f6f6;
  overflow: scroll;
}
.top{
  width: 6.36rem;
	height: 1.81rem;
  background-image: url('../../../assets/img/推广中心人数-订单页面底图.png');
  background-size: cover;
  padding: 0 0.27rem;
  color: #ffffff;
  .title{
    font-size: 0.2rem;
  }
  .num{
    font-size: 0.41rem;
  }
}
.list{
  margin-top: 0.23rem;
  .order-list{
    .o-card{
      width: 6.36rem;
      height: 1.24rem;
      background-color: #ffffff;
      padding: 0.24rem 0.27rem;
      box-sizing: border-box;
      img{
        width: 0.36rem;
        height: 0.36rem;
        background-color: #a8a8a8;
        border-radius: 50%;
        margin-right: 0.18rem;
      }
      .name{
        font-size: 0.24rem;
        color: #1a1a1a;
      }
      .way{
        font-size: 0.18rem;
        color: #a8a8a8;
        margin-top: 0.2rem;
      }
      .right{
        text-align: right;
        .money{
          font-size: 0.27rem;
          color: #fc0808;
        }
        .info{
          font-size: 0.18rem;
          color: #a8a8a8;
          margin-top: 0.2rem;
        }
      }
    }
  }
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
</style>