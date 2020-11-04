<template>
  <div class="column sb tip-box">
    <div class="title">{{title||'提示'}}</div>
    <div class="content">
      <slot></slot>
    </div>
    <div class="row sa b-btns">
      <div v-if="leftBtnText" class="btn no" @click="leftBtnFn">{{leftBtnText}}</div>
      <div class="btn ok" @click="rightBtnFn">{{rightBtnText||'确定'}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tipBox",
  props: ["title", "leftBtnText", "leftBtnFn", "rightBtnText", "rightBtnFn"]
};
</script>
<style scoped>
.tip-box {
  max-width: 70%;
  background-color: #ffffff;
  border-radius: 0.03rem;
  border: solid 0.01rem #e2e2e2;
  padding: 0.3rem;
  padding-top: 0.2rem;
  margin: auto;
  min-height: 1.8rem;
}
.title {
  font-size: 0.29rem;
  color: #333;
  font-weight: bold;
}
.content {
  font-size: 0.25rem;
  color: #666666;
  margin-top: 0.1rem;
  white-space: pre-wrap;
}
.b-btns {
  margin-top: 0.2rem;
}

.btn {
  min-width: 1rem;
  height: 0.49rem;
  line-height: 0.49rem;
  color: white;
  border-radius: 0.03rem;
  padding: 2px 10px;
}
.ok {
 background: var(--primary-gradient);
}
.no {
  background-color: #999999;
}
</style>