<template>
  <div class="store-d-wrap">
    <search-top :address="false" :search="false"></search-top>

    <div class="bg-img">
      <!-- <img src="../../assets/img/店铺首页.png" alt="" /> -->
      <swipe autoplay="5000" loop style="height:100%">
        <swipe-item v-for="(item,i) in storeInfo.detailsPic.split(',')" :key="i">
          <img class="swipe-img" :src="item" alt="" @click="carouselToPage(item)" />
        </swipe-item>
      </swipe>
    </div>

    <div class="store-content">
      <div class="odd-wrap column sb">
        <div class="top row sb ">
          <div class="row">
            <div class="img-box">
              <img :src="storeInfo.head" alt="" />
            </div>
            <div class="shop-info">
              <span>{{storeInfo.storeName.length>10?storeInfo.storeName.substr(0,10)+'...':storeInfo.storeName}}</span>
              <div class="row ac jc">热门门店</div>
            </div>
          </div>
          <div @click="focusStoreFn">
            <div class="favo row ac jc" v-show="!isCollect">+关注</div>
            <div class="favo row ac jc collect" v-show="isCollect">已关注</div>
          </div>
        </div>

        <div class="desc e2">
          {{storeInfo.introduce}}
        </div>
        <!-- 暂时不做 -->
        <!-- <div class="coupon-list row" @click="couponPop=true">
          <div class="coupon-item row sb">
            <div>￥10 满减券</div>
            <div>领</div>
          </div>
          <div class="coupon-item row sb">
            <div>9.8折 折扣券</div>
            <div>领</div>
          </div>
        </div> -->
        <div class="bottom row sb ac">
          <span><i class="iconfont iconanquan"></i> 期货保证</span>
          <span><i class="iconfont iconzhengpinbaozhang"></i> 100%正品</span>
          <span><i class="iconfont iconshouhou1"></i> 售后无忧</span>
        </div>
      </div>
      <!-- 地址 -->
      <div class="address row ac sb">
        <div class="row">
          <i class="iconfont icondizhi"></i>
          <div class="e1 text">{{storeInfo.address.replace(/\s/g,'')}}</div>
        </div>
        <i class="iconfont iconARROW"></i>
      </div>

      <!-- 热销产品 -->
      <div class="active-wrap">
        <div class="header row sb">
          <span>热销产品</span>
        </div>
        <div class="content">
          <router-link :to="'/goodsdetail?id='+item.productId" class="active-card col" v-for="item in storeInfo.productList" :key="item.productId">
            <div class="img-wrap">
              <img :src="item.pic" alt="" />
            </div>
            <div class="col sb ac" style="padding: 0 0.17rem; flex: 1">
              <div class="name e2">{{item.productName}}</div>
              <div class="price"><span class="symbol">￥</span>{{item.paymentPrice}} </div>
            </div>
          </router-link>
        </div>
      </div>

      <!-- 筛选 -->
      <sticky>
      <div class="prepar-wrap row ac">
        <span
          :class="{ 'active-text': conditionIdx == 0 }"
          @click="changeCondition(0)"
          >综合</span
        >
        <span
          :class="{ 'active-text': conditionIdx == 1 }"
          @click="changeCondition(1)"
          >销量</span
        >
        <span
          class="row ac"
          :class="{ 'active-text': conditionIdx == 2 }"
          @click="changeCondition(2)"
        >
          价格
          <preparation :status.sync="salesCondition" ref="price"></preparation>
        </span>
      </div>
      </sticky>
      <!-- <waterfall
              @afterFetch="mergeGoodsList"
              :req="getStoreGoodsApi"
              :params="storeParams"
              ref="storeWaterFall">
        <div class="row sb" style="flex-wrap:wrap">
          <home-good-card v-for="item in goodsList" :key="item.id" :info="item"></home-good-card>
        </div>
      </waterfall> -->

        <listEnHands
          :req="getStoreGoodsApi"
          :params="storeParams"
          @reachBottom="mergeGoodsList"
          ref="listEnhands">
          <div class="row sb" style="flex-wrap:wrap">
            <home-good-card v-for="item in goodsList" :key="item.id" :info="item"></home-good-card>
          </div>
        </listEnHands>
    </div>

    <!-- 领取优惠券pop -->
    <action-sheet v-model="couponPop" title="店铺优惠">
      <div class="take-coupon-pop">
        <div class="coupon-item row ac">
          <div class="left-top row ac jc">店铺满减券</div>
          <div class="left row ac jc">￥20</div>
          <div class="mid column sb">
            <span>全场通用</span>
            <span>有效期至2020-10-20</span>
          </div>
          <div class="right row ac jc">
            <div class="take row ac jc">立即领取</div>
          </div>
        </div>
        <div class="coupon-item row ac">
          <div class="left-top row ac jc">店铺折扣券</div>
          <div class="left row ac jc">9.8折</div>
          <div class="mid column sb">
            <span>全场通用</span>
            <span>有效期至2020-10-20</span>
          </div>
          <div class="right row ac jc">
            <!-- <div class="take row ac jc">立即领取</div> -->
            <div class="take took row ac jc">已领取</div>
          </div>
        </div>
        <!-- 预留了一个position类 优惠券过多就不浮动按钮 -->
        <div class="close-btn row ac jc position" @click="couponPop=false">关闭</div> 
      </div>
    </action-sheet>

     <!-- 加载动画 -->
    <loading ref="loading"></loading>
  </div>
