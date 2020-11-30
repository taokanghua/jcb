<template>
  <list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <div class="list">
      <div class="item" v-for="(v, i) in list" :key="i">
        <div class="left">
          <img :src="v.head" />
          <div class="info">
            <div class="name">{{ v.name }}</div>
            <div class="time">{{ v.sourceName? "邀请人："+v.sourceName:"" }}</div>
            <div class="time">{{ v.sourceTime }}</div>
          </div>
        </div>
        <div class="right">
          <span>{{ v.peopleNumber||0 }}人</span>
          <span>{{ v.orderNumber||0 }}单</span>
          <span>{{ v.profitAmount||0 }}元</span>
        </div>
      </div>
    </div>
  </list>
</template>

<script>
import { List, Toast } from "vant";
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
        let res = await api.getMemberSourceList(this.params);
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
    display: flex;
    justify-content: space-between;
    margin: 0 0.26rem;
    padding: 0.169rem 0;
    border-bottom: 1px solid #dddddd;
    .left {
      display: flex;
      align-items: center;
      img {
        width: 0.904rem;
        height: 0.904rem;
        border-radius: 100%;
        margin-right: 0.15rem;
      }
      .info {
        .name {
          color: #1a1a1a;
          font-size: 0.237rem;
        }
        .time {
          color: #a8a8a8;
          font-size: 0.181rem;
          margin-top: 0.05rem;
        }
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 0.203rem;
      text-align: right;
      span {
        line-height: 0.32rem;
      }
    }
  }
}
</style>