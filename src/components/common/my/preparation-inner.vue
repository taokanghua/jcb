<template>
  <div class="preparation-inner-wrap column" @touchmove="console.log(1)">
    <div class="address e1 row ac">
      配送至  广东省佛山市南海区新石大街…
    </div>
    <section style="flex:1;overflow:auto">
    
      <div class="com-card row ac">
        <choose-group :info="s1" :index.sync="saleType" ref="group1"></choose-group>
      </div>
      <div class="pinpai">
        <div class="title">品牌</div>
        <choose-group :info="info" :index.sync="index" ref="group2"></choose-group>
      </div>
      <!-- 品牌下级 -->
      <div class="pinpai" v-for="(item,i) in child" :key="item.id">
        <div class="title">{{item.name}}</div>
        <choose-group :info="item.children" :index.sync="checkChildIds[i]" :ref="childRef[i]"></choose-group>
      </div>

      <div class="pinpai">
        <div class="title">价格</div>
        <div class="input-wrap row sb">
          <input type="text" class="start" placeholder="最低价" v-model="small">
          <input type="text" class="end" placeholder="最高价" v-model="high">
        </div>
      </div>
      </section>
    <div class="footer row ac jc">
      <div class="left" @click="$emit('close')"> <i class="iconfont iconguanbi"></i> </div>
      <div class="btn" @click="reset">重置</div>
      <div class="btn confirm row ac jc" @click="confirm">确定</div>
    </div>
  </div>
</template>

<script>
import api from '../../../api/home'
import chooseGroup from './choose-group'
export default {
  data(){
    return{
      s1: [{id:0, name:"有货优先"}, {id:1, name: "预售商品"}],
      index:-1,
      saleType:-1,
      small:'',
      high:'',
      //s2: ['博士', '东城', '威克斯', '大有', '牧田', '欧莱德', '大意', '得力', '更多']
      child:[], //品牌下的子标签
      checkChildIds:[], //选中子标签的值
      childRef:[], //重置用的
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
      this.childRef.map(v=>{
        // console.log(this.$refs[v])
        this.$refs[v][0].reset()
        })
      this.$emit('reset')
    },
    confirm(){    //
      let child = []
      if(this.checkChildIds.length>0){
        child = this.checkChildIds.map((v,i)=>this.child[i].children[v].id)//子集id数组 [id, id]
      }
      this.$emit('confirm',[this.saleType, (this.info[this.index]||{})],{start:this.small, end:this.high}, child)
      this.$emit('close')
    }
  },
  watch:{
    async index(n){
      //监听品牌选中变化 获取品牌下的下级标签
      this.checkChildIds = []
      let id = this.info[n].id
      // console.log(id)
      let res = await api.getSecBrand({id})
      // console.log(res)
      this.child = res.result
      this.child.map((v,i)=>this.childRef[i]=v.id)
    }
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
  overflow: auto;
  height: 100vh;
  width: 4.52rem;
  position: relative;
  background-color: #f6f6f6;
  // padding-bottom: 0.75rem;
}
.address{
  height: 0.7rem;
  // padding: 0.25rem 0.23rem;
  padding-left: 0.23rem;
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
  // position: fixed;
  // bottom: 0;
  // right: 0;
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