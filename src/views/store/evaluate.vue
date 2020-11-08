<template>
  <div class="evaluate-wrap">
    <!-- 印象标签 -->
    <div class="tags-wrap row ac">
      <div class="tag" :class="{seleted:i==tagIdx}" v-for="(item,i) in list" :key="i" @click="changeTag(i)">{{item}}</div>
    </div>

    <!-- 评论卡牌 -->
    <div class="card-wrap" v-for="item in 3" :key="item">
      <evaluate-card ></evaluate-card>
    </div>
  </div>
</template>

<script>
import evaluateCard from '../../components/common/card/evaluate-card'
export default {
  data(){
    return{
      list:['好评(123)', '中评(55)', '差评(12)'],
      tagIdx:-1,
    }
  },
  methods:{
    changeTag(i){ //切换印象标签
      if(this.tagIdx == i){
        this.tagIdx = -1
        return
      }
      this.tagIdx = i
    }
  },
  components:{
    evaluateCard
  }
}
</script>

<style lang="less" scoped>
.evaluate-wrap{
  height: 100vh;
  background-color: #f6f6f6;
  overflow: scroll;
  padding-bottom: 0.23rem;
}
.tags-wrap{
  height: 0.75rem;
	background-color: #ffffff;
  flex-wrap: wrap;
  padding-left: 0.27rem;
  margin-bottom: 0.23rem;
  .tag{
    margin-right: 0.17rem;
    background-color: #dddddd;
    border-radius: 0.25rem;
    font-size: 0.21rem;
    color: #a8a8a8;
    padding: 0.1rem 0.17rem;
  }
  .seleted{
    background-color: #e1fdd2;
    color: #2ecb62;
  }
}
.card-wrap{
  margin-bottom: 0.23rem;
  padding: 0.23rem 0.27rem;
  background-color: #ffffff;
}

</style>