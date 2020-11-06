<template>
  <div class="search-page-wrap">
    <search-top :address="false"></search-top>

    <tabs color="#2ecb62">
      <tab title="商品">
        <div class="store">
          <div class="prepar-wrap row sb ac">
            <div class="row left sb">
              <span
                :class="{ 'active-text': conditionIdx == 0 }"
                @click="changeCondition(0)">综合</span>
              <span
                :class="{ 'active-text': conditionIdx == 1 }"
                @click="changeCondition(1)">销量</span>
              <span
                class="row ac"
                :class="{ 'active-text': conditionIdx == 2 }"
                @click="changeCondition(2)">
                价格
                <preparation :status.sync="salesCondition"></preparation>
              </span>
            </div>
            <div class="row right" @click="praparationPop=true">
              <i class="iconfont iconshaixuan"></i> 筛选
            </div>
          </div>
          <div class="goods-wrap row sb" style="flex-wrap:wrap">
            <home-good-card v-for="item in 3" :key="item"></home-good-card>
          </div>
        </div>
      </tab>
      <tab title="店铺">
        <div class="store">
          <div class="simple-prapar row ac sb">
            <div class="row ac">
              <span>综合</span>
              <span>销量</span>
              <span>评分</span>
            </div>
            <div class="right">
              <i class="iconfont iconshaixuan"></i> 筛选
            </div>
          </div>

          <!-- 商店 -->
          <hot-recom-card v-for="item in 3" :key="item"></hot-recom-card>

        </div>
      </tab>
    </tabs>

    <!-- 商品筛选弹框 -->
    <pop-up :show="praparationPop" position="right-center" @onModalClick="praparationPop=!praparationPop">
      <preparation-inner></preparation-inner>
    </pop-up>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant';
import searchTop from '../../components/common/my/search-top'
import preparation from '../../components/common/my/preparation'
import homeGoodCard from '../../components/common/card/home-good-card'
import hotRecomCard from '../../components/common/card/hot-recom-card'
import popUp from '../../components/common/popUp'
import preparationInner from '../../components/common/my/preparation-inner'
export default {
  data(){
    return{
      salesCondition:0,
      conditionIdx:-1,
      praparationPop:false, //公用筛选弹框
    }
  },
  methods:{
    changeCondition(i){
      if(this.conditionIdx==i){
        this.conditionIdx = -1
        return
      }
      this.conditionIdx = i
    }
  },
  components:{
    Tab,
    Tabs,
    searchTop,
    preparation,
    homeGoodCard,
    hotRecomCard,
    popUp,
    preparationInner
  }
}
</script>

<style lang="less" scoped>
.search-page-wrap{
  background-color: #f6f6f6;
  height: 100vh;
  overflow: scroll;
}
.store{
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
.simple-prapar{
  box-sizing: border-box;
  height: 0.68rem;
	background-color: #ffffff;
  border-radius: 0.11rem;
  padding: 0.24rem 0.45rem;
  margin-bottom: 0.23rem;
  span{
    font-size: 0.21rem;
    color: #1a1a1a;
    margin-right: 0.67rem;
  }
  i{
    font-size: 0.19rem;
  }
  .right{
    font-size: 0.21rem;
    color: #1a1a1a;
  }
}
.active-text{
  color: #2ecb62;
}
/deep/.van-tabs__nav--line{
  padding-left: 1.6rem;
  padding-right: 1.6rem;
}
</style>