<template>
  <div class="goods-detail-wrap" indicator-color="#c5c5c5">
    <swipe autoplay="5000" class="swipe">
      <swipe-item class="swipe-item" v-for="(item,i) in pageInfo.pics.split(',')" :key="i">
        <img :src="item" alt="">
      </swipe-item>
      <!-- <swipe-item class="swipe-item">
        <img src="../../assets/img/商品详情大图.png" alt="">
      </swipe-item> -->
    </swipe>
    <!-- 商品信息 -->
    <div class="goods-info">
      <span class="pre-sale" v-show="pageInfo.isPreSale==1">付款后，最晚{{takeDay[0]}}年{{takeDay[1]}}月{{takeDay[2]}}日发货</span>
      <div class="name"> <div class="pre-tag">预售</div> {{pageInfo.name}}</div>
      <div class="row sb ac" style="margin: 0.15rem 0 0.08rem 0;">
        <div class="row" style="align-items:flex-end">
          <span class="now">￥{{pageInfo.paymentPrice}}</span>
          <span class="old">￥{{pageInfo.price}}</span>
        </div>
        <div @click="collectIt">
          <i class="iconfont iconguanzhu2" v-if="isCollect" ></i>
          <i class="iconfont iconguanzhu" v-else></i>
        </div>
      </div>
      <span class="sale">销量：{{pageInfo.saleCount}}</span>
    </div>

    <div class="detail-content plr">
        <!-- 优惠 折扣 -->
      <div class="odd-wrap" >
        <!-- 优惠券暂时注释 -->
        <!-- <div class="filed-item hot" @click="pops.platform=true">
          <span>平台可用叠加优惠，满2000减50</span>
          <i class="iconfont iconARROW"></i>
        </div>
        <div class="filed-item" @click="pops.coupon=true">
          <div class="row">
            <div class="tag">领券</div>
            <span>满500减10  满1000减100</span>
          </div>
          <i class="iconfont iconARROW"></i>
        </div> -->
        <!-- 运费 -->
        <!-- <router-link to="/detailChoose" tag="div" class="filed-item">
          <div class="row">
            <span class="r38">运费</span>
            <div class="column sb">
              <span>上海 <span style="margin-left:0.99rem">快递：￥24</span> </span>
              <span style="color: #a8a8a8;">配送至:东莞南城</span>
            </div>
          </div>
          <i class="iconfont iconARROW"></i>
        </router-link> -->

        <div class="filed-item" @click="pops.serverInfo=true">
          <div>
            <span class="r38">服务</span>
            <span>退货包运费·极速退款·7天无理由退货</span>
          </div>
          <i class="iconfont iconARROW"></i>
        </div>
        <div class="filed-item" @click="pops.goodsParams=true">
          <div>
            <span class="r38">参数</span>
            <span>品牌    型号…</span>
          </div>
          <i class="iconfont iconARROW"></i>
        </div>
      </div>
    </div>
    
    <!-- 评论 -->
    <div class="comment-wrap plr">
        <div class="top row sb ac">
          <span class="total">用户评价({{pageInfo.comments.total}})</span> 
          <router-link to="/evaluate" tag="span" class="go-all">全部评价 <i class="iconfont icongengduo"></i></router-link>
        </div>
        <evaluate-card :hasBar="false"  :info="pageInfo.comments.records[0]"></evaluate-card>
    </div>

    <!-- 店铺推荐 -->
    <div class="plr" style="margin-bottom:0.23rem">
      <hot-recom-card :info="pageInfo.storeHotProductVo"></hot-recom-card>
    </div>

    <!-- 商品详情图 -->
    <div class="detail-img column plr" style="margin-bottom:0.23rem" v-html="pageInfo.productSubVo.detail">
      <!-- <img src="../../assets/img/商品详情图.png" alt="">
      <img src="../../assets/img/商品详情图2.png" alt="">
      <img src="../../assets/img/商品详情图3.png" alt=""> -->
    </div>

    <!-- 权利说明 -->
    <div class="plr" style="margin-bottom:0.23rem">
      <img src="../../assets/img/权利声明.png" alt="">
    </div>

    <div class="plr">
      <div style="margin-bottom:0.23rem">推荐商品</div>
      <div class="recom-wrap row sb" style="flex-wrap:wrap">
        <home-good-card v-for="(item,i) in recomList" :key="i" :info="item"></home-good-card>
      </div>
    </div>


    <!-- 底部tabbar -->
    <div class="tabbar row sb ac">
      <div class="column ac jc">
        <i class="iconfont iconkefu"></i>
        <span class="cus">客服</span>
      </div>
      <div class="row ac">
        <div class="btn add-shopcart" @click="pops.specs=true">加入购物车</div>
        <div class="btn buy-now" @click="pops.specs=true">立即购买</div>
      </div>
    </div>

    <!-- 一堆弹框 -->
    <action-sheet v-model="pops.platform" title="平台优惠">
      <div class="pop-content platform-content">
        <div class="platform-coupon row ac">
            <div class="tag row ac jc">平台满减券</div>
            <div class="left">￥20</div>
            <div class="mid column sb">
              <span>满50减50</span>
              <span>有效期至2020-10-20</span>
              <span>可与店铺优惠叠加使用</span>
            </div>
            <div class="right">
              <div class="take row ac jc">立即领取</div>
              <!-- <div class="take took row ac jc">已领取</div> -->
            </div>
          </div>
          <div class="platform-coupon row ac">
            <div class="tag row ac jc">平台满减券</div>
            <div class="left">￥20</div>
            <div class="mid column sb">
              <span>满50减50</span>
              <span>有效期至2020-10-20</span>
              <span>可与店铺优惠叠加使用</span>
            </div>
            <div class="right">
              <!-- <div class="take row ac jc">立即领取</div> -->
              <div class="take took row ac jc">已领取</div>
            </div>
          </div>
          <div class="pop-close-btn position">关闭</div>
      </div>
    </action-sheet>
    <action-sheet v-model="pops.coupon" title="店铺优惠">
      <div class="pop-content">
        <div class="coupon-item row ac">
          <div class="left-top row ac jc">店铺满减券</div>
          <div class="left row ac jc">￥20</div>
          <div class="mid column sb">
            <span>全场通用</span>
            <span>有效期至2020-10-20</span>
          </div>
          <div class="right row ac jc">
            <div class="take row ac jc">立即领取</div>
          </div>
        </div>
        <div class="coupon-item row ac">
          <div class="left-top row ac jc">店铺折扣券</div>
          <div class="left row ac jc">9.8折</div>
          <div class="mid column sb">
            <span>全场通用</span>
            <span>有效期至2020-10-20</span>
          </div>
          <div class="right row ac jc">
            <!-- <div class="take row ac jc">立即领取</div> -->
            <div class="take took row ac jc">已领取</div>
          </div>
        </div>
        <div class="pop-close-btn position" @click="pops.coupon=false">保存</div> 
      </div>
    </action-sheet>
    <action-sheet v-model="pops.serverInfo" title="服务说明">
      <div class="pop-content server-content">
        <div>
          <span class="s-title">退货包运费</span>
          <p>订单发货后90天内如果申请退货退款或换货，平台将免除退货运费</p>
        </div>
        <div>
          <span class="s-title">极速退款</span>
          <p>下单4小时内，未发货状态下，提交退款申请立即退款</p>
        </div>
        <div>
          <span class="s-title">7天无理由退款</span>
          <p>满足相应条件时，消费者可申请7天无理由退</p>
        </div>
        <div class="pop-close-btn position" @click="pops.serverInfo=false">关闭</div>
      </div>
    </action-sheet>
    <action-sheet v-model="pops.goodsParams" title="产品参数">
      <div class="pop-content pop-content-big params-content">
        <div class="params-field row" v-for="(item, i) in Object.keys(pageInfo.productParameter)" :key="i">
          <span class="left">{{item}}</span>
          <div class="right">{{pageInfo.productParameter[item]}}</div>
        </div>
        <!-- <div class="params-field row">
          <span class="left">型号</span>
          <div class="right">ARZ充电电钻</div>
        </div>
        <div class="params-field row">
          <span class="left">产地</span>
          <div class="right">中国大陆</div>
        </div>
        <div class="params-field row">
          <span class="left">颜色规格</span>
          <div class="right column">
            <span>黑色38VF双速款</span>
            <span>黄色38VF双速款</span>
            <span>黑色42VF双速冲击款</span>
            <span>黄色42VF双速冲击款</span>
          </div>
        </div>
        <div class="params-field row">
          <span class="left">电钻类型</span>
          <div class="right">手电钻</div>
        </div>
        <div class="params-field row">
          <span class="left">电压</span>
          <div class="right">220V</div>
        </div>
        <div class="params-field row">
          <span class="left">调速</span>
          <div class="right">无极变速</div>
        </div>
        <div class="params-field row">
          <span class="left">夹头类型</span>
          <div class="right">快速夹头</div>
        </div>
        <div class="params-field row">
          <span class="left">最大夹持能力</span>
          <div class="right">10mm</div>
        </div>
        <div class="params-field row">
          <span class="left">操作方式</span>
          <div class="right">手持式</div>
        </div>
        <div class="params-field row">
          <span class="left">有无正反转向</span>
          <div class="right">有</div>
        </div> -->
        <div class="pop-close-btn position" @click="pops.goodsParams=false">关闭</div>
      </div>
    </action-sheet>

    <!-- 添加购物车 立即购买弹框-->
    <action-sheet v-model="pops.specs" :round="false">
      <div class="pop-content tabbar-pop shopcart-content">
        <!-- 顶部信息栏 -->
        <div class="top row">
          <img :src="sku_obj.preview" alt="">
          <div class="column sb">
            <div class="row price-wrap">
              <span class="symbol">￥</span><span class="price">{{sku_obj.price}}</span>
            </div>
            <span class="stock">库存：{{sku_obj.volume}}</span>
            <span class="select-params" v-show="sku_list.length>0">已选：{{sku_selected}}</span>
          </div>
        </div>
        <!-- 选择规格栏 -->
        <div class="spec-wrap" v-for="(item,i) in pageInfo.propertyBoots" :key="i">
          <span class="title">{{item.propertyName}}</span>
          <div class="row" style=" margin-top: 0.17rem;">
            <!-- <div class="spec-item active">黑色</div>-->
            <div class="spec-item" 
            :class="{active:sku_active_id[i]==idx}"
            v-for="(v, idx) in item.options" 
            :key="v.propertyId" 
            @click="selectSku(v.value, idx, i)">
              {{v.value}}
            </div>     
          </div>
        </div>
        <!-- <div class="spec-wrap">
          <span class="title">规格</span>
          <div class="row" style=" margin-top: 0.17rem;">
            <div class="spec-item active">手紧式手电钻</div>
            <div class="spec-item">手紧式手电钻</div>
          </div>
        </div> -->
        <div class="spec-wrap row sb" style="margin-top:0.45rem">
          <span class="title">数量</span>
          <input-number v-model="num"></input-number>
        </div>
        <div class="confirm-btn row ac jc" @click="buyNow">确定</div>
      </div>
    </action-sheet>

  </div>
