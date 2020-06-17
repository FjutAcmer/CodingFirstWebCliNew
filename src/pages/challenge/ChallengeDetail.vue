<template>
  <q-page>
    <div class="row">
      <div class="left-body">
        <q-card class="q-ma-sm">
          <q-card-section class="bg-blue">
            <div class="text-h6 text-white">【{{blockDetail.name}}】的题目列表</div>
          </q-card-section>
          <q-card-section>
            <el-pagination
              class="col-auto"
              layout="total, prev, pager, next, jumper"
              :total="this.totalCol"
              :page-size="this.pageSize"
              @current-change="getList"
              :current-page="this.currentPage"
            ></el-pagination>
            <el-table style="width:100%;" :data="this.tableData" v-loading="this.loading">
              <el-table-column label="是否解决" min-width="12%">
                <template slot-scope="scope">
                  <q-chip
                    v-if="scope.row.isSolved==='✔'"
                    dense
                    color="green"
                    text-color="white"
                    icon="check"
                  >已解决</q-chip>
                  <q-chip
                    v-else-if="scope.row.isSolved==='？'"
                    dense
                    color="red"
                    text-color="white"
                    icon="close"
                  >未解决</q-chip>
                </template>
              </el-table-column>
              <el-table-column type="index" label="序号" :index="indexChange" min-width="15%"></el-table-column>
              <el-table-column prop="problemId" label="题号" min-width="10%"></el-table-column>
              <el-table-column prop="title" label="题目标题" min-width="50%">
                <template slot-scope="scope">
                  <q-btn
                    no-caps
                    flat
                    color="primary"
                    @click="toSubmit(scope.row.problemId)"
                    :label="scope.row.title"
                  />
                </template>
              </el-table-column>
              <el-table-column label="积分" min-width="20%">
                <template slot-scope="scope">
                  <div
                    :class="scope.row.solved === '✔'?'row-solved':scope.row.solved===''?'row-not-submit':'row-solving'"
                  >{{scope.row.score}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="rewardAcb" label="奖励ACB" min-width="10%"></el-table-column>
            </el-table>
            <div class="row">
              <q-space></q-space>
              <el-pagination
                class="col-auto"
                layout="total, prev, pager, next, jumper"
                :total="this.totalCol"
                :page-size="this.pageSize"
                @current-change="getList"
                :current-page="this.currentPage"
              ></el-pagination>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="right-body">
        <q-card class="q-ma-sm bg-grey-2">
          <q-card-section class="bg-blue">
            <div class="text-white text-h6">模块 -【{{blockDetail.name}}】</div>
          </q-card-section>
          <q-card-section class="text-body1">
            <div v-html="blockDetail.des"></div>
          </q-card-section>
        </q-card>
        <q-card v-if="blockDetail.condition" class="q-ma-sm bg-grey-2">
          <q-card-section class="bg-blue">
            <div class="text-white text-h6">开启条件</div>
          </q-card-section>
          <q-card-section>
            <div v-html="blockDetail.condition"></div>
          </q-card-section>
        </q-card>
        <q-card class="q-ma-sm bg-grey-2">
          <q-card-section class="bg-blue">
            <div class="text-white text-h6">我的解锁进度</div>
          </q-card-section>
          <q-card-section>
            完成进度：( {{this.blockDetail.getScore}} 分/ {{this.blockDetail.totalScore}} 分 )：
            <q-linear-progress stripe size="25px" :value="percent" color="orange" class="q-mt-sm">
              <div class="absolute-full flex flex-center">
                <q-badge color="white" text-color="orange" :label="progressLabel" />
              </div>
            </q-linear-progress>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      totalCol: 0,
      blockDetail: {
        id: "",
        name: "未找到",
        des: "",
        type: "",
        condition: "",
        totalScore: 0,
        getScore: 0
      },
      pageSize: 10,
      currentPage: 1,
      percent: 0.0,
      progressLabel: "0.00%",
      loading: true
    };
  },
  mounted() {
    // add by axiang [20190701]
    if (this.$store.getters["global/getIsLogin"]) {
      this.getBlockDetail(this.$route.query.id);
      this.getBlockProblems(this.currentPage);
    } else {
      this.$q.notify({
        message: "提示",
        caption: "登录后才能查看",
        type: "warning"
      });
      this.loading = false;
    }
  },
  methods: {
    indexChange(index) {
      return (this.currentPage - 1) * 10 + index + 1;
    },
    getList(val) {
      this.currentPage = val;
      this.getBlockProblems();
    },
    toSubmit(pid) {
      this.$router.push({
        name: "localSubmit",
        query: {
          id: pid
        }
      });
    },
    async getBlockDetail(blockId) {
      let params = new URLSearchParams();
      params.append("blockId", blockId);
      params.append("username", this.$store.getters["global/getUsername"]);
      let dataBlockDetail = await this.$axios.get(
        "/challenge_block/detail",
        params
      );
      if (dataBlockDetail.code === 10000) {
        let dataBlockTemp = dataBlockDetail.datas[0];
        this.blockDetail.getScore = dataBlockTemp.getScore;
        this.blockDetail.id = dataBlockTemp.id;
        this.blockDetail.name = dataBlockTemp.name;
        this.blockDetail.des = dataBlockTemp.description;
        this.blockDetail.type = dataBlockTemp.blockType;
        this.blockDetail.totalScore = dataBlockTemp.totalScore;
        let res = "";
        let dataPreCondition = dataBlockDetail.datas[1];
        if (typeof dataPreCondition === "undefined") {
          res = "无条件解锁<br>";
        } else {
          for (let i = 0; i < dataPreCondition.length; i++) {
            res += `在模块【${dataPreCondition[i].name}】中获得【${dataPreCondition[i].num} 分】<br>`;
          }
        }
        this.blockDetail.condition = res;
      } else {
        this.$q.notify({
          message: "获取本模块详情失败！ ",
          type: "error"
        });
      }
      this.percent = parseFloat(
        this.blockDetail.getScore / this.blockDetail.totalScore
      ).toFixed(2);
      this.progressLabel =
        parseFloat(
          (
            (this.blockDetail.getScore / this.blockDetail.totalScore) *
            100
          ).toFixed(2)
        ) + "%";
    },
    async getBlockProblems() {
      this.loading = true;
      let params = new URLSearchParams();
      params.append("username", this.$store.getters["global/getUsername"]);
      params.append("blockId", this.$route.query.id);
      params.append("pageNum", this.currentPage);
      params.append("pageSize", this.pageSize);
      let dataBlockProblems = await this.$axios.get(
        "/challenge_block/problem",
        params
      );
      if (dataBlockProblems.code === 10000) {
        this.tableData = dataBlockProblems.datas[0];
        this.totalCol = dataBlockProblems.datas[1];
      } else if (dataBlockProblems.code === 10001) {
        this.$q.notify({
          message: "本模块没有题目！",
          type: "warning"
        });
      } else {
        this.$q.notify({
          message: "获取题目失败！",
          type: "error"
        });
      }
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.row {
  width: 95%;
  margin: auto;
  .left-body {
    width: 65%;
    .el-table {
      .success-row {
        color: green;
        font-weight: bold;
      }
      .error-row {
        color: red;
        font-weight: bold;
      }
      .warning-row {
        color: blue;
        font-weight: bold;
      }
    }
  }
  .right-body {
    width: 35%;
  }
}
</style>
