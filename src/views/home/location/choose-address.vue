<template>
  <div class="choose-address-wrap">
    <div class="top">
      <div class="p-wrap">
        <input type="search" placeholder="请输入街道名称">
        <!-- 暂时禁用 -->
        <!-- <router-link to="/chooseCity" tag="div" class="provi row ac">
          <span>{{local.addressComponent.city}}</span>
          <i class="iconfont iconARROW"></i> 
        </router-link>-->
        <div class="provi row ac">
          <span>{{local.addressComponent.city||''}}</span>
          <i class="iconfont iconARROW"></i> 
        </div>
      </div>
    </div>
    <!-- 定位 -->
    <div class="now-local com column sb">
      <span class="title">当前定位</span>
      <div class="row sb ac">
        <span class="now">{{local.formattedAddress}}</span>
        <span class="reflesh" @click="getLocal" v-if="!add_load">重新定位</span>
        <Loading color="#1989fa" v-else size="0.21rem">定位中...</Loading>
      </div>
    </div>

    <!-- 收货地址 -->
    <div class="address-wrap com">
      <span class="title">收货地址</span>
      <div class="address-item" v-for="item in addressList" :key="item.id">
        <span class="address">{{item.addressName.replace(/\s/g,'')}}{{item.address}}</span>
        <div class="row ac info">
          <span class="name">{{item.name}}</span>
          <span>{{item.phone}}</span>
        </div>
      </div>
    </div>
    <router-link to="/editaddress" tag="div" class="add-btn" :class="{position}">添加地址</router-link>
  </div>
</template>

<script>
import userApi from '../../../api/user'
import {Dialog, Loading} from 'vant'
export default {
  data(){
    return{
      addressList:[],
      local:{addressComponent:{}},
      add_load:false, //重新定位 加载动画
    }
  },
  methods:{
   async getAddress(){
     let id = this.$store.state.user.info.memberUserInfoVo.id || ''
      if(!id) return
      let res = await userApi.getAddressList({memberId:id, pageSize:999})
      this.addressList = res.result.records
    },
    async getLocal(){
      this.add_load = true
      let _this = this
      let mapObj = new AMap.Map('map');
      mapObj.plugin('AMap.Geolocation', function () {
    let geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    });
    mapObj.addControl(geolocation);
    geolocation.getCurrentPosition();
    AMap.event.addListener(geolocation, 'complete', function(e){
      _this.local = e
      // _this.$forceUpdate()
      _this.$store.state.local = e
      _this.add_load = false
    });//返回定位信息
    AMap.event.addListener(geolocation, 'error', function(err){
      console.log('error')
      console.log(err)
      _this.local = err
      _this.add_load = false
      this.showToast('定位失败')
      Dialog.alert({
        message:'定位失败！'
      })
    });      //返回定位出错信息
});
    }
  },
  computed:{
    position(){
      return this.addressList.length<=6
    }
  },
  components:{
    Loading
  },
  created(){
    this.local = this.$store.state.local||{}
    this.getAddress()
  }
}
</script>

<style lang="less" scoped>
.choose-address-wrap{
  height: 100vh;
  background-color: #f6f6f6;
  overflow: scroll;
  padding-bottom: 1.3rem;
  box-sizing: border-box;
  position: relative;
}
.top{
    padding: 0.12rem 0.27rem 0.12rem 0.27rem;
    background-color: #ffffff;
    
    input{
      height: 0.51rem;
      background-color: #f6f6f6;
      border-radius: 0.25rem;
      font-size: 0.18rem;
      color: #bbbbbb;
      padding-left: 1.26rem;
    }
    .p-wrap{
      position: relative;
      .provi{
        position: absolute;
        left: 0.16rem;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.18rem;
        color: #1a1a1a;
        font-weight: bold;
        line-height: 1;
        padding-right: 0.05rem;
        border-right: 1px solid #a8a8a8;
        i{
          font-size: 0.1rem;
          transform: rotate(90deg);
          margin-left: 0.05rem;
        }
      }
    }
  }
.now-local{
  padding: 0.23rem 0.27rem;
  background-color: #ffffff;
  margin-bottom: 0.23rem;
  .title{
    font-size: 0.2rem;
    color: #a8a8a8;
  }
  &>div{
    margin-top: 0.23rem;
    .now{
      font-size: 0.24rem;
      font-weight: bold;
      color: #1a1a1a;
    }
    .reflesh{
      font-size: 0.21rem;
      color: #2ecb62;
    }
  }
}
.add-btn{
  width: 5.81rem;
	height: 0.56rem;
	background-color: #2ecb62;
  border-radius: 0.28rem;
  // position: absolute;
  left: 50%;
  bottom: 0.7rem;
  transform: translateX(-50%);
  font-size: 0.21rem;
  color: #ffffff;
  line-height: 0.56rem;
  text-align: center;
}
.position{
  position: absolute;
}
.com{
  padding: 0.23rem 0.27rem;
  background-color: #ffffff;
  .title{
    font-size: 0.2rem;
    color: #a8a8a8;
  }
  .address-item{
    padding: 0.23rem 0;
    border-bottom: 1px solid #dddddd;
    color: #1a1a1a;
    .address{
      font-size: 0.24rem;
      font-weight:500;
    }
    .info{
      margin-top: 0.16rem;
      font-size: 0.21rem;
      .name{
        margin-right: 0.4rem;
      }
    }
  }
}
/deep/.van-loading__text{
  font-size: 0.21rem;
  color: #8d8d8d;
}
</style>