<template>
  <div class="order-wrap">
    <tabs v-model="tabIdx" swipeable animated color="#2ecb62" class="tab">
      <tab :title="item.title" :name="item.value" v-for="item in status" :key="item.title">
        <order-list :status="item.value"></order-list>
      </tab>
    </tabs>

  </div>
</template>

<script>
import orderList from './component/order-list'
import api from '../../api/order'
import { Tab, Tabs, Empty, Dialog, List } from 'vant';

export default {
  data(){
    return{
      tabIdx:'',

      status:[
        {title:'全部', value:''}, 
        {title:'待支付', value:'1'},
        {title:'待发货', value:'2'},
        {title:'已完成', value:'6'},
        ]
    }
  },
  methods:{
    //0-已取消 1-待付款 2-待发货 3-待收货 4-待评价 5-售后/退款 6-已完成 7-待自提 8-已退款
    // async getOrderlist(){
 
  },
  created(){
    let type = this.$route.query.type||0
    this.tabIdx = type
  },

  components:{
    Tab,
    Tabs,
    List,
    orderList
  }
}
</script>

<style lang="less" scoped>
.order-wrap{
  height: 100vh;
  background-color: #f6f6f6;
  overflow: scroll;
}
.tab{
  height: 0.68rem;
}

/deep/.van-tab{
  color: #1a1a1a;
}
</style>