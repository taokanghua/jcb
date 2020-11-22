<template>
  
    <div class="search-page-wrap">
      <div class="header-top row sb ac">
        <input
          type="search"
          placeholder="请输入商品名称或店铺名称搜索"
          v-model="searchText"
          @change="searchBlur"
        />
      </div>
      <!-- <search-top :address="false" @focus="getFocus" @blur="loseFocus"></search-top> -->

      <tabs color="#2ecb62" v-model="seleteTab" v-show="!searchStatus">
        <tab title="商品">
          <div class="store">
            <div class="prepar-wrap row sb ac">
              <div class="row left sb">
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
                  <preparation :status.sync="salesCondition" ref="prepa"></preparation>
                </span>
              </div>
              <div class="row right">
                <div class="row ac" @click="praparationPop = true"><i class="iconfont iconshaixuan"></i> 筛选</div>
              </div>
            </div>
            <waterFall
    @afterFetch="handleFetchResult"
    :req="searchGoods"
    :params="goodsParams"
    ref="waterFall"
  >
            <div class="goods-wrap row sb" style="flex-wrap: wrap">
              <home-good-card
                v-for="(item, i) in goodsList"
                :key="i"
                :info="item"
              ></home-good-card>
            </div>
            </waterFall>
          </div>
        </tab>
        <tab title="店铺">
          <div class="store">
            <div class="simple-prapar row ac sb">
              <div class="row ac">
                <span :class="{active:storeSelectIdx==0}" @click="changeStoreType(0)">综合</span>
                <span :class="{active:storeSelectIdx==1}" @click="changeStoreType(1)">销量</span>
                <span :class="{active:storeSelectIdx==2}" @click="changeStoreType(2)">评分</span>
              </div>
              <!-- <div class="right">
                <i class="iconfont iconshaixuan"></i> 筛选
              </div> -->
            </div>
            <waterFall
              @afterFetch="storeListData"
              :req="searchStore"
              :params="storeParams"
              ref="storeWaterFall"
            >
            <hot-recom-card v-for="(item,i) in storeList" :key="i" :info="item"></hot-recom-card>
            </waterFall>
            <!-- 商店 -->
          </div>
        </tab>
      </tabs>

      <!-- 商品筛选弹框 -->
      <pop-up
        :show="praparationPop"
        position="right-center"
        @onModalClick="closePop"
      >
        <preparation-inner 
        :info="goodsBrands" 
        @close="closePop"
        @reset="resetPop"
        @confirm="confirm"></preparation-inner>
      </pop-up>
    </div>
  
</template>
 
