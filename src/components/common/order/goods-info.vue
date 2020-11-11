<template>
  <div class="order-goods-card">
    <div class="shop-title row ac">
      <i class="iconfont iconshangcheng"></i>
      <span>豪迪五金店</span>
    </div>
    <goods-card v-for="item in 2" :key="item"></goods-card>
  </div>
</template>

<script>
import goodsCard from './order-goods-card'
export default {
  data(){
    return{

    }
  },
  methods:{},
  components:{
    goodsCard
  }
};
</script>

<style lang="less" scoped>
.order-goods-card{
  background-color: #ffffff;
  border-radius: 0.11rem;
  padding: 0.24rem;
  box-sizing: border-box;
  .shop-title{
    color: #000000;
    font-size: 0.2rem;
    line-height: 1;
    padding-bottom: 0.24rem;
    border-bottom: 0.01rem solid #a8a8a8;
    i{
      font-size: 0.2rem;
      margin-right: 0.2rem;
    }
  }
}
</style>