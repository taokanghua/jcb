<template>
  <div class="shopcart-card">
        <div class="shop-name row ac">
          <radio-one v-model="test"></radio-one>
          
          <div style="margin-left:0.23rem">
            <i class="iconfont iconshangcheng"></i>
            <span>豪迪五金店</span>
            <i class="iconfont iconARROW"></i>
          </div>
          <!-- <i class="iconfont "></i> -->
        </div>
        <!-- 卡片 -->
        <div class="goods-card row ac sb" v-for="item in 3" :key="item">
          <radio-one v-model="test"></radio-one>
          <img src="../../../assets/img/分类220x220.png" alt="">
          <div class="info column sb">
            <div class="name e2">博世 电动工具 3.6V锂电池充电起子 螺丝刀 IXO3</div>
            <span class="spec">规格:220V    颜色:黑色</span>
            <div class="row sb">
              <span class="price">￥298</span>
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
      test:true,
      num:1,
    }
  },
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