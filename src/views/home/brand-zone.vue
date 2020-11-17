<template>
  <div class="brand-zone-wrap">
    <searchTop :address="false" :search="false"></searchTop>
    
    <div class="brand-zone-content">
      <!-- <span class="title">电动工具</span> -->
      <div class="shop-wrap">
        <img :src="item.logo" alt="" v-for="item in recomBrandList" :key="item.id" @click="$router.push({path:'/search?id='+item.id})">
      </div>
      <!-- <span class="title">电工电器</span>
      <div class="shop-wrap">
        <img src="../../assets/img/品牌2.png" alt="" v-for="item in 8" :key="item">
      </div>
      <span class="title">机电设备</span>
      <div class="shop-wrap">
        <img src="../../assets/img/品牌3.png" alt="" v-for="item in 8" :key="item">
      </div> -->

    </div>
    <!-- 索引栏 -->
      <index-bar highlight-color="#2ecb62" :sticky="false">
        <index-anchor :index="k" v-for="k in allBrandKeys" :key="k">
          <span>{{k}}</span>
          <cell :title="k.name"  v-for="(k,i) in allBrandObj[k]" :key="i" @click="$router.push({path:'/search?id='+k.id})"/>
        </index-anchor>
        <!-- <cell title="文本123" />
        <cell title="文本123" /> -->
        <!-- <index-anchor index='B'/>
        <cell title="文本123" />
        <cell title="文本123" />
        <cell title="文本123" />
        <index-anchor index='C'/>
        <cell title="文本123" />
        <cell title="文本123" />
        <cell title="文本123" />
        <index-anchor index='K'/>
        <cell title="文本123" />
        <cell title="文本123" />
        <cell title="文本123" />
        <index-anchor index='T'/>
        <cell title="文本123" />
        <cell title="文本123" />
        <cell title="文本123" /> -->
      </index-bar>
  </div>
</template>

<script>
import api from '../../api/home'
import { IndexBar, IndexAnchor, Cell } from 'vant';
import searchTop from '../../components/common/my/search-top'
export default {
  data(){
    return{
      recomBrandList:[],
      allBrandObj:{},
      allBrandKeys:[],
    }
  },
  methods:{
    async getRecomBrand(){
      let res = await api.getRecomBrand()
      this.recomBrandList = res.result
    },
    async getAllBrand(){
      let res = await api.getAllBrand()
      this.allBrandObj = res.result
      this.allBrandKeys = Object.keys(res.result).sort()
    }
  },
  created(){
    this.getRecomBrand()
    this.getAllBrand()
  },
  components:{
    searchTop,
    IndexBar,
    IndexAnchor,
    Cell
  }
}
</script>

<style lang="less" scoped>
.brand-zone-wrap{
  height: 100vh;
  background-color: #f6f6f6;
  overflow: scroll;
}
.brand-zone-content{
  padding: 0.22rem 0.28rem;
  .title{
    font-size: 0.2rem;
    color: #a8a8a8;
  }
  .shop-wrap{
    margin-top: 0.16rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    img{
      width: 1.29rem;
      height: 1.02rem;
      border-radius: 0.06rem;
      margin-bottom: 0.23rem;
    }
  }
}
</style>