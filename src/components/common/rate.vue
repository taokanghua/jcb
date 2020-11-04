<template>
  <div class="rate-bar" @click="handleClick">
    <div class="bg row" ref="rateBase">
      <div class="star"></div>
      <div class="star"></div>
      <div class="star"></div>
      <div class="star"></div>
      <div class="star"></div>
    </div>
    <div class="bar row">
      <div class="star" v-for="(_,i) in value" :key="i"></div>
    </div>
  </div>
</template>
<style scoped>
.rate-bar {
  position: relative;
  width: 2.5rem; /**宽度等于 每个星的宽度和+间隔的和 0.34*5+0.2*4 */
  min-height: 0.3rem;
}
.rate-bar > div {
  position: absolute;
  height: 100%;
  width: 100%;
}
.rate-bar > div > div {
  width: 0.34rem;
  height: 0.34rem;
  background-size: cover;
}
.star {
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1569374133174"  viewBox="0 0 1026 1024" version="1.1"  width="32.0625" height="32"  style="fill: transparent;stroke-width: 7px;stroke: black;"><path d="M559.826357 38.096844l114.290533 234.930541c6.349474 19.048422 25.397896 31.74737 44.446319 31.74737l247.629488 38.096844c50.795792 6.349474 69.844215 69.844215 31.74737 107.941059L820.154794 634.947406c-12.698948 12.698948-19.048422 31.74737-19.048422 57.145267l44.446318 260.328436c6.349474 50.795792-44.446318 88.892637-82.543163 63.494741l-222.231592-120.640008c-19.048422-6.349474-38.096844-6.349474-57.145266 0L261.401076 1015.91585c-44.446318 25.397896-95.242111-12.698948-82.543162-63.494741l44.446318-260.328436c6.349474-19.048422 0-38.096844-19.048422-57.145267L20.121062 444.463184c-38.096844-31.74737-19.048422-95.242111 31.74737-101.591585l247.629489-38.096844c19.048422 0 38.096844-12.698948 44.446318-31.74737L458.234772 38.096844c19.048422-50.795792 82.543163-50.795792 101.591585 0z m0 0"/></svg>');
}
.bar > .star {
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1569374133174"  viewBox="0 0 1026 1024" version="1.1"  width="32.0625" height="32" style="fill:rgb(254, 164, 47);"><path  d="M559.826357 38.096844l114.290533 234.930541c6.349474 19.048422 25.397896 31.74737 44.446319 31.74737l247.629488 38.096844c50.795792 6.349474 69.844215 69.844215 31.74737 107.941059L820.154794 634.947406c-12.698948 12.698948-19.048422 31.74737-19.048422 57.145267l44.446318 260.328436c6.349474 50.795792-44.446318 88.892637-82.543163 63.494741l-222.231592-120.640008c-19.048422-6.349474-38.096844-6.349474-57.145266 0L261.401076 1015.91585c-44.446318 25.397896-95.242111-12.698948-82.543162-63.494741l44.446318-260.328436c6.349474-19.048422 0-38.096844-19.048422-57.145267L20.121062 444.463184c-38.096844-31.74737-19.048422-95.242111 31.74737-101.591585l247.629489-38.096844c19.048422 0 38.096844-12.698948 44.446318-31.74737L458.234772 38.096844c19.048422-50.795792 82.543163-50.795792 101.591585 0z m0 0"/></svg>');
  background-size: cover;
}
.star + .star {
  margin-left: 0.2rem;
}
</style>
<script>
export default {
  name: "rate",
  props: {
    defaultValue: { type: Number, default: 0 },
    disabled: { type: Boolean, default: false }
  },
  model: {
    prop: "rateValue",
    event: "onRate"
  },
  data() {
    return {
      value: 0
    };
  },
  watch: {
    defaultValue(n) {
      this.value = n;
    }
  },
  methods: {
    handleClick(e) {
      if (this.disabled) return;
      let rect = this.$refs.rateBase.getBoundingClientRect();
      let len = e.pageX - rect.left;
      let rate = ((len / rect.width) * 100) | 0;
      // 20=100/5=100%宽度/5个星=每个星宽度占比
      // 0.5=确保num 为 1-5
      let num = Math.round(rate / 20 + 0.5);

      this.value = num;
      this.$emit("onRate", num);
    }
  }
};
</script>