<template>
  <list 
    v-model="isLoad"
    style="min-height:100vh"
    finished-text="暂无更多商品" 
    :finished="finished" 
    offset="20"
    @load="getmore">
    <slot></slot>
    <!-- <div class="row ac jc load" :style="{position:finished?'fixed':''}">
      <loading size="24px" v-if="isLoad">加载中...</loading>
    </div> -->
  </list>
</template>

<script>
import {List, Loading} from 'vant'
let pageNo = 0
export default {
  data(){
    return{
      isLoad:false,
      timer:null,
      finished:false,//是否加载完成
    }
  },
  props:{
    params:{
      //  传入参数
      type: Object,
      default: () => ({})
    },
    req:{
      //api
      type: Function
    }
  },
  methods:{
    getmore(clear=false){
      this.isLoad = true
      // console.log(this.timer)
      // if(!this.timer){
        this.timer = setTimeout(async ()=>{
          clearTimeout(this.timer)
          // this.timer = null
          let params = {
            pageNo: pageNo += 1,
            pageSize: 10,
            ...this.params
          }
          let res = await this.req(params)
          // console.log(res)
          this.isLoad = false
          params.pageNo ++
          if(res.result==null) return this.finished=true
          if(res.result.total==0){
            this.finished = false
          }else{
            if(!res.result||res.result.pageNo == res.result.totalPage) this.finished = true
          }
          // this.timer =null
          this.$emit('reachBottom', res.result, clear)
          }, 500)
      // }
      
    },
    refresh(){
      //重置页码
      pageNo = 0
      this.getmore(true)
      // console.log('refresh')
    }
  },
  mounted(){
    
    pageNo = 0
    this.getmore()
  },
  activated(){
    if(this.$route.query.id){
      this.params.brandId = this.$route.query.id
      this.refresh()
    }
  },
  components:{
    List,
    Loading
  }
}
</script>

<style lang="less" scoped>
.load{
  width: 100%;
  height: 40px;
  margin-left: 50%;
  // position: fixed;
  // bottom: 0;
  // left: 50%;
  transform: translateX(-50%);
}
/deep/.van-list{
  position: relative;
}
/deep/.van-list__finished-text{
  font-size: 12px;

}
</style>