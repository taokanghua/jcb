<template>
  <div class="mine-wrap">
    <!-- 头部 -->
    <div class="top-info">
      <div class="info row sb ac">
        <div class="row">
          <img v-if="userInfo.headPortrait" :src="userInfo.headPortrait" alt="" />
          <img v-else src="../../assets/img/mine/avatar.png" alt="">
          <div class="user-info column ac jc">
            <span class="name" v-if="userInfo.nickname">{{userInfo.nickname}}</span>
            <router-link :to="'/login'" tag="span" class="name" v-else>授权登录</router-link>
            <!-- 暂时不用 -->
            <!-- <router-link to="/memberGrade" tag="div" class="member row ac jc">
              一级会员 <i class="iconfont iconARROW"></i>
            </router-link> -->
          </div>
        </div>
        <router-link to="/editInfo" tag="i" class="iconfont iconARROW strong"></router-link>
      </div>
    </div>

    <div class="mine-content">
      <!-- 数量卡片 -->
      <div class="card row">
        <!-- 暂未开放 -->
        <!-- <div class="item">
          <span>4</span>
          <span class="word">优惠券</span>
        </div> -->
        <router-link to="/collection?type=0" tag="div" class="item">
          <span>{{numberObj.collectNumber||0}}</span>
          <span class="word">关注商品</span>
        </router-link>
        <router-link to="/collection?type=1" tag="div" class="item">
          <span>{{numberObj.focusNumber||0}}</span>
          <span class="word">关注店铺</span>
        </router-link>
      </div>
      <!-- 我的订单 -->
      <div class="common-card my-order column sb">
        <router-link to="/orderList" tag="div" class="top row sb">
          <span class="title">我的订单</span>
          <span class="all-order">全部订单 <i class="iconfont icongengduo"></i></span>
        </router-link>
        <div class="icon-wrap row sb ac">
          <router-link to="/orderList?type=1" tag="div" class="column ac jc">
            <div class="order-item">
              <i class="iconfont iconweizhifu"></i>
            <!-- <div class="badge">5</div> -->
            </div>
            <span>待支付</span>
          </router-link>
          <router-link to="/orderList?type=2" tag="div" class="column ac jc">
            <div class="order-item">
              <i class="iconfont iconyiwancheng"></i>
              <!-- <div class="badge">5</div> -->
            </div>
            <span>待收货</span>
          </router-link>
          <router-link to="/orderList?type=6" tag="div" class="column ac jc">
            <div class="order-item">
              <i class="iconfont icondingdan"></i>
              <!-- <div class="badge">50</div> -->
            </div>
            <span>已完成</span>
          </router-link>
          <router-link to="/orderList" tag="div" class="column ac jc">
            <div class="order-item">
              <i class="iconfont iconshouhou"></i>    
              <!-- <div class="badge">5</div> -->
            </div>
            <span>售后/退货</span>
          </router-link>
        </div>
      </div>
      <!-- 推广中心 -->
      <div class="common-card promotion-center column sb">
        <span class="title">推广中心</span>
        <div class="wrap row ">
          <router-link to="/popularizeCenter" tag="div" class="info-item column ac sb f1">
            <span>3000</span>
            <div>集采分</div>
          </router-link>
          <router-link to="/popularizePeople" tag="div" class="info-item column ac jc f1">
            <span>302</span>
            <div>推广人数</div>
          </router-link>
          <router-link to="/popularizeOrder" tag="div" class="info-item column ac jc f1">
            <span>22</span>
            <div>推广人订单</div>
          </router-link>
        </div>
      </div>
          <!-- 其他服务 -->
          <div class="common-card other-serve">
            <span class="title">其他服务</span>
            <div class="other-wrap">
              <router-link to="/couponCenter" tag="div" class="other-item">
                <!-- <i class="iconfont iconyouhuiquan"></i> -->
                <img src="../../assets/img/mine/优惠券 (2)@3x.png" alt="">
                <span>领券中心</span>
              </router-link>
              <router-link to="/address" tag="div" class="other-item">
                <!-- <i class="iconfont icondizhi"></i> -->
                <img src="../../assets/img/mine/地址 (2)@3x.png" alt="">
                <span>收货地址</span>
              </router-link>
              <div class="other-item">
                <img src="../../assets/img/mine/咨询@3x.png" alt="">
                <!-- <i class="iconfont iconkefu_1"></i> -->
                <a href="https://yzf.qq.com/xv/web/static/chat/index.html?sign=37ef9b97d12053922516cbe91be6b36629bc194aa992ba81fe73fe6cdd14c7afc93d285b9ca0fe48b1b1344468d96832ed016ede">联系我们</a>
              </div>
              <router-link to="/feedback" tag="div" class="other-item">
              <img src="../../assets/img/mine/消息 (1)@3x.png" alt="">
                <!-- <i class="iconfont iconxiaoxi"></i> -->
                <span>意见反馈</span>
              </router-link>
              <div class="other-item">
                <img src="../../assets/img/mine/浏览@3x.png" alt="">
                <!-- <i class="iconfont iconeye"></i> -->
                <span>浏览记录</span>
              </div>
              <div class="other-item">
                <img src="../../assets/img/mine/评价@3x.png" alt="">
                <!-- <i class="iconfont iconliaotian"></i> -->
                <span>我的评价</span>
              </div>
              <div class="other-item" @click="changeIndentity">
                <img src="../../assets/img/mine/切换身份@3x.png" alt="">
                <!-- <i class="iconfont iconqiehuan"></i> -->
                <span>切换店铺</span>
              </div>
            </div>
          </div>
    </div>

    <my-footer></my-footer>

  </div>
