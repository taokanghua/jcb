<template>
  <div>
    <div class="comment-box">
      <h4 v-if="isTitleShow">用户评价</h4>
      <div v-if="!readOnly">
        <div
          class="comment-input"
          placeholder="输入更多想法..."
          @input="handleInputChange"
          :data-len="`${commentText.length}/150`"
          @click="toggleEdit"
        ></div>
        <div class="row sb rate-item">
          <div>题目易懂性</div>
          <rate v-model="accuracy" />
        </div>
        <div class="row sb rate-item">
          <div>结果准确性</div>
          <rate v-model="understandability" />
        </div>
        <div class="row sb rate-item">
          <div>建议实用性</div>
          <rate v-model="practicability" />
        </div>
        <div class="submit-btn" @click="submitComment()">提交</div>
        <div style="height:.4rem"></div>
      </div>

      <comment-card v-for="item in comments" :key="item.id" :info="item" />
    </div>
  </div>
</template>
<script>
import Rate from "./rate.vue";
import commentCard from "../../components/commentCard.vue";
import api from "../../api/yun";
import { mapState } from "vuex";

export default {
  name: "commentBox",
  props: {
    itemBankId: { type: String },
    isTitleShow: { type: Boolean, default: true },
    readOnly: { type: Boolean, default: false }
  },
  components: {
    Rate,
    commentCard
  },
  data() {
    return {
      commentText: "",
      comments: [],
      accuracy: 3,
      understandability: 0,
      practicability: 0,
    };
  },

  computed: mapState({
    user: s => s.user.userinfo
  }),

  methods: {
    toggleEdit(e) {
      e.target.contentEditable = true;
    },
    handleInputChange(e) {
      if (e.inputType == "deleteContentBackward") {
        return (this.commentText = e.target.textContent);
      }
      if (this.commentText.length >= 150) {
        return (e.target.contentEditable = false);
      }
      this.commentText = e.target.textContent;
    },
    submitComment() {
      let must = ["Understandability", "Accuracy", "Suggestive"];
      let data = {
        itemBankID: this.itemBankId,
        Content: this.commentText,
        Understandability: this.understandability,
        Accuracy: this.accuracy,
        Suggestive: this.practicability
      };
      if (!data.Content) {
        return this.showErr("请填写文字评论");
      }

      for (let i = 0; i < must.length; i++) {
        if (!data[must[i]]) return this.showErr("请添加评分");
      }

      api.postComment(data).then(res => {
        if (res.code) return this.showErr(res.msg);
        let time = new Date();
        this.comments.unshift({
          ...this.user,
          content: data.Content,
          addTime: new Date().toLocaleDateString().replace(/\//gi, "-")
        });
      });
    },
    loadComments() {
      api.getTestComment(this.itemBankId).then(res => {
        if (res.code) return;
        let d = res.data;
        this.comments = d.comments;
        let e = this.evaluates;
        for (const key in e) {
          e[key].score = d[key];
        }
      });
    },
    showErr(msg) {
      this.$Toast.error(msg, { position: "bottom" });
    }
  }
};
</script>
<style lang="less" scoped>
h4 {
  font-weight: bold;
  font-size: 0.29rem;
  line-height: 0.51rem;
  color: #222222;
  text-align: left;
}
.comment-box {
  background: white;
  padding: 3%;
}
.comment-input {
  width: 100%;
  min-height: 1.46rem;
  background-color: #f7f7f7;
  border-radius: 0.08rem;
  border: solid 0.01rem #f0f0f0;
  padding: 3%;
  box-sizing: border-box;
  font-size: 0.24rem;
  margin-top: 0.25rem;
  position: relative;
  text-align: left;
}
.comment-input:empty.comment-input::before {
  content: attr(placeholder);
  position: absolute;
  font-family: PingFang-SC-Medium;
  font-size: 0.22rem;
  color: #c8c8c8;
}
.comment-input:focus.comment-input::before {
  content: "";
}
.comment-input::after {
  content: attr(data-len);
  position: absolute;
  font-family: PingFang-SC-Medium;
  font-size: 0.22rem;
  color: #c8c8c8;
  right: 3%;
  bottom: 3%;
}
.rate-item {
  color: #444;
  margin-top: 0.25rem;
}
.comment-box > div > .rate-item:nth-child(2) {
  margin-top: 0.31rem;
}
.submit-btn {
  height: 0.7rem;
  line-height: 0.7rem;
  border-radius: 0.05rem;
  font-family: PingFang-SC-Bold;
  font-size: 0.29rem;
  color: #ffffff;
  color: white;
  background: var(--primary-gradient);
  margin-top: 0.42rem;
}
</style>