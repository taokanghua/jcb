<template>
  <div class="feedback-wrap column">
    <span class="title">问题内容描述</span>
    <textarea name="" id="" cols="30" rows="10"></textarea>
    
    <span class="title">上传图片</span>
    <div class="img-wrap row">
      <Uploader :after-read="afterRead" multiple></Uploader>
      <!-- <div class="choose-box row jc ac"> <i class="iconfont icontianjia"></i></div> -->
      <div style="position:relative" v-for="item in 6" :key="item">
        <img src="https://img.yzcdn.cn/vant/sand.jpg" alt="">
        <div class="close row ac jc"><i class="iconfont iconguanbi"></i></div>
      </div>
    </div>

    <span class="title">联系电话</span>
    <input type="phone" placeholder="请输入联系电话" class="contact">

    <div class="submit-btn row ac jc">提交</div>
  </div>
</template>

<script>
import { Uploader } from 'vant';
export default {
  data(){
    return{
      // fileList:[{url:'https://img.yzcdn.cn/vant/leaf.jpg'}]
    }
  },
  methods:{
    afterRead(file){
      console.log(file)
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