<template>
  <!-- 这个页面html部分(其他有的页面也是:)注释都是暂时不用的东西(不代表没用，只是现在不做那功能！:) -->
  <div class="choose-methods-card">
    <div class="row ac shop-name">
      <span class="iconfont iconshangcheng"></span>
      <span>{{info.getApiVo.name}}</span>
    </div>
      <div class="goods row" v-for="item in info.productList" :key="item.skuId">
        <img :src="item.productPic" alt="">
        <div class="column sb" style="margin-left:0.23rem;width:100%">
          <div class="name">{{item.productName}}</div>
          <div class="sku">{{item.propertyName}}</div>
          <div class="footer row sb ac">
            <span class="price">￥{{item.skuPrice}}</span>
            <input-number v-model="item.number" :max="item.stock" @change="changeHandle(item)"></input-number>
          </div>
        </div>
      </div>
      <!-- x_x -->
      <div class="selftake-wrap row" v-show="form.deliverWayIdx==1">
          <div class="info column sb">
            <span class="take-info">取货信息</span>
            <div class="shop-address">
              <i class="iconfont icondizhi"></i>
              <span>{{info.getApiVo.addressName.replace(/\s/g,'')}}</span>
            </div>
            <div class="user-select row">
              <div class="take-time column sb" @click="pops.takeTime=true">
                <span class="title">自提时间</span>
                <div class="row">{{dateList[dayIdx].month+'-'+dateList[dayIdx].day}} {{time_options[timeIdx]}} <i class="iconfont iconARROW"></i></div>
              </div>
              <div class="phone column sb" @click="editHandle">
                <span class="title">联系电话</span>
                <input ref="input" type="phone" class="edit-phone" v-model="info.phone" v-show="editPhone" @blur="checkPhone">
                <div class="row" v-show="!editPhone">{{info.phone}}<i class="iconfont iconbianji"></i></div>
              </div>
            </div>
          </div>
        </div>

      <!-- 行  暂时不做优惠券 :) -->
      <!-- <div class="order-field row sb ac" @click="pops.platform=true">
        <span class="left">平台优惠</span>
        <span class="right row ac">-￥10.00 <i class="iconfont iconARROW"></i></span>
      </div> -->
      <!-- <div class="order-field row sb ac" @click="pops.shop=true">
        <span class="left">店铺优惠</span>
        <span class="right row ac">-￥10.00 <i class="iconfont iconARROW"></i></span>
      </div> -->
      <div class="order-field row sb ac" @click="pops.way=true">
        <span class="left">配送方式 <span class="desc">{{[0,'自提','快递配送','物流到付'][form.deliverWayIdx]}}</span> </span>
        <span class="right row ac"><span v-show="form.deliverWayIdx==0">￥10.00</span> <i class="iconfont iconARROW"></i></span>
      </div>
      <!-- <div class="order-field row sb ac">
        <span class="left">运费险 <span class="desc">货物运输过程中有损，可赔</span> </span>
        <span class="right row ac" @click="form.insurance=!form.insurance">
          ￥10.00 
        <i class="iconfont insurance" :class="[{'iconradiobuttonunselect':!form.insurance}, {'iconxuanzhong':form.insurance}]"></i>
        </span>
      </div> -->
      <!-- 暂时没会员 -->
      <!-- <div class="order-field row sb ac">
        <span class="left">会员折扣  <span class="desc">一级会员</span></span>
        <span>9.9折</span>
      </div> -->
      <div class="order-field row sb ac">
        <span class="left">备注</span>
        <input type="text" placeholder="请输入您备注信息" v-model="form.message" @blur="blurNote">
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
          <div 
          class="row sb ac" 
          style="height:0.68rem" 
          :class="{'active-time':timeIdx==i}"
          v-for="(item,i) in time_options" :key="item" @click="timeIdx=i">
            <span>{{item}}</span>
            <i class="iconfont iconxuanzhong2" v-show="timeIdx==i"></i>
          </div>
          <!-- <div class="row sb ac" style="height:0.68rem">
            <span>12:30</span>
            <i class="iconfont iconxuanzhong2"></i>
          </div> -->
        </div>
      </div>
    </action-sheet>

    <action-sheet v-model="pops.way" title="配送方式">
      <div class="way-content">
        <!-- <div class="way-feild row ac sb" @click="form.deliverWayIdx=0;pops.way=false">
          <span class="title">快递配送</span>
          <div class="row ac">
            <i class="iconfont iconxuanzhong" v-if="form.deliverWayIdx==0"></i>
            <i class="iconfont iconradiobuttonunselect" v-else></i>
          </div>
        </div> -->
        <div class="way-feild row ac sb" @click="form.deliverWayIdx=3;pops.way=false">
          <span class="title">物流到付</span>
          <div class="row ac">
            <i class="iconfont iconxuanzhong" v-if="form.deliverWayIdx==3"></i>
            <i class="iconfont iconradiobuttonunselect" v-else></i>
          </div>
        </div>
        <div class="way-feild row ac sb" @click="form.deliverWayIdx=1;pops.way=false">
          <span class="title">自提</span>
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
import api from '../../../api/home'
import {ActionSheet} from 'vant'
import inputNumber from '../my/input-number'
export default {
  data(){
    return{
      time_options:[],
      form:{
        platformIdx:-1, //平台优惠券索引
        shopIdx:-1, //店铺优惠券索引
        deliverWayIdx:3, //配送方式 3种
        num:1,
        insurance: false, //运费险
        message:''
      },
      pops:{
        takeTime:false,
        way:false,
        platform:false,
        shop:false
      },
      editPhone:false, //编辑手机号
      dayIdx:0, //选中的日期索引
      timeIdx:0,
      packObj:{}, //发给父的对象
      deliveryPrice:0, //运费
      
      //contact: '12345678900', // 联系电话
    }
  },
  props:{
    info: {
      type: Object,
      default:{getApiVo:{addressName:''}}
    },
    dateList:{
      //自提日期
      type: Array,
      default:[]
    },
    address:{
      //地址
      type: Object,
      default: ()=>{}
    }
  },
  methods:{
    editHandle(){
      if(this.editPhone) return
      setTimeout(()=>{this.$refs.input.focus()},100) //必须要延时一下
      this.editPhone = true
    },
    checkPhone(e){
      let phone = /^1[0-9]{10}$/.test(this.info.phone)
      if(!phone) return this.showToast('手机号无效！')
      this.editPhone = false
      this.calcPacking()
      //this.$emit('getData', this.packObj)
    },
    blurNote(){
      this.packObj.note = this.form.message
      this.$emit('getData', this.packObj)
    },
    //下两个暂时无用
    platformHandle(i){
      // 平台优惠切换
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
    },
    calcTime(){
      // let openHours = '2020-11-22 08:30:00'
      // let closeHours = '2020-11-22 18:30:00'
      let {openHours, closeHours} = this.info.getApiVo
      openHours = '2018/09/01 ' + (openHours||'09:00:00')
      closeHours = '2018/09/01 ' + (closeHours||'17:00:00')
      let [min, max] = [openHours, closeHours].map(v => new Date(v) * 1)
      const halfHours = 30 * 60 * 1000
      let cur = min;
      let arr = [];
      while (cur <= max) {
          arr.push(cur)
          cur += halfHours
      }
      this.time_options = arr.map(s => new Date(s).toTimeString().substr(0, 5))
    },
    //商品数量变化时候
    changeHandle(obj){
      // console.log(obj.number)
      //this.getDeliverPrice()
      this.calcPacking()
    },
    //获取快递价格
    async getDeliverPrice(){ //暂时砍掉
      let list = this.info.productList.map((v,i)=>{
        let obj = {}
        obj.orderProductId = v.orderProductId
        obj.productNumber = v.number
        obj.productPrice = v.skuPrice
        obj.productSkuId = v.skuId
        obj.templateId = v.templateId
        return obj
      })
      let data = {
          orderId: this.info.orderCode,
          orderProductList: list,
          receiveAddressId: this.address.id
      }
      let res = await api.getDeliveryPrice(data)
      this.deliveryPrice = res.result
      //this.calcPacking()
    },
    //计算并处理对象方法
    calcPacking(){
      let d = new Date()
      let year = d.getFullYear()
      let o = this.dateList[this.dayIdx]
      let selfTakeTime = `${year}-${o.month}-${o.day} ${this.time_options[this.timeIdx]}:00`
      let list = this.info.productList.map(v=>{
        return {
          number: v.number,
          orderProductId: v.orderProductId,
          skuId: v.skuId,
          skuPrice: v.skuPrice,
        }
      })
      this.packObj.id = this.info.id
      this.packObj.freightAmount = 0
      this.packObj.note = this.form.message
      this.packObj.orderId = this.info.id
      this.packObj.productList = list
      this.packObj.selfCarry= this.form.deliverWayIdx
      this.packObj.selfPhone = this.info.createByName
      this.packObj.selfTime = selfTakeTime
      let total = this.info.productList.reduce((pre,cur)=>cur.number*cur.skuPrice+pre,0)
      //这里暂时没做判断 这里预留为后面扩展优惠券计算价格
      // this.packObj.total = total + this.deliveryPrice
      if(this.deliverWayIdx==0){
        //快递配送
        this.packObj.total = total + this.deliveryPrice
      }else{
        this.packObj.total = total
      }
      //console.log(this.packObj)
      this.$emit('getData', this.packObj)
    }
  },
  watch:{
    address:{
      handler(n){
        //this.getDeliverPrice()
        //console.log('address')
      },
      immediate:true,//为啥不加这个就监听不到 屮
    },
    'pops.takeTime'(n){
      if(!n){ //自提时间 
        this.calcPacking()
      }
    },
    'form.deliverWayIdx'(n){
      this.calcPacking()
    }
  },
  created(){
    // console.log('==^^^==')
    // console.log(this.address)
    //获取收货地址 --> 请求获取价格 --> 发送对象到父组件 计算价格
    // this.getDeliverPrice()
   this.calcTime()
    // this.packObj = JSON.parse(JSON.stringify(this.info))
   this.calcPacking()
  },
  components:{
    ActionSheet,
    inputNumber
  }
}
</script>

