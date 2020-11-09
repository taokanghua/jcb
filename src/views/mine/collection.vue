<template>
  <div class="collection-wrap">
    <div class="tab row sb ac">
        <div :class="{active:tabIdx==0}" @click="tabIdx=0">商品</div>
        <div :class="{active:tabIdx==1}" @click="tabIdx=1">店铺</div>
    </div>

    <div class="goods-wrap row sb" style="flex-wrap:wrap" v-show="tabIdx==0">
      <home-good-card v-for="item in 5" :key="item"></home-good-card>
    </div>

    <!-- 店铺 -->
    <div class="shop-wrap" v-show="tabIdx==1">
      <hot-recom-card v-for="item in 3" :key="item"></hot-recom-card>
    </div>

  </div>
</template>

<script>
import homeGoodCard from '../../components/common/card/home-good-card'
import hotRecomCard from '../../components/common/card/hot-recom-card'
export default {
  data(){
    return{
      tabIdx:0
    }
  },
  methods:{},
  components:{
    homeGoodCard,
    hotRecomCard
  },
  created(){
    let {type} = this.$route.query
    this.tabIdx = type
  }
}
</script>

<style lang="less" scoped>
.collection-wrap{
  height: 100vh;
  background-color: #f6f6f6;
  overflow: scroll;
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
.goods-wrap{
  padding: 0.23rem 0.27rem;
}
.shop-wrap{
  padding: 0.23rem 0.27rem;
}
</style>