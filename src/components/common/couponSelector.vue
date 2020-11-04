<template>
  <div>
    <div class="row sb y-item" @click="toggleShow()">
      <div class="lead-text">优惠卷</div>
      <div class="row" :class="{'black':selectedCoupon.id!=-2}">
        <div class="coupon-name">{{currentName}}</div>
        <i class="icon iconfont icon-youjiantou"></i>
      </div>
    </div>
    <pop-up :show="showUp">
      <div class="row sb act-bar">
        <div @click="toggleShow()">取消</div>
        <div @click="confirmCoupon()">确定</div>
      </div>
      <div class="coupons">
        <div v-for="item in coupons" :key="item.id" class="row sb" @click="handleSelect(item)">
          <div>{{item.name}}</div>
          <radio-btn :checked="selectedCoupon.id==item.id" />
        </div>
      </div>
    </pop-up>
  </div>
</template>
<script>
import popUp from "./popUp.vue";
import radioBtn from "./radioBtn.vue";
import api from "../../api/yun";
export default {
  name: "couponSelector",
  props: { price: { type: Number, default: 0 } },
  data() {
    return {
      coupons: [],
      selectedCoupon: { id: -2 },
      showUp: true,
      currentName: "无优惠"
    };
  },
  created() {
    this.initData();
  },
  methods: {
    toggleShow() {
      if (this.currentName === "无优惠") return;
      this.showUp = !this.showUp;
    },
    confirmCoupon() {
      this.$emit("onSelected", this.selectedCoupon);
      this.currentName = this.selectedCoupon.name;
      this.toggleShow();
    },
    handleSelect(coupon) {
      if (this.selectedId == coupon.id) return;
      this.selectedCoupon = coupon;
    },
    afterLoad(result) {
      let price = this.price;
      if (price == 0) return;
      result = result.filter(v => price > v.fullPrice);
      if (result.length == 0) return;
      result.push({ id: -1, name: "不使用优惠卷" });
      this.currentName = "点击选择";
      this.coupons = result;
    },
    initData() {
      api.getMyCoupons({ type: 2 }).then(res => {
        if (res.code) return console.warn(res.msg);
        this.afterLoad(res.data || []);
      });
    }
  },
  components: {
    popUp,
    radioBtn
  }
};
</script>
<style scoped>
.y-item {
  height: 0.9rem;
  line-height: 0.9rem;
  width: 100%;
  font-size: 0.28rem;
  color: #999999;
}
.lead-text {
  font-size: 0.25rem;
  letter-spacing: 0rem;
}
i {
  display: block;
  margin-left: 0.08rem;
}
.black {
  color: #333;
}
.coupons {
  height: 30vh;
  padding: 5% 10%;
  overflow-y: scroll;
  background-color: white;
  -webkit-overflow-scrolling: touch;
}
.coupons > div {
  height: 0.8rem;
  line-height: 0.8rem;
  color: #666;
  align-items: center;
}
.coupons > div + div {
  border-top: 1px solid #e2e2e2;
}
.coupon-name {
  font-size: 0.25rem;

  letter-spacing: 0rem;
}
.act-bar {
  background: white;
  height: 0.7rem;
  line-height: 0.7rem;
  padding: 0 3%;
  color: #666;
}
.act-bar > div:nth-child(2) {
  color: var(--primary);
}
</style>