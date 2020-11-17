<template>
  <div class="address-wrap">
    <div class="address-card column sb" v-for="(item,i) in addressList" :key="i">
      <div class="top column sb">
        <div class="row ac">
          <span class="name">{{item.name}}</span>
          <span class="phone">{{item.phone}}</span>
        </div>
        <div class="address row ac">
          <i class="iconfont icondizhi"></i>
          <span>{{item.addressName+item.address}}</span>
        </div>
      </div>
      <div class="bottom row sb ac">
        <div class="radio row ac" @click="setDefault(i, item)">
          <i class="iconfont iconxuanzhong" v-show="i==defaultIdx"></i>
          <i class="iconfont iconradiobuttonunselect" v-show="i!=defaultIdx"></i>
          <span style="margin-left:0.14rem">设为默认</span>
        </div>
        <div class="btns row">
          <router-link :to="'/editaddress?id='+item.id" tag="div" class="btn row ac jc edit">编辑</router-link>
          <div class="btn row ac jc" @click="deladdress(item)">删除</div>
        </div>
      </div>
    </div>

    <router-link to="/editaddress" tag="div" :class="{position:positionBtn}" class="add-address-btn row ac jc">添加地址</router-link>

    <empty description="暂无地址" v-if="isEmpty"/>
  </div>
</template>

<script>
import api from '../../api/user'
import { Empty } from 'vant';
export default {
  data(){
    return{
      isEmpty:false,
      defaultIdx:0,
      addressList:[], //地址列表
      positionBtn:true, //是否浮动添加按钮
    }
  },
  methods:{
    async getAddressList(){
      let params = {
          memberId:'1327867697540378625',
          pageSize:999
      }
      let res = await api.getAddressList(params)
      if(res.result.total==0){
        this.isEmpty = true
        return
      }
      this.addressList = res.result.records
      this.defaultIdx = this.addressList.findIndex(v=>v.defaultUse==1)
      if(this.addressList.length>3){
        this.positionBtn = false
      }
    },
    async setDefault(i, value){
      //设置默认地址
      let res = await api.setDefault({id:value.id, memberId:'1327867697540378625'})
      if(res.success){       
        this.defaultIdx = i
      }else{
        this.showToast('设置默认地址失败!', 2000)
      }
    },
    async deladdress(value){
      let res = await api.deleteAddress({ids:value.id})
      if(res.success){
        this.showToast('删除成功!')
        this.getAddressList()
      }
    }
  },
  created(){
    this.getAddressList()
  },
  components:{
    Empty
  }
}
</script>

<style lang="less" scoped>

.address-wrap{
  padding: 0.23rem 0.27rem;
  background-color: #f6f6f6;
  height: 100vh;
  overflow: auto;
  position: relative;
}
.address-card{
  height: 2.12rem;
	background-color: #ffffff;
  border-radius: 0.11rem;
  padding: 0.28rem 0.21rem;
  box-sizing: border-box;
  margin-bottom: 0.23rem;
  .top{
    color: #000000;
    font-size: 0.27rem;
    font-weight: bold;
    .name{
      margin-right: 0.5rem;
    }
    .address{
      font-size: 0.24rem;
      margin-top: 0.14rem;
      font-weight: normal;
    }
    i{
      font-size: 0.24rem;
      margin-right: 0.23rem;
    }
  }
  .btn{
    width: 1.19rem;
    height: 0.45rem;
    border-radius: 0.23rem;
    border: solid 0.01rem #1a1a1a;
    font-size: 0.21rem;
    color: #000000;
  }
  .edit{
    margin-right: 0.23rem;
  }
}
.add-address-btn{
  width: 5.81rem;
	height: 0.56rem;
	background-color: #2ecb62;
  border-radius: 0.28rem;
  margin: 0.23rem auto;
  //left: 50%;
  //bottom: 0.71rem;
  //transform: translateX(-50%);
  font-size: 0.21rem;
  color: #ffffff;
}
.position{
  position: absolute;
  left: 50%;
  bottom: 0.71rem;
  margin: 0;
  transform: translateX(-50%);
}
.radio{
    // margin-right: 0.14rem;
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