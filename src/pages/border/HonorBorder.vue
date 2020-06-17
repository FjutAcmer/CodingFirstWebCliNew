<template>
  <q-page>
    <br />
    <q-card class="my-card">
      <q-card-section class="bg-blue">
        <div class="text-h6 text-white">
          <q-avatar color="blue-grey" text-color="amber" icon="emoji_events"></q-avatar>本校荣誉榜
        </div>
      </q-card-section>
      <q-card-section>
        <el-pagination
          layout="sizes, prev, pager, next, jumper"
          :current-page="pagination.currentPage"
          :page-size="pagination.pageSize"
          :total="pagination.totalRows"
          @size-change="sizeChange"
          @current-change="switchPage"
        ></el-pagination>
        <el-table :data="data" highlight-current-row>
          <el-table-column prop="id" label="#" width="100"></el-table-column>
          <el-table-column label="时间" width="150">
            <template slot-scope="scope">{{formaterDate(scope.row.rewardDate)}}</template>
          </el-table-column>
          <el-table-column prop="realNameOne" label="队员1" width="100"></el-table-column>
          <el-table-column prop="realNameTwo" label="队员2" width="100"></el-table-column>
          <el-table-column prop="realNameThree" label="队员3" width="100"></el-table-column>
          <el-table-column prop="contestLevel" label="级别" width="200"></el-table-column>
          <el-table-column prop="awardLevel" label="奖项" width="150"></el-table-column>
          <el-table-column prop="description" label="备注"></el-table-column>
        </el-table>
        <div class="row">
          <q-space />
          <el-pagination
            class="col-auto"
            layout="prev, pager, next, jumper"
            :current-page="pagination.currentPage"
            :page-size="pagination.pageSize"
            :total="pagination.totalRows"
            @size-change="sizeChange"
            @current-change="switchPage"
          ></el-pagination>
        </div>
        <q-inner-loading :showing="loading">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { date } from "quasar";
export default {
  data() {
    return {
      loading: false,
      filter: {},
      pagination: {
        currentPage: 1,
        pageSize: 30,
        totalRows: 0
      },
      data: [],
      tagOptions: []
    };
  },
  mounted() {
    this.getHonorRank();
  },
  methods: {
    formaterDate(val) {
      return date.formatDate(val, "YYYY-MM-DD");
    },
    switchPage(val) {
      this.pagination.currentPage = val;
      this.getHonorRank();
    },
    sizeChange(val) {
      this.pagination.pageSize = val;
      this.getHonorRank();
    },
    async getHonorRank() {
      this.tableData = [];
      let params = new URLSearchParams();
      params.append("pageNum", this.pagination.currentPage);
      params.append("pageSize", this.pagination.pageSize);
      let dataHonorRank = await this.$axios.get("/border/honor_rank", params);
      this.data = dataHonorRank.datas[0];
      this.pagination.totalRows = dataHonorRank.datas[1];
    }
  }
};
</script>

<style lang="scss" scoped>
.my-card {
  width: 95%;
  margin: auto;
}
</style>