</template>

<script>
import api from '../../api/store'
import waterfall from '../../components/common/waterfall'
import { ActionSheet, Swipe, SwipeItem, Sticky, Dialog } from 'vant';
import searchTop from "@/components/common/my/search-top";
import preparation from "@/components/common/my/preparation";
import homeGoodCard from '@/components/common/card/home-good-card'
import loading from '../../components/common/my/loading'
import listEnHands from '../../components/common/my/list-enhands'
export default {
  data() {
    return {
      isCollect:false, //是否收藏店铺
      conditionIdx: 0,
      salesCondition: 0,
      storeInfo:{address:'',storeName:'',detailsPic:''},
      couponPop:false, //领取优惠券pop
      goodsList:[],
      storeParams:{
        //pageNo: 1,
        //pageSize: 10,
        //priceSort: false,
        //saleSort: false,
        storeId: this.$route.query.id
      }
    };
  },
  methods: {
    getStoreGoodsApi: api.getStoreGoods,
    changeCondition(i) { //筛选 x_x 一坨一坨的
      this.conditionIdx = i;
      if(this.conditionIdx == 0){
        this.$refs.price.reset()
        delete this.storeParams.priceSort
        this.storeParams.saleSort = false
      }
      if(this.conditionIdx == 1){
        this.$refs.price.reset()
        delete this.storeParams.priceSort
        this.storeParams.saleSort = true
      }
      if(this.conditionIdx==2){
        //价格升序降序
        this.storeParams.saleSort = false
        if(this.salesCondition==0){
          delete this.storeParams.priceSort
        }else if(this.salesCondition==1){
          this.storeParams.priceSort = true
        }else{
          this.storeParams.priceSort = false
        }
      }
      this.goodsList = []
      this.$refs.listEnhands.refresh()
    },
  async getStoreDetail(){
      let params ={
        lat: 0,
        lon: 0,
        storeId: this.$route.query.id
      }
      if(this.$store.state.user.info.memberUserInfoVo){
        params.memberId = this.$store.state.user.info.memberUserInfoVo.id||null
      }
      let res = await api.getStoreDetail(params)
      if(!res.success){
        Dialog.alert({
          //title: '标题',
          message: res.message,
        }).then(() => {
          // on close
          this.$router.go(-1)
        });
        return
      }
      this.storeInfo = res.result
      this.$refs.loading.hide()
      //判断是否收藏了店铺
      res.result.state==0?this.isCollect=false:this.isCollect=true
    },
    async focusStoreFn(){
      let params = {
        storeId: this.$route.query.id
      }
      if(this.$store.state.user.info.memberUserInfoVo){
        params.memberId = this.$store.state.user.info.memberUserInfoVo.id||null
      }
      let res = await api.focusStore(params)
      if(res.success){
        this.isCollect = !this.isCollect
      }
        this.showToast(res.message)
    },
    //goods
    mergeGoodsList(result){
      this.goodsList = [...this.goodsList, ...result.lists]
    }
  },
  created(){
    this.getStoreDetail()
    
    this.$nextTick(()=>{
     this.$refs.loading.load()
   })
  },
  watch:{
   $route(to){
     this.getStoreDetail()
   }
 },
  components: {
    searchTop,
    preparation,
    homeGoodCard,
    ActionSheet,
    waterfall,
    Swipe, 
    SwipeItem,
    loading,
    listEnHands,
    Sticky
  },
};
</script>

