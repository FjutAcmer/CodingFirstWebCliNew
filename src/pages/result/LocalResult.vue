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
              :color="switchResultColor(status.result)"
            >{{this.status.result}}</q-chip>
          </div>
        </q-card-section>
        <q-card-section>
          <q-chip color="primary" text-color="white">提交人昵称：{{status.nickname}}</q-chip>
          <q-chip color="primary" text-color="white">提交人用户名：{{status.username}}</q-chip>
          <q-chip color="primary" text-color="white">题目ID：{{status.problemId}}</q-chip>
          <q-chip color="primary" text-color="white">时间消耗：{{status.timeUsed}}</q-chip>
          <q-chip color="primary" text-color="white">内存消耗：{{status.memoryUsed}}</q-chip>
          <q-chip color="primary" text-color="white">代码长度：{{status.codeLength}}</q-chip>
          <q-chip color="primary" text-color="white">提交时间：{{formatDate(status.submitTime)}}</q-chip>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="text-h6 q-mb-md">
            评测机反馈：
            <q-chip color="green" text-color="white">共 {{result.length}} 次评测，以评测时间最新的为准</q-chip>
            <q-btn color="negative">申请重判</q-btn>
          </div>
          <div class="row q-gutter-x-md">
            <div v-for="item in result" :key="item">
              该评测结果反馈于 {{formatDate(item.time)}}
              <pre class="text-subtitle2 shadow-2 q-pa-sm">{{item.info}}</pre>
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <AceEditor :readOnly="true" :value="status.code"></AceEditor>
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
      result: [],
      status: ""
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
      if (str === "Accepted" || str === "Score 100") {
        return "positive";
      } else if (str === "Presentation Error") {
        return "warning";
      } else if (str === "Pending..." || str === "Judging...") {
        return "info";
      } else if (str === "Submit Error" || str.substring(0, 5) === "Score") {
        return "blue";
      } else {
        return "negative";
      }
    },
    async getResult() {
      let params = new URLSearchParams();
      params.append("judgeId", this.$route.query.id);
      let data = await this.$axios.post("/judgeResult/info", params);
      this.result = data.datas[0];
      this.status = data.datas[1];
    }
  }
};
</script>

<style lang="scss" scoped>
.my-card {
  width: 95%;
}
</style>
