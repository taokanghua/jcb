<template>
  <div class="shopcart-card">
        <div class="shop-name row ac">
          <radio-one v-model="checkAll" @click.native="chooseAll"></radio-one>
          
          <div style="margin-left:0.23rem">
            <i class="iconfont iconshangcheng"></i>
            <router-link :to="'/store?id='+info.storeId" tag="span">{{info.storeName}}</router-link>
            <i class="iconfont iconARROW"></i>
          </div>
          <!-- <i class="iconfont "></i> -->
        </div>
        <!-- 卡片 -->
        <swipe-cell v-for="(item,i) in info.productVoList" :key="item.cartId">
          <div class="goods-card row ac sb" :style="{opacity:item.state!=1?'0.4':''}" >
            <radio-one v-model="checkList[i]" @click.native="selectOne(i)"></radio-one>
            <img :src="item.pic" alt="">
            <div class="info column sb">
              <router-link :to="'/goodsdetail?id='+item.productId" tag="div" class="name e2">{{item.productName}}</router-link>
              <span class="spec e2">{{item.prop}}</span>
              <div class="row sb">
                <span class="price">￥{{item.price||0}}</span>
                <InputNumer v-model="list[i].count" @change="changeNum(i, item.cartId)" v-if="item.state==1"></InputNumer>
              </div>
            </div>
            <!-- //商品无效时候展示  z主要阻止用户点击其他-->
            <div class="enable-box" v-if="item.state!=1"></div>
          </div>
          <template #right>
            <div class="del-scoll row ac jc" @click="delOne(item)">
              <span>删除</span>
            </div>
          </template>
        </swipe-cell>
      </div>
</template>

<script>
import { SwipeCell } from 'vant';
import api from '../../../api/shopcart'
import InputNumer from '../../common/my/input-number'
import RadioOne from '../../common/my/radio-one'
export default {
  // 一个list对象 只可变数量 并且勾选取消勾线都在这获取对象  一个最后的对象 删除添加都在这操作
  data(){
    return{
      checkAll:false,
      num:1,
      checkList:[], //选中数组
      child:0,//该店下商品总数
      list:[], //存储对象 给数量绑定用
      selectedObj:{}, //发送给父的对象
    }
  },
  props:['info'],
  methods:{
   chooseAll(){ //选中所有
      // console.log(this.info.storeName)

      for(let i=0;i<this.list.length;i++){
          if(this.list[i].state==1){
            this.checkList[i] = this.checkAll
          }
      }
      this.$forceUpdate()
      if(this.checkAll){
        // this.selectedObj.productVoList = JSON.parse(JSON.stringify(this.info.productVoList))
        this.selectedObj.productVoList = JSON.parse(JSON.stringify(this.list.filter(v=>v.state==1)))
      }else{
        this.selectedObj.productVoList = []
      }
      this.$emit('getData', this.selectedObj)
      //console.log(this.selectedObj)
   },
   selectOne(i){
     let obj = this.list[i]
     if(this.checkList[i]){
       //添加商品
       this.selectedObj.productVoList.push(obj)
     }else{
       //删除商品
      let index = this.selectedObj.productVoList.findIndex(v=>v.cartId==obj.cartId)
      this.selectedObj.productVoList.splice(index, 1)
     }
     //判断是否选中了所有的
     this.selectedObj.productVoList.length == this.child? this.checkAll=true:this.checkAll=false
     this.$emit('getData', this.selectedObj)
   },
   changeNum(i, id){
     //如果没选中 就不触发
     let res = this.selectedObj.productVoList.findIndex(v=>v.cartId==id)
     if(res==-1) return
     this.selectedObj.productVoList[res].count = this.list[i].count
     this.$emit('getData', this.selectedObj)
   },
   async delOne(obj){
     //console.log(obj)
     let res = await api.delGoods({id:[obj.cartId]})
     if(!res.success) return this.showToast('删除失败!')
     this.$emit('updateList', true)
   },
   init(){
     this.list = this.info.productVoList
     this.child = this.info.productVoList.filter(v=>v.state==1).length
     for(let i=0;i<this.child;i++){
       if(this.list[i].state!=1) continue
       this.checkList[i] = false
     }
     //
     this.selectedObj = JSON.parse(JSON.stringify(this.info))
     this.selectedObj.productVoList = []
     this.$emit('getData', this.selectedObj)
   }
  },
  watch:{
    info(n){
      this.init()
    }
  },
  created(){
     this.init()
  },
  components:{
    InputNumer,
    RadioOne,
    SwipeCell
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
      position: relative;
      img{
        width: 1.41rem;
	      height: 1.41rem;
        border-radius: 0.11rem;
        margin-left: 0.1rem;
        flex-shrink: 0;
      }
      .info{
        margin-left: 0.2rem;
        height: 1.48rem;
        flex:1;
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
      .enable-box{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
.del-scoll{
  height: 100%;
  width: 0.8rem;
  background-color: #fc0808;
  span{
    color:white;
    font-size:0.24rem;
  }
}
</style>