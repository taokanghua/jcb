<template>
  <div class="information-wrap">
    <div class="top">
      <h4>请填写以下店铺信息</h4>
      <span>请保证如实填写信息</span>
    </div>
    <div class="logo-feild row ac sb">
      <span class="title">店铺LOGO</span>
      <div style="position: relative">
        <div class="add row ac jc">
          <i class="iconfont iconjia" v-if="!form.storeBase.head"></i>
          <img :src="form.storeBase.head" v-else alt="">
        </div>
        <input type="file" class="my-upload" @change="logoUp" />
      </div>
    </div>
    <div class="class-feild row sb ac">
      <span class="title">店铺类型</span>
      <div class="row ac">
        <div class="btn row ac jc" :class="{active:storeTypeIdx==i+1}" v-for="(item,i) in storeType" :key="item.id" @click="storeTypeIdx=i+1">{{item.name}}</div>
      </div>
    </div>
    <div class="desc">
      <span v-show="storeTypeIdx==1">加盟店：{{storeType[storeTypeIdx-1].enterPrice}}元品牌使用费（终身免年费）</span>
      <span v-show="storeTypeIdx==2">集采店：{{storeType[storeTypeIdx-1].enterPrice}}元品牌使用费</span>
    </div>
    <div class="com-wrap column">
      <span class="title">店铺名称</span>
      <input
        type="text"
        placeholder="请输入店铺名称"
        v-model="form.storeBase.name"
      />
    </div>
    <div class="com-wrap column" @click="isPop = true">
      <span class="title">门店地址</span>
      <div style="position: relative">
        <input
          type="text"
          placeholder="请输入门店地址"
          disabled
          v-model="address"
        />
        <i class="iconfont iconARROW address-more"></i>
      </div>
    </div>
    <div class="com-wrap column">
      <span class="title">详细地址</span>
      <input
        type="text"
        placeholder="请输入详细地址"
        v-model="form.storeAddress.address"
      />
    </div>
    <div class="com-wrap column">
      <span class="title">店铺简介</span>
      <textarea
        placeholder="请输入店铺简介"
        v-model="form.storeBase.introduce"
      ></textarea>
    </div>
    <div class="com-wrap column">
      <span class="title">法人姓名</span>
      <input
        type="text"
        placeholder="请输入法人姓名"
        v-model="form.storeAuth.asLegalPerson"
      />
    </div>
    <div class="com-wrap column">
      <span class="title">法人身份证</span>
      <input
        type="text"
        placeholder="请输入法人身份证"
        v-model="form.storeAuth.certificateNo"
      />
    </div>
    <div class="id-card row ac sb">
      <div style="position: relative">
        <img src="../../assets/img/身份证.png" alt="" v-if="!form.storeAuth.certificatePics[0]"/>
        <img :src="form.storeAuth.certificatePics[0]" alt="" v-else>
        <input type="file" class="my-upload" @change="idCardL" />
      </div>
      <div style="position: relative">
        <img src="../../assets/img/身份证反面.png" alt="" v-if="!form.storeAuth.certificatePics[1]"/>
        <img :src="form.storeAuth.certificatePics[1]" alt="" v-else>
        <input type="file" class="my-upload" @change="idCardR" />
      </div>
    </div>
    <div class="com-wrap column">
      <span class="title">营业执照</span>
      <div class="up-img row">
        <div class="img-wrap row">
          <div style="position: relative" v-for="(item,i) in form.storeAuth.businessLicensePic" :key="item">
            <img :src="item" alt=""/>
            <div class="close row ac jc" @click="removeImg('business', i)">
              <i class="iconfont iconguanbi"></i>
            </div>
          </div>
          <Uploader :after-read="afterReadBun" :show-upload="upBtn.bunsiness"></Uploader>
        </div>
      </div>
    </div>
    <div class="com-wrap column">
      <span class="title">门店照片(最多4张)</span>
      <div class="up-img row">
        <div class="img-wrap row">
          <div style="position: relative" v-for="(item,i) in form.storeAuth.detailsPic" :key="item">
            <img :src="item" alt="" />
            <div class="close row ac jc" @click="removeImg('store', i)">
              <i class="iconfont iconguanbi"></i>
            </div>
          </div>
          <Uploader
            :after-read="afterRead"
            :show-upload="upBtn.store"
          ></Uploader>
        </div>
      </div>
    </div>
    <div class="com-wrap column">
      <span class="title">联系人</span>
      <input
        type="text"
        placeholder="请输入联系人"
        v-model="form.storeAddress.name"
      />
    </div>
    <div class="com-wrap column">
      <span class="title">联系电话</span>
      <input
        type="text"
        placeholder="请输入联系电话"
        v-model="form.storeBase.phone"
      />
    </div>
    <div class="com-wrap column">
      <span class="title">验证码</span>
      <div class="row">
        <input type="text" placeholder="请输入验证码" />
        <div class="sendmsg-btn row ac jc">获取验证码</div>
      </div>
    </div>

    <div class="agree row ac">
      <div class="row" @click="form.agree = !form.agree">
        <i class="iconfont iconxuanzhong" v-show="form.agree"></i>
        <i class="iconfont iconradiobuttonunselect" v-show="!form.agree"></i>
      </div>
      <span class="word"
        >我已阅读且同意 <span class="rule">《金材宝商家加盟协议》</span></span
      >
    </div>

    <div class="apply-btn row ac jc" @click="submitForm">提交申请</div>
    <!-- 省市区三级联动 -->
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
import api from "../../api/home";
import {mapState} from 'vuex'
import { Uploader, Popup, Area as vanArea } from "vant";
//import areajs from '../../assets/area'
export default {
  data() {
    return {
      isPop: false,
      allList: [],
      storeType:[{enterPrice:0}],//店铺类型
      storeTypeIdx:1,
      // areaList:areajs,
      areaList: {
        province_list: {},
        city_list: {},
        county_list: {},
      },
      curAreaValue: null,
      address: "",
      form: {
        storeAddress: {
          address: "",
          provinceCode: "", //省
          cityCode: "", //城市
          districtCode: "", //区
          name: "", //联系人
        },
        storeAuth: {
          address: "", //营业制造 s
          asLegalPerson: "", //法人姓名
          businessLicensePic: [], // 营业执照 ----> 要求字符串
          certificateNo: "", // 法人身份证号
          detailsPic: [], //门店详情图, ----> 要求字符串
          certificatePics:[],//身份证照片 ----> 要求字符串
        },
        storeBase: {
          head: "", // logo
          introduce: "", //简洁
          name: "", //点名
          phone: "",
          //level: 0, //0 集采 1加盟
          memberId:''
        },
        // joinType:0, //0 集采  1 加盟
        // agree:false, //同意协议
      },
      parentId: null,
      //上传图片按钮控制:
      upBtn:{
        bunsiness:true,
        store:true
      }
    };
  },
  methods: {
    //处理图片公共方法
    async formateImg(file){
      let formData = new FormData()
      formData.append('file',file)
      let res = await api.upload(formData)
      if(!res.success) return this.showToast('图片上传失败!')
      return res.message
    },
    //检验输入合法性
    valid(){
      this.form.storeBase.memberId = this.memberId
      // let list = this.form.map(v=>Object.values(v))
      let list = []
      Object.values(this.form).map(v=>{list.push(...Object.values(v))})
      console.log(list)
      return list.some(v=>!v) //true 表示不合格
    },
    async getStore(){
      let res = await api.getStoreType()
      if(!res.success)return this.showToast(res.message)
      this.storeType = res.result
    },
    async getProvice(num = 0) {
      let res = await api.geographic({ parentId: this.parentId });
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
      this.form.storeAddress.provinceCode = objs[0].code;
      this.form.storeAddress.cityCode = objs[1].code;
      this.form.storeAddress.districtCode = objs[2].code;
      this.isPop = false;
    },
    async logoUp(files) {//店铺图标上传
      let file = files.target.files[0]
      let url =await this.formateImg(file)
      this.form.storeBase.head = url
    },
    async afterReadBun(file) {//营业执照上传
      let url =await this.formateImg(file.file)
      if(!url) return
      this.form.storeAuth.businessLicensePic.push(url)
    },
    async afterRead(file){
      let url =await this.formateImg(file.file)
      if(!url) return
      this.form.storeAuth.detailsPic.push(url)
    },
    removeImg(type, index){//删除上传图片
      if(type=='business'){
        this.form.storeAuth.businessLicensePic.splice(index, 1)
      }else if(type='store'){
        this.form.storeAuth.detailsPic.splice(index, 1)
      }
    },
    async idCardL(file) {
      //身份证正面
      let url = await this.formateImg(file.target.files[0])
      this.form.storeAuth.certificatePics[0] = url
      this.$forceUpdate()
    },
    async idCardR(file) {
      //身份证反面
      let url =await this.formateImg(file.target.files[0])
      this.form.storeAuth.certificatePics[1] = url
      this.$forceUpdate()
    },
    async submitForm() {
      console.log(this.valid())
      // let res = await api.upgrade(this.form)
      // console.log(res)
      //console.log(this.form);
    },
  },
  watch:{
    'form.storeAuth.businessLicensePic'(n){//监听图片 超过4张隐藏上传按钮
      n.length>=4?this.upBtn.bunsiness = false:this.upBtn.bunsiness=true
    },
    'form.storeAuth.detailPic'(n){
      n.length>=4?this.upBtn.detailsPic = false:this.upBtn.detailsPic=true
    }
  },
  computed:{
    ...mapState({memberId:state=>state.user.info.memberUserInfoVo.id})
  },
  created() {
    this.getProvice();
    this.getStore()
  },
  components: {
    Uploader,
    Popup,
    vanArea,
  },
};
</script>

