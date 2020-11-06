<template>
  <div class="all-stores-wrap">
    <search-top :address="false"></search-top>

    <div class="all-store-content">
        <!-- 小筛选 -->
      <div class="simple-prapar row ac">
        <span>综合</span>
        <span>销量</span>
        <span>评分</span>
      </div>

      <hot-recom-card v-for="item in 5" :key="item"></hot-recom-card>
    </div>
    
  </div>
</template>

<script>
import searchTop from '../../components/common/my/search-top'
import hotRecomCard from '../../components/common/card/hot-recom-card'
export default {
  data(){
    return{

    }
  },
  methods:{},
  components:{
    searchTop,
    hotRecomCard
  }
}
</script>

<style lang="less" scoped>
.all-stores-wrap{
  height: 100vh;
  background-color: #f6f6f6;
  overflow: scroll;
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
}
</style>