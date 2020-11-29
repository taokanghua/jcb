<template>
  <div class="confirm-order">
    <!-- 心疼我做得这么好的tabbar栏 改啥改  :( -->
    <div class="deliver">
          <!-- 无地址情况 -->
      <router-link :to="'/editaddress?orderId='+$route.query.orderId" tag="div" class="no-address row ac jc" v-if="noAddress">+添加地址</router-link>

      <router-link :to="'/address?orderId='+$route.query.orderId" class="has-address row sb ac" v-else>
        <div class="column">
          <div class="row ac top">
            <span>{{address.name}}</span>
            <span class="phone">{{address.phone}}</span>
          </div>
          <div class="row ac bottom">
            <i class="iconfont icondizhi"></i>
            <p>{{address.addressName.replace(/\s/g, '')}}{{address.address}}</p>
          </div>
        </div>
        <i class="iconfont iconARROW"></i>
      </router-link>

    </div>
    
    <!-- <div class="tab-card">
			<div class="title-wrap row">
				<div class="item left" :class="{active:wayIdx==0}" @click="wayIdx=0">送货上门</div>
				<div class="item right" :class="{active:wayIdx==1}" @click="wayIdx=1">上门自提</div>
			</div>
			<div class="wrap-content">
				<div class="deliver" v-show="wayIdx==0">
          <div class="no-address row ac jc">+添加地址</div>
        </div>

        <div class="selftake-wrap row" v-show="wayIdx==1">
          <div class="info column sb">
            <div class="shop-address">
              <i class="iconfont icondizhi"></i>
              <span>地球市地球镇地球村东南西北888号 </span>
            </div>
            <div class="user-select row">
              <div class="take-time column sb" @click="pops.takeTime=true">
                <span class="title">自提时间</span>
                <div class="row">10-30 18:00 <i class="iconfont iconARROW"></i></div>
              </div>
              <div class="phone column sb" @click="editHandle">
                <span class="title">联系电话</span>
                <input ref="input" type="phone" class="edit-phone" v-model="contact" v-show="editPhone" @blur="checkPhone">
                <div class="row" v-show="!editPhone">{{contact}}<i class="iconfont iconbianji"></i></div>
              </div>
            </div>
            <div class="rule row ac">
              <div class="checkbox row ac" @click="agreement=!agreement">
                <i class="iconfont iconxuanzhong3" v-if="agreement"></i>
                <div class="no" v-else></div>
              </div>
              同意 <span class="agreement">《到店自取服务协议》</span>
            </div>
          </div>
          <i class="iconfont iconARROW r"></i>
        </div>
			</div>
		</div> -->

    <!-- 商品卡片 -->
    <!-- <div class="choose-methods-card">
      <div class="goods row">
        <img src="../../assets/img/确认订单.png" alt="">
        <div class="column sb" style="margin-left:0.23rem">
          <div class="name">博世 电动工具 3.6V锂电池充电起子 螺丝刀 IXO3</div>
          <div class="sku">规格:220V     颜色:黑色</div>
          <div class="footer row sb ac">
            <span class="price">￥298</span>
            <input-number v-model="form.num"></input-number>
          </div>
        </div>
      </div>
     
      <div class="selftake-wrap row">
          <div class="info column sb">
            <span class="take-info">取货信息</span>
            <div class="shop-address">
              <i class="iconfont icondizhi"></i>
              <span>地球市地球镇地球村东南西北888号 </span>
            </div>
            <div class="user-select row">
              <div class="take-time column sb" @click="pops.takeTime=true">
                <span class="title">自提时间</span>
                <div class="row">10-30 18:00 <i class="iconfont iconARROW"></i></div>
              </div>
              <div class="phone column sb" @click="editHandle">
                <span class="title">联系电话</span>
                <input ref="input" type="phone" class="edit-phone" v-model="contact" v-show="editPhone" @blur="checkPhone">
                <div class="row" v-show="!editPhone">{{contact}}<i class="iconfont iconbianji"></i></div>
              </div>
            </div>
          </div>
        </div>
]
      <div class="order-field row sb ac" @click="pops.platform=true">
        <span class="left">平台优惠</span>
        <span class="right row ac">-￥10.00 <i class="iconfont iconARROW"></i></span>
      </div>
      <div class="order-field row sb ac" @click="pops.shop=true">
        <span class="left">店铺优惠</span>
        <span class="right row ac">-￥10.00 <i class="iconfont iconARROW"></i></span>
      </div>
      <div class="order-field row sb ac" @click="pops.way=true">
        <span class="left">运费 <span class="desc">{{form.deliverWayIdx==0?'快递配送':'物流到付'}}</span> </span>
        <span class="right row ac">-￥10.00 <i class="iconfont iconARROW"></i></span>
      </div>
      <div class="order-field row sb ac">
        <span class="left">运费险 <span class="desc">货物运输过程中有损，可赔</span> </span>
        <span class="right row ac" @click="form.insurance=!form.insurance">
          ￥10.00 
        <i class="iconfont insurance" :class="[{'iconradiobuttonunselect':!form.insurance}, {'iconxuanzhong':form.insurance}]"></i>
        </span>
      </div>
      <div class="order-field row sb ac">
        <span class="left">会员折扣  <span class="desc">一级会员</span></span>
        <span>9.9折</span>
      </div>
      <div class="order-field row sb ac">
        <span class="left">备注</span>
        <input type="text" placeholder="请输入您备注信息" v-model="form.message">
      </div>
    </div> -->

    <!-- end -->
    <chooseMethCard 
      v-for="item in orderInfo" 
      :key="item.id" 
      :dateList="dateList"
      :address="address"
      @getData="getData"
      :info="item"></chooseMethCard>

    <div class="alone-feild row sb ac" v-if="info.firstCouponStatus==2">
      <span class="title">优惠</span>
      <span class="shit">新人礼包  -￥5.00</span>
    </div>
    <div class="alone-feild row sb ac">
      <span class="title">发票</span>
      <span class="shit">如需发票，请联系商家</span>
    </div>
    <div class="alone-feild row sb ac">
      <span class="title row ac"> <i class="iconfont iconweixin"></i> 微信支付</span>
      <i class="iconfont iconxuanzhong"></i>
    </div>

    <div class="tabbar row sb ac">
      <div class="left row ac">
        <span class="word">合计:</span>
        <span class="money">￥{{totalPrice}}</span>
      </div>
      <div class="buy-btn row ac jc" @click="pay">立即购买</div>
    </div>
  <!-- 加载动画 -->
    <loading ref="loading">加载订单中...</loading>
  </div>
