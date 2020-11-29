<template>
      <list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad()">
    <div class="tabs-wrap row">
          <home-card v-for="(item,i) in goodsList" :key="i" :info="item"></home-card>
    </div>
      </list>
</template>

<script>
import api from '../../../api/home'
import {List} from 'vant'
import homeCard from '../../../components/common/card/home-good-card'
export default {
  data(){
    return{
      goodsParams:{pageNo:1, pageSize:10, type:2},
      goodsList:[],
      loading:false,
      finished: false
    }
  },
  props:['type'],
  methods:{
    onLoad() {
      this.loading = true;
      var timer = setTimeout(async () => {
          clearTimeout(timer);
          let res = await api.getGoodsList(this.goodsParams);
          this.loading = false;
          if (
              !res.success ||
              !res.result ||
              res.result.lists.length == 0
          ) {
              this.finished = true;
          } else {
              this.goodsList = [...this.goodsList, ...res.result.lists];
          }
          if (!res.success) {
              this.showToast("获取数据失败!");
              return;
          }
          this.goodsParams.pageNo++;
      }, 500);
    },
  },
  created(){
    this.goodsParams.type =this.type
  },
  components:{
    homeCard,
    List
  }
}
</script>

<style lang="less" scoped>
.tabs-wrap{
  padding: 0 0.25rem;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 0.28rem;
  min-height: 2rem;
}
</style>