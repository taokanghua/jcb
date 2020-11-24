<template>
  <!-- 头部搜索 -->
    <div class="header-top row sb ac">
      <input type="search" placeholder="请输入商品名称或店铺名称搜索" @focus="checkEnv" @blur="blurHandle"/>
      <div class="address" v-if="address" @click="$router.push({name:'chooseAddress'})">
        <div v-if="type=='complete'">
          <i class="iconfont icondizhi"></i>
          <span>{{info.addressComponent.district}}</span>
        </div>
        <div v-show="type=='load'">
          <loading type="circular" size="0.22rem"> <span style="font-size:0.15rem">定位中</span> </loading>
        </div>
        <div v-show="type=='error'">
          <span>定位失败</span>
        </div>
      </div>
    </div>
</template>

<script>
import { Loading } from 'vant';
export default {
  data(){
    return{
      type:'load'
    }
  },
  props:{
    info:{
      //定位信息
      type:Object,
      default:()=>({type:'load',addressComponent:{district:''}})
    },
    address:{
      // 是否显示定位 
      type: Boolean,
      default: true
    },
    search:{
      //  判断需不需要跳到搜索页
      type:Boolean,
      default: true
    }
  },
  methods:{
    checkEnv(){
      if(!this.search){
        this.$router.push({name:'search'})
      }else{
        this.$emit('focus')
      }
    },
    blurHandle(){
      this.$emit('blur')
    }
  },
  watch:{
    info:{
      handler(n){
        this.type = n.type
      },
      // immediate:true
    }
  },
  components:{
    Loading
  }
}
</script>

<style lang="less" scoped>
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
</style>