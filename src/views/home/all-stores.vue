<template>
  <div class="all-stores-wrap">
     <div class="header-top row sb ac">
      <input type="search" placeholder="请输入商品名称或店铺名称搜索" v-model="searchText" @change="searchStoreHandle"/>
    </div>

    <div class="all-store-content">
        <!-- 小筛选 -->
      <div class="simple-prapar row ac">
        <span @click="changeStoreType(0)" :class="{active:typeList.includes(0)}">综合</span>
        <span @click="changeStoreType(1)" :class="{active:typeList.includes(1)}">销量</span>
        <span @click="changeStoreType(2)" :class="{active:typeList.includes(2)}">评分</span>
      </div>

      <waterfall
              @afterFetch="storeListData"
              :req="searchStore"
              :params="storeParams"
              ref="storeWaterFall"
            >
            <hot-recom-card v-for="(item,i) in storeList" :key="i" :info="item"></hot-recom-card>
      </waterfall>
      <!-- <hot-recom-card v-for="item in 5" :key="item"></hot-recom-card> -->
    </div>
    
  </div>
</template>

<script>
import api from '../../api/home'
import hotRecomCard from '../../components/common/card/hot-recom-card'
import waterfall from '../../components/common/waterfall'
export default {
  data(){
    return{
      searchText:'',
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
      storeList:[],
      typeList:[0,-1,-1], //筛选数组
    }
  },
  methods:{
    searchStore: api.searchStore,
    searchStoreHandle(){
      this.storeList = []
      this.storeParams.keyword=this.searchText
      this.$refs.storeWaterFall.refresh()
    },
    storeListData(result){
      this.storeList = [...this.storeList, ...result.lists]
    },
    changeStoreType(i){
      this.storeList =[]
      let map = ['', 'saleCount', 'score']
      if(this.typeList[i] == i){
        //取消
        this.typeList[i] = -1
        this.storeParams[map[i]] = false
      }else{
        this.typeList[i] = i
        this.storeParams[map[i]] = true
      }
      this.$forceUpdate()
      this.$refs.storeWaterFall.refresh()
    }
  },
  watch:{
    searchText(n){
      if(n.length==0){
        this.storeList = []
        this.storeParams.keyword = ''
        this.$refs.storeWaterFall.refresh()
      }
    }
  },
  components:{
    hotRecomCard,
    waterfall
  }
}
</script>

<style lang="less" scoped>
.all-stores-wrap{
  height: 100vh;
  background-color: #f6f6f6;
  overflow: scroll;
}
.header-top {
  padding: 0 0.27rem;
  background-color: #ffffff;
  input {
    margin: 0.12rem 0;
    flex: 1;
    font-size: 0.18rem;
    color: #bbbbbb;
    height: 0.51rem;
    background-color: #f6f6f6;
    border-radius: 0.25rem;
    padding-left: 10px;
  }
}
.all-store-content{
  padding: 0.23rem 0.27rem;
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
  .active{
    color: #2ecb62;
  }
}
</style>