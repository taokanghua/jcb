<template>
  <div class="confirm-order">
    <!-- 心动我做得这么好的tabbar栏 改啥改  :( -->
    <div class="deliver">
          <!-- 无地址情况 -->
      <!-- <div class="no-address row ac jc">+添加地址</div> -->

      <div class="has-address row sb ac">
        <div class="column">
          <div class="row ac top">
            <span>张三</span>
            <span class="phone">12345678900</span>
          </div>
          <div class="row ac bottom">
            <i class="iconfont icondizhi"></i>
            <p>地球市地球镇地球村东南西北888号</p>
          </div>
        </div>
        <i class="iconfont iconARROW"></i>
      </div>

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

    <chooseMethCard v-for="item in 2" :key="item"></chooseMethCard>

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
        <span class="money">￥316.8</span>
      </div>
      <div class="buy-btn row ac jc">立即购买</div>
    </div>

    <!-- 又是一堆弹框 x_x -->
    <action-sheet v-model="pops.takeTime" title="选择自提时间">
      <div class="take-time-content row">
        <div class="date">
          <!-- <div class="row ac jc active">10:10</div> -->
          <div 
          class="row ac jc" 
          :class="{active:i==dayIdx}"
          v-for="(item,i) in dateList" 
          :key="i"
          @click="dayIdx=i">
          {{item.month}}-{{item.day}}
        </div>
        </div>
        <div class="time">
          <div class="row sb ac active-time" style="height:0.68rem">
            <span>12:00</span>
            <i class="iconfont iconxuanzhong2"></i>
          </div>
          <div class="row sb ac" style="height:0.68rem">
            <span>12:30</span>
            <i class="iconfont iconxuanzhong2"></i>
          </div>
        </div>
      </div>
    </action-sheet>

    <action-sheet v-model="pops.way" title="配送方式">
      <div class="way-content">
        <div class="way-feild row ac sb" @click="form.deliverWayIdx=0;pops.way=false">
          <span class="title">快递配送</span>
          <div class="row ac">
            <i class="iconfont iconxuanzhong" v-if="form.deliverWayIdx==0"></i>
            <i class="iconfont iconradiobuttonunselect" v-else></i>
          </div>
        </div>
        <div class="way-feild row ac sb" @click="form.deliverWayIdx=1;pops.way=false">
          <span class="title">物流到付</span>
          <div class="row ac">
            <i class="iconfont iconxuanzhong" v-if="form.deliverWayIdx==1"></i>
            <i class="iconfont iconradiobuttonunselect" v-else></i>
          </div>
        </div>
        <div class="confirm-btn row ac jc position" @click="pops.way=false">确定</div>
      </div>
    </action-sheet>

    <action-sheet v-model="pops.platform" title="平台优惠">
      <div class="platform-content">
        <!-- 下面开始 一张优惠券 -->
        <div class="row ac mb26" v-for="(item,i) in 2" :key="i" @click="platformHandle(i)">
          <div class="radio row ac">
          <i class="iconfont iconxuanzhong" v-if="i==form.platformIdx"></i>
          <i class="iconfont iconradiobuttonunselect" v-else></i>
        </div>
         <div class="platform-coupon row ac">
            <div class="tag row ac jc">平台满减券</div>
            <div class="left row jc">￥20</div>
            <div class="mid column sb">
              <span>满50减50</span>
              <span>有效期至2020-10-20</span>
               <span>可与店铺优惠叠加使用</span>
            </div>
          </div>
        </div>
        <div class="confirm-btn position row ac jc" @click="pops.platform=false">确定</div>
      </div>
    </action-sheet>

    <action-sheet v-model="pops.shop" title="店铺优惠">
      <div class="shop-content">
        <div class="row ac mb26" v-for="(item,i) in 2" :key="i" @click="shopHandle(i)">
          <div class="radio row ac">
          <i class="iconfont iconxuanzhong" v-if="i==form.shopIdx"></i>
          <i class="iconfont iconradiobuttonunselect" v-else></i>
        </div>
         <div class="coupon-item row ac">
          <div class="left-top row ac jc">店铺满减券</div>
          <div class="left row ac jc">￥20</div>
          <div class="mid column sb">
            <span>全场通用</span>
            <span>有效期至2020-10-20</span>
          </div>
        </div>
        </div>
        <div class="confirm-btn position row ac jc" @click="pops.shop=false">确定</div>
      </div>
    </action-sheet>
  </div>
</template>

<script>
import api from '../../api/home'
import {ActionSheet} from 'vant'
import inputNumber from '../../components/common/my/input-number'
import chooseMethCard from '../../components/common/card/order-goods-card'
export default {
  data(){
    return{
      // wayIdx:1, 
      //agreement: false, //同意协议
      editPhone:false, //编辑手机号
      dateList:[], //日期
      dayIdx:0, //选中的日期索引
      
      contact: '12345678900', // 联系电话
      form:{
        platformIdx:-1, //平台优惠券索引
        shopIdx:-1, //店铺优惠券索引
        deliverWayIdx:0, //配送方式 两种
        num:1,
        insurance: false, //运费险
        message:''
      },
      pops:{
        takeTime:false,
        way:false,
        platform:false,
        shop:false
      }
    }
  },
  methods:{
    async getOrderInfo(){
      let ids = this.$route.query.orderId
      let res = await api.getOrder({ids})
      console.log(res)
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
    editHandle(){
      if(this.editPhone) return
      setTimeout(()=>{this.$refs.input.focus()},100) //必须要延时一下
      this.editPhone = true
    },
    checkPhone(e){
      this.editPhone = false
    },
    platformHandle(i){
      // 店铺优惠切换
      if(this.form.platformIdx == i){
        this.form.platformIdx = -1
        return
      }
      this.form.platformIdx = i
    },
    shopHandle(i){
      // 店铺优惠切换
      if(this.form.shopIdx == i){
        this.form.shopIdx = -1
        return
      }
      this.form.shopIdx = i
    }
  },
  mounted(){
    this.getMonthDay()
  },
  created(){
    this.getOrderInfo()
  },
  components:{
    ActionSheet,
    inputNumber,
    chooseMethCard
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

