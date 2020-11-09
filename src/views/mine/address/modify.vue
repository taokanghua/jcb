<template>
  <div class="address-modify">
    <div class="modify-card">
      <div class="feild row">
        <span class="title">联系人</span>
        <div class="column sb">
          <input type="text" placeholder="请输入收货人">
          <div class="row ac">
            <div class="sex-btn" :class="{select:sex==0}" @click="sex=0">男</div>
            <div class="sex-btn" :class="{select:sex==1}" @click="sex=1">女</div>           
          </div>
        </div>
      </div>
      <div class="feild row">
        <span class="title">电话</span>
        <input type="phone" placeholder="请输入联系电话">
      </div>
      <div class="feild row ac sb">
        <span class="title">地区</span>
        <div class="row sb ac" @click="areaPop=true">
          <input type="text" v-model="area" disabled>
          <i class="iconfont iconARROW"></i>
        </div>
      </div>
      <div class="feild row mb0">
        <span class="title">门牌号</span>
        <input type="text" placeholder="请输入门牌号">
      </div>
    </div>

    <div class="d row ac sb">
      <span class="title">默认地址</span>
      <van-switch v-model="defaultAddress" active-color="#2ecb62" inactive-color="#f6f6f6" size="0.4rem" />
    </div>
    <router-link to="/address" tag="div" class="confirm-btn">保存地址</router-link>

    <!-- 地区popup -->
    <Popup v-model="areaPop" position="bottom">
      <!-- <van-area title="选择地区"></van-area> -->
      <picker show-toolbar title="选择地区" :columns="columns" @confirm="saveAddress"/>
    </Popup>
  </div>
</template>

<script>
import { Picker, Switch as vanSwitch, Popup, Area as vanArea } from 'vant';
export default {
  data(){
    return{
      areaPop:false,

      sex:-1,
      area:'',
      defaultAddress:false,

      columns: [
        {
          text: '浙江',
          children: [
            {
              text: '杭州',
              children: [{ text: '西湖区' }, { text: '余杭区' }],
            },
            {
              text: '温州',
              children: [{ text: '鹿城区' }, { text: '瓯海区' }],
            },
          ],
        },
        {
          text: '福建',
          children: [
            {
              text: '福州',
              children: [{ text: '鼓楼区' }, { text: '台江区' }],
            },
            {
              text: '厦门',
              children: [{ text: '思明区' }, { text: '海沧区' }],
            },
          ],
        },
      ],
    }
  },
  methods:{
    saveAddress(value){
      // console.log(value)
      this.area = value.join(' ')
      this.areaPop = false
    }
  },
  components:{
    Picker,
    vanSwitch,
    Popup,
    vanArea
  }
}
</script>

<style lang="less" scoped>
.address-modify{
  height: 100vh;
  background-color: #f6f6f6;
  overflow: scroll;
  padding: 0.23rem 0.27rem;
  position: relative;
}
.modify-card{
  background-color: #ffffff;
  border-radius: 0.11rem;
  padding: 0.23rem 0.22rem;
  margin-bottom: 0.23rem;
  box-sizing: border-box;
  .feild{
    margin-bottom: .36rem;
    input{
      background-color: #ffffff;
    }
    .title{
      width: 1rem;
      font-size: 0.24rem;
      color: #1a1a1a;
    }
    &>div{
      flex: 1;
      .sex-btn{
        width: 1.02rem;
        height: 0.41rem;
        background-color: #f6f6f6;
        font-size: 0.21rem;
        color: #a8a8a8;
        margin-right: 0.23rem;
        margin-top: 0.23rem;
        text-align: center;
        line-height: 0.41rem;
      }
      .select{
        background-color: #2ecb62;
        color: #ffffff;
      }
    }
  }
  .mb0{
    margin-bottom: 0;
  }
}
.d{
  background-color: #ffffff;
  height: 0.75rem;
	background-color: #ffffff;
  border-radius: 0.11rem;
  padding: 0 0.11rem 0 0.22rem;
}
.confirm-btn{
  width: 5.81rem;
	height: 0.56rem;
	background-color: #2ecb62;
  border-radius: 0.28rem;
  position: absolute;
  left: 50%;
  bottom: 0.71rem;
  transform: translateX(-50%);
  font-size: 0.21rem;
  color: #ffffff;
  text-align: center;
  line-height: 0.56rem;
}
</style>