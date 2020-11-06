<template>
  <div class="home-wrap">
    <!-- 头部搜索 -->
    <!-- <div class="header-top row sb ac">
      <input type="search" placeholder="请输入商品名称或店铺名称搜索" />
      <div>
        <i class="iconfont icondizhi"></i>
        <span>佛山</span>
      </div>
    </div> -->
    <search-top :search="false"></search-top>

    <!-- 轮播图 -->
    <div class="tools-wrap">
      <swipe autoplay="5000" loop style="height: 2.3rem">
        <swipe-item
          ><img
            class="swipe-img"
            src="../../assets/img/店铺街-新店推荐.png"
            alt=""
        /></swipe-item>
        <swipe-item
          ><img
            class="swipe-img"
            src="../../assets/img/店铺街-新店推荐2.png"
            alt=""
        /></swipe-item>
        <swipe-item
          ><img
            class="swipe-img"
            src="../../assets/img/店铺街-新店推荐3.png"
            alt=""
        /></swipe-item>
      </swipe>
      <div class="notify row ac">
        <img src="../../assets/img/金材宝资讯.png" alt="" />
        <span>特大喜讯，今天购物全场商品8折！！！</span>
      </div>

      <div class="menu row sb">
        <router-link to="/mall" tag="div" class="menu-item">
          <img src="../../assets/img/店铺街.png" alt="" />
          <span>店铺街</span>
        </router-link>
        <router-link to="/brandzone" tag="div" class="menu-item">
          <img src="../../assets/img/品牌专区.png" alt="" />
          <span>品牌专区</span>
        </router-link>
        <div class="menu-item">
          <img src="../../assets/img/特惠专区.png" alt="" />
          <span>特惠专区</span>
        </div>
        <div class="menu-item">
          <img src="../../assets/img/活动.png" alt="" />
          <span>活动</span>
        </div>
      </div>

      <img class="active-img" src="../../assets/img/招商加盟拷贝.png" alt="" />
    </div>

    <!-- 限时活动 -->
    <div class="active-wrap pr24">
      <div class="header row sb">
        <div>
          <span>限时活动</span>
          <count-down endTime="2020/11/10" bgColor="#fc0808" fontSize="0.18rem" marginLeft="0.1rem"></count-down>
        </div>
        <!-- <div class="more">更多 <i class="iconfont icongengduo"></i></div> -->
      </div>
      <div class="content">
        <div class="active-card col" v-for="item in 5" :key="item">
          <div class="img-wrap">
            <img src="../../assets/img/活动图片.png" alt="" />
            <div class="active-tag">拼团</div>
          </div>
          <div class="col sb ac" style="padding: 0 0.17rem; flex: 1">
            <div class="name">得力高档活动扳手可调扳</div>
            <div class="price">￥199</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 品牌专区 -->
    <div class="active-wrap pr24">
      <div class="header row sb">
        <span>大牌驾到</span>
        <div class="more">更多 <i class="iconfont icongengduo"></i></div>
      </div>
      <div class="logo-list">
        <img
          src="../../assets/img/品牌1.png"
          alt=""
          v-for="item in 8"
          :key="item"
        />
      </div>
    </div>

    <!-- 推荐店铺 -->
    <div class="active-wrap pr24">
      <div class="header row sb">
        <span>推荐店铺</span>
        <router-link to="/allstores" tag="div" class="more">更多 <i class="iconfont icongengduo"></i></router-link>
      </div>
      <hot-recom-card v-for="item in 3" :key="item"></hot-recom-card>
    </div>

    <!-- 类型 -->
    <!-- <tabs background="none" color="#2ecb62">
      <tab title="电动工具">
        <div class="tabs-wrap row" >
          <home-card v-for="item in 3" :key="item"></home-card>
        </div>
      </tab>
      <tab title="电线电缆">电线电缆</tab>
      <tab title="电工电器">电工电器</tab>
      <tab title="机电设备">机电设备</tab>
      <tab title="佛山陶瓷">佛山陶瓷</tab>
    </tabs> -->
    <div class="menu-title row sb ac">
      <div class="item column ac jc" :class="{active:recomIndex==0}" @click="changeRecom(0)">
        <div>新品推荐</div>
        <span>品质无忧</span>
      </div>
      <div class="item column ac jc" :class="{active:recomIndex==1}" @click="changeRecom(1)">
        <div>热销排行榜</div>
        <span>人气精选排行</span>
      </div>
      <div class="item column ac jc" :class="{active:recomIndex==2}" @click="changeRecom(2)">
        <div>智能推荐</div>
        <span>为你推荐</span>
      </div>
    </div>

    <div class="tabs-wrap row" >
          <home-card v-for="item in 3" :key="item"></home-card>
        </div>

    <!-- 底部tabbar -->
    <myFooter></myFooter>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Rate, Tab, Tabs } from "vant";
