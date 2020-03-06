<template>
  <q-page>
    <q-splitter v-model="splitterModel" class="probleminfo-splitter">
      <template v-slot:before>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">
            {{problemInfo.title}}
            <div v-if="$store.getters['global/getIsLogin']">
              <q-chip
                v-if="userSolved.solvedCount >= 0"
                text-color="white"
                icon="check"
                color="positive"
              >最早于{{formatDate(userSolved.firstSolvedTime)}} Accepted</q-chip>
              <q-chip v-else text-color="white" icon="close" color="negative">未解决</q-chip>
            </div>
            <q-chip
              v-if="problemInfo.judgeOption === 0"
              text-color="white"
              icon="local_activity"
              color="info"
            >
              默认评测
              <q-tooltip>
                <div class="text-subtitle2">按照默认的评测顺序进行评测</div>
              </q-tooltip>
            </q-chip>
            <q-chip
              v-else-if="problemInfo.judgeOption === 1"
              text-color="white"
              icon="local_activity"
              color="primary"
            >
              本地评测优先
              <q-tooltip>
                <div class="text-subtitle2">优先交由本地评测机进行评测</div>
              </q-tooltip>
            </q-chip>
            <q-chip
              v-else-if="problemInfo.judgeOption === 2"
              text-color="white"
              icon="looks_3"
              color="warning"
            >
              第三方评测优先
              <q-tooltip>
                <div class="text-subtitle2">优先交由第三方进行评测</div>
              </q-tooltip>
            </q-chip>
            <q-chip
              v-if="problemView.spj === 1"
              text-color="white"
              icon="adjust"
              color="negative"
            >特判SPJ</q-chip>
            <q-chip
              v-else-if="problemView.spj === 0"
              text-color="white"
              icon="brightness_1"
              color="accent"
            >非特判SPJ</q-chip>
            <q-chip text-color="white" icon="person" color="warning">出题人：{{problemInfo.author}}</q-chip>
          </div>
          <div class="q-mb-md q-gutter-x-md q-gutter-y-md text-weight-bold">
            <q-chip square>时间限制：{{problemView.timeLimit}}</q-chip>
            <q-chip square>内存限制：{{problemView.memoryLimit}}</q-chip>
            <q-chip square>64位Integer的IO类型：{{problemView.intFormat}}</q-chip>
          </div>
          <q-card class="q-mb-md">
            <q-card-section class="bg-grey q-pa-sm">
              <div class="text-subtitle1 text-white text-weight-bold">题目描述</div>
            </q-card-section>
            <q-card-section>
              <div v-html="problemView.description" />
            </q-card-section>
          </q-card>
          <q-card class="q-mb-md">
            <q-card-section class="bg-grey q-pa-sm">
              <div class="text-subtitle1 text-white text-weight-bold">输入</div>
            </q-card-section>
            <q-card-section>
              <div v-html="problemView.input" />
            </q-card-section>
          </q-card>
          <q-card class="q-mb-md">
            <q-card-section class="bg-grey q-pa-sm">
              <div class="text-subtitle1 text-white text-weight-bold">输出</div>
            </q-card-section>
            <q-card-section>
              <div v-html="problemView.output" />
            </q-card-section>
          </q-card>
          <div v-for="item in problemSamples" :key="item.id">
            <q-card class="q-mb-md">
              <q-card-section class="bg-secondary q-pa-sm">
                <div
                  class="text-subtitle1 text-white text-weight-bold"
                >输入样例 - {{String.fromCharCode(item.caseOrder+65)}}</div>
              </q-card-section>
              <q-card-section>
                <div v-html="item.inputCase" />
              </q-card-section>
            </q-card>
            <q-card class="q-mb-md">
              <q-card-section class="bg-secondary q-pa-sm">
                <div
                  class="text-subtitle1 text-white text-weight-bold"
                >输出样例 - {{String.fromCharCode(item.caseOrder+65)}}</div>
              </q-card-section>
              <q-card-section>
                <div v-html="item.outputCase" />
              </q-card-section>
            </q-card>
          </div>
          <q-card class="q-mb-md">
            <q-card-section class="bg-grey q-pa-sm">
              <div class="text-subtitle1 text-white text-weight-bold">提示</div>
            </q-card-section>
            <q-card-section>
              <div>这里是题目提示</div>
            </q-card-section>
          </q-card>
        </div>
      </template>
      <template v-slot:separator>
        <q-avatar color="primary" text-color="white" size="40px" icon="drag_indicator" />
      </template>
      <template v-slot:after>
        <div class="q-pa-md">
          <div
            v-for="n in 10"
            :key="n"
            class="q-my-md"
          >{{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</div>
        </div>
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
import { date } from "quasar";
export default {
  props: {},
  watch: {},
  data() {
    return {
      splitterModel: 50, // start at 50%
      problemInfo: "",
      problemView: "",
      problemSamples: [],
      userSolved: ""
    };
  },
  mounted() {
    this.getProblemInfo();
    if (this.$store.getters["global/getIsLogin"]) {
      this.getUserSolved();
    }
  },
  methods: {
    formatDate(val) {
      return date.formatDate(val, "YYYY-MM-DD");
    },
    async getProblemInfo() {
      let params = new URLSearchParams();
      params.append("problemId", this.$route.query.id);
      params.append("username", this.$store.getters["global/getUsername"]);
      let data = await this.$axios.post("/problem/info", params);
      this.problemInfo = data.datas[0];
      this.problemView = data.datas[1];
      this.problemSamples = data.datas[2];
    },
    async getUserSolved() {
      let params = new URLSearchParams();
      params.append("problemId", this.$route.query.id);
      params.append("username", this.$store.getters["global/getUsername"]);
      let data = await this.$axios.post("/problem/userSolved", params);
      this.userSolved = data.datas[0];
      console.log(this.userSolved);
    }
  }
};
</script>

<style lang="scss" scoped>
.probleminfo-splitter {
  min-height: 500px;
}
</style>
