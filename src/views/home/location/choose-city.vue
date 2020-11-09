<template>
  <div class="choose-city-wrap">
    <div class="top-search row sb ac">
      <input type="search" placeholder="请选择城市">
      <span>取消</span>
    </div>

    <!-- 热门城市 -->
    <div class="hot-city">
      <span class="title">热门城市</span>
      <div class="city-wrap">
        <div class="city-item" v-for="item in hotCityList" :key="item">{{item}}</div>
      </div>
    </div>

    <index-bar>
      <index-anchor index="A"></index-anchor>
      <cell title="啊啊啊啊"></cell>
      <cell title="啊哦a"></cell>
      <index-anchor index="W"></index-anchor>
      <cell title="武汉"></cell>
      <cell title="武穴"></cell>
    </index-bar>
  </div>
</template>

<script>
import { IndexBar, IndexAnchor, Cell } from 'vant';
export default {
  data(){
    return{
      hotCityList:['北京市', '上海市', '广州市', '深圳市', '天津市', '南京市', '杭州市', '武汉市', '苏州市']
    }
  },
  methods:{},
  components:{
    IndexBar,
    IndexAnchor,
    Cell
  }
}
</script>

<style lang="less" scoped>
.choose-city-wrap{
  height: 100vh;
  background-color: #f6f6f6;
  overflow: scroll;
}
.top-search{
  height: 0.75rem;
  height: 0.51rem;
  background-color: #ffffff;
  padding: 0.12rem 0.27rem;
  margin-bottom: 0.23rem;
  input{
    width: 4.8rem;
    background-color: #f6f6f6;
    border-radius: 0.25rem;
    font-size: 0.18rem;
    color: #bbbbbb;
    padding-left: 0.2rem;
  }
  span{
    font-size: 0.21rem;
    color: #2ecb62;
  }
}
.hot-city{
  padding: 0.23rem 0.27rem;
  background-color: #ffffff;
  margin-bottom: 0.23rem;
  .title{
    font-size: 0.21rem;
    color: #a8a8a8;
  }
  .city-wrap{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 0.23rem;
    margin-top: 0.18rem;
    .city-item{
      width: 1.79rem;
      height: 0.51rem;
      background-color: #f6f6f6;
      text-align: center;
      line-height: 0.51rem;
      font-size: 0.21rem;
      color: #1a1a1a;
    }
  }
}

/deep/.van-index-bar__sidebar{
  display: none;
}
</style>