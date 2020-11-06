<template>
  <div class="shop-card">
        <div class="shop-header row sb">
          <div class="left row">
            <img class="shop-img" src="../../../assets/img/门店头像.png" alt="" />
            <div class="info col sb">
              <div class="row ac">
                <span class="shop-name">豪迪五金店</span>
                <img src="../../../assets/img/等级一.png" alt="" />
              </div>
              <div> <i class="iconfont iconstar" v-for="item in 5" :key="item"></i> </div>
            </div>
          </div>
          <div class="right col sb">
            <div class="go-shop">进店</div>
            <div class="distance">1.88KM</div>
          </div>
        </div>

        <div class="shop-goods sb">
          <div class="goods-item" v-for="item in 3" :key="item">
            <div class="img-show">
              <img src="../../../assets/img/店铺商品展示.png" alt="" />
              <div class="tag">热销</div>
            </div>
            <div class="name e2">
              铁皮打包带专用大力剪刀 剪 铁皮带剪刀 钢带剪
            </div>
            <div class="price row">
              <div class="now">￥150</div>
              <div class="old">￥150</div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {

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
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .go-shop {
          width: 0.96rem;
          height: 0.36rem;
          background-color: #2ecb62;
          border-radius: 0.18rem;
          text-align: center;
          line-height: 0.36rem;
          color: #fff;
          font-size: 0.21rem;
        }
        .distance {
          color: #1a1a1a;
          font-size: 0.23rem;
          text-align: right;
        }
      }
    }
    .shop-goods {
      margin-top: 0.25rem;
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      .goods-item {
        width: 1.71rem;
        height: 100%;
        border-radius: 0.06rem;
        border: solid 0.01rem #c8c8c8;
        .img-show {
          position: relative;
          img {
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
    }
  }
</style>