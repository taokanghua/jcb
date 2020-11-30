<template>
  <list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <div class="list">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="left">
          <div class="title">集采收益</div>
          <div class="time">{{item.createTime}}</div>
        </div>
        <div class="right red">+{{ item.amount || 0 }}</div>
      </div>
    </div>
  </list>
</template>

<script>
import { List, Toast } from "vant";
import api from "../../../api/popularize";
export default {
  props: ["status"],
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      params: {
        memberId: this.$store.state.user.info.memberUserInfoVo.id,
        pageNo: 1,
        pageSize: 10,
        status:this.status,
      }
    };
  },
  methods: {
    async onLoad() {
      this.loading = true;
      var timer = setTimeout(async () => {
        clearTimeout(timer);
        let res = await api.getPrifitList(this.params);
        this.loading = false;
        console.log(res)
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
        width: 5.414rem;
        height: 1.017rem;
        background-color: #ffffff;
        border-radius: 0.113rem;
        margin-bottom: 0.226rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.2rem;
        .title {
          color: #1a1a1a;
          font-size: 0.215rem;
        }
        .time {
          color: #a8a8a8;
          font-size: 0.181rem;
          margin-top: 0.15rem;
        }
        .right {
          font-size: 0.305rem;
        }
      }
    }
</style>