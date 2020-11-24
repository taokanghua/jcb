<template>
  <list 
    loading-text="加载中..." 
    finished-text="我也是有底线的" 
    :finished="finished" 
    offset="400"
    @load="getmore">
    <slot></slot>
  </list>
</template>

<script>
import {List} from 'vant'
export default {
  data(){
    return{
      finished:false,//是否加载完成
    }
  },
  methods:{
    getmore(){
      this.$emit('reachBottom')
      console.log('end')
    }
  },
  components:{
    List
  }
}
</script>

<style>

</style>