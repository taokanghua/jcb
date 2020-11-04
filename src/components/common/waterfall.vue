<template>
  <div :style="{'height':height,'overflow':'hidden'}" @scroll="handleScroll">
    <div>
      <slot />
      <div class="tips" v-show="err">{{err}}</div>
      <loading v-show="loading" :class="[pageNo>1?'nearby':'center']" />
    </div>
  </div>
</template>
<script>
import Loading from "./loading.vue";
export default {
  name: "waterfall",
  components: {
    Loading,
  },
  data() {
    return {
      loading: false,
      count: -1,
      pageNo: 0,
      err: "",
    };
  },
  props: {
    //@afterFetch 接口请求后的事件
    height: { type: String, default: "100vh" }, //默认高度 直接赋值到element style
    req: { type: Function }, //api 接口
    params: { type: Object }, //除了pageNo,pageSize 以外的参数
    after: { type: Function }, //自行处理接口返回结果, 更新数据 需要返回count，与@afterFetch 互斥
    autoInit: { type: Boolean, default: true }, //是否在creadted生命周期自动请求数据
    pageSize: { type: Number, default: 10 }, //每页数量
    emptyMsg: { type: String },
  },

  watch: {
    params() {
      this.err = "";
      this.isWatchParams && this.refresh();
    },
  },

  created() {
    this.autoInit && this.fetch();
  },

  methods: {
    handleScroll(e) {
      let el = e.target;
      if (el.scrollTop + el.clientHeight < el.scrollHeight) return;
      this.tryFetch();
    },

    tryFetch() {
      const { count, loading, pageNo, pageSize } = this;
      if (!loading && count > 0 && count > pageNo * pageSize) {
        this.fetch();
      }
    },
    async fetch() {
      this.loading = true;
      let params = {
        skipCount: this.pageNo * this.pageSize,
        maxResultCount: this.pageSize,
        ...this.params,
      };
      let res = await this.req(params);
      this.loading = false;
      if (this.after) {
        this.count = this.after(res) || this.count;
        return;
      }
      this.count = res.result.totalCount || this.count;
      if (!res.success) return (this.err = res.msg);
      this.pageNo += 1;
      let d = res.result.items;
      if (!d.length) return (this.err = this.emptyMsg || "暂无数据");
      this.$emit("afterFetch", d);
    },
    refresh() {
      //回到初始状态，并发起请求， 供外部使用者调用
      this.err = "";
      this.pageNo = 0;
      this.fetch();
    },
  },
};
</script>

<style scoped>
.nearby {
  margin: 0.1rem 0;
  display: block;
}
.center {
  margin-top: 35%;
  display: block;
}

.tips {
  color: #666;
  margin-top: 35%;
}
* + .tips {
  margin-top: 0.3rem;
  text-align: center;
}
</style>