<style lang="less" scoped>
.store-d-wrap {
  height: 100vh;
  background-color: #f6f6f6;
  overflow: scroll;
}
.bg-img {
  width: 6.36rem;
  height: 3.05rem;
  img {
    width: 100%;
    height: 100%;
  }
}
.store-content {
  padding: 0 0.27rem;
}
.odd-wrap {
  box-sizing: border-box;
  // height: 2.03rem;
  background-color: #ffffff;
  border-radius: 0.11rem;
  transform: translateY(-50%);
  margin-bottom: -0.72rem;
  padding: 0.17rem 0.23rem;
  // margin-bottom: 0.23rem;
  .top {
    // height: 1.46rem;
    .img-box {
      width: 1.02rem;
      height: 1.02rem;
      background-color: #ffffff;
      border-radius: 0.06rem;
      padding: 0.06rem;
      box-sizing: border-box;
      transform: translateY(-32%);
      margin-bottom: -0.32rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .shop-info {
      height: 0.25rem;
      margin-left: 0.11rem;
      font-size: 0.27rem;
      line-height: 1;
      div {
        width: 0.85rem;
        height: 0.24rem;
        background-color: #fadcdc;
        border-radius: 0.12rem;
        // transform: scale(.7);
        font-size: 0.17rem;
        color: #fc0808;
        margin-top: 0.04rem;
      }
    }
  }
  .favo {
    width: 0.73rem;
    height: 0.27rem;
    background-color: #2ecb62;
    border-radius: 0.14rem;
    color: #ffffff;
    font-size: 0.18rem;
  }
  .collect{
    background-color: #dddddd;
    color: #a8a8a8;
  }
  .desc {
    font-size: 0.21rem;
    color: #a8a8a8;
    margin: 0.08rem 0.05rem;
  }
  .coupon-list {
    margin-top: 0.23rem;
    margin-bottom: 0.1rem;
    .coupon-item {
      width: 1.92rem;
      height: 0.54rem;
      background-image: url("../../assets/img/店铺首页-优惠券.png");
      background-size: 100% 100%;
      padding: 0.11rem;
      box-sizing: border-box;
      font-size: 0.2rem;
      color: #ffffff;
      margin-right: 0.23rem;
    }
  }
  .bottom{
    color:#a9a9a9;
    font-size: 0.18rem;
    i{
      font-size: 0.18rem;
    }
  }
}
.address {
  height: 0.68rem;
  background-color: #ffffff;
  border-radius: 0.11rem;
  padding: 0 0.17rem;
  .text {
    width: 70vw;
    font-size: 0.21rem;
    margin-left: 0.14rem;
  }
  i {
    font-size: 0.27rem;
  }
}
.active-wrap {
  // padding-left: 0.24rem;
  // padding-right: 0.24rem;
  margin-top: 0.45rem;
  margin-bottom: 0.45rem;
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
        flex-shrink: 0;
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
.prepar-wrap {
  padding: 0 0.45rem;
  height: 0.68rem;
  background-color: #ffffff;
  border-radius: 0.11rem;
  font-size: 0.21rem;
  color: #1a1a1a;
  line-height: 1;
  margin-bottom: 0.21rem;
  span {
    margin-right: 0.68rem;
  }
  .active-text{
    color: #2ecb62;
  }
}

.take-coupon-pop{
  height: 40vh;
  padding: 0.27rem 0.3rem;
  background-color: #f6f6f6;
  position: relative;
  .coupon-item{
    width: 5.81rem;
    height: 1.47rem;
    background-color: #ffffff;
    border-radius: 0.11rem;
    margin-bottom: 0.23rem;
    position: relative;
    box-sizing:  border-box;
    padding: 0.42rem 0;
    .left-top{
      width: 1.47rem;
      height: 0.31rem;
      background-color: #fc0808;
      font-size: 0.18rem;
      border-radius: 0.11rem 0rem 0.11rem 0rem;
      color: #ffffff;
      position: absolute;
      left: 0;
      top: 0;
    }
    .left{
      flex: 1;
      font-size: 0.36rem;
      color: #fc0808;
      font-weight: bold;
    }
    .mid{
      flex: 2;
      font-size: 0.21rem;
      height: 100%;
      color: #1a1a1a;
    }
    .right{
      flex: 1;
      .take{
        width: 1.24rem;
        height: 0.45rem;
        background-color: #fc0808;
        border-radius: 0.23rem;
        font-size: 0.21rem;
        color: #ffffff;
        margin-right: 0.23rem;
      }
      .took{
        background-color: #a8a8a8;
      }
    }
  }
  .close-btn{
    width: 5.81rem;
    height: 0.56rem;
    background-color: #2ecb62;
    border-radius: 0.28rem;
    font-size: 0.21rem;
    color: #ffffff;

    
  }
  .position{
    position: absolute;
    bottom: 0.23rem;
    left: 50%;
    transform: translateX(-50%);
  }
}


/deep/.van-action-sheet__header{
  background-color: #f6f6f6;
}
</style>