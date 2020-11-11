<template>
  <div class="choose-add">
    <div class="address-item" v-for="item in 8" :key="item">
      <div class="top row ac">
        <div class="d-address row ac jc">默认地址</div>
        <span class="info name">张三</span>
        <span class="info">12345678900</span>
      </div>
      <p class="address row ac">
        <i class="iconfont icondizhi"></i>
        地球市地球镇地球村东南西北888号
      </p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.choose-add{
  height: 100vh;
  background-color: #f6f6f6;
  padding: 0.23rem 0.27rem;
  box-sizing: border-box;
  overflow: scroll;
}
.address-item{
  padding: 0.32rem 0.21rem;
  background-color: #ffffff;
  margin-bottom: 0.23rem;
  border-radius: 0.11rem;
  .top{
    margin-bottom: 0.25rem;
    .d-address{
      width: 1.02rem;
      height: 0.27rem;
      background-color: #e1fdd2;
      border-radius: 0.02rem;
      font-size: 0.21rem;
      color: #2ecb62;
      margin-right: 0.11rem;
    }
    .info{
      font-size: 0.27rem;
      color: #000000;
      font-weight: bold;
    }
    .name{
      margin-right: 0.5rem;
    }
  }
  .address{
    font-size: 0.24rem;
    color: #000000;
    i{
      font-size: 0.2rem;
      margin-right: 0.23rem;
    }
  }
}
</style>