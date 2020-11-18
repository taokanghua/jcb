<template>
  <div class="shopcart-card">
        <div class="shop-name row ac">
          <radio-one v-model="checkAll"></radio-one>
          
          <div style="margin-left:0.23rem">
            <i class="iconfont iconshangcheng"></i>
            <router-link :to="'/store?id='+info.storeId" tag="span">{{info.storeName}}</router-link>
            <i class="iconfont iconARROW"></i>
          </div>
          <!-- <i class="iconfont "></i> -->
        </div>
        <!-- 卡片 -->
        <div class="goods-card row ac sb" v-for="(item,i) in info.productVoList" :key="item.cartId">
          <radio-one v-model="checkList[i]"></radio-one>
          <img :src="item.pic" alt="">
          <div class="info column sb">
            <div class="name e2">{{item.productName}}</div>
            <span class="spec e2">{{item.prop}}</span>
            <div class="row sb">
              <span class="price">￥{{item.price||0}}</span>
              <InputNumer v-model="num"></InputNumer>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import InputNumer from '../../common/my/input-number'
import RadioOne from '../../common/my/radio-one'
export default {
  data(){
    return{
      checkAll:false,
      num:1,
      checkList:[false]
    }
  },
  props:['info'],
  methods:{
   
  },
  watch:{
    test(n){
      console.log(n)
    }
  },
  components:{
    InputNumer,
    RadioOne
  }
}
</script>

<style lang="less" scoped>
.iconxuanzhong{
  font-size: 0.32rem !important;
  color: #2ecb62;
}
.circle{
        width: 0.28rem;
        height: 0.28rem;
        border-radius: 50%;
        border: solid 0.01rem #a8a8a8;
        flex-shrink: 0;
      }
  .shopcart-card{
    background-color: #ffffff;
    border-radius: 0.11rem;
    padding: 0.2rem 0.23rem;
    margin-bottom: 0.23rem;
    .shop-name{
      font-size: 0.2rem;
      // height: 0.3rem;
      // overflow-y: hidden;
      i{
        font-size: 0.2rem;
      }
      span{
        margin: 0 0 0 0.09rem;
      }
    }
    .goods-card{
      margin-top: 0.4rem;
      img{
        width: 1.41rem;
	      height: 1.41rem;
        border-radius: 0.11rem;
        margin-left: 0.1rem;
      }
      .info{
        margin-left: 0.2rem;
        height: 1.48rem;
        .name{
          color: #1a1a1a;
          font-size: 0.21rem;
        }
        .spec{
          font-size: 0.18rem;
          color: #a8a8a8;
        }
        .price{
          font-size: 0.27rem;
          color: #fc0808;
        }
      }
    }
  }
</style>