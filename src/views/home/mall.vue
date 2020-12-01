<template>
  <div class="mall-wrap">
    <div class="header-top row sb ac">
      <input type="search" placeholder="请输入商品名称或店铺名称搜索"@click="$router.push({path:'search'})" />
      <div class="address" @click="$router.push({name:'chooseAddress'})">
        <div v-if="Object.keys(local).length>3">
          <i class="iconfont icondizhi"></i>
          <span>{{local.addressComponent.district}}</span>
        </div>
        <div v-else>
          <span>定位失败</span>
        </div>
      </div>
    </div>
    <swipe autoplay="5000" class="swipe" loop>
      <swipe-item v-for="(item,i) in carousel" :key="i" loop>
        <img class="swipe-img" :src="item.pic" alt="" @click="carouselToPage(item)" />
      </swipe-item>
      <!-- <swipe-item>
        <img src="../../assets/img/店铺街banner.png" alt="">
      </swipe-item>
      <swipe-item>
        <img src="../../assets/img/店铺街banner.png" alt="">
      </swipe-item> -->
    </swipe>
    
    <div class="mall-content">
      <!-- 这里暂无 -->
      <div class="menu-wrap">
        <swipe style="width:100%;height:100%">
          <swipe-item class="swipe-item row sb ac" v-for="(item,i) in allBrands" :key="i">
            <router-link :to="'/classify?index='+i" tag="div" class="item" v-for="v in item" :key="v.id">
              <img :src="v.icon" alt="">
              <span>{{v.name}}</span>
            </router-link>
            
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
        <router-link :to="'/store?id='+item.id" class="shop-item" v-for="item in newStoreList" :key="item.id">
          <img :src="item.head" alt="">
          <div>{{item.name}}</div>
        </router-link>
      </div>
    </div>
      <!-- 热门店铺 -->
      <div class="mall-com-card">
        <div class="title row sb ac mb2">
          <span>热门店铺</span>
          <router-link to="/allstores" class="more">更多 <i class="iconfont icongengduo"></i></router-link>
        </div>
        <listEnhands
          :req="searchStore"
          :params="storeParams"
          @reachBottom="storeListData">
          <hot-recom-card v-for="(item,i) in storeList" :key="i" :info="item"></hot-recom-card>
        </listEnhands>
      </div>

    </div>

    
  </div>
</template>

<script>
import api from '../../api/home'
import classifyApi from '../../api/classify'
import { Swipe, SwipeItem } from 'vant';
import hotRecomCard from '../../components/common/card/hot-recom-card'
import listEnhands from '../../components/common/my/list-enhands'
export default {
  data(){
    return{
      local:{},
      allBrands:[],
      newStoreList:[],
      storeList:[],
      carousel:[],
      storeParams:{
        //brandId: string,
        keyword: '',
        // pageNo: 0,
        // pageSize: 0,
        saleCount: false,
        score: true,
        // userLat: 0,
        // userLng: 0
      },
    }
  },
  methods:{
    searchStore: api.searchStore,
    //获取轮播图
    async getCarousel(){
      //feild   source:1 //公众号 type:2 //c端
      let res = await api.getBanner({field:3,source:1,type:2})
      if(!res.success)return this.showToast(res.message)
      this.carousel = res.result
    },
    carouselToPage(info){
      //urltype  1 商品 2店铺 3活动页 
      let {url:id, urlType:type} = info
      switch(type){
        case 0:
          break
        case 1:
          this.$router.push({path:'/goodsdetail', query:{id}})
          break
        case 2:
          this.$router.push({path:'/store', query:{id}})
          break
      }
    },
    async getAllBrands(){
      let res = await classifyApi.getAllList()
      let count = Math.ceil(res.result.length/5)
      for(let i=0;i<count;i++){
        this.allBrands.push(res.result.splice(0,5))
      }
      // console.log(count, this.allBrands)
    },
    async getNewStoreList(){
      let res = await api.getNewStore()
      //console.log(res)
      this.newStoreList = res.result
    },

    storeListData(result){
      this.storeList = [...this.storeList, ...result.lists]
    },
  },
  created(){
    this.getCarousel()
    this.getAllBrands()
    this.getNewStoreList()
    this.local = this.$store.state.local||{}
    this.storeParams.userLat = this.local.position.lat||''
    this.storeParams.userLng = this.local.position.lng||''
  },
  components:{
    Swipe,
    SwipeItem,
    hotRecomCard,
    listEnhands
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
  &::after{
    content:'';
    display:block;
    width: 1.79rem;
  }
}

.header-top {
  padding: 0 0.27rem;
  // margin: 0.12rem 0;
  background-color: #ffffff;
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
  .address {
    width: 1.2rem;
    text-align: right;
    i {
      font-size: 0.28rem;
    }
    span {
      font-size: 0.22rem;
      color: #1a1a1a;
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
    margin-right: 0.03rem;
  }
}
</style>