<style lang="less" scoped>
.information-wrap {
  height: 100vh;
  background-color: #ffffff;
  padding: 0.44rem 0.28rem 0.5rem 0.28rem;
  box-sizing: border-box;
  overflow: auto;
  position: relative;
}
.top {
  h4 {
    font-size: 0.31rem;
    color: #1a1a1a;
  }
  span {
    font-size: 0.21rem;
    color: #a8a8a8;
  }
}
.logo-feild {
  height: 0.81rem;
  .add {
    width: 0.81rem;
    height: 0.81rem;
    border-radius: 50%;
    color: #ffffff;
    background-color: #dddddd;
  }

}
.class-feild {
  margin-top: 0.45rem;
  .btn {
    width: 1.47rem;
    height: 0.56rem;
    background-color: #f6f6f6;
    border-radius: 0.11rem;
    font-size: 0.24rem;
    color: #a8a8a8;
    &:first-child {
      margin-right: 0.23rem;
    }
  }
  .active {
    background-color: #2ecb62;
    color: #ffffff;
  }
}
.desc {
  font-size: 0.18rem;
  color: #a8a8a8;
  text-align: right;
  margin-top: 0.1rem;
}
.com-wrap {
  margin-bottom: 0.3rem;
  .title {
    margin-bottom: 0.15rem;
  }
  input {
    height: 0.73rem;
    background-color: #f6f6f6;
    border-radius: 0.11rem;
    border: none;
    outline: none;
    font-size: 0.23rem;
    color: #a8a8a8;
    padding: 0.25rem 0.23rem;
    box-sizing: border-box;
  }
  textarea {
    height: 1.36rem;
    background-color: #f6f6f6;
    border-radius: 0.11rem;
    padding: 0.25rem 0.23rem;
    box-sizing: border-box;
    font-size: 0.22rem;
    color: #a8a8a8;
    border: none;
  }
}
.id-card {
  margin-bottom: 0.23rem;
  img {
    width: 2.54rem;
    height: 1.69rem;
  }
}
.img-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 0.13rem;
  .choose-box {
    width: 1.36rem;
    height: 1.36rem;
    background-color: #f6f6f6;
    border-radius: 0.06rem;
    i {
      font-size: 0.41rem;
      color: #2ecb62;
    }
  }
  img {
    width: 1.33rem;
    height: 1.33rem;
    border-radius: 0.06rem;
  }
  .close {
    position: absolute;
    right: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 0 0 0 0.2rem;
    i {
      color: #ffffff;
      font-size: 0.15rem;
      font-weight: bold;
    }
  }
}
.title {
  color: #1a1a1a;
  font-size: 0.24rem;
  &::before {
    content: "*";
    color: #fc0808;
  }
}
.sendmsg-btn {
  width: 1.69rem;
  height: 0.73rem;
  background-color: #2ecb62;
  border-radius: 0.11rem;
  margin-left: 0.16rem;
  color: #ffffff;
  font-size: 0.22rem;
  box-sizing: border-box;
}
.agree {
  .iconfont {
    font-size: 0.28rem;
  }
  .iconxuanzhong {
    color: #2ecb62;
  }
  .iconradiobuttonunselect {
    transform: scale(1.4);
    color: #dddddd;
  }
  .word {
    margin-left: 0.16rem;
    font-size: 0.24rem;
    color: #a8a8a8;
    .rule {
      color: #2ecb62;
    }
  }
}
.apply-btn {
  width: 5.81rem;
  height: 0.56rem;
  background-color: #2ecb62;
  border-radius: 0.28rem;
  font-size: 0.21rem;
  color: #ffffff;
  // position: absolute;
  margin-left: 50%;
  margin-top: 1rem;
  // bottom: 0.26rem;
  transform: translateX(-50%);
}
.address-more {
  position: absolute;
  right: 0.16rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.16rem;
  color: #a8a8a8;
}
/deep/.van-uploader__upload {
  margin: 0;
  width: 1.33rem;
  height: 1.33rem;
}

.my-upload {
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>