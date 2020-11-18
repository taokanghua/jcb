<template>
  <div class="shopcart-wrap">
    <empty description="暂无商品" v-if="empty"></empty>
    <div class="top-control row ac sb" v-if="!empty">
      <span>购物车(3)</span>
      <span>管理</span>
    </div>
    <div class="shopcart-content">
      <!-- <shopcardGroup></shopcardGroup> -->
      <shop-card v-for="item in shopcartList" :key="item.storeId" :info="item"></shop-card>

      <!-- 推荐产品 -->

        <h3 class="title">推荐产品</h3>
      
        <waterFall
          @afterFetch="handleFetchResult"
          :req="searchGoods"
          :params="goodsParams"
          ref="waterFall"
        >
        <div class="row sb" style="flex-wrap:wrap">
          <home-card v-for="item in goodsList" :key="item.id" :info="item"></home-card>
      </div>
        </waterFall>
      </div>

    
    <!-- 购物车底部 -->
    <div class="shop-bar row sb ac">
      <div class="select-all row ac" @click="selectAll">
        <i class="iconfont iconxuanzhong" v-if="isSelectAll"></i>
        <div class="circle" v-else></div>
        <span>全选</span>
      </div>
      <div class="buy-info row ac">
        <div class="info column">
          <span>合计: <span class="price">￥298</span></span>
          <span class="total">共计1个商品</span>
        </div>
        <div class="btn-buy row ac jc" @click="showToast('hello', 5000)">立即购买</div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import homeApi from '../../api/home'
import api from '../../api/shopcart'
import { Empty } from 'vant';
import myFooter from '../../components/common/my/footer'
// import shopcardGroup from '../../components/common/shopcart/shopcart-group'
import shopCard from '../../components/common/shopcart/shopcart-card'
import HomeCard from '../../components/common/card/home-good-card'
import waterFall from '../../components/common/waterfall'
export default {
    name:'shoppingCar',
    data(){
      return{
        empty:false,
        isSelectAll:false,
        shopcartList:[], //购物车列表


        //推荐商品
        searchGoods: homeApi.getGoodsList,
        goodsList:[],
        goodsParams:{type:2},
      }
    },
    methods:{
      async getShopcartList(){
        let res = await api.getList({shopType:1})
        this.shopcartList = res.result
        // res.result = []
        if(res.result.length==0) this.empty = true
      },
      selectAll(){
        this.isSelectAll = !this.isSelectAll
      },
      //推荐商品
      handleFetchResult(result) {
        this.goodsList = [...this.goodsList, ...result.lists];
      },
    },
    created(){
      this.getShopcartList()
    },
    components:{
      myFooter,
      // shopcardGroup,
      HomeCard,
      shopCard,
      waterFall,
      Empty
    }
}
</script>

<style lang="less" scoped>
h3{
  font-size: 0.27rem;
  color: #1a1a1a;
}
.iconxuanzhong{
  font-size: 0.32rem;
  color: #2ecb62;
}
.circle{
        width: 0.28rem;
        height: 0.28rem;
        border-radius: 50%;
        border: solid 0.01rem #a8a8a8;
        flex-shrink: 0;
      }
.shopcart-wrap{
  height: 100vh;
  background-color: #f6f6f6;
  overflow: auto;
  .top-control{
    height: 0.75rem;
    background-color: #ffffff;
    padding: 0 0.27rem;
    span{
      font-size: 0.24rem;
      color: #1a1a1a;
    }
  }
}
.shopcart-content{
  padding: 0.23rem 0.27rem 1.66rem 0.27rem;
  .title{
    margin-top: 0.45rem;
    margin-bottom: 0.23rem;
    font-size: 0.27rem;
    color: #1a1a1a;
    font-weight: bold;
  }
}
.shop-bar{
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  bottom: 0.82rem;
  left: 0;
  background-color: #ffffff;
  height: 0.83rem;
  padding: 0 0.27rem 0 0.5rem;
  .select-all{
    span{
      margin-left: 0.22rem;
      font-size: 0.24rem;
      color: #000000;
    }
  }
  .buy-info{
    
    font-size: 0.24rem;
    color: #1a1a1a;
    overflow: hidden;
    .info{
      margin-right: 0.11rem;
    }
    .price{
      color:#fc0808;
    }
    .total{
      color: #a8a8a8;
      font-size: 0.2rem;
      text-align: right;
    }
  }
  .btn-buy{
    width: 1.47rem;
    height: 0.56rem;
    background-color: #2ecb62;
    border-radius: 0.28rem;
    color: #ffffff;
  }
}
</style>