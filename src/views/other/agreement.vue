<template>
  <div class="agreement-wrap" v-html="content">

  </div>
</template>

<script>
import api from '../../api/home'
export default {
  data(){
    return{
      content:''
    }
  },
  async created(){
    let {type} = this.$route.query
    let res = await api.getAgreement(type)
    if(!res.success) return this.showToast(res.message)
    this.content = res.result.content
  }
}
</script>

<style lang="less" scoped>
.agreement-wrap{
  padding:0.15rem;
  background-color: #ffffff;
}
</style>