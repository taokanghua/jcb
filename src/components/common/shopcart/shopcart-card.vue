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
        <div class="goods-card row ac sb" v-for="(item,i) in info.productVoList" :key="item.cartId">
          <radio-one v-model="checkList[i]" @click.native="selectOne(i)"></radio-one>
          <img :src="item.pic" alt="">
          <div class="info column sb">
            <div class="name e2">{{item.productName}}</div>
            <span class="spec e2">{{item.prop}}</span>
            <div class="row sb">
              <span class="price">￥{{item.price||0}}</span>
              <InputNumer v-model="list[i].count" @change="changeNum(i, item.cartId)"></InputNumer>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import InputNumer from '../../common/my/input-number'
import RadioOne from '../../common/my/radio-one'
export default {
  // 一个list对象 只可变数量 并且勾选取消勾线都在这获取对象  一个最后的对象 删除添加都在这操作
  data(){
    return{
      checkAll:false,
      num:1,
      checkList:[], //选中数组
      child:0,
      list:[], //存储对象 给数量绑定用
      selectedObj:{}, //发送给父的对象
    }
  },
  props:['info'],
  methods:{
   chooseAll(){ //选中所有
      // console.log(this.checkAll)

      for(let i=0;i<this.child;i++){
          this.checkList[i] = this.checkAll
      }
      this.$forceUpdate()
      if(this.checkAll){
        // this.selectedObj.productVoList = JSON.parse(JSON.stringify(this.info.productVoList))
        this.selectedObj.productVoList = this.list
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
     this.$emit('getData', this.selectedObj)
   },
   changeNum(i, id){
     //如果没选中 就不触发
     let res = this.selectedObj.productVoList.some(v=>v.cartId==id)
     //console.log(res)
     if(!res) return
     this.$emit('getData', this.selectedObj)
   }
  },
  watch:{

  },
  created(){
      this.list = this.info.productVoList
     this.child = this.info.productVoList.length
     for(let i=0;i<this.child;i++){
       this.checkList[i] = false
     }
     //
     this.selectedObj = JSON.parse(JSON.stringify(this.info))
     this.selectedObj.productVoList = []
  },
  components:{
    InputNumer,
    RadioOne
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
    }
  }
</style>