</template>

<script>
import homeApi from '../../api/home'
import myFooter from "../../components/common/my/footer";
import tokenHolder from '../../utils/tokenHolder';
export default {
  name: "mine",
  data() {
    return {
      userInfo:{},
      numberObj:{}
    };
  },
  methods: {
    async getInfo(){
      //获取数据
      let res = await homeApi.getUserInfo()
      this.numberObj = res.result.memberDynamicVo
      
      //console.log(this.userInfo)
    },
    changeIndentity(){
      let token = tokenHolder.get()||''
      location.href = 'http://192.168.2.188:8080/#/workbench?token='+token
      // this.$router.push({path:, query:{token}})
    }
  },
  created(){
    this.userInfo = this.$store.state.user.info.memberUserInfoVo||{}
    this.getInfo()
  },
  components: {
    myFooter,
  },
};
</script>

<style lang="less" scoped>
.strong {
  font-weight: bold;
}
.f1{
  flex:1;
}
.mine-wrap {
  height: 100vh;
  background-color: #f6f6f6;
  overflow: auto;
}
.common-card{
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 0.11rem;
  padding: 0.22rem;
  margin-bottom: 0.23rem;
  .title{
      font-size: 0.26rem;
    }
}


.top-info {
  height: 2.71rem;
  background-color: #2ecb62;
  padding: 0 0.27rem;
  border: 1px solid transparent;
  color: #ffffff;
  .info {
    margin-top: 0.56rem;
    img {
      width: 0.81rem;
      height: 0.81rem;
      border-radius: 50%;
    }
    .user-info {
      margin-left: 0.18rem;
      .name {
        font-size: 0.27rem;
      }
      .member {
        width: 1.24rem;
        height: 0.31rem;
        background-color: #1c9544;
        border-radius: 0.15rem;
        font-size: 0.2rem;
        i {
          font-weight: bold;
        }
      }
    }
  }
}
.mine-content{
  padding: 0 0.27rem 0.82rem 0.27rem;
}
.card {
  height: 1.36rem;
	background-color: #ffffff;
  border-radius: 0.11rem;
  transform: translateY(-50%);
  margin-bottom: -0.45rem;
  .item{
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.27rem;
    color: #1a1a1a;
    // height: 0.66rem;
    .word{
      font-size: 0.24rem;
      margin-top: 0.1rem;
    }
  }
}
.my-order{
  height: 1.82rem;
  .top{
    
    .all-order{
      font-size: 0.18rem;
      color: #a8a8a8;
      i{
        font-size: 0.1rem;
        color: #a8a8a8;
      }
    }
  }
  .icon-wrap{
    font-size: 0.24rem;
    i{
      color: #2ecb62;
      font-size: 0.43rem;
      margin-bottom: 0.1rem;
    }
    .order-item{
      position: relative;
      .badge{
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(40%, -50%);
        width: 0.28rem;
        height: 0.28rem;
        background-color: #fc0808;
        font-size: 0.18rem;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
      }

    }
  }
}
.promotion-center{
  height: 1.78rem;
	background-color: #ffffff;
  border-radius: 0.11rem;
  font-size: 0.27rem;
  .info-item{
    // flex-shrink: 0;
    // height: 0.44rem;
    div{
      font-size: 0.24rem;
      margin-top: 0.12rem;
    }
  }
}
.other-serve{
  .other-wrap{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    // grid-gap: 0.2rem;
    .other-item{
      margin-top: 0.27rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      i{
        font-size: 0.4rem;
      }
      span, a{
        font-size: 0.24rem;
        margin-top: 0.1rem;
      }
      img{
        width: 0.45rem;
	      height: 0.45rem;
      }
    }
  }
}
</style>