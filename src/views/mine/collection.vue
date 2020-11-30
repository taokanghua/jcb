<template>
  <div class="collection-wrap">
    <div class="tab row sb ac">
        <div :class="{active:tabIdx==0}" @click="tabIdx=0">商品</div>
        <div :class="{active:tabIdx==1}" @click="tabIdx=1">店铺</div>
    </div>

    <div class="goods-wrap row sb" style="flex-wrap:wrap" v-show="tabIdx==0">
      <home-good-card v-for="(item,i) in list" :key="i" :info="item"></home-good-card>
    </div>

    <!-- 店铺 -->
    <div class="shop-wrap" v-show="tabIdx==1">
      <hot-recom-card v-for="(item,i) in list" :key="i" :info="item"></hot-recom-card>
    </div>
    <empty image="error" description="暂无收藏" v-show="list.length==0"></empty>

  </div>
</template>

<script>
import {Empty} from 'vant'
import api from '../../api/user'
import homeGoodCard from '../../components/common/card/home-good-card'
import hotRecomCard from '../../components/common/card/hot-recom-card'
export default {
  data(){
    return{
      tabIdx:0,
      list:[]
    }
  },
  methods:{
    async getCollectList(){
      let params = {
        pageNo: 1,
        pageSize: 1000,
        type: parseInt(this.tabIdx)+1,
        userLat: 0,
        userLng: 0,
        source:1
      }
      let res = await api.getCollectList(params)
      // console.log(res)
      this.list = ((res.result||{}).lists||[]).map(v=>{
        v.productId = v.commodityId
        return v
      })
      // console.log(this.list)
    }
  },
  components:{
    homeGoodCard,
    hotRecomCard,
    Empty
  },
  watch:{
    tabIdx(n){
      this.getCollectList()
    }
  },
  created(){
    let {type} = this.$route.query
    this.tabIdx = type

    this.getCollectList()
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