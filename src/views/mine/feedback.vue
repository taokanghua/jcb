<template>
  <div class="feedback-wrap column">
    <span class="title">问题内容描述</span>
    <textarea name="" id="" cols="30" rows="10" v-model="content"></textarea>
    
    <span class="title">上传图片</span>
    <div class="img-wrap row">
      <div style="position:relative" v-for="(item,i) in imgs" :key="item">
        <img :src="item" alt="">
        <div class="close row ac jc" @click="remove(i)"><i class="iconfont iconguanbi"></i></div>
      </div>
      <Uploader :after-read="afterRead" :show-upload="upbtn"></Uploader>
    </div>

    <span class="title">联系电话</span>
    <input type="phone" placeholder="请输入联系电话" class="contact" v-model="phone">

    <div class="submit-btn row ac jc" @click="submit">提交</div>
  </div>
</template>

<script>
import { Uploader } from 'vant';
import homeApi from '../../api/home'
import api from '../../api/user'
export default {
  data(){
    return{
      upbtn:true,
      imgs:[],
      content:'',
      phone:'',
    }
  },
  methods:{
    async afterRead(file){
      let formData = new FormData()
      formData.append('file', file.file)
      let res = await homeApi.upload(formData)
      if(!res.success) return this.showToast('图片上传失败！')
      this.imgs.push(res.message)
    },
    remove(i){
      this.imgs.splice(i, 1)
    },
    async submit(){
      if(this.content.length<3) return this.showToast('请输入内容')
      let phone = /^1[0-9]{10}$/.test(this.phone)
      if(!phone) return this.showToast('手机号格式错误')
      //提交
      let data = {
        content: this.content,
        phone: this.phone,
        pic: this.imgs.join(',')
      }
      let res = await api.feedbackApi(data)
      if(res.success){
        this.showToast(res.message)
        this.$router.replace({path:'/mine'})
      }else{
        this.showToast(res.message)
      }
    }
  },
  watch:{
    imgs(n){
      n.length>=4?this.upbtn=false:this.upbtn=true
    }
  },
  components:{
    Uploader
  }
}
</script>

<style lang="less" scoped>
.feedback-wrap{
  height: 100vh;
  background-color: #ffffff;
  padding: 0 0.27rem;
  box-sizing: border-box;
  overflow: scroll;
  position: relative;
}
.title{
  font-size: 0.24rem;
  color: #000000;
  margin: 0.25rem 0 0.22rem 0;
}
textarea{
  height: 2.26rem;
	background-color: #f6f6f6;
  border-radius: 0.11rem;
  padding: 0.15rem;
  box-sizing: border-box;
  font-size: 0.24rem;
  color: #a8a8a8;
  border: none;
  outline: none;
}
.img-wrap{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 0.13rem;
  .choose-box{
    width: 1.36rem;
    height: 1.36rem;
    background-color: #f6f6f6;
    border-radius: 0.06rem;
    i{
      font-size: 0.41rem;
      color: #2ecb62;
    }
  }
  img{
      width: 1.36rem;
      height: 1.36rem;
      border-radius: 0.06rem;
    }
  .close{
    position: absolute;
    right: 0;
    top: 0;
    background: rgba(0, 0, 0, .5);
    border-radius: 0 0 0 0.2rem;
    i{
      color: #ffffff;
      font-size: 0.15rem;
      font-weight: bold;
    }
  } 
}
.contact{
  height: 0.75rem;
	background-color: #f6f6f6;
  border-radius: 0.11rem;
  padding-left: 0.18rem;
  box-sizing: border-box;
  font-size: 0.24rem;
  color: #a8a8a8;
}
.submit-btn{
  width: 5.81rem;
	height: 0.56rem;
	background-color: #2ecb62;
  border-radius: 0.28rem;
  position: absolute;
  left: 50%;
  bottom: 0.7rem;
  transform: translateX(-50%);
  font-size: 0.21rem;
  color: #ffffff;
}

/deep/.van-uploader__upload{
  margin: 0;
}
</style>