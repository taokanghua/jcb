<template>
  <div class="popularize-wrap">
    <div class="top-card column sb">
      <div class="top row sb">
        <div class="left column sb ac">
          <span>剩余集采分</span>
          <div class="integral">{{ info.canCarryAmount || 0 }}</div>
        </div>
        <!-- 暂时不不要 -->
        <!-- <div class="reflect">我要提现</div> -->
      </div>
      <div class="bottom row sb ac">
        <div class="left row sb ac">
          <div class="item column sb ac">
            <span class="int">{{ info.todayProfit || 0 }}</span>
            <span>今日收益</span>
          </div>
          <div class="item column sb ac">
            <span class="int">{{ info.monthProfit || 0 }}</span>
            <span>本月收益</span>
          </div>
          <div class="item column sb ac">
            <span class="int">{{ info.totalProfit || 0 }}</span>
            <span>总收益</span>
          </div>
        </div>
        <i class="iconfont iconerweima" @click="$router.push({name:'sharing'})"></i>
      </div>
    </div>

    <!-- 推广统计 -->
    <div class="menu row sb">
      <router-link :to="'/popularizePeople?num='+info.recommendedUsers" tag="div" class="icon-item row ac jc">
        <img src="../../assets/img/推广中心-人数统计.png" alt="">
        <div class="column sb">
          <span class="number">{{ info.recommendedUsers || 0 }}</span>
          <span>推广人数</span>
        </div>
      </router-link>
      <router-link :to="'/popularizeOrder?num='+info.recommendedOrders" tag="div" class="icon-item row ac jc">
        <img src="../../assets/img/推广中心-订单统计.png" alt="">
        <div class="column sb">
          <span class="number">{{ info.recommendedOrders || 0 }}</span>
          <span>推广人订单</span>
        </div>
      </router-link>
    </div>
    <!-- 收益列表 -->
    <div class="tab tabs-list">
      <!-- <div class="row">
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
      </div> -->
      <tabs
        v-model="active"
        swipeable
        animated
        title-inactive-color="#2ecb62"
        title-active-color="#ffffff"
        color="#2ecb62"
        line-width="0"
        line-height="0"
      >
        <tab v-for="(item, index) in tabs" :key="index" :title="item">
          <popliarizeList :status="active" />
        </tab>
      </tabs>
    </div>
  </div>
</template>

<script>
import api from '../../api/popularize'
import {mapState} from 'vuex'
import {Tabs, Tab} from 'vant'
import popliarizeList from './component/popilarize-list'
export default {
  data(){
    return{
      tagIdx:0,
      active:0,
      tabs: ["全部"],
      // tabs: ["全部", "收入", "支出"],
      info:{}
    }
  },
  methods:{
    async getData(){
      let res = await api.getPopularize(this.member.id)
      this.info = res.result;
    },
    changeTab(i){
      this.tagIdx = i
    }
  },
  computed:{
    ...mapState({member:state=>state.user.info.memberUserInfoVo})
  },
  mounted(){
    this.getData()
  },
  components:{
    Tabs,
    Tab,
    popliarizeList
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
  .active{
    color: #ffffff;
    background-color: #2ecb62;
  }
}
  .tabs-list {
    /deep/ .van-tabs__nav {
      background: none;
    }
    /deep/ .van-tab {
      width: 1.073rem;
      height: 0.452rem;
      border-radius: 0.226rem;
      border: solid 0.006rem #2ecb62;
      flex: none;
      margin-right: 0.226rem;
      font-size: 0.215rem;
    }
    /deep/ .van-tab--active {
      background-color: #2ecb62;
    }
}
</style>