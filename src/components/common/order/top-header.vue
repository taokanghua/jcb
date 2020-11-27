<template>
  <div class="wrap">
    <div class="top-head column">
      <span class="status">{{status}}</span>
      <span class="desc">
        <slot></slot>
      </span>
    </div>
    <div class="address-card column sb" v-if="info.selfCarry!=1">
      <div class="top row ac">
        <span>{{info.receiveBy||'***'}}</span>
        <span class="phone">{{info.receivePhone||'***********'}}</span>
      </div>
      <div class="bottom row ac">
        <i class="iconfont icondizhi"></i>
        <p class="address-info e1">{{info.receiveAddress||'暂无地址'}}</p>
      </div>
    </div>
    <div class="address-card row ac" v-else>
      <div class="bottom row ac">
        <i class="iconfont icondizhi"></i>
        <p class="address-info e1">{{info.getApiVo&&info.getApiVo.addressName}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  props:['status', 'info']
}
</script>

<style lang="less" scoped>
.wrap{
  margin-bottom: -0.68rem;
}
.top-head{
  height: 2.36rem;
  background-image: url('../../../assets/img/我的订单-订单详情.png');
  background-size: cover;
  padding-left: 0.27rem;
  color: #ffffff;
  .status{
    margin-top: 0.42rem;
    line-height: 1;
    font-size: 0.27rem;
    font-weight: bold;
  }
  .desc{
    font-size: 0.21rem;
    margin-top: 0.23rem;
  }
}
.address-card{
  width: 5.81rem;
  height: 1.36rem;
	background-color: #ffffff;
  border-radius: 0.11rem;
  padding: 0.3rem 0.18rem;
  box-sizing: border-box;
  margin-left: 50%;
  transform: translate(-50%, -50%);
  .top{
    .phone{
      margin-left: 0.3rem;
    }
    span{
      font-size: 0.24rem;
      color: #000000;
      font-weight: 500;
    }
  }
  .bottom{
    i{
      font-size: 0.2rem;
      margin-right: 0.17rem;
    }
    p{
      width: 88%;
      font-size: 0.2rem;
      color: #000000;
    }
  }
}
</style>