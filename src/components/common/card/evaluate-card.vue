<template>
  <!-- 评论卡牌 -->
        <div class="comment-card">
          <div class="avatar-wrap row ac">
            <img src="../../../assets/img/会员中心头像.png" alt="">
            <div class="column sb" style="margin-left:0.11rem;height:100%">
              <span class="name">我也不懂啊</span> 
              <span class="time">2020-09-09</span>
            </div>
          </div>
          <p class="comment-content">我也不知道写什么，我只是占个位的，看下排版，看下效果，好让别人知道怎么排</p>
          <div class="img-wrap row sb">
            <img src="../../../assets/img/商品详情-评价图片.png" alt="" v-for="item in 4" :key="item">
          </div>
          <div class="footer row ac" v-if="hasBar">
            <div><i class="iconfont icondianzan"></i> <span>533</span></div>
            <div><i class="iconfont iconliaotian"></i> <span>20</span></div>
          </div>
        </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  props:{
    hasBar: {
      //是否有下面的👍 评论栏
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less" scoped>
.comment-card{
    border-radius: 0.11rem;
    // padding: 0.22rem 0.16rem;
    .avatar-wrap{
      img{
        width: 0.55rem;
        height: 0.55rem;
        border-radius: 50%;
        
      }
      .name{
        font-size: 0.21rem;
        color: #1a1a1a;
      }
      .time{
        color: #a8a8a8;
        font-size: 0.18rem;
      }
    }
    .comment-content{
      font-size: 0.21rem;
      color: #1a1a1a;
      margin: 0.19rem 0 0.19rem 0;
    }
    .img-wrap{
      margin-bottom: 0.2rem;
      img{
        width: 1.17rem;
        height: 1.36rem;
        border-radius: 0.06rem;
      }
    }
    .footer{
      justify-content: flex-end;
      color: #a8a8a8;
      &>div{
        // margin-top: 0.2rem;
        span{
          font-size: 0.21rem;
          // color: #1a1a1a;
          line-height: 1;
          margin-left: 0.08rem;
        }
      }
      i{
        
        font-size: 0.2rem;
        margin-left: 0.4rem;
        
      }
    }
  }
</style>