<template>
  <div class="popularize-wrap">
    <div class="top-card column sb">
      <div class="top row sb">
        <div class="left column sb ac">
          <span>剩余集采分</span>
          <div class="integral">5467</div>
        </div>
        <!-- 暂时不不要 -->
        <!-- <div class="reflect">我要提现</div> -->
      </div>
      <div class="bottom row sb ac">
        <div class="left row sb ac">
          <div class="item column sb ac">
            <span class="int">3048</span>
            <span>今日收益</span>
          </div>
          <div class="item column sb ac">
            <span class="int">3048</span>
            <span>本月收益</span>
          </div>
          <div class="item column sb ac">
            <span class="int">3048</span>
            <span>总收益</span>
          </div>
        </div>
        <i class="iconfont iconerweima" @click="$router.push({name:'sharing'})"></i>
      </div>
    </div>

    <!-- 推广统计 -->
    <div class="menu row sb">
      <router-link to="/popularizePeople" tag="div" class="icon-item row ac jc">
        <img src="../../assets/img/推广中心-人数统计.png" alt="">
        <div class="column sb">
          <span class="number">48</span>
          <span>推广人数</span>
        </div>
      </router-link>
      <router-link to="/popularizeOrder" tag="div" class="icon-item row ac jc">
        <img src="../../assets/img/推广中心-订单统计.png" alt="">
        <div class="column sb">
          <span class="number">8</span>
          <span>推广人订单</span>
        </div>
      </router-link>
    </div>
    <!-- 收益列表 -->
    <div class="tab">
      <div class="row">
        <div class="tag row ac jc" :class="{active:tagIdx==0}" @click="changeTab(0)">全部</div>
        <div class="tag row ac jc" :class="{active:tagIdx==1}" @click="changeTab(1)">收入</div>
        <div class="tag row ac jc" :class="{active:tagIdx==2}" @click="changeTab(2)">支出</div>
      </div>
      <div class="list">
        <div class="profit-card row sb ac" v-for="item in 3" :key="item">
          <div class="column sb">
            <span class="desc">集采收益</span>
            <span class="date">2020-10-10</span>
          </div>
          <span class="count">+500.00</span>
        </div>
        <div class="profit-card row sb ac" >
          <div class="column sb">
            <span class="desc">提现</span>
            <span class="date">2020-10-10</span>
          </div>
          <span class="count sub">-100.00</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      tagIdx:0
    }
  },
  methods:{
    changeTab(i){
      this.tagIdx = i
    }
  }
}
</script>

<style lang="less" scoped>
.popularize-wrap{
  height: 100vh;
  background-color: #f6f6f6;
  padding: .28rem .27rem;
  overflow: scroll;
}
.top-card{
  width: 5.81rem;
	height: 2.37rem;
  background-image: url('../../assets/img/推广中心底图.png');
  background-size: 100% 100%;
  border-radius: 0.11rem;
  margin-bottom: 0.23rem;
  padding: 0.21rem 0.23rem;
  box-sizing: border-box;
  .top{
    .left{
      color: #ffffff;
      font-size: 0.2rem;
      .integral{
        font-size: 0.4rem;
        font-weight: bold;
        margin-top: 0.2rem;
        line-height: 1;
      }
    }
    .reflect{
      width: 1.36rem;
      height: 0.51rem;
      background-color: #ffffff;
      border-radius: 0.25rem;
      font-size: 0.21rem;
      color: #2ecb62;
      line-height: 0.51rem;
      text-align: center;
    }
  }
  .bottom{
    .left{
      color: #ffffff;
      font-size: 0.2rem;
      .item{
        margin-right: 0.5rem;
        line-height: 1;
      }
      .int{
        font-size: 0.27rem;
        margin-bottom: 0.16rem;
      }
    }
    i{
      font-size: 0.42rem;
      color: #ffffff;
    }
  }
}
.menu{
  .icon-item{
    width: 2.79rem;
    height: 1.13rem;
    background-color: #ffffff;
    border-radius: 0.11rem;
    font-size: 0.2rem;
    color: #1a1a1a;
    img{
      width: 0.67rem;
      height: 0.5rem;
      margin-right: 0.22rem;
    }
    .number{
      font-size: 0.31rem;
      // margin-bottom: 0.16rem;
      // line-height: 1;
    }
  }
}
.tab{
  margin-top: 0.45rem;
  .tag{
    width: 1.07rem;
    height: 0.45rem;
    color: #2ecb62;
    font-size: 0.21rem;
    border-radius: 0.23rem;
    margin-right: 0.23rem;
    border: solid 0.01rem #2ecb62;
  }
  .active{
    color: #ffffff;
    background-color: #2ecb62;
  }
  .list{
    margin-top: 0.23rem;
    .profit-card{
      height: 1.02rem;
      background-color: #ffffff;
      border-radius: 0.11rem;
      padding: 0.23rem;
      box-sizing: border-box;
      margin-bottom: 0.23rem;
      .desc{
        font-size: 0.21rem;
        color: #1a1a1a;
        line-height: 1;
        margin-bottom: 0.2rem;
      }
      .date{
        font-size: 0.18rem;
        color: #a8a8a8;
      }
      .count{
        font-size: 0.31rem;
        color: #fc0808;
      }
      .sub{
        color: #2ecb62;
      }
    }
  }
}
</style>