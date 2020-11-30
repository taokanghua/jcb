<template>
  <list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <div class="list">
      <div class="item" v-for="(item, i) in list" :key="i">
        <div class="row ac sb info">
          <div class="row ac">
            <img :src="item.head" alt />
            <span class="name">{{item.name}}</span>
          </div>
          <div class="money">+{{item.profitAmount||0}}</div>
        </div>
        <div class="row ac sb des">
          <span>{{item.type==1?"交易订单":"购买商品"}}</span>
          <span>订单金额 {{item.totalAmount||0}}</span>
        </div>
      </div>
    </div>
  </list>
</template>
<script>
import { Tab, Tabs, List, Toast } from "vant";
import api from "../../../api/popularize";
export default {
  props: ["sourceType"],
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      active: 0,
      params: {
        pageNo: 1,
        pageSize: 10,
        sourceType: this.sourceType,
        memberId: this.$store.state.user.info.memberUserInfoVo.id
      }
    };
  },
  methods: {
    onLoad() {
      this.loading = true;
      var timer = setTimeout(async () => {
        clearTimeout(timer);
        let res = await api.getOrderSourceList(this.params);
        this.loading = false;
        if (!res.success || !res.result || res.result.records.length == 0) {
          this.finished = true;
        } else {
          this.list = [...this.list, ...res.result.records];
        }
        if (!res.success) {
          Toast("获取数据失败!");
          return;
        }
        this.params.pageNo++;
      }, 500);
    }
  },
  components: {
    List
  }
};
</script>
<style lang="less" scoped>
.list {
  .item {
    margin: 0 0.26rem;
    padding: 0.2rem 0;
    border-bottom: 1px solid #dddddd;
    .info {
      img {
        width: 0.362rem;
        height: 0.362rem;
        border-radius: 100%;
      }
      .name {
        color: #1a1a1a;
        font-size: 0.237rem;
        margin-left: 0.15rem;
      }
      .money {
        color: #fc0808;
        color: #fc0808;
      }
    }
    .des {
      color: #a8a8a8;
      font-size: 0.181rem;
      margin-top: 0.2rem;
    }
  }
}
</style>