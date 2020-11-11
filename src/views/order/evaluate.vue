<template>
  <div class="evaluate-wrap">
    <div class="tags-wrap row ac">
      <div 
      class="tag row jc ac" 
      :class="{active:tagIdx==i}" 
      v-for="(item, i) in tags" 
      :key="i"
      @click="tagIdx=i">
        {{item}}
      </div>
    </div>

    <textarea placeholder="请输入您的内容"></textarea>
    <div class="anonymous row ac" @click="anonymous=!anonymous">
      <i class="iconfont iconxuanzhong" v-show="anonymous"></i>
      <div class="no" v-show="!anonymous"></div>
      <span>匿名发表</span>
    </div>
    <span class="title">上传照片</span>
    <div class="img-wrap row">
      <Uploader :after-read="afterRead" multiple></Uploader>
      <!-- <div class="choose-box row jc ac"> <i class="iconfont icontianjia"></i></div> -->
      <div style="position:relative" v-for="item in 4" :key="item">
        <img src="https://img.yzcdn.cn/vant/sand.jpg" alt="">
        <div class="close row ac jc"><i class="iconfont iconguanbi"></i></div>
      </div>
    </div>
    <!-- 评分 -->
    <div class="rate-wrap">
      <div class="line row ac">
        <span class="t">店铺评分</span>
        <rate v-model="shop" size="0.25rem" color="#ffd21e" void-icon="star" void-color="#eee"></rate>
      </div>
      <div class="line row ac">
        <span class="t">服务评分</span>
        <rate v-model="shop" size="0.25rem" color="#ffd21e" void-icon="star" void-color="#eee"></rate>
      </div>
      <div class="line row ac">
        <span class="t">配送评分</span>
        <rate v-model="shop" size="0.25rem" color="#ffd21e" void-icon="star" void-color="#eee"></rate>
      </div>
    </div>

    <div class="submit-btn row ac jc">提交</div>
  </div>
</template>

<script>
import { Uploader, Rate } from 'vant';
export default {
  data(){
    return{
      tagIdx:0,
      tags:['好评', '中评', '差评'],
      anonymous:false,
      shop:5
    }
  },
  methods:{
    afterRead(file){
      console.log(file)
    }
  },
  components:{
    Uploader,
    Rate
  }
}
</script>

<style lang="less" scoped>
.evaluate-wrap{
  height: 100vh;
  background-color: #ffffff;
  padding: 0.2rem 0.27rem 1.47rem 0.27rem;
  overflow: scroll;
  box-sizing: border-box;
  position: relative;
}
.tags-wrap{
  height: 0.75rem;
  margin-bottom: 0.23rem;
  .tag{
    width: 1.02rem;
    height: 0.51rem;
    margin-right: 0.17rem;
    background-color: #dddddd;
    border-radius: 0.25rem;
    font-size: 0.21rem;
  }
  .active{
    background-color: #e1fdd2;
    color: #2ecb62;
  }
}
textarea{
  width: 100%;
	height: 2.26rem;
	background-color: #f6f6f6;
  border-radius: 0.11rem;
  border: none;
  padding: 0.15rem;
  box-sizing: border-box;
  font-size: 0.24rem;
  color: #a8a8a8;
  margin-bottom: 0.23rem;
}
.anonymous{
  line-height: 1;
  margin-bottom: 0.5rem;
  .iconxuanzhong{
    font-size: 0.28rem;
    color: #2ecb62;
  }
  .no{
    width: 0.22rem;
    height: 0.22rem;
    border-radius: 50%;
    border: 0.01rem solid #cccccc;
  }
  span{
    margin-left: 0.17rem;
  }
}
.title{
  font-size: 0.24rem;
  color: #000000;
}
.img-wrap{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 0.13rem;
  margin-top: 0.22rem;
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
.rate-wrap{
  margin-top: 0.6rem;
  .line{
    margin-bottom: 0.2rem;
    .t{
      font-size: 0.24rem;
      color: #000000;
      margin-right: 0.34rem;
    }
  }
}
.submit-btn{
  width: 5.81rem;
	height: 0.56rem;
	background-color: #2ecb62;
  border-radius: 0.28rem;
  font-size: 0.21rem;
  color: #ffffff;
  position: absolute;
  left: 50%;
  bottom: 0.5rem;
  transform: translateX(-50%);
}

/deep/.van-uploader__upload{
  margin: 0;
}
</style>