import countDown from '../../components/common/count-down'
import myFooter from "../../components/common/my/footer";
import HomeCard from '../../components/common/card/home-good-card'
import searchTop from '../../components/common/my/search-top'
import hotRecomCard from '../../components/common/card/hot-recom-card'
export default {
  name: "home",
  data() {
    return {
      recomIndex:0
    };
  },
  methods:{
    changeRecom(i){
      this.recomIndex = i
    }
  },
  components: {
    myFooter,
    Swipe,
    SwipeItem,
    Rate,
    Tab,
    Tabs,
    countDown,
    HomeCard,
    searchTop,
    hotRecomCard
  },
};
</script>

<style lang="less" scoped>
.tabs-wrap{
  padding: 0 0.25rem;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 0.28rem;
}
.pr24 {
  padding-right: 0.24rem;
}
.active-wrap {
  padding-left: 0.24rem;
  margin-top: 0.45rem;
  .header {
    margin-bottom: 0.12rem;
    span {
      font-size: 0.27rem;
      font-weight: bold;
    }
    .more {
      color: #a8a8a8;
      font-size: 0.18rem;
      i {
        font-size: 0.15rem;
      }
    }
  }
  .logo-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: center;
    img {
      width: 1.29rem;
      height: 1.02rem;
      background-color: #260109;
      border-radius: 0.06rem;
      margin-bottom: 0.23rem;
    }
  }
  .content {
    display: flex;
    flex: 1;
    overflow: auto;
    .active-card {
      flex-shrink: 0;
      width: 2.15rem;
      height: 2.88rem;
      background-color: #ffffff;
      border-radius: 0.11rem;
      margin-right: 0.23rem;
    }
    .img-wrap {
      position: relative;
      img {
        height: 1.69rem;
      }
      .active-tag {
        position: absolute;
        right: 0;
        top: 0;
        width: 0.51rem;
        height: 0.24rem;
        background-color: #2ecb62;
        border-radius: 0rem 0.11rem 0rem 0.11rem;
        font-size: 0.18rem;
        color: #ffffff;
        text-align: center;
        line-height: 0.24rem;
      }
    }
    .name {
      font-size: 0.21rem;
      line-height: 0.29rem;
      color: #1a1a1a;
    }
    .price {
      color: #fc0808;
      font-size: 0.27rem;
      font-weight: bold;
      margin-top: 0.18rem;
    }
  }
}

.home-wrap {
  height: 100vh;
  background-color: #f6f6f6;
  overflow: auto;
  padding-bottom: 0.84rem;
}

.tools-wrap {
  background-image: url("../../assets/img/首页底图.png");
  background-size: cover;
  padding: 0.23rem 0.27rem 0 0.27rem;

  overflow: hidden;
  .swipe-img {
    height: 100%;
  }
  .notify {
    box-sizing: border-box;
    height: 0.62rem;
    margin: 0.2rem 0;
    background-color: #ffffff;
    line-height: 0.62rem;
    border-radius: 0.06rem;
    img {
      width: 1.06rem;
      height: 0.2rem;
      margin-left: 0.16rem;
    }
    span {
      font-size: 0.21rem;
      margin-left: 0.34rem;
    }
  }
  .menu {
    // padding: 0 0.28rem;

    .menu-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img {
        width: 0.72rem;
        height: 0.72rem;
      }
      span {
        color: #1a1a1a;
        font-size: 0.2rem;
        margin-top: 0.11rem;
      }
    }
  }
  .active-img {
    margin-top: 0.34rem;
  }
}

// 修改后的
.menu-title{
  padding: 0 1rem;
  .item{
    div{
      font-size: 0.27rem;
    }
    span{
      font-size: 0.2rem;
      color: #a8a8a8;
      margin-top: 0.05rem;
    }
  }
  .active{
    color: #2ecb62;
    div{
      font-size: 0.26rem;
      font-weight: bold;
    }
    span{
      background-color: #2ecb62;
      border-radius: 0.14rem;
      width: 1.36rem;
      height: 0.28rem;
      text-align: center;
      line-height: 0.28rem;
      color: #ffffff;
    }
  }
}

/deep/.van-tabs__line {
  bottom: 50%;
  height: 0.09rem;
  border-radius: 0.05rem;
  width: 0.96rem;
  opacity: 0.8;
}
/deep/.van-tab__text {
  color: #1a1a1a;
}
/deep/.van-tab--active {
  font-weight: bold;
  span {
    font-size: 0.24rem;
  }
}
</style>