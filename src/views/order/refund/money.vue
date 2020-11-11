<template>
  <div class="money-goods-wrap">
    <div class="ptitle">申请原因</div>
    <div class="reason" @click="reasonPop=true">
      <input type="text" placeholder="请选择退货原因" disabled>
      <i class="iconfont iconARROW"></i>
    </div>
    <div class="ptitle">问题内容描述</div>
    <textarea placeholder="请输入您的内容"></textarea>
    <div class="ptitle">上传图片(最多四张)</div>
    <div class="img-wrap row">
      <!-- <div class="choose-box row jc ac"> <i class="iconfont icontianjia"></i></div> -->
      <div style="position:relative" v-for="item in 5" :key="item">
        <img src="https://img.yzcdn.cn/vant/sand.jpg" alt="">
        <div class="close row ac jc"><i class="iconfont iconguanbi"></i></div>
      </div>
      <Uploader :after-read="afterRead" multiple :show-upload="true"></Uploader>
    </div>
    <div class="btn row jc ac">提交</div>


    <!-- popup -->
    <action-sheet v-model="reasonPop" title="申请原因">
      <div class="way-content">
        <div class="way-feild row ac sb" v-for="(item,i) in reasonList" :key="i" @click="reasonIdx=i">
          <span class="title">{{item}}</span>
          <div class="row ac">
            <i class="iconfont iconxuanzhong" v-if="reasonIdx==i"></i>
            <i class="iconfont iconradiobuttonunselect" v-else></i>
          </div>
        </div>
        <div class="confirm-btn row ac jc position" @click="reasonPop=false">确定</div>
      </div>
    </action-sheet>
  </div>
</template>

<script>
import { Uploader, ActionSheet } from 'vant';
export default {
  data(){
    return{
      reasonPop:false,
      reasonIdx:4,
      reasonList:['不喜欢，效果不好', '多拍、错拍、不想要', '货物与描述不对', '质量问题', '其他原因']
    }
  },
  methods:{
    afterRead(file){
      console.log(file)
    }
  },
  components:{
    Uploader,
    ActionSheet
  }
}
</script>

<style lang="less" scoped>
.money-goods-wrap{
  height: 100vh;
  background-color: #ffffff;
  overflow: scroll;
  padding: 0 0.27rem;
  box-sizing: border-box;
  position: relative;
}
.ptitle{
  color: #000000;
  font-size: 0.24rem;
  margin-top: 0.45rem;
  margin-bottom: 0.22rem;
}
.reason{
  position: relative;
  input{
    height: 0.75rem;
    background-color: #f6f6f6;
    border-radius: 0.11rem;
    border: none;
    outline: none;
    font-size: 0.23rem;
    color: #a8a8a8;
    padding-left: 0.17rem;
    box-sizing: border-box;
  }
  i{
    position: absolute;
    right: 0.17rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.18rem;
  }
}
textarea{
  height: 2.26rem;
	background-color: #f6f6f6;
  border-radius: 0.11rem;
  padding: 0.15rem;
  box-sizing: border-box;
  font-size: 0.24rem;
  color: #a8a8a8;
  width: 100%;
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
.btn{
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

.way-content{
  padding: 0 0.27rem;
  height: 5.64rem;
  box-sizing: border-box;
  position: relative;
  .way-feild{
    margin-bottom: 0.38rem;
    // line-height: 1;
    .title{
      font-size: 0.21rem;
      color: #1a1a1a;
    }
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
}
.confirm-btn{
  width: 5.81rem;
	height: 0.56rem;
	background-color: #5ecc26;
  border-radius: 0.28rem;
  // position: absolute;
  bottom: 0.25rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.21rem;
  color: #ffffff;
}
.position{
  position: absolute;
}
/deep/.van-uploader__upload{
  margin: 0;
}
</style>