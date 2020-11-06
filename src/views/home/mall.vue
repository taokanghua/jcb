<template>
  <div class="mall-wrap">
    <search-top></search-top>

    <swipe autoplay class="swipe">
      <swipe-item>
        <img src="../../assets/img/店铺街banner.png" alt="">
      </swipe-item>
      <swipe-item>
        <img src="../../assets/img/店铺街banner.png" alt="">
      </swipe-item>
    </swipe>
    
    <div class="mall-content">
      <!-- 这里暂无 -->
      <div class="menu-wrap">
        <swipe style="width:100%;height:100%">
          <swipe-item class="swipe-item row sb ac">
            <div class="item">
              <img src="../../assets/img/分类图标/电动工具.png" alt="">
              <span>电动工具</span>
            </div>
            <div class="item">
              <img src="../../assets/img/分类图标/电线电缆.png" alt="">
              <span>电线电缆</span>
            </div>
            <div class="item">
              <img src="../../assets/img/分类图标/装饰材料.png" alt="">
              <span>装饰材料</span>
            </div>
            <div class="item">
              <img src="../../assets/img/分类图标/工具配件.png" alt="">
              <span>工具配件</span>
            </div>
            <div class="item">
              <img src="../../assets/img/分类图标/电工电器_1.png" alt="">
              <span>电工电器</span>
            </div>
          </swipe-item>
          <swipe-item class="swipe-item row sb ac">
            <div class="item">
              <img src="../../assets/img/分类图标/电动工具.png" alt="">
              <span>电动工具</span>
            </div>
            <div class="item">
              <img src="../../assets/img/分类图标/电动工具.png" alt="">
              <span>电动工具</span>
            </div>
            <div class="item">
              <img src="../../assets/img/分类图标/电动工具.png" alt="">
              <span>电动工具</span>
            </div>
            <div class="item">
              <img src="../../assets/img/分类图标/电动工具.png" alt="">
              <span>电动工具</span>
            </div>
            <div class="item">
              <img src="../../assets/img/分类图标/电动工具.png" alt="">
              <span>电动工具</span>
            </div>
          </swipe-item>
        </swipe>
      </div>

      <!-- 新店推荐 -->
    <div class="mall-com-card">
      <div class="title row sb ac">
        <span>新店推荐</span>
        <!-- <div class="more">更多 <i class="iconfont icongengduo"></i></div> -->
      </div>
      <div class="shop-wrap row sb" >
        <div class="shop-item" v-for="item in 6" :key="item">
          <img src="../../assets/img/店铺街-新店推荐2.png" alt="">
          <div>商店名</div>
        </div>
      </div>
    </div>
      <!-- 热门店铺 -->
      <div class="mall-com-card">
        <div class="title row sb ac mb2">
          <span>热门店铺</span>
          <div class="more">更多 <i class="iconfont icongengduo"></i></div>
        </div>
        <hot-recom-card v-for="item in 3" :key="item"></hot-recom-card>
      </div>

    </div>

    
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';
import searchTop from '../../components/common/my/search-top'
import hotRecomCard from '../../components/common/card/hot-recom-card'
export default {
  data(){
    return{}
  },
  methods:{},
  components:{
    Swipe,
    SwipeItem,
    searchTop,
    hotRecomCard
  }
}
</script>

<style lang="less" scoped>
.mall-wrap{
  height:100vh;
  background-color: #f6f6f6;
  overflow: auto;
}
.swipe{
  height: 2.82rem;
  img{
    height: 2.82rem;
  }
}
.mall-content{
  padding: 0 0.27rem;
}
.menu-wrap{
  box-sizing: border-box;
  padding: 0.18rem;
  height: 1.64rem;
  background-color: #ffffff;
  border-radius: 0.11rem;
  transform: translateY(-50%);
  margin-bottom: -0.82rem;
  .swipe-item{
    img{
      width: 0.72rem;
      height: 0.72rem;
      margin-bottom: 0.1rem;
    }
    div{
      color: #1a1a1a;
      font-size: 0.2rem;
    }
  .item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  }
}
.mall-com-card{
  margin-top: 0.45rem;
  .title{
    span{
      font-size: 0.27rem;
      font-weight: bold;
    }
    .more{
      font-size: 0.18rem;
      color: #a8a8a8;
      i{
        font-size: 0.15rem;
      }
    }
  }
}
.shop-wrap{
  flex-wrap: wrap;
  .shop-item{
    margin-top: 0.2rem;
    position: relative;
    img{
      width: 1.79rem;
      height: 2.15rem;
	    border-radius: 0.11rem;
    }
    div{
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #2ecb62;
      border-radius: 0rem 0rem 0.05rem 0.05rem;
      text-align: center;
      width:100%;
      font-size: 0.21rem;
      height: 0.45rem;
      line-height: 0.45rem;
      color: #ffffff;
    }
  }
}


//common
.mb2{
  margin-bottom: 0.2rem;
}
/deep/.van-swipe__indicators{
  bottom:0;
  .van-swipe__indicator {
    width: 0.25rem;
	  height: 0.07rem;
	  background-color: #2ecb62;
    border-radius: 0.03rem;
    margin-right: 0;
  }
}
</style>