</template>

<script>
import {invokeWxPay} from '../../utils/wxFn'
import api from '../../api/home'
import userApi from '../../api/user'
import {ActionSheet} from 'vant'
import {mapState} from 'vuex'
import inputNumber from '../../components/common/my/input-number'
import chooseMethCard from '../../components/common/card/order-goods-card'
import loading from '../../components/common/my/loading'
const defoAddr={addressName:''}
export default {
  data(){
    return{
      noAddress:true,
      address:defoAddr,
      orderInfo:[],//订单数据
      // wayIdx:1, 
      //agreement: false, //同意协议
      dateList:[],//自提的日期表 
      storeOrderList:[],
      totalPrice:0
    }
  },
  methods:{
    async getOrderInfo(){
      let mergeOrderCode = this.$route.query.orderId
      let res = await api.getOrder({mergeOrderCode})
      if(!res.success) return this.showToast('获取订单失败！', 2000)
      this.orderInfo = res.result
      this.$refs.loading.hide()
    },
    getMonthDay(){
      // let date = new Date()
      let oneDay = 86400000 //一天
      let today = Date.now()
      let days = [] //最后数组
      let d = null
      let month = null
      let day = null
      for(let i=0;i<31;i++){
        d = new Date(today+oneDay)
        month = (d.getMonth()+1).toString().padStart(2,0)
        day = d.getDate().toString().padStart(2,0)
        days.push({month, day})
        today += oneDay
      }
      // console.log(days)
      this.dateList = days
    },
    //地址操作
    async getAddressList(){ //获取默认地址
      
      let params = {
          memberId:this.info.id,
          pageSize:999
      }
      let res = await userApi.getAddressList(params)
      if(!res.success) return this.showToast('获取地址失败！')
      //res.result.total = 0
      res.result.total>0?this.noAddress = false:''
      this.address = res.result.records.find(v=>v.defaultUse==1)||defoAddr
    },
    //根据id查地址（用户选择地址后）
    async getAddress(){
      let {address} = this.$route.query
      let res = await userApi.getOneAddress(address)
      if(res.success){
        this.address = res.result
        this.noAddress = false
      }else{
        this.showToast(res.message)
      }
    },
    async pay(){
      if(this.noAddress) return this.showToast('请添加收货地址!')
      let data = {
        firstCouponStatus:this.info.firstCouponStatus==2?1:0,
        orderList:this.storeOrderList,
        paymentMethods:1,
        receiveAddressId:this.address.id
      }
      // console.log(data)
      let res = await api.payment(data)
      //console.log(res)
      invokeWxPay({...res.result, success:res=>{console.log(res)}, fail:err=>{console.log(err)}})
    },
    //获取商品卡片的值
    getData(obj){
      //console.log(obj)
      let index = this.storeOrderList.findIndex( v=>v.id == obj.id)
      if(index==-1){
        this.storeOrderList.push(obj)
      }else{
        this.storeOrderList[index] = obj
      }
      this.totalPrice = this.storeOrderList.reduce((pre,cur)=>cur.total+pre,0)
      if(this.info.firstCouponStatus==2){ //计算是否有首单优惠
        this.totalPrice-5<=0?0:this.totalPrice-=5
      }
      this.totalPrice = Number(this.totalPrice).toFixed(2) //总价保留两位小数
    }
  },
  computed:{
    ...mapState({info:state=>state.user.info.memberUserInfoVo})
  },
  watch:{
    '$route'(from, to){
      // if(from.path=="/editaddress"){
      //判断url 来决定调用什么方式来获取地址
    let {address} = this.$route.query||''
    address?this.getAddress():this.getAddressList();
      // }
    }
  },
  // mounted(){
  //   //console.log(this.info)
  // },
  mounted(){
    this.getMonthDay()
    this.getOrderInfo()
    let {address} = this.$route.query||''
    address?this.getAddress():this.getAddressList();
    //加载动画
    this.$nextTick(()=>{
      this.$refs.loading.load()
    })
  },
  components:{
    ActionSheet,
    inputNumber,
    chooseMethCard,
    loading
  }
}
</script>

