<template>
  <div class="confirm-order">
    <div class="tab-card">
			<div class="title-wrap row">
				<div class="item left" :class="{active:wayIdx==0}" @click="wayIdx=0">送货上门</div>
				<div class="item right" :class="{active:wayIdx==1}" @click="wayIdx=1">上门自提</div>
			</div>
			<div class="wrap-content">
				<div class="deliver" v-show="wayIdx==0">
          <!-- 无地址情况 -->
          <div class="no-address row ac jc">+添加地址</div>
        </div>
        <!-- 自提 -->
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
		</div>

    <!-- 商品卡片 -->
    <div class="choose-methods-card">
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
      <!-- 行 -->
      <div class="order-field row sb ac">
        <span class="left">平台优惠</span>
        <span class="right row ac">-￥10.00 <i class="iconfont iconARROW"></i></span>
      </div>
      <div class="order-field row sb ac">
        <span class="left">店铺优惠</span>
        <span class="right row ac">-￥10.00 <i class="iconfont iconARROW"></i></span>
      </div>
      <div class="order-field row sb ac">
        <span class="left">运费 <span class="desc">物流到付</span> </span>
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
        <input type="text" placeholder="请输入您备注信息">
      </div>
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
        <span class="money">￥316.8</span>
      </div>
      <div class="buy-btn row ac jc">立即购买</div>
    </div>

    <!-- 又是一堆弹框 x_x -->
    <action-sheet v-model="pops.takeTime" title="选择自提时间">
      <div class="take-time-content row">
        <div class="date">
          <div class="row ac jc active">10:10</div>
          <div class="row ac jc" v-for="item in 10" :key="item">10:11</div>
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
  </div>
</template>

<script>
import {ActionSheet} from 'vant'
import inputNumber from '../../components/common/my/input-number'
export default {
  data(){
    return{
      wayIdx:1,
      checked: false,
      agreement: false, //同意协议
      editPhone:false, //编辑手机号
      contact: '12345678900',
      form:{
        num:1,
        insurance: false, //运费险
      },
      pops:{
        takeTime:true,
      }
    }
  },
  methods:{
    editHandle(){
      if(this.editPhone) return
      setTimeout(()=>{this.$refs.input.focus()},100) //必须要延时一下
      this.editPhone = true
    },
    checkPhone(e){
      this.editPhone = false
    }
  },
  components:{
    ActionSheet,
    inputNumber
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
      .deliver{
        .no-address{
          height: 0.73rem;
          background-color: #f6f6f6;
          font-size: 0.21rem;
          color: #a8a8a8;
        }
      }
      .selftake-wrap{
        position: relative;
        padding-right: 0.6rem;
        box-sizing: border-box;
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
    }
  }
.choose-methods-card{
  padding: 0.17rem 0.17rem;
  background-color: #FFFFFF;
  border-radius: 0.11rem;
  margin-bottom: 0.23rem;
  .goods{
    margin-bottom: 0.2rem;
    img{
      width: 1.41rem;
      height: 1.41rem;
      border-radius: 0.11rem;
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

<style lang="less" scoped>
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
</style>