<template>
  <div class="address-modify">
    <div class="modify-card">
      <div class="feild row" style="margin-bottom:0">
        <span class="title">联系人</span>
        <div class="column sb">
          <input type="text" placeholder="请输入收货人" v-model="form.name">
          
        </div>
      </div>
      <div class="feild row ">
        <span class="title"></span>
        <div class="row ac">
            <div class="sex-btn" :class="{select:form.sex==1}" @click="form.sex=1">男</div>
            <div class="sex-btn" :class="{select:form.sex==2}" @click="form.sex=2">女</div>           
          </div>
      </div>
      <div class="feild row ac">
        <span class="title">电话</span>
        <input type="phone" placeholder="请输入联系电话" v-model="form.phone">
      </div>
      <div class="feild row ac sb">
        <span class="title">地区</span> 
        <div class="row sb ac" @click="isPop=true">
          <input type="text" v-model="address" disabled>
          <i class="iconfont iconARROW"></i>
        </div>
      </div>
      <div class="feild row mb0 ac">
        <span class="title">门牌号</span>
        <input type="text" placeholder="请输入门牌号" v-model="form.address">
      </div>
    </div>

    <div class="d row ac sb">
      <span class="title" style="font-size:0.24rem">默认地址</span>
      <van-switch v-model="defaultAddress" active-color="#2ecb62" inactive-color="#f6f6f6" size="0.4rem" />
    </div>
    <!-- <router-link to="/address" tag="div" class="confirm-btn">保存地址</router-link> -->
    <div class="confirm-btn" @click="saveAddress" v-if="type=='add'">保存地址</div>
    <div class="confirm-btn" @click="editAddress" v-if="type=='edit'">保存地址</div>
    <!-- 地区popup -->
    <!-- <Popup v-model="areaPop" position="bottom">
      <picker show-toolbar title="选择地区" :columns="columns" @confirm="saveAddress"/>
    </Popup> -->
    <Popup v-model="isPop" position="bottom">
      <van-area
        title="选择地区"
        :area-list="areaList"
        @change="getLocal"
        @confirm="getLocalhost"
        :value="curAreaValue"
      ></van-area>
    </Popup>
  </div>
</template>

<script>
import homeApi from '../../../api/home'
import api from '../../../api/user'
import { Switch as vanSwitch, Popup, Area as vanArea } from 'vant';
export default {
  data(){
    return{
      isPop:false,
      areaList: {
        province_list: {},
        city_list: {},
        county_list: {},
      },
      curAreaValue:null,
      parentId: null,
      allList: [],
      address:'',
      form:{
        address: '',
        //addressLabel: 'string',
        cityCode: 'string', //市
        defaultUse: 0,
        districtCode: 'string', //区
        //latitude: 0,
        //longitude: 0,
        memberId: '',
        name: '',
        phone: '',
        provinceCode: 'string', //省
        sex: 0 //0 未知 1男 2女
      },
      //sex:-1,
      defaultAddress:false,
      type:'add', //判断是添加页面还是修改页面
    }
  },
  methods:{
    valid(){
      //验证输入是否合法
      let result = false
      let phone = /^1[0-9]{10}$/.test(this.form.phone)
      let list = [this.form.name, this.form.sex, phone, this.address, this.form.address]
      result = list.some(v=>!v)
      // console.log(result, list)
      return result 
    },
    async getProvice(num = 0) {
      let res = await homeApi.geographic({ parentId: this.parentId });
      let datas = res.result || [];
      let obj = ["province_list", "city_list", "county_list"];
      let k = obj[num];
      this.allList = [...this.allList, ...datas];
      this.areaList[k] = datas.reduce(
        (pre, { code, name }) => ((pre[code] = name), pre),
        {}
      );
      if (num >= 2) return;
      let next = num + 1;
      let nextK = obj[next];
      let nextKeys = Object.keys(this.areaList[nextK]);

      if (nextKeys.length) {
        let curFirstK = datas[0].code.slice(0, 2);
        let nextFirstK = nextKeys[0].slice(0, 2);
        if (curFirstK == nextFirstK) return;
      }
      this.parentId = datas[0].id;
      this.getProvice(next);
    },
    getLocal(address, value, idx) {
      let id = this.allList.find((item) => item.code == value[idx].code);
      this.parentId = id.id;
      this.getProvice(idx + 1);
      if (idx >= 2) return;
      let code = value[idx].code;

      this.curAreaValue = `${code.slice(0, 2 * (idx + 1))}${Array(2 - idx)
        .fill("01")
        .join("")}`;
    },
    getLocalhost(address) {
      //console.log(address)
      let objs = this.allList.filter((v) =>
        address.map((v) => v.code).includes(v.code)
      );
      this.address = objs.map((v) => v.name).join("/");
      // console.log(address, objs)
      this.form.provinceCode = objs[0].code
      this.form.cityCode = objs[1].code
      this.form.districtCode = objs[2].code
      this.isPop = false;
    },
    async saveAddress(){ //添加
      this.defaultAddress?this.form.defaultUse=1:this.form.defaultUse=0
      if(this.valid()){
        this.showToast('请输入完整的信息！', 2000)
        return
      }
      let res = await api.addAddress(this.form)
      if(res.success){
        this.$router.go(-1)
        return
      }
      this.showToast('添加失败!', 2000)
      //console.log(this.form)
    },
    async editAddress(){ //修改
      this.form.defaultUse = this.defaultAddress?1:0
      if(this.valid()){
        this.showToast('请输入完整的信息！', 2000)
        return
      }
      //console.log(this.form)
      let res = await api.editAddress(this.form)
      if(res.success){
        this.showToast('修改成功！')
        this.$router.go(-1)
      }
    }
  },
  async created(){
    this.getProvice()
    if(this.$route.query.id){
      this.type = 'edit'
      let res = await api.getOneAddress(this.$route.query.id)
      let data = res.result
      this.form =data
      this.defaultAddress = data.defaultUse==1?true:false
      this.address = data.addressName.split(' ').join('/')
    }
    this.form.memberId = this.$store.state.user.info.memberUserInfoVo.id
  },
  components:{
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
      //font-size: 0.24rem;
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
input{
  font-size: 0.24rem;
}
</style>