</template>

<script>
import api from '../../api/home'
import { Swipe, SwipeItem, ActionSheet } from 'vant';
import hotRecomCard from '../../components/common/card/hot-recom-card'
import homeGoodCard from '../../components/common/card/home-good-card'
import inputNumber from '../../components/common/my/input-number'
import evaluateCard from '../../components/common/card/evaluate-card'
export default {
 data(){
   return{
     isCollect:false,
     pops:{ //一堆pop
      serverInfo: false,
      coupon:false,
      goodsParams:false,
      platform: false,
      specs: false
     },
     num:1, //商品数量
     pageInfo:{pics:'',comments:{records:[]}, productSubVo:{},productParameter:{}}, //详情
     recomList:[],
     takeDay:[0,0,0], //预售发货时间
     sku_list:[], //选购规格的value 动态绑定
     sku_active_id:[],
     sku_obj:{}, // 筛选出来的obj 展示用
     sku_selected:'', //已选中的规格
   }
 },
 methods:{
   async getDetail(){ //获取商品详情
     let {id} = this.$route.query
     let res = await api.getGoodsDetail({id})
     this.pageInfo = res.result
     this.isCollect = res.result.collectState==1?true:false
     this.takeDay = res.result.deliveryDate.split('-')
     // 给规格展示一个默认值
     this.sku_obj = this.pageInfo.productSkuVos[0]
   },
   async getRecomList(){ //获取推荐商品  暂时设定只加载30个
      let res = await api.getGoodsList({pageSize:30,pageNo:1, type:2})
      this.recomList = res.result.lists
   },
   collectIt(){
     //收藏功能
     this.isCollect = !this.isCollect
   },
   selectSku(value, idx, fidx){ //设置规格函数
     let map = this.pageInfo.productSkuVos // 规则
     if(this.sku_list[fidx]==value){
       //已有就取消选中
       this.sku_list[fidx] = null
       this.sku_active_id[fidx] = -1
     }else{
       //选中
       this.sku_list[fidx] = value
       this.sku_active_id[fidx]=idx
     }
     let index = map.findIndex(v=>{
       let rules = v.propertyList //数组
       let res = rules.every(item=>this.sku_list.includes(item.value))
       if(res) return v
     })
     if(index!=-1){ //找到了才给赋值
       this.sku_obj = map[index]
     }
     this.sku_selected = this.sku_list.join('、')
    //  console.log(map)
     this.$forceUpdate() //强制更新组件
   },
   async buyNow(){
     //console.log(this.sku_obj)
     let data = {
       productList: [
          {
            productId: this.$route.query.id,
            productNumber: 1,
            productPrice: this.sku_obj.price,
            productSkuId: this.sku_obj.id,
            shelveId:'1324301545862070274',
            shelveType:2,
          }
        ],
        sourceType:1,
        sourceId:'1308242941815496705'
     }
     let res = await api.createOrder(data)
     if(res.success){
       this.$router.push({name:'confirmorder', query:{orderId:res.result}})
     }else{
       this.showToast('获取订单失败！')
     }
     //console.log(res)
   }
 },
 created(){
   this.getDetail()
   this.getRecomList()
 },
 components:{
   Swipe,
   SwipeItem,
   ActionSheet,
   hotRecomCard,
   homeGoodCard,
   inputNumber,
   evaluateCard
 }
}
</script>

