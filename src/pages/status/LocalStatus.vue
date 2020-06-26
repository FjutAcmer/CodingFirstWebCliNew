<template>
  <q-page>
    <q-banner class="text-white bg-positive">TIP：本地评测指的是题目的评测由自主开发的评测机进行测评（LJ指的是Local Judge不是辣鸡）</q-banner>
    <q-card class="my-card">
      <q-card-section class="bg-blue">
        <div class="text-h6 text-white">
          <q-avatar color="secondary">LJ</q-avatar>
          本地评测
        </div>
      </q-card-section>
      <q-card-section class="q-gutter-sm row items-center">
        <q-input
          v-model="filter.searchName"
          standout
          dense
          class="q-mr-md"
          label="昵称"
          placeholder="注意是昵称不是用户名"
        >
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
        <q-input
          v-model="filter.searchProId"
          standout
          dense
          class="q-mr-md"
          label="题号"
          placeholder="输入题号"
        >
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
        <q-select
          filled
          dense
          class="q-mr-md"
          v-model="filter.searchResult"
          :options="resultOptions"
          emit-value
          map-options
          label="评测结果"
          style="min-width: 200px; max-width: 300px"
        >
          <template v-if="filter.searchResult !== ''" v-slot:append>
            <q-icon name="cancel" @click.stop="filter.searchResult = ''" class="cursor-pointer"/>
          </template>
        </q-select>
        <q-select
          filled
          dense
          class="q-mr-md"
          v-model="filter.searchLanguage"
          :options="LanguageOptions"
          emit-value
          map-options
          label="评测语言"
          style="min-width: 200px; max-width: 300px"
        >
          <template v-if="filter.searchLanguage !== ''" v-slot:append>
            <q-icon name="cancel" @click.stop="filter.searchLanguage = ''" class="cursor-pointer"/>
          </template>
        </q-select>
        <q-btn class="q-mr-md" color="primary" round icon="search" @click="getStatus()"></q-btn>
        <q-btn color="negative" round icon="clear_all" @click="cleanFilter()">
          <q-tooltip>重置筛选</q-tooltip>
        </q-btn>
      </q-card-section>
      <q-card-section>
        <el-pagination
          layout="sizes, prev, pager, next"
          :current-page="pagination.currentPage"
          :page-size="pagination.pageSize"
          :total="pagination.totalRows"
          @size-change="sizeChange"
          @current-change="switchPage"
        ></el-pagination>
        <el-table :data="data">
          <el-table-column label="#" min-width="8%">
            <template slot-scope="scope">
              <span flat class="text-black">{{scope.row.id}}</span>
            </template>
          </el-table-column>
          <el-table-column label="昵称" min-width="12%">
            <template slot-scope="scope">
              <q-btn dense no-caps flat color="primary" :label="scope.row.nickname"/>
            </template>
          </el-table-column>
          <el-table-column label="题目" min-width="6%">
            <template slot-scope="scope">
              <q-btn
                @click="toLocalProblem(scope.row.problemId)"
                dense
                flat
                color="warning"
                :label="scope.row.problemId"
              />
            </template>
          </el-table-column>
          <el-table-column label="评测结果" min-width="14%">
            <template slot-scope="scope">
              <q-chip
                text-color="white"
                flat
                :color="switchResultColor(scope.row.result)"
                :label="scope.row.result"
              />
            </template>
          </el-table-column>
          <el-table-column label="代码" min-width="8%">
            <template slot-scope="scope">
              <q-btn
                flat
                dense
                color="primary"
                @click="toLocalResult(scope.row.id)"
              >{{scope.row.language}}
              </q-btn>
            </template>
          </el-table-column>
          <el-table-column prop="codeLength" label="代码长" min-width="6%"></el-table-column>
          <el-table-column prop="timeUsed" label="耗时" min-width="8%"></el-table-column>
          <el-table-column prop="memoryUsed" label="使用内存" min-width="8%"></el-table-column>
          <el-table-column prop="submitTime" label="提交时间" min-width="14%">
            <template slot-scope="scope">
              <span class="text-black">{{formatDate(scope.row.submitTime)}}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="row">
          <q-space/>
          <el-pagination
            class="col-auto"
            layout="prev, pager, next"
            :current-page="pagination.currentPage"
            :page-size="pagination.pageSize"
            :total="pagination.totalRows"
            @size-change="sizeChange"
            @current-change="switchPage"
          ></el-pagination>
        </div>
        <q-inner-loading :showing="loading">
          <q-spinner-gears size="50px" color="primary"/>
        </q-inner-loading>
      </q-card-section>
    </q-card>
    <br/>
  </q-page>