<style lang="less" scoped>
.choose-methods-card{
  padding: 0.17rem 0.17rem;
  background-color: #FFFFFF;
  border-radius: 0.11rem;
  margin-bottom: 0.23rem;
  .shop-name{
    display: block;
    font-size: 0.18rem;
    color: #1a1a1a;
    margin-bottom: 0.2rem;
    .iconfont{
      font-size: 0.15rem;
      margin-right: 0.15rem;
    }
  }
  .goods{
    margin-bottom: 0.2rem;
    img{
      width: 1.41rem;
      height: 1.41rem;
      border-radius: 0.11rem;
      flex-shrink: 0;
    }
    .name{
      font-size: 0.21rem;
      color: #1a1a1a;
    }
    .sku{
      font-size: 0.18rem;
      color: #a8a8a8;
    }
    .price{
      font-size: 0.27rem;
      color: #fc0808;
    }
  }
  .order-field{
    // padding: 0 0.17rem;
    color: #1a1a1a;
    height: 0.68rem;
    font-size: 0.21rem;
    .left{
      position: relative;
      .desc{
        display: block;
        position: absolute;
        left: 1.34rem;
        top: 50%;
        width: 50vw;
        transform: translateY(-50%);
      }
    }
    .desc{
      font-size: 0.21rem;
      color: #a8a8a8;
      // margin-left: 0.54rem;
    }
    .iconARROW{
      color: #a8a8a8;
      font-size: 0.25rem;
    }
    .right{
      .insurance{
        margin-left: 0.1rem;
        &i{
          font-size: 0.28rem;
        }
        &.iconxuanzhong{
          color: #2ecb62;
        }
        &.iconradiobuttonunselect{
          color: #dddddd;
        }
      }
    }
    input{
      width: 80%;
      text-align: right;
    }
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
.selftake-wrap{
        position: relative;
        padding: 0.16rem;
        box-sizing: border-box;
        background-color: #f6f6f6;
        border-radius: 0.11rem;
        .take-info{
          font-size: 0.21rem;
          margin-bottom: 0.1rem;
          color: #a8a8a8;
        }
        .info{
          .shop-address{
            font-size: 0.24rem;
            color: #000000;
            i{
              font-size: 0.22rem;
            }
            span{
              margin-left: 0.23rem;
            }
          }
          .user-select{
            // .title{
              margin: 0.24rem 0 0.23rem 0;
              font-size: 0.21rem;
              color: #000000;
            // }
            .phone{
              margin-left: 0.56rem;
              .edit-phone{
                border:none;
                text-align: center;
                border-bottom: 1px solid #cccccc;
              }
            }
            .row{
              margin-top: 0.16rem;
              justify-content: flex-end;
              line-height: 1;
              i{
                font-size: 0.2rem;
                color: #a8a8a8;
                margin-left: 0.08rem;
                // font-weight: bold;
              }
            }
            
          }
        }
        .rule{
          color: #1a1a1a;
          font-size: 0.2rem;
              .checkbox{
                margin-right: 0.14rem;
                .no{
                  border:1px solid  #dddddd;
                  width: 0.2rem;
                  height: 0.2rem;
                  box-sizing: border-box;
                }
                i{
                  font-size: 0.2rem;
                  color: #2ecb62;
                }
              }
              .agreement{
                color: #13438c;
              }
            }
        .r{
          position: absolute;
          top:0;
          right: 0;
          font-size: 0.4rem;
          font-weight: bold;
        }
      }

</style>
<style lang="less" scoped>
.confirm-btn{
  width: 5.81rem;
	height: 0.56rem;
	background-color: #5ecc26;
  border-radius: 0.28rem;
  // position: absolute;
  bottom: 0.25rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.21rem;
  color: #ffffff;
}
.position{
  position: absolute;
}
.mb26{
  margin-bottom: 0.26rem;
}
.take-time-content{
  height: 5.64rem;
  .date{
    width: 2.08rem;
    height: 100%;
    overflow: scroll;
    background-color: #f6f6f6;
    div{
      height: 0.68rem;
    }
    .active{
      background-color: #ffffff;
    }
  }
  .time{
    height: 100%;
    overflow: scroll;
    flex: 1;
    padding: 0 0.27rem 0 0.72rem;
    span{
      font-size: 0.27rem;
      color: #1a1a1a;
    }
    i{
      font-size: 0.23rem;
      color: #2ecb62;
      display: none;
    }
    .active-time{
      span{

        color: #2ecb62;
      }
      i{
        display: block;
      }
    }
  }
}
.way-content{
  padding: 0 0.27rem;
  height: 5.64rem;
  box-sizing: border-box;
  position: relative;
  .way-feild{
    margin-bottom: 0.4rem;
    .title{
      font-size: 0.21rem;
      color: #1a1a1a;
    }
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
}
.platform-content{
  height: 5.64rem;
  overflow: scroll;
  padding: 0 0.27rem;
  box-sizing: border-box;
  .platform-coupon{
    flex: 1;
    height: 1.47rem;
	  background-color: #f6f6f6;
    border-radius: 0.11rem;
    box-sizing: border-box;
    margin-bottom: 0.23rem;
    padding: 0.14rem 0;
    // box-sizing: border-box;
    position: relative;
    .tag{
      position: absolute;
      left: 0;
      top: 0;
      width: 1.47rem;
      height: 0.31rem;
      background-color: #2ecb62;
      font-size: 0.18rem;
      color: #ffffff;
      border-radius: 0.11rem 0rem 0.11rem 0rem;
    }
    .left{
      width: 1.47rem;
      font-size: 0.36rem;
      color: #fc0808;
      font-weight: bold;
    }
    .mid{
      flex: 2;
      font-size: 0.21rem;
      height: 100%;
      color: #1a1a1a;
      margin-left: 0.22rem;
    }
    .right{
      flex: 1;
      .take{
        width: 1.24rem;
        height: 0.45rem;
        background-color: #2ecb62;
        border-radius: 0.23rem;
        font-size: 0.21rem;
        color: #ffffff;
      }
      .took{
        background-color: #a8a8a8;
      }
    }
  }
}
.shop-content{
  height: 5.64rem;
  overflow: scroll;
  padding: 0 0.27rem;
  box-sizing: border-box;
  .coupon-item{
    width: 5.81rem;
    height: 1.47rem;
    background-color: #f6f6f6;
    border-radius: 0.11rem;
    margin-bottom: 0.23rem;
    position: relative;
    box-sizing:  border-box;
    padding: 0.38rem 0;
    .left-top{
      width: 1.47rem;
      height: 0.31rem;
      background-color: #fc0808;
      font-size: 0.18rem;
      border-radius: 0.11rem 0rem 0.11rem 0rem;
      color: #ffffff;
      position: absolute;
      left: 0;
      top: 0;
    }
    .left{
      width: 1.47rem;
      font-size: 0.36rem;
      color: #fc0808;
      font-weight: bold;
      margin-right: 0.22rem;
    }
    .mid{
      flex: 2;
      font-size: 0.21rem;
      height: 100%;
      color: #1a1a1a;
    }
    .right{
      flex: 1;
      .take{
        width: 1.24rem;
        height: 0.45rem;
        background-color: #fc0808;
        border-radius: 0.23rem;
        font-size: 0.21rem;
        color: #ffffff;
        margin-right: 0.23rem;
      }
      .took{
        background-color: #a8a8a8;
      }
    }
  }
}


.radio{
    margin-right: 0.27rem;
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