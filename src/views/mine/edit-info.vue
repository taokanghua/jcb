<template>
  <div class="edit-info-wrap">
    <div class="info-card">
      <div class="feild row ac sb">
        <span class="title">用户名</span>
        <input type="text" placeholder="用户名" v-model="info.nickname" style="font-size:0.24rem;text-align:right" disabled>
      </div>
      <!-- <div class="feild row" style="margin-top:-0.15rem;margin-bottom:0.36rem">
         <div class="row" style="margin-left:0.9rem">
            <div class="sex-btn" :class="{select:sex==0}" @click="sex=0">男</div>
            <div class="sex-btn" :class="{select:sex==1}" @click="sex=1">女</div>           
          </div>
      </div> -->
      <!-- 暂时不要 -->
      <!-- <div class="feild mb0 row ac sb" @click="isPop=true">
        <span class="title">生日</span>
        <div class="row ac sb">
          <input type="text" v-model="birthday" disabled>
          <i class="iconfont iconARROW"></i>
        </div>
      </div> -->
      <div class="feild row ac sb">
        <span class="title">手机号</span>
        <span>{{info.phone}}</span>
      </div>
    </div>

      <!-- 没啥可修改的 就不要了 -->
      <!-- <div class="save-btn row ac jc">保存</div> -->
      <div class="save-btn row ac jc login-out" @click="loginOut">退出登录</div>
      <div class="save-btn row ac jc" @click="$router.go(-1)">返回</div>

      <!-- 时间pop -->
      <popup v-model="isPop" position="bottom">
        <datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="selectTime"
        />
      </popup>
  </div>
</template>

<script>
import { Popup, DatetimePicker } from 'vant'
import tokenHolder from '../../utils/tokenHolder'
export default {
  data(){
    return{
      sex:0,
      birthday:'',
      //上面都暂时割掉了 :)
      info:{},

      isPop:false,
      currentDate: new Date(2000,0,1),
      minDate: new Date(1950,0,1),
      maxDate: new Date(),
    }
  },
  methods:{
    selectTime(value){
      let d = new Date(value)
      let year = d.getFullYear()
      let month = d.getMonth() + 1
      let day = d.getDate()
      this.birthday = `${year}-${month.toString().padStart(2,0)}-${day.toString().padStart(2,0)}`
      this.isPop= false
    },
    loginOut(){
      tokenHolder.remove()
      this.$store.state.user.info = {}
      this.$router.replace({path:'/login'})
    }
  },

  created(){
    this.info = this.$store.state.user.info.memberUserInfoVo
  },
  components:{
    Popup,
    DatetimePicker
  }
}
</script>

<style lang="less" scoped>
.edit-info-wrap{
  height: 100vh;
  background-color: #f6f6f6;
  overflow: scroll;
  padding: 0.23rem 0.27rem;
  position: relative;
}

.info-card{
  background-color: #ffffff;
  padding: 0.22rem;
  border-radius: 0.11rem;
}
.feild{
    margin-bottom: .36rem;
    input{
      background-color: #ffffff;
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
        font-size: 0.24rem;
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
  &.feild:last-child{
    margin-bottom: 0;
  }
  .mb0{
    margin-bottom: 0;
  }
.save-btn{
  width: 5.81rem;
	height: 0.56rem;
	background-color: #2ecb62;
  border-radius: 0.28rem;
  position: absolute;
  left: 50%;
  bottom: 2.2rem;
  transform: translateX(-50%);
  font-size: 0.21rem;
  color: #ffffff;
}
.login-out{
  bottom: 1.5rem;
  background-color: #f6f6f6;
  // border: 0.02rem solid #dddddd;
  box-sizing: border-box;
  color: #a8a8a8;
}
</style>