<template>
  <div>
    <div class="row ac y-item">
      <radio-btn :checked="accepted" @oncheck="handleAccepte" />
      <div class="protocol" @click="showContent()">接受用户协议</div>
      <!-- <div class="protocol">接受用户协议</div> -->
    </div>
    <pop-up :show="showIt" position="center" @onModalClick="showContent()">
      <div class="rich-text-box smooth">
        <div v-html="content"></div>
      </div>
    </pop-up>
  </div>
</template>
<script>
import radioBtn from "../../components/common/radioBtn.vue";
import popUp from "../../components/common/popUp.vue"
export default {
  name: "protocol",
  props: { content: { type: String, default: "" } },
  data() {
    return {
      showIt:false,
      accepted: false
    };
  },
  methods: {
    handleAccepte() {
      this.accepted = !this.accepted;
    },
    showContent(){
      this.showIt=!this.showIt;
    }
  },
  components: {
    radioBtn,
    popUp
  }
};
</script>
<style scoped>
.y-item {
  height: 0.9rem;
  line-height: 0.9rem;
  width: 100%;
  font-size: 0.28rem;
}
.protocol {
  text-decoration: underline;
  font-size: 0.25rem;
  line-height: 0.27rem;
  letter-spacing: 0rem;
  color: #333333;
  margin-left: 3%;
}
.rich-text-box {
    padding: .3rem;
    height: 80vh;
    width: 90%;
    margin: auto;
    overflow: scroll;
    border-radius: .1rem;
    box-sizing: border-box;
}
</style>