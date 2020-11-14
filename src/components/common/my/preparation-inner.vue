<template>
  <div class="preparation-inner-wrap">
    <div class="address e1">
      配送至  广东省佛山市南海区新石大街…
    </div>
    
    <div class="com-card row ac">
      <choose-group :info="s1" :index.sync="saleType" ref="group1"></choose-group>
    </div>
    <!-- <div class="select1 row ac">
      <div class="s-item">有货优先</div>
      <div class="s-item">预售商品</div>
    </div> -->
    <div class="pinpai">
      <div class="title">品牌</div>
      <choose-group :info="info" :index.sync="index" ref="group2"></choose-group>
    </div>

    <div class="pinpai">
      <div class="title">价格</div>
      <div class="input-wrap row sb">
        <input type="text" class="start" placeholder="最低价" v-model="small">
        <input type="text" class="end" placeholder="最高价" v-model="high">
      </div>
    </div>

    <div class="footer row ac jc">
      <div class="left" @click="$emit('close')"> <i class="iconfont iconguanbi"></i> </div>
      <div class="btn" @click="reset">重置</div>
      <div class="btn confirm row ac jc" @click="confirm">确定</div>
    </div>
  </div>
</template>

<script>
import chooseGroup from './choose-group'
export default {
  data(){
    return{
      s1: [{id:0, name:"有货优先"}, {id:1, name: "预售商品"}],
      index:-1,
      saleType:-1,
      small:0,
      high:0
      //s2: ['博士', '东城', '威克斯', '大有', '牧田', '欧莱德', '大意', '得力', '更多']
    }
  },
  props:{
    info:{
      type: Array,
      default: ()=>([])
    }
  },
  methods:{
    reset(){
      this.$refs.group1.reset()
      this.$refs.group2.reset()
      this.$emit('close')
      this.$emit('reset')
    },
    confirm(){
      this.$emit('confirm',[this.saleType, this.info[this.index]],{start:this.small, end:this.high})
      this.$emit('close')
    }
  },
  watch:{

  },
  components:{
    chooseGroup
  }
}
</script>

<style lang="less" scoped>
.com-card{
  height: 0.7rem;
  padding-left: 0.23rem;
  background-color: #ffffff;
  margin-bottom: 0.2rem;
}
.preparation-inner-wrap{
  height: 100vh;
  width: 4.52rem;
  position: relative;
  background-color: #f6f6f6;
}
.address{
  padding: 0.25rem 0.23rem;
  background-color: #ffffff;
  font-size: 0.21rem;
  color: #1a1a1a;
  margin-bottom: 0.23rem;
}
.pinpai{
  widows: 100%;
  padding: 0.18rem 0.23rem;
  background-color: #ffffff;
  margin-bottom: 0.23rem;
  .title{
    margin-bottom: 0.25rem;
    font-size: 0.21rem;
  }
  .input-wrap{
    input{
      width: 1.69rem;
      height: 0.45rem;
      background-color: #f6f6f6;
      border-radius: 0.06rem;
      text-align: center;
      font-size: 0.21rem;
      color: #a8a8a8;
    }
  }
}
.footer{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 4.52rem;
	height: 0.75rem;
  background-color: #ffffff;
  text-align: center;
  font-size: 0.21rem;
  .left{
    flex:2;
    border-right: 1px solid #ccc;
    i{
      font-size: 0.21rem;
    }
  }
  .btn{
    flex:3;
  }
  .confirm{
    height: 100%;
    background-color: #2ecb62;
    color: #ffffff;
  }
}
</style>