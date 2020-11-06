<template>
  <div class="home-wrap">
    <!-- 头部搜索 -->
    <div class="header-top row sb ac">
      <input type="search" placeholder="请输入商品名称或店铺名称搜索" />
      <div>
        <i class="iconfont icondizhi"></i>
        <span>佛山</span>
      </div>
    </div>

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
        <div class="menu-item">
          <img src="../../assets/img/店铺街.png" alt="" />
          <span>店铺街</span>
        </div>
        <div class="menu-item">
          <img src="../../assets/img/品牌专区.png" alt="" />
          <span>品牌专区</span>
        </div>
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
          <count-down endTime="2020/11/06" bgColor="#fc0808" fontSize="0.18rem" marginLeft="0.1rem"></count-down>
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
        <div class="more">更多 <i class="iconfont icongengduo"></i></div>
      </div>
      <div class="shop-card" v-for="item in 3" :key="item">
        <div class="shop-header row sb">
          <div class="left row">
            <img class="shop-img" src="../../assets/img/门店头像.png" alt="" />
            <div class="info col sb">
              <div class="row ac">
                <span class="shop-name">豪迪五金店</span>
                <img src="../../assets/img/等级一.png" alt="" />
              </div>
              <div> <i class="iconfont iconstar" v-for="item in 5" :key="item"></i> </div>
            </div>
          </div>
          <div class="right col sb">
            <div class="go-shop">进店</div>
            <div class="distance">1.88KM</div>
          </div>
        </div>

        <div class="shop-goods sb">
          <div class="goods-item" v-for="item in 3" :key="item">
            <div class="img-show">
              <img src="../../assets/img/店铺商品展示.png" alt="" />
              <div class="tag">热销</div>
            </div>
            <div class="name e2">
              铁皮打包带专用大力剪刀 剪 铁皮带剪刀 钢带剪
            </div>
            <div class="price row">
              <div class="now">￥150</div>
              <div class="old">￥150</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 类型 -->
    <tabs background="none" color="#2ecb62">
      <tab title="电动工具">
        <div class="tabs-wrap row" >
          <home-card v-for="item in 3" :key="item"></home-card>
        </div>
      </tab>
      <tab title="电线电缆">电线电缆</tab>
      <tab title="电工电器">电工电器</tab>
      <tab title="机电设备">机电设备</tab>
      <tab title="佛山陶瓷">佛山陶瓷</tab>
    </tabs>

    <!-- 底部tabbar -->
    <myFooter></myFooter>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Rate, Tab, Tabs } from "vant";
import countDown from '../../components/common/count-down'
import myFooter from "../../components/common/my/footer";
import HomeCard from '../../components/common/card/home-good-card'
export default {
  name: "home",
  data() {
    return {};
  },
  components: {
    myFooter,
    Swipe,
    SwipeItem,
    Rate,
    Tab,
    Tabs,
    countDown,
    HomeCard
  },
};
</script>

<style lang="less" scoped>
.tabs-wrap{
  padding: 0 0.25rem;
  flex-wrap: wrap;
  justify-content: space-between;
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
  .shop-card {
    box-sizing: border-box;
    // width: 5.81rem;
    padding: 0.15rem;
    height: 3.79rem;
    background-color: #ffffff;
    border-radius: 0.11rem;
    margin-bottom: 0.23rem;
    display: flex;
    flex-direction: column;
    .shop-header {
      .left {
        .shop-img {
          width: 0.68rem;
          height: 0.68rem;
          border-radius: 50%;
        }
        .info {
          margin-left: 0.12rem;
          img {
            width: 0.31rem;
            height: 0.25rem;
            margin-left: 0.11rem;
          }
          .shop-name {
            font-size: 0.25rem;
            color: #1a1a1a;
            font-weight: bold;
          }
          i{
            font-size: 0.2rem;
            color:#f5b917;
            margin-right: 0.06rem;
          }
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .go-shop {
          width: 0.96rem;
          height: 0.36rem;
          background-color: #2ecb62;
          border-radius: 0.18rem;
          text-align: center;
          line-height: 0.36rem;
          color: #fff;
          font-size: 0.21rem;
        }
        .distance {
          color: #1a1a1a;
          font-size: 0.23rem;
          text-align: right;
        }
      }
    }
    .shop-goods {
      margin-top: 0.25rem;
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      .goods-item {
        width: 1.71rem;
        height: 100%;
        border-radius: 0.06rem;
        border: solid 0.01rem #c8c8c8;
        .img-show {
          position: relative;
          img {
            height: 1.36rem;
          }
          .tag {
            position: absolute;
            left: 0.11rem;
            bottom: 0.05rem;
            width: 0.53rem;
            height: 0.24rem;
            background-color: #fc0808;
            border-radius: 0.11rem;
            font-size: 0.17rem;
            color: #ffffff;
            line-height: 0.24rem;
            text-align: center;
          }
        }
        .name {
          margin-top: 0.12rem;
          padding-left: 0.11rem;
          color: #1a1a1a;
          font-size: 0.2rem;
        }
        .price {
          margin-top: 0.16rem;
          align-items: flex-end;
          .now {
            font-size: 0.24rem;
            color: #fc0808;
          }
          .old {
            font-size: 0.18rem;
            color: #a8a8a8;
            text-decoration:line-through;
          }
        }
      }
    }
  }
}

.home-wrap {
  height: 100vh;
  background-color: #f6f6f6;
  overflow: auto;
  padding-bottom: 0.84rem;
}
.header-top {
  padding: 0 0.27rem;
  // margin: 0.12rem 0;
  background-color: #ffffff;
  input {
    margin: 0.12rem 0;
    width: 4.52rem;
    font-size: 0.18rem;
    color: #bbbbbb;
    height: 0.51rem;
    background-color: #f6f6f6;
    border-radius: 0.25rem;
    padding-left: 10px;
  }
  div {
    i {
      font-size: 0.28rem;
    }
    span {
      font-size: 0.24rem;
      color: #1a1a1a;
    }
  }
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