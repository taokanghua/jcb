<template>
  <div @click="clickHandle">
    <i class="iconfont iconxuanzhong" v-show="value"></i>
    <i class="iconfont iconcircle" v-show="!value"></i>
  </div>
</template>

<script>
export default {
  data(){
    return{
      checked: false
    }
  },
  props:['value'],
  methods:{
    clickHandle(){
      this.checked = !this.checked
      this.$emit('input', this.checked)
    }
  },
}
</script>

<style lang="less" scoped>
i{
  font-size: 0.32rem!important;
  color: #dddddd;
}
.iconxuanzhong{
  color: #2ecb62;
}
</style>