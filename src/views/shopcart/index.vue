<template>
  <div class="shopcart-wrap">
    <empty description="暂无商品" v-if="empty"></empty>
    <div class="top-control row ac sb" v-if="!empty">
      <span>购物车({{shopcartList.length}})</span>
      <span v-show="mode=='buy'" @click="mode='del'">管理</span>
      <span v-show="mode=='del'" @click="mode='buy'">完成</span>
    </div>
    <div class="shopcart-content">
      <!-- <shopcardGroup></shopcardGroup> -->
      <shop-card 
      v-for="(item,i) in shopcartList" 
      :key="item.storeId" 
      :info="item"
      :ref="refs[i]" 
      @updateList="updateShopList"
      @getData="getData"></shop-card>

      <!-- 推荐产品 -->

        <h3 class="title">推荐产品</h3>
    
        <list 
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad()">
          <div class="row sb" style="flex-wrap:wrap">
            <home-card v-for="item in goodsList" :key="item.id" :info="item"></home-card>
          </div>
        </list>
      </div>

    
    <!-- 购物车底部 -->
    <div class="shop-bar row sb ac">
      <div class="select-all row ac">
        <radio-one v-model="isSelectAll" @click.native="selectAll"></radio-one>
        <span>全选</span>
      </div>
      <div class="buy-info row ac" v-show="mode=='buy'">
        <div class="info column">
          <span>合计: <span class="price">￥{{totalPirce}}</span></span>
          <span class="total">共计{{quantity}}个商品</span>
        </div>
        <div class="btn-buy row ac jc" @click="buyNow">立即购买</div>
      </div>
      <div class="buy-info row ac" v-show="mode=='del'">
        <div class="btn-buy del row ac jc" @click="delShopcartGoods">删除</div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import homeApi from '../../api/home'
import api from '../../api/shopcart'
import { Empty, Toast, List } from 'vant';
import myFooter from '../../components/common/my/footer'
// import shopcardGroup from '../../components/common/shopcart/shopcart-group'
import shopCard from '../../components/common/shopcart/shopcart-card'
import HomeCard from '../../components/common/card/home-good-card'
import radioOne from '../../components/common/my/radio-one'
export default {
    name:'shoppingCar',
    data(){
      return{
        empty:false,
        isSelectAll:false,
        shopcartList:[], //购物车列表
        totalNum:1, //总商品数 判断是否全选
        quantity:0,//选中数量
        totalPirce:0,//总价
        refs:[], //全选用的
        chooseData:[], //购物车选中的数据 算钱！ :(
        mode: 'buy', //是购买还是删除 -> buy / del

        //推荐商品
        // searchGoods: homeApi.getGoodsList,
        goodsList:[],
        goodsParams:{type:2, pageSize:10, pageNo:1},
        loading:false,
        finished:false
      }
    },
    methods:{
      async getShopcartList(){
        let res = await api.getList({shopType:1})
        this.shopcartList = res.result
        // res.result = []
        //给每一个卡片一个ref值
        this.refs.push(...this.shopcartList.map(v=>v.storeId))
        if(res.result.length==0) this.empty = true
        //获取购物车总商品数(仅有效商品)
        let s = []
        this.shopcartList.map(v=>s.push(...v.productVoList.filter(s=>s.state==1)))
        this.totalNum = s.length
      },
      updateShopList(status){
        if(status) this.getShopcartList()
      },
      selectAll(){ //全选商品
        this.refs.forEach(v=>{
          //console.log('index -> '+this.isSelectAll)
          this.$refs[v][0].checkAll = this.isSelectAll
          this.$refs[v][0].chooseAll()
        })
        //console.log(this.$refs)
      },
      getData(obj){//获取购物车的勾选数据
        let storeId = obj.storeId
        let index = this.chooseData.findIndex(v=>v.storeId == storeId)
        if(index==-1){
          this.chooseData.push(obj)
        }else{
          this.chooseData[index].productVoList = obj.productVoList
        }
      },
      calc(){
        //计算总数量
        let num = this.chooseData.map(v=>v.productVoList.length)
        this.quantity = num.reduce((pre, cur)=> pre+cur)
        //判断是否全选了商品
        //this.totalNum == this.quantity? this.isSelectAll=true:this.isSelectAll=false
        //计算总价格
        let list = []
        this.chooseData.map(v=>list.push(...v.productVoList))
        this.totalPirce = list.reduce((pre, cur)=>cur.price*cur.count + pre, 0).toFixed(2)
      },
      async delShopcartGoods(){
        let list = []
        this.chooseData.map(v=>{list.push(...v.productVoList)})
        if(list.length==0){
          Toast('请勾选需要删除的商品!')
          return 
        }
        let s = list.map(v=>v.cartId)
        let ids = list.map(v=>v.cartId).join(',')
        let res = await api.delGoods({id:ids})
        if(res.success){
          this.getShopcartList()
          this.mode = 'buy'
          this.refs.forEach(v=>{
          this.$refs[v][0].init()
        })
        }else{
          Toast('删除商品失败！')
        }
      },
      //立即购买
      async buyNow(){
        if(this.quantity==0) return Toast('请勾选商品！')
        let id = this.$store.state.user.info.memberUserInfoVo.id//获取用户id
        let storeGoodsList = this.chooseData.map(v=>v.productVoList)//[ [array], [array] ]
        for(let i=0;i<storeGoodsList.length;i++){ //清除空数组的店铺
          if(storeGoodsList[i].length==0){
            storeGoodsList.splice(i,1)
          }
        }
        let result = storeGoodsList.map((v,i)=>{
          let wrap = {}
          let foo = v.map(o=>{ //[obj,obj]
            let obj = {}
            obj.productId = o.productId
            obj.number = o.count
            obj.skuPrice = o.price
            obj.skuId = o.skuId
            obj.shelveId = this.chooseData[i].upBy
            obj.templateId = o.templateId
            return obj
          })
          wrap.productList = foo
          wrap.sourceType = 1
          wrap.sourceId=id
          return wrap
        })
        let res = await homeApi.createOrder(result)
        if(!res.success) return this.showToast(res.message)
        this.$router.push({path:'/confirmorder?orderId='+res.result})
        // console.log(result)
      },
      //推荐商品
      onLoad() {
      this.loading = true;
      var timer = setTimeout(async () => {
          clearTimeout(timer);
          let res = await homeApi.getGoodsList(this.goodsParams);
          this.loading = false;
          if (
              !res.success ||
              !res.result ||
              res.result.lists.length == 0
          ) {
              this.finished = true;
          } else {
              this.goodsList = [...this.goodsList, ...res.result.lists];
          }
          if (!res.success) {
              Toast("获取数据失败!");
              return;
          }
          this.goodsParams.pageNo++;
      }, 500);
    },
    },
    watch:{
      quantity(n){
        if(n==this.totalNum){
          this.isSelectAll = true
        }else{
          this.isSelectAll = false
        }
      },
      chooseData:{
        handler(n){
          this.calc()
        },
        deep:true
      }
    },
    created(){
      this.getShopcartList()
    },
    components:{
      myFooter,
      // shopcardGroup,
      HomeCard,
      shopCard,
      Empty,
      radioOne,
      List
    }
}
</script>

