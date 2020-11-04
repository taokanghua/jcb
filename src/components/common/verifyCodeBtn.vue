<template>
  <div v-if="isGettingCode" class="verify-btn disabled"><span>{{mCounter}}</span>秒后重试</div>
  <div v-else class="verify-btn" @click="()=>{$emit('click')}">验证码</div>
</template>
<script>
export default {
  props:{counter:{type:Number,default:60},isGettingCode:{type:Boolean}},
  data(){
      return {
          countDownId:null,
          mCounter:0,
      }
  },
created(){
    this.mCounter=this.counter
},
  watch: {
    isGettingCode(n) {
      if (n) {
        this.countDownId = setInterval(() => {
          if (this.mCounter == 0) {
            clearInterval(this.countDownId);
            this.$emit('counterEnd')
            this.countDownId = null;
            this.mCounter = this.counter;
            return;
          }
          this.mCounter--;
        }, 1000);
      } else if (this.countDownId != null) {
        clearInterval(this.countDownId);
        this.countDownId = null;
        this.mCounter = this.counter;
      }
    }
  }
};
</script>
