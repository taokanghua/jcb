<template>
  <!-- 评论卡牌 -->
        <div class="comment-card">
          <div class="avatar-wrap row ac">
            <img :src="info.head" alt="">
            <div class="column sb" style="margin-left:0.11rem;height:100%">
              <span class="name">{{info.name}}</span> 
              <span class="time">{{info.time}}</span>
            </div>
          </div>
          <p class="comment-content">{{info.content}}</p>
          <div class="img-wrap row sb">
            <img :src="item" alt="" v-for="(item,i) in info.pics.split(',')" :key="i">
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
    },
    info:{type:Object,default:()=>({pics:''})}
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