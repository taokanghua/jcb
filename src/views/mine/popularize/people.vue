<template>
  <div class="popu-people-wrap">
    <div class="top row ac">
      <div class="column">
        <span class="title">推广人数</span>
        <span class="num">48</span>
      </div>
    </div>

    <div class="list">
      <div class="tab row sb ac">
        <div :class="{active:tabIdx==0}" @click="tabIdx=0">店铺</div>
        <div :class="{active:tabIdx==1}" @click="tabIdx=1">一级</div>
        <div :class="{active:tabIdx==2}" @click="tabIdx=2">二级</div>
      </div>
      <div class="p-list">
        <div class="people-card row sb ac" v-for="item in 5" :key="item">
            <div class="left row ac">
              <img src="../../../assets/img/推广中心-人数头像.png" alt="">
              <div class="column" style="height:0.9rem;justify-content:space-around">
                <span class="name">用户姓名</span>
                <span class="date" v-show="tabIdx==2">邀请人:一级用户名称</span>
                <span class="date">2020-10-30</span>
              </div>
            </div>
            <div class="right column sb">
              <span v-show="tabIdx!=2">0人</span>
              <span>0单</span>
              <span>0元</span>
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
.popu-people-wrap{
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
.p-list{
  background-color: #ffffff;
  padding: 0.17rem 0.26rem;
  box-sizing: border-box;
  .people-card{
    // width: 6.36rem;
    height: 1.24rem;
    border-bottom: 0.01rem solid #dddddd;
    .left{
      img{
        width: 0.9rem;
        height: 0.9rem;
        margin-right: 0.16rem;
      }
      .name{
        font-size: 0.24rem;
        color: #1a1a1a;
        line-height: 1;
      }
      .date{
        font-size: 0.18rem;
        color: #a8a8a8;
        // margin-top: 0.2rem;
      }
    }
    .right{
      color: #1a1a1a;
      font-size: 0.2rem;
    }
  }
}
.p-list .people-card:last-child{
  border-bottom: none;
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