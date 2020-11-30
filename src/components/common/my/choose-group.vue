<template>
  <div class="select1">
    <div
      class="s-item e1"
      :class="{ active: selectIndex == i }"
      v-for="(item, i) in info"
      :key="i"
      @click="checkIt(i)"
    >
      {{ item.name.length>4?item.name.substr(0,4)+'...':item.name }}
      <i class="iconfont iconxuanzhong4"></i>
    </div>
    <!-- <div class="s-item"><i class="iconfont iconxuanzhong4"></i></div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectIndex: -1,
      // list: ,
    };
  },
  props:['info'],
  methods: {
    checkIt(i) {
      if (i == this.selectIndex) {
        this.selectIndex = -1;
      }else{
        this.selectIndex = i;
      }
      // console.log(this.selectIndex)
      this.$emit('update:index', this.selectIndex)
    },
    reset(){
      this.$emit('update:index', -1)
    }
  },
};
</script>

<style lang="less" scoped>
.select1 {
  // height: 0.75rem;
  // background-color: #ffffff;
  // margin-bottom: 0.23rem;
  // flex-wrap: wrap;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 0.2rem;
  // &::after{
  //   content:'';
  //   width: 1rem;
  //   height: 0;
  // }
}
.s-item {
  width: 1.19rem;
  height: 0.45rem;
  background-color: #f6f6f6;
  border-radius: 0.06rem;
  color: #a8a8a8;
  font-size: 0.21rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  i {
    display: none;
    position: absolute;
    right: 0;
    bottom: -0.01rem;
    font-size: 0.15rem;
    color: #2ecb62;
  }
  
}
.s-item.active {
  background-color: #cbffb1;
  color: #2ecb62;
  i {
    display: block;
  }
}
</style>