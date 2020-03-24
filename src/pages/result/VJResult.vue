<template>
  <q-page>
    <div class="row">
      <q-space></q-space>
      <q-card class="my-card q-ma-md bg-grey-2">
        <q-card-section>
          <div class="text-h5">
            # {{$route.query.id}} 的评测结果：
            <q-chip
              size="lg"
              text-color="white"
              :color="switchResultColor(resultData.status)"
            >{{this.resultData.status}}</q-chip>
          </div>
          <div class="text-h6">
            由
            <q-chip clickable color="primary" text-color="white" size="lg">
              <q-avatar>
                <img :src="userCustomInfo.avatarUrl" />
              </q-avatar>
              {{userCustomInfo.adjectiveTitle}}{{userCustomInfo.articleTitle}}
              {{userCustomInfo.nickname}}
            </q-chip>
            提交于 {{formatDate(resultData.submitTime)}}
          </div>
        </q-card-section>
        <q-card-section>
          <!-- TODO: 点击跳转 -->
          <q-chip color="primary" text-color="white" clickable>提交人用户名：{{resultData.username}}</q-chip>
          <q-chip color="primary" text-color="white">OJ名：{{resultData.oj}}</q-chip>
          <q-chip color="primary" text-color="white">题目ID：{{resultData.probNum}}</q-chip>
          <q-chip color="primary" text-color="white">VJ RunId：{{resultData.runId}}</q-chip>
          <q-chip
            color="primary"
            text-color="white"
          >时间消耗：{{resultData.runtime?resultData.runtime:"-"}}</q-chip>
          <q-chip
            color="primary"
            text-color="white"
          >内存消耗：{{resultData.memory?resultData.memory:"-"}}</q-chip>

          <q-chip color="accent" text-color="white">代提交机器人编号：{{resultData.authorId}}</q-chip>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="text-h6 q-mb-md">
            评测机反馈：
            <q-chip color="green" text-color="white">以评测时间最新的为准</q-chip>
            <q-btn color="negative">
              申请重判
              <!-- TODO: 申请重判的逻辑 -->
              <q-tooltip>暂不可使用</q-tooltip>
            </q-btn>
          </div>
          <div class="row q-gutter-x-md">
            <pre class="text-subtitle2 shadow-2 q-pa-sm">{{resultData.additionalInfo?resultData.additionalInfo:"没有额外的反馈 :O"}}</pre>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="q-mb-md">
            <q-chip text-color="white" color="accent">评测语言：{{resultData.language}}</q-chip>
            <q-chip color="accent" text-color="white">代码长度：{{resultData.length}}</q-chip>
          </div>
          <AceEditor :readOnly="true" :value="resultData.code"></AceEditor>
        </q-card-section>
      </q-card>
      <q-space></q-space>
    </div>
  </q-page>
</template>

<script>
import { date } from "quasar";
import AceEditor from "components/submit/AceEditor.vue";
export default {
  components: {
    AceEditor
  },
  data() {
    return {
      resultData: "",
      userCustomInfo: ""
    };
  },
  mounted() {
    this.getResult();
  },
  methods: {
    formatDate(val) {
      return date.formatDate(val, "YYYY-MM-DD HH:mm:ss");
    },
    switchResultColor(str) {
      if (str === "Accepted") {
        return "positive";
      } else if (str === "Presentation Error") {
        return "warning";
      } else if (
        str === "Pending" ||
        str === "Running" ||
        str === "Submitted"
      ) {
        return "blue";
      } else if (str === "Queuing" || str === "In judge queue") {
        return "grey";
      } else {
        return "negative";
      }
    },
    async getResult() {
      let params = new URLSearchParams();
      params.append("id", this.$route.query.id);
      let data = await this.$axios.post("/vj/judge_result/info", params);
      this.resultData = data.datas[0];
      // 获取完基本信息后获取用户的个性化信息
      this.getUserCustomInfo();
    },
    async getUserCustomInfo() {
      let params = new URLSearchParams();
      params.append("username", this.resultData.username);
      let data = await this.$axios.post("/user/info/custom", params);
      this.userCustomInfo = data.datas[0];
    }
  }
};
</script>

<style lang="scss" scoped>
.my-card {
  width: 95%;
}
</style>