<style lang="less" scoped>
h3{
  font-size: 0.27rem;
  color: #1a1a1a;
}
.iconxuanzhong{
  font-size: 0.32rem;
  color: #2ecb62;
}
.circle{
        width: 0.28rem;
        height: 0.28rem;
        border-radius: 50%;
        border: solid 0.01rem #a8a8a8;
        flex-shrink: 0;
      }
.shopcart-wrap{
  height: 100vh;
  background-color: #f6f6f6;
  overflow: auto;
  .top-control{
    height: 0.75rem;
    background-color: #ffffff;
    padding: 0 0.27rem;
    span{
      font-size: 0.24rem;
      color: #1a1a1a;
    }
  }
}
.shopcart-content{
  padding: 0.23rem 0.27rem 1.66rem 0.27rem;
  .title{
    margin-top: 0.45rem;
    margin-bottom: 0.23rem;
    font-size: 0.27rem;
    color: #1a1a1a;
    font-weight: bold;
  }
}
.shop-bar{
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  bottom: 0.82rem;
  left: 0;
  background-color: #ffffff;
  height: 0.83rem;
  padding: 0 0.27rem 0 0.5rem;
  .select-all{
    span{
      margin-left: 0.22rem;
      font-size: 0.24rem;
      color: #000000;
    }
  }
  .buy-info{
    
    font-size: 0.24rem;
    color: #1a1a1a;
    overflow: hidden;
    .info{
      margin-right: 0.11rem;
    }
    .price{
      color:#fc0808;
    }
    .total{
      color: #a8a8a8;
      font-size: 0.2rem;
      text-align: right;
    }
  }
  .btn-buy{
    width: 1.47rem;
    height: 0.56rem;
    background-color: #2ecb62;
    border-radius: 0.28rem;
    color: #ffffff;
  }
  .del{
    border-radius: 0.28rem;
    border: solid 0.01rem #1a1a1a;
    background-color: #ffffff;
    color: #1a1a1a;
  }
}
</style>