<style lang="less" scoped>
.plr{
  padding: 0 0.27rem;
  border-radius:0.11rem;
}
.r38{
  margin-right: 0.38rem;
}
.goods-detail-wrap{
  height: 100vh;
  overflow: scroll;
  padding-bottom: 0.9rem;
  background-color: #f6f6f6;
}
.swipe{
  height: 6.36rem;
  .swipe-item{
    img{
      width: 100%;
      height: 100%;
    }
  }
}
.goods-info{
  padding: 0.23rem 0.27rem;
  box-sizing: border-box;
  background-color: #ffffff;
  margin-bottom: 0.23rem;
  .pre-sale{
    font-size: 0.18rem;
    color: #2ecb62;
  }
  .name{
    font-size: 0.27rem;
    font-weight: 500;
    color: #1a1a1a;
    .pre-tag{
      display: inline-block;
      width: 0.56rem;
      height: 0.28rem;
      background-color: #2ecb62;
      border-radius: 0.02rem;
      font-size: 0.24rem;
      color: #ffffff;
      margin-bottom: 0.1rem;
      text-align: center;
      line-height: 0.28rem;
    }
  }
  .now{
    color: #fc0808;
    font-size: 0.36rem;
    font-weight: bold;
    line-height: 1;
  }
  .old{
    font-size: 0.21rem;
    color: #a8a8a8;
    text-decoration:line-through;
    margin-left: 0.14rem;
  }
  i{
    font-size: 0.3rem;
    color: #a8a8a8;
  }
  .iconguanzhu2{
    color: #2ecb62;
  }
  .sale{
    color: #a8a8a8;
    font-size: 0.18rem;
  }
}
.detail-content{
  overflow: scroll;
  padding-bottom: 0.23rem;
}
.odd-wrap{
    border-radius:0.11rem;
    background-color: #ffffff;
    .filed-item{
      padding: 0.24rem 0.16rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.21rem;
      color: #1a1a1a;
      i{
        font-size: 0.25rem;
        font-weight: bold;
        color: #1a1a1a;
      }
      .tag{
        display: inline-block;
        width: 0.59rem;
        height: 0.31rem;
        background-color: #ffdede;
        color: #fc0808;
        font-size: 0.21rem;
        text-align: center;
        line-height: 0.31rem;
        margin-right: 0.22rem;
      }
    }
    .hot{
      color: #ffffff;
      background-color: #fc0808;
      border-radius: 0.11rem 0.11rem 0rem 0rem;
      i{
        color: #ffffff;
      }
    }
}
.comment-wrap{
  margin-bottom: 0.23rem;
  padding: 0.2rem 0.16rem;
  background-color: #ffffff;
  .top{
    margin-bottom: 0.3rem;
    .total{
      font-size: 0.27rem;
      color: #1a1a1a;
    }
    .go-all{
      color: #a8a8a8;
      font-size: 0.18rem;
      i{
        font-size: 0.15rem;
      }
    }
  }
}
.tabbar{
  height: 0.83rem;
  background-color: #ffffff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 0 0.27rem;
  box-sizing: border-box;
  i{
    font-size: 0.36rem;
  }
  .cus{
    font-size: 0.17rem;
    color: #1a1a1a;
  }
  .btn{
    width: 1.47rem;
    height: 0.56rem;
    border-radius: 0.28rem;
    font-size: 0.21rem;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .add-shopcart{
    background-color: #f5b917;
  }
  .buy-now{
    background-color: #2ecb62;
    margin-left: 0.17rem;
  }
}
/deep/.van-swipe__indicator{
  width: 0.14rem;
	height: 0.03rem;
	background-color: #c5c5c5;
}
// /deep/.van-swipe__indicator--active{
//   background-color: #ffffff;
// }
</style>

<style lang="less" scoped>
.pop-content{
  padding: 0 0.27rem;
  height: 5.64rem;
  position: relative;
}
.tabbar-pop{
  min-height: 6.94rem;
}
.pop-content-big{
  height: 9.59rem;
}
.pop-close-btn{
  // position: absolute;
  // left: 50%;
  // bottom: 0.15rem;
  // transform: translateX(-50%);
  width: 5.81rem;
	height: 0.56rem;
	background-color: #2ecb62;
  border-radius: 0.28rem;
  font-size: 0.21rem;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.position{
    position: absolute;
    bottom: 0.23rem;
    left: 50%;
    transform: translateX(-50%);
  }
.server-content{
  div{
    margin-bottom: 0.55rem;
  }
  .s-title{
    font-size: 0.24rem;
    color: #000000;
    margin-bottom: 0.16rem;
  }
  p{
    font-size: 0.21rem;
    color: #a8a8a8;
  }
}
.coupon-item{
    width: 5.81rem;
    height: 1.47rem;
    background-color: #f6f6f6;
    border-radius: 0.11rem;
    margin-bottom: 0.23rem;
    position: relative;
    box-sizing:  border-box;
    padding: 0.42rem 0;
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
      flex: 1;
      font-size: 0.36rem;
      color: #fc0808;
      font-weight: bold;
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
.params-content{
  .params-field{
    font-size: 0.21rem;
    margin-bottom: 0.34rem;
    .left{
      width: 1rem;
      color: #a8a8a8;
    }
    .right{
      flex: 1;
      color: #000000;
      margin-left: 0.3rem;
    }
  }
}
.platform-content{
  .platform-coupon{
    height: 1.47rem;
	  background-color: #f6f6f6;
    border-radius: 0.11rem;
    padding: 0.2rem;
    box-sizing: border-box;
    margin-bottom: 0.23rem;
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
      flex: 1;
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
.shopcart-content{
  padding-top: 0.3rem;
  box-sizing: border-box;
  position: relative;
  .top{
    img{
    width: 1.41rem;
    height: 1.41rem;
    border-radius: 0.11rem;
    margin-right: 0.23rem;
  }
  .price-wrap{
    color: #fc0808;
    align-items: flex-end;
    .symbol{
      font-size: 0.18rem;
    }
    .price{
      font-size: 0.31rem;
      font-weight: bold;
    }
  }
  .stock{
    font-size: 0.18rem;
    color: #a8a8a8;
  }
  .select-params{
    font-size: 0.18rem;
    color: #1a1a1a;
  }
  }
  .spec-wrap{
    margin-top: 0.21rem;
    .title{
      font-size: 0.24rem;
      color: #1a1a1a;
    }
    .spec-item{
      // width: 1.02rem;
      // height: 0.45rem;
      padding: 0.11rem 0.31rem;
      background-color: #dddddd;
      border-radius: 0.02rem;
      margin-right: 0.23rem;
      font-size: 0.21rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .active{
      background-color: #e1fdd2;
      color: #2ecb62;
    }
  }
  .confirm-btn{
    position: absolute;
    bottom: 0.2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 5.81rem;
    height: 0.56rem;
    background-color: #2ecb62;
    border-radius: 0.28rem;
    font-size: 0.21rem;
    color: #ffffff;
  }
}
</style>