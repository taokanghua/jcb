<template>
  <div class="footer-wrap row">
    <router-link to="/home" tag="div" class="item">
      <i class="iconfont iconshouye"></i>
      <span>首页</span>
    </router-link>
    <router-link to="/classify" tag="div" class="item">
      <i class="iconfont iconfenlei"></i>
      <span>分类</span>
    </router-link>
    <router-link to="/shopcart" tag="div" class="item">
      <i class="iconfont icongouwuche"></i>
      <span>购物车</span>
    </router-link>
    <router-link to="/mine" tag="div" class="item">
      <i class="iconfont iconwode"></i>
      <span>我的</span>
    </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.footer-wrap{
  height: 0.83rem;
  background-color: #ffffff;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  .item{
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
     color: #b5b5b5;
    i{
      font-size: 0.39rem;
    }
    span{
      font-size: 0.17rem;
     
    }
  }
}
</style>