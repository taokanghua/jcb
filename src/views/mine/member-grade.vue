<template>
  <div class="member-grade-wrap">
    <div class="top column ac">
      <img src="../../assets/img/个人中心头像.png" alt="">
      <span class="name">每一个明天</span>
      <span class="value">成长值：343453</span>
    </div>

    <div class="grade-content">
      <div class="range-wrap">
        <div class="top-head row sb ac">
          <div class="row">
            <span>0/100000</span>
            <span>343536/500000</span>
          </div>
          <span>343536/5000000</span>
        </div>
        <div class="range">
          <div class="range-inner"></div>
        </div>
        <div class="v-grade row sb ac">
          <span class="v">V<span class="grade">0</span></span>
          <span class="v">V<span class="grade">1</span></span>
          <span class="v">V<span class="grade">2</span></span>
          <span class="v">V<span class="grade">3</span></span>
          <span class="v">V<span class="grade">4</span></span>
          <span class="v">V<span class="grade">5</span></span>
        </div>
      </div>

      <div class="g-title">什么是会员等级？</div>
      <p>会员等级是金材宝根据成长值对现有用户进行的分级制度；目前分为一级会员、二级会员、三级会员、四级会员和五级会员5个等级，不同等级享有不同的权益。</p>
      <div class="g-title">不同等级有什么权益？</div>
      <p>会员等级与用户成长值直接相关。<br> 不同等级如图所下</p>
      <img src="../../assets/img/会员中心权益.png" alt="">
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.member-grade-wrap{
  height: 100vh;
  overflow: scroll;
  background-color: #ffffff;
}
.top{
  height: 2.71rem;
	background-color: #2ecb62;
  color: #ffffff;
  overflow: hidden;
  img{
    margin-top: 0.62rem;
    width: 0.95rem;
    height: 0.95rem;
    border-radius: 50%;
  }
  .name{
    font-size: 0.21rem;
    margin-top: 0.13rem;
  }
  .value{
    font-size: 0.27rem;
    font-weight: bold;
    line-height: 1;
    margin-top: 0.22rem;
  }
}
.grade-content{
  padding: 0.38rem 0.27rem;
  box-sizing: border-box;
  .range-wrap{
    margin-bottom: 0.6rem;
    .top-head{
      font-size: 0.18rem;
      color: #1a1a1a;
      margin-bottom: 0.14rem;
    }
    .range{
      height: 0.2rem;
      background-color: #f6f6f6;
      border-radius: 0.1rem;
      margin-bottom: 0.17rem;
      .range-inner{
        width: 2.03rem;
        height: 0.2rem;
        background-color: #2ecb62;
        border-radius: 0.1rem;
      }
    }
    .v-grade{
      color: #1a1a1a;
      line-height: 1;
      .v{
        font-size: 0.27rem;
        font-weight: bold;
      }
      .grade{
        font-size: 0.18rem;
      }
    }
  }
  .g-title{
    font-size: 0.27rem;
    margin-bottom: 0.21rem;
    color: #1a1a1a;
    font-weight: bold;
    line-height: 1;
  }
  p{
      margin-bottom: 0.48rem;
      font-size: 0.24rem;
      color: #a8a8a8;
    }
}
</style>