<style lang="less" scoped>
.confirm-order{
  height: 100vh;
  overflow: scroll;
  background-color: #f6f6f6;
  padding: 0.23rem 0.27rem 1rem 0.27rem;
}
.tab-card{
		background-color: #FFFFFF;
		// width: 100%;
		margin-top: 0.2rem;
		margin-bottom: 20px;
		.title-wrap{
			position: relative;			
			.item{
				flex:1;
				color: #1a1a1a;
				font-size: 0.24rem;
				height: 0.56rem; //60px
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #dddddd;
			}
			.active.left::after{
			  content: '';
			  position: absolute;
			  right:0;
			  top: 0;
			  transform: translateX(50%);
			  width:0px;
			  height:0px;
			  border-left:0.26rem solid transparent;
			  border-right:0.26rem solid transparent;
			  border-bottom:0.68rem solid #FFFFFF;
			}
			.active.right::before{
				content: '';
				position: absolute;
				left:0;
				top: 0;
				transform: translateX(-50%);
				width:0;
				height:0;
				border-left:0.26rem solid transparent;
				border-right:0.26rem solid transparent;
				border-bottom:0.68rem solid #FFFFFF;
			}
			.active{
				color: #1A1A1A;
				background-color: #FFFFFF;
				transform: translateY(-0.1rem);
			}
    }
    .wrap-content{
      box-sizing: border-box;
      padding: 0.26rem 0.18rem;
      background-color: #FFFFFF;
      
      
    }
  }

.deliver{
  margin-bottom: 0.23rem;

  .no-address{
    height: 0.73rem;
    background-color: #ffffff;
    font-size: 0.21rem;
    color: #1a1a1a;
  }
  .has-address{
    padding: 0.36rem 0.18rem;
    background-color: #ffffff;
    border-radius: 0.11rem;
    color: #000000;
    .top{
      font-size: 0.24rem;
      font-weight: bold;
      margin-bottom: 0.25rem;
      .phone{
        margin-left: 0.3rem;
      }
    }
    .bottom{
      font-size: 0.21rem;
      i{
        font-size: 0.2rem;
        margin-right: 0.17rem;
        font-weight: bold;
      }
    }
  }
}

.alone-feild{
  padding: 0 0.16rem;
  height: 0.68rem;
  font-size: 0.21rem;
  background-color: #ffffff;
  border-radius: 0.11rem;
  margin-bottom: 0.23rem;
  .title{
    color: #1a1a1a;
  }
  .shit{
    color: #a8a8a8;
  }
  .iconweixin{
    font-size: 0.45rem;
    color: #46bb36;
    margin-right: 0.16rem;
  }
  .iconxuanzhong{
    font-size: 0.28rem;
    color: #2ecb62;
  }
}
.tabbar{
  height: 0.83rem;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #ffffff;
  padding: 0 0.27rem;
  box-sizing: border-box;
  .word{
    color: #1a1a1a;
    font-size: 0.27rem;
    margin-right: 0.2rem;
  }
  .money{
    font-size: 0.27rem;
    color:#fc0808;
  }
  .buy-btn{
    width: 1.47rem;
	  height: 0.56rem;
	  background-color: #2ecb62;
    border-radius: 0.28rem;
    font-size: 0.21rem;
    color: #ffffff;
  }
}
</style>