</template>

<script>
  import {date} from "quasar";

  export default {
    data() {
      return {
        loading: false,
        filter: {
          searchName: "",
          searchProId: "",
          searchResult: "",
          searchLanguage: ""
        },
        pagination: {
          currentPage: 1,
          pageSize: 10,
          totalRows: 0
        },
        data: [],
        resultOptions: [],
        LanguageOptions: []
      };
    },
    mounted() {
      if (this.$q.cookies.has("page-local-status-filter")) {
        this.filter = this.$q.cookies.get("page-local-status-filter");
      }
      if (this.$q.cookies.has("page-local-status-pagination")) {
        this.pagination = this.$q.cookies.get("page-local-status-pagination");
      }
      this.getResultOptions();
      this.getLanguageOptions();
      this.getStatus();
    },
    destroyed() {
      this.$q.cookies.set("page-local-status-filter", this.filter);
      this.$q.cookies.set("page-local-status-pagination", this.pagination);
    },
    methods: {
      toLocalProblem(probId) {
        this.$router.push({
          name: "localSubmit",
          query: {
            id: probId
          }
        });
      },
      toLocalResult(JudgeId) {
        this.$router.push({
          name: "localResult",
          query: {
            id: JudgeId
          }
        });
      },
      cleanFilter() {
        this.filter.searchName = "";
        this.filter.searchProId = "";
        this.filter.searchResult = "";
        this.filter.searchLanguage = "";
      },
      switchPage(val) {
        this.pagination.currentPage = val;
        this.getStatus();
      },
      sizeChange(val) {
        this.pagination.pageSize = val;
        this.getStatus();
      },
      switchResultColor(str) {
        if (str === "Accepted" || str === "Score 100") {
          return "positive";
        } else if (str === "Presentation Error") {
          return "warning";
        } else if (
          str === "Pending..." ||
          str === "Judging..." ||
          str === "Running..."
        ) {
          return "grey";
        } else if (str.substring(0, 5) === "Score") {
          return "blue";
        } else if (str === "Submit Error") {
          return "secondary";
        } else {
          return "negative";
        }
      },
      formatDate(val) {
        return date.formatDate(val, "YYYY-MM-DD HH:mm:ss");
      },
      async getStatus() {
        this.loading = true;
        let params = new URLSearchParams();
        params.append("pageNum", this.pagination.currentPage);
        params.append("pageSize", this.pagination.pageSize);
        params.append("problemId", this.filter.searchProId);
        params.append("nickname", this.filter.searchName);
        params.append("language", this.filter.searchLanguage);
        params.append("result", this.filter.searchResult);
        params.append("username", this.$store.getters["global/getUsername"]);
        let data = await this.$axios
          .get("/judge_status/list", params)
          .catch(() => {
            this.loading = false;
          });
        this.data = data.datas[0];
        this.pagination.totalRows = data.datas[1];
        this.loading = false;
      },
      async getResultOptions() {
        let data = await this.$axios.get("/util/submitResult");
        this.resultOptions = data.datas[0];
      },
      async getLanguageOptions() {
        let data = await this.$axios.get("/util/codeLanguage");
        this.LanguageOptions = data.datas[0];
      }
    }
  };
</script>

<style lang="scss" scoped>
  .my-card {
    width: 95%;
    margin: auto;
    margin-top: 20px;
  }
</style>
