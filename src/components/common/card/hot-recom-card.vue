<template>
  <div class="shop-card">
        <router-link :to="'/store?id='+info.storeId" tag="div" class="shop-header row sb">
          <div class="left row">
            <img class="shop-img" :src="info.head" alt="" />
            <div class="info col sb">
              <div class="row" style="align-item:base-line">
                <span class="shop-name" style="flex-wrap:wrap">{{info.storeName}}</span>
                <span v-if="level">
                  <img src="../../../assets/img/等级一.png" alt="" v-show="idx==0" />
                  <img src="../../../assets/img/等级二.png" alt="" v-show="idx==1" />
                  <img src="../../../assets/img/等级三.png" alt="" v-show="idx==2"/>
                </span>
              </div>
              <div> <i class="iconfont iconstar" v-for="item in Number(info.score)" :key="item"></i> </div>
            </div>
          </div>
          <div class="right">
            <div class="go-shop">进店</div>
            <div class="distance">{{info.displayDistance}}</div>
          </div>
        </router-link>

        <div class="shop-goods row sb">
          <div class="goods-item column sb"
           v-for="item in info.productList" 
           :key="item.productId"
           @click="goDetail(item)">
            <div class="img-show">
              <img :src="item.pic" alt="" />
              <div class="tag">热销</div>
            </div>
            <div class="name e2">
              {{item.productName}}
            </div>
            <div class="price row">
              <div class="now">￥{{Number(item.paymentPrice).toFixed(0)}}</div>
              <div class="old">￥{{Number(item.price).toFixed(0)}}</div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  props:{
    info:{
      type:Object,
      default:()=>({head:''})
    },
    level:{
      type: Boolean,
      default: false
    },
    idx:{
      //配合首页的等级展示 配合上面的level 改来改去的 X_X
      type: [String, Number],
      default:-1
    }
  },
  methods:{
    goDetail(info){
      this.$router.push({path:'/goodsdetail?id='+info.productId})
      //this.$forceUpdate()
    }
  }
}
</script>

<style lang="less" scoped>
.shop-card {
    box-sizing: border-box;
    // width: 5.81rem;
    padding: 0.15rem;
    height: 3.79rem;
    background-color: #ffffff;
    border-radius: 0.11rem;
    margin-bottom: 0.23rem;
    display: flex;
    flex-direction: column;
    .shop-header {
      .left {
        .shop-img {
          width: 0.68rem;
          height: 0.68rem;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .info {
          margin-left: 0.12rem;
          img {
            width: 0.31rem;
            height: 0.25rem;
            margin-left: 0.11rem;
          }
          .shop-name {
            font-size: 0.25rem;
            color: #1a1a1a;
            font-weight: bold;
          }
          i{
            font-size: 0.2rem;
            color:#f5b917;
            margin-right: 0.06rem;
          }
        }
      }
      .right {
        // display: flex;
        // flex-direction: column;
        // justify-content: space-between;
        box-sizing: border-box;
        .go-shop {
          width: 0.96rem;
          height: 0.36rem;
          background-color: #2ecb62;
          border-radius: 0.18rem;
          text-align: center;
          line-height: 0.36rem;
          color: #fff;
          font-size: 0.21rem;
          margin-bottom: 0.1rem;
          margin-left: 0.12rem;
        }
        .distance {
          color: #1a1a1a;
          font-size: 0.23rem;
          text-align: right;
          // margin-top: 0.1rem;
        }
      }
    }
    .shop-goods {
      width: 100%;
      margin-top: 0.25rem;
      flex-wrap: wrap;
      // grid-column: 0.2rem;
      box-sizing: border-box;
      .goods-item {
        overflow: hidden;
        width: 1.71rem;
        //height: 100%;
        border-radius: 0.06rem;
        border: solid 0.01rem #c8c8c8;
        // border: solid 0.02rem red;
        .img-show {
          position: relative;
          img {
            // width: 1.6rem;
            height: 1.36rem;
          }
          .tag {
            position: absolute;
            left: 0.11rem;
            bottom: 0.05rem;
            width: 0.53rem;
            height: 0.24rem;
            background-color: #fc0808;
            border-radius: 0.11rem;
            font-size: 0.17rem;
            color: #ffffff;
            line-height: 0.24rem;
            text-align: center;
          }
        }
        .name {
          margin-top: 0.12rem;
          padding-left: 0.11rem;
          color: #1a1a1a;
          font-size: 0.2rem;
        }
        .price {
          margin-top: 0.16rem;
          align-items: flex-end;
          .now {
            font-size: 0.24rem;
            color: #fc0808;
          }
          .old {
            font-size: 0.18rem;
            color: #a8a8a8;
            text-decoration:line-through;
          }
        }
      }
      &::after{
        content: '';
        width: 1.71rem;
      }
    }
  }
</style>