<script>
import api from "../../api/home";
import { Tab, Tabs, List } from "vant";
import waterFall from "../../components/common/waterfall";
import preparation from "../../components/common/my/preparation";
import homeGoodCard from "../../components/common/card/home-good-card";
import hotRecomCard from "../../components/common/card/hot-recom-card";
import popUp from "../../components/common/popUp";
import preparationInner from "../../components/common/my/preparation-inner";
export default {
  data() {
    return {
      seleteTab:0, //tab卡片
      searchText: "",
      searchStatus: false, //搜索无
      salesCondition: 0,
      conditionIdx: 0,
      storeSelectIdx:0,
      praparationPop: false, //公用筛选弹框
      timer: null, // 触底节流
      goodsParams: {
        //brandId: string,
        //endPrice: 0,
        keyword: "",
        saleCount: false,
        //startPrice: 0,
        //priceSort:true,
        type: 0,
        userLat: 0,
        userLng: 0,
      },
      storeParams:{
        //brandId: string,
        keyword: '',
        // pageNo: 0,
        // pageSize: 0,
        saleCount: false,
        score: false,
        // userLat: 0,
        // userLng: 0
      },
      goodsList: [], //筛选出来的数组
      goodsBrands:[], //商品品牌列表
      preSale:-1, //是否预售
      brandIdx:-1,  // 品牌id

      storeList:[], //dianpu
    };
  },
  methods: {
    searchGoods: api.searchGoods,
    searchStore: api.searchStore,
    closePop(){
      this.praparationPop = !this.praparationPop
    },
    resetPop(){
      this.goodsParams.type = 0
      delete this.goodsParams.brandId
      delete this.goodsParams.startPrice
      delete this.goodsParams.endPrice
      this.$refs.waterFall.refresh()
    },
    async getBrandRec(){
      //获取推荐品牌
      let res = await api.getAllBrand()
      Object.values(res.result).map(v=>{this.goodsBrands.push(...v)}) 
    },
    changeCondition(i) {
      this.conditionIdx = i;
      this.goodsList = []
      if(i==0){
        //总量
        delete this.goodsParams.priceSort
        this.goodsParams.saleCount = false
        this.$refs.prepa.reset()
      }
      if(i==1){
        // 销量
        delete this.goodsParams.priceSort
        this.goodsParams.saleCount = true
        this.$refs.prepa.reset()
      }
      if(i==2){
        // 价格
        this.goodsParams.saleCount = false
        if(this.salesCondition==0){
          delete this.goodsParams.priceSort
        }else if(this.salesCondition==1){
          this.goodsParams.priceSort = true
        }else{
          this.goodsParams.priceSort = false
        }
      }
      this.$refs.waterFall.refresh()
    },
    changeStoreType(i){
      this.storeSelectIdx = i
      this.storeList = []
      if(this.storeSelectIdx==0){
        this.storeParams.saleCount=false
        this.storeParams.score = false
      }
      if(this.storeSelectIdx==1){
        this.storeParams.saleCount = true
        this.storeParams.score = false
      }
      if(this.storeSelectIdx==2){
        this.storeParams.score = true
        this.storeParams.saleCount=false
      }
      this.$refs.storeWaterFall.refresh()
    },
    async searchBlur() {
      //结束展示更多
      if(this.seleteTab==0){//搜商品
        this.goodsParams.keyword = this.searchText;
        this.goodsList = []
        this.$refs.waterFall.refresh()
      }else{
        this.storeParams.keyword = this.searchText
        this.storeList = []
        this.$refs.storeWaterFall.refresh()
      }
    },
    // async getGoods() {
    //   let res = await api.searchGoods(this.goodsParams);
    // },
    handleFetchResult(result) {
      this.goodsList = [...this.goodsList, ...result.lists];
    },
    storeListData(result){
      this.storeList = [...this.storeList, ...result.lists]
    },
    confirm(value, price){
      //点击筛选后返回的
      // console.log(value, price)
      this.goodsList=[]
      this.goodsParams.type = value[0]||null
      this.goodsParams.brandId = value[1].id||null
      this.goodsParams.startPrice = price.start
      this.goodsParams.endPrice = price.end
      this.$refs.waterFall.refresh()
    }
  },
  created(){
    if(this.$route.query.id){
      this.goodsParams.brandId = this.$route.query.id
    }
    this.getBrandRec()
  },
  watch: {
    searchText(n) {
      if (n.length == 0) {
        this.$refs.waterFall.refresh();
      }
    },
  },
  components: {
    Tab,
    Tabs,
    List,
    preparation,
    homeGoodCard,
    hotRecomCard,
    popUp,
    preparationInner,
    waterFall,
  },
};
</script>

<style lang="less" scoped>
.search-page-wrap {
  background-color: #f6f6f6;
  
}
.header-top {
  padding: 0 0.27rem;
  // margin: 0.12rem 0;
  background-color: #ffffff;
  position: relative;
  input {
    margin: 0.12rem 0;
    // width: 100%;
    flex: 1;
    font-size: 0.18rem;
    color: #bbbbbb;
    height: 0.51rem;
    background-color: #f6f6f6;
    border-radius: 0.25rem;
    padding-left: 10px;
  }
}
.store {
  padding: 0.23rem 0.27rem;
}
.prepar-wrap {
  padding: 0 0.16rem;
  height: 0.68rem;
  background-color: #ffffff;
  border-radius: 0.06rem;
  font-size: 0.21rem;
  color: #1a1a1a;
  line-height: 1;
  margin-bottom: 0.21rem;
  .left {
    flex: 3;
  }
  .right {
    flex: 2;
    justify-content: flex-end;
    i {
      font-size: 0.19rem;
      margin-right: 0.01rem;
    }
  }
}
.simple-prapar {
  box-sizing: border-box;
  height: 0.68rem;
  background-color: #ffffff;
  border-radius: 0.11rem;
  padding: 0.24rem 0.45rem;
  margin-bottom: 0.23rem;
  .active{
    color: #2ecb62;
  }
  span {
    font-size: 0.21rem;
    color: #1a1a1a;
    margin-right: 0.67rem;
  }
  i {
    font-size: 0.19rem;
  }
  .right {
    font-size: 0.21rem;
    color: #1a1a1a;
  }
}
.active-text {
  color: #2ecb62;
}
/deep/.van-tabs__nav--line {
  padding-left: 1.6rem;
  padding-right: 1.6rem;
}
</style>