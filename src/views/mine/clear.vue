<template>
  <div class="wrapper">
    <div class="btn" @click="clearToken">清除token</div>
    <div class="btn" @click="clearAll">{{btnText}}</div>
  </div>
</template>
<script>
import tokenHolder from "../../utils/tokenHolder";
import { updateToken } from "../../utils/auth";
export default {
  data() {
    return {
      btnText: "清除全部缓存",
    };
  },
  methods: {
    clearToken() {
      tokenHolder.remove();
      this.$router.push("/mine", updateToken);
    },
    clearAll() {
      tokenHolder.remove();
      this.$store.replaceState({});
      this.btnText = "清理中...";
      setTimeout(() => {
        localStorage.clear();
        sessionStorage.clear();
        document.cookie = "";
        this.$router.push("/mine", updateToken);
      }, 2000);
    },
  },
};
</script>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
.btn {
  height: 0.7rem;
  line-height: 0.7rem;
  background-color: #07c160;
  color: #fff;
  font-weight: 500;
  width: 80%;
  letter-spacing: 2px;
  border-radius: 0.1rem;
  text-align: center;
}
.btn + .btn {
  margin-top: 0.3rem;
}
</style>
