<template>
  <div class="address-wrap">
    <div class="address-card column sb" v-for="(item,i) in 3" :key="i">
      <div class="top column sb">
        <div class="row ac">
          <span class="name">张三</span>
          <span class="phone">12345678900</span>
        </div>
        <div class="address row ac">
          <i class="iconfont icondizhi"></i>
          <span>地球市地球镇地球村东南西北888号</span>
        </div>
      </div>
      <div class="bottom row sb ac">
        <div class="radio row ac" @click="defaultIdx=i">
          <i class="iconfont iconxuanzhong" v-show="i==defaultIdx"></i>
          <i class="iconfont iconradiobuttonunselect" v-show="i!=defaultIdx"></i>
          <span style="margin-left:0.14rem">设为默认</span>
        </div>
        <div class="btns row">
          <router-link to="/editaddress" tag="div" class="btn row ac jc edit">编辑</router-link>
          <div class="btn row ac jc">删除</div>
        </div>
      </div>
    </div>

    <router-link to="/editaddress" tag="div" class="add-address-btn position row ac jc">添加地址</router-link>
  </div>
</template>

<script>
export default {
  data(){
    return{
      defaultIdx:0
    }
  }
}
</script>

<style lang="less" scoped>
.address-wrap{
  padding: 0.23rem 0.27rem;
  background-color: #f6f6f6;
  height: 100vh;
  overflow: scroll;
  position: relative;
}
.address-card{
  height: 2.12rem;
	background-color: #ffffff;
  border-radius: 0.11rem;
  padding: 0.28rem 0.21rem;
  box-sizing: border-box;
  margin-bottom: 0.23rem;
  .top{
    color: #000000;
    font-size: 0.27rem;
    font-weight: bold;
    .name{
      margin-right: 0.5rem;
    }
    .address{
      font-size: 0.24rem;
      margin-top: 0.14rem;
      font-weight: normal;
    }
    i{
      font-size: 0.24rem;
      margin-right: 0.23rem;
    }
  }
  .btn{
    width: 1.19rem;
    height: 0.45rem;
    border-radius: 0.23rem;
    border: solid 0.01rem #1a1a1a;
    font-size: 0.21rem;
    color: #000000;
  }
  .edit{
    margin-right: 0.23rem;
  }
}
.add-address-btn{
  width: 5.81rem;
	height: 0.56rem;
	background-color: #2ecb62;
  border-radius: 0.28rem;
  left: 50%;
  bottom: 0.71rem;
  transform: translateX(-50%);
  font-size: 0.21rem;
  color: #ffffff;
}
.position{
  position: absolute;
}
.radio{
    // margin-right: 0.14rem;
    .iconradiobuttonunselect{
      color: #a8a8a8;
      font-size: 0.3rem;
      transform: scale(1.3);
    }
    .iconxuanzhong{
      font-size: 0.28rem;
      color: #5ecc26;
    }
  }
</style>