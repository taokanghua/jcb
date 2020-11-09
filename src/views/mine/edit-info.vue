<template>
  <div class="edit-info-wrap">
    <div class="info-card">
      <div class="feild row">
        <span class="title">联系人</span>
        <div class="column sb">
          <input type="text" placeholder="用户名">
          <div class="row ac">
            <div class="sex-btn" :class="{select:sex==0}" @click="sex=0">男</div>
            <div class="sex-btn" :class="{select:sex==1}" @click="sex=1">女</div>           
          </div>
        </div>
      </div>
      <div class="feild mb0 row ac sb" @click="isPop=true">
        <span class="title">生日</span>
        <div class="row ac sb">
          <input type="text" v-model="birthday" disabled>
          <i class="iconfont iconARROW"></i>
        </div>
      </div>
    </div>

      <div class="save-btn row ac jc">保存</div>

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
export default {
  data(){
    return{
      sex:0,
      birthday:'',

      isPop:false,
      currentDate: new Date(2000,0,1),
      minDate: new Date(1950,0,1),
      maxDate: new Date()
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
    }
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
.save-btn{
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
</style>