<template>
  <q-page class="row">
    <q-space />
    <q-card class="my-card q-my-md">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">站内消息</div>
      </q-card-section>
      <q-card-section class="q-gutter-sm row items-center">
        <div class="q-gutter-x-sm">
          <q-radio keep-color v-model="filter.status" val label="全部" color="primary" />
          <q-radio keep-color v-model="filter.status" val="0" label="未读" color="negative" />
          <q-radio keep-color v-model="filter.status" val="2" label="标记" color="orange" />
        </div>
        <q-input
          v-model="filter.fromUsername"
          standout
          dense
          class="q-mr-md"
          label="查询发送人"
          placeholder="输入发送人用户名"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-input
          v-model="filter.title"
          standout
          dense
          class="q-mr-md"
          label="查询标题"
          placeholder="输入标题，支持模糊查询"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn class="q-mr-md" color="primary" round icon="search" @click="getMessage()"></q-btn>
        <q-btn color="negative" round icon="clear_all" @click="cleanFilter()">
          <q-tooltip>重置筛选</q-tooltip>
        </q-btn>
        <q-separator class="q-mx-lg" vertical />
        <q-btn color="positive" @click="doAllRead()">全部已读</q-btn>
        <q-btn color="negative" @click="doDeleteAll()">全部删除</q-btn>
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
        <el-table :data="data">
          <el-table-column label="#" prop="id" min-width="10%"></el-table-column>
          <el-table-column label="状态" min-width="15%">
            <template slot-scope="scope">
              <q-chip
                color="positive"
                text-color="white"
                v-if="scope.row.status==='已读'"
              >{{scope.row.status}}</q-chip>
              <q-chip
                color="negative"
                text-color="white"
                v-else-if="scope.row.status==='未读'"
              >{{scope.row.status}}</q-chip>
              <q-chip
                color="orange"
                text-color="white"
                icon="star"
                v-else-if="scope.row.status==='已标记'"
              >{{scope.row.status}}</q-chip>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="时间" min-width="20%">
            <template slot-scope="scope">{{formatDate(scope.row.time)}}</template>
          </el-table-column>
          <el-table-column prop="fromUsername" label="发送人" min-width="15%">
            <template slot-scope="scope">
              <q-chip color="primary" text-color="white" v-if="scope.row.fromUsername==='SYSTEM'">系统</q-chip>
              <q-chip
                color="amber-9"
                text-color="white"
                v-else-if="scope.row.fromUsername==='admin'"
              >管理员</q-chip>
              <q-btn no-caps dense flat v-else color="secondary">{{scope.row.fromUsername}}</q-btn>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" min-width="40%">
            <template slot-scope="scope">
              <q-btn
                no-caps
                dense
                flat
                color="primary"
                @click="showMessage(scope.row.id)"
              >{{scope.row.title}}</q-btn>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="25%">
            <template slot-scope="scope">
              <div v-if="scope.row.status !== '已标记'" class="q-gutter-x-md">
                <q-btn color="negative" @click="doDelete(scope.row.id)">删除</q-btn>
                <q-btn color="orange" @click="setStatus(scope.row.id,2)">标记信息</q-btn>
              </div>
              <div v-else>
                取消标记为：
                <q-btn class="q-mr-sm" color="positive" @click="setStatus(scope.row.id,1)">已读</q-btn>
                <q-btn color="negative" @click="setStatus(scope.row.id,0)">未读</q-btn>
              </div>
            </template>
          </el-table-column>
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
    <q-space />
  </q-page>
</template>

<script>
import { date } from "quasar";
import ShowMessage from "components/message/ShowMessage";
export default {
  data() {
    return {
      loading: false,
      filter: {
        fromUsername: "",
        status: "",
        title: ""
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        totalRows: 0
      },
      data: []
    };
  },
  mounted() {
    this.getMessage();
  },
  methods: {
    formatDate(val) {
      return date.formatDate(val, "YYYY-MM-DD HH:mm:ss");
    },
    cleanFilter() {
      this.filter.fromUsername = "";
      this.filter.status = "";
      this.filter.title = "";
    },
    switchPage(val) {
      this.pagination.currentPage = val;
      this.getMessage();
    },
    sizeChange(val) {
      this.pagination.pageSize = val;
      this.getMessage();
    },
    async getMessage() {
      this.loading = true;
      let params = new URLSearchParams();
      params.append("pageNum", this.pagination.currentPage);
      params.append("pageSize", this.pagination.pageSize);
      params.append("username", this.$store.getters["global/getUsername"]);
      params.append("fromUsername", this.filter.fromUsername);
      params.append("status", this.filter.status);
      params.append("title", this.filter.title);
      let data = await this.$axios
        .post("/user/message/list", params)
        .catch(() => {
          this.loading = false;
        });
      this.data = data.datas[0];
      this.pagination.totalRows = data.datas[1];
      this.loading = false;
    },
    async setStatus(id, status) {
      let statusStr = status === 0 ? "未读" : status === 1 ? "已读" : "已标记";
      let params = new URLSearchParams();
      params.append("username", this.$store.getters["global/getUsername"]);
      params.append("messageId", id);
      params.append("status", status);
      let data = await this.$axios.post("/user/message/setStatus", params);
      if (data.code === 10000) {
        this.$q.notify({
          message: "设置成功！",
          caption: `# ${id} 的消息已被设置为 ${statusStr}`,
          color: "positive",
          icon: "done"
        });
        this.getMessage();
      }
    },
    async setAllRead() {
      let params = new URLSearchParams();
      params.append("username", this.$store.getters["global/getUsername"]);
      params.append("status", 1);
      let data = await this.$axios.post("/user/message/setStatus/all", params);
      if (data.code === 10000) {
        if (data.datas[0] !== 0) {
          this.$q.notify({
            message: "设置成功！",
            caption: `共 ${data.datas[0]} 条消息已被设置为已读`,
            color: "positive",
            icon: "done"
          });
          this.getMessage();
        } else {
          this.$q.notify({
            message: "已完成",
            caption: `全部消息均已读`,
            color: "warning",
            icon: "done"
          });
        }
      }
    },
    async deleteMsg(id) {
      let params = new URLSearchParams();
      params.append("username", this.$store.getters["global/getUsername"]);
      params.append("messageId", id);
      let data = await this.$axios.post("/user/message/delete", params);
      if (data.code === 10000) {
        this.$q.notify({
          message: "删除成功！",
          caption: `# ${id} 的消息已被删除`,
          color: "positive",
          icon: "done"
        });
        this.getMessage();
      }
    },
    async deleteAll() {
      // TODO
      let params = new URLSearchParams();
      params.append("username", this.$store.getters["global/getUsername"]);
      let data = await this.$axios.post("/user/message/delete/all", params);
      if (data.code === 10000) {
        if (data.datas[0] !== 0) {
          this.$q.notify({
            message: "删除成功！",
            caption: `共 ${data.datas[0]} 条未标记的消息已删除`,
            color: "positive",
            icon: "done"
          });
          this.getMessage();
        } else {
          this.$q.notify({
            message: "已完成",
            caption: `全部未标记的消息已删除`,
            color: "warning",
            icon: "done"
          });
        }
      }
    },
    showMessage(val) {
      this.$q
        .dialog({
          component: ShowMessage,
          parent: this,
          id: val
        })
        .onDismiss(() => {
          this.getMessage();
        });
    },
    doDelete(id) {
      this.$q
        .dialog({
          title: "警告",
          message: `您即将把 #${id} 的消息删除，该操作不可逆，请确认`,
          ok: {
            push: true,
            color: "negative",
            label: "确认删除"
          },
          cancel: {
            push: true
          }
        })
        .onOk(() => {
          this.deleteMsg(id);
        });
    },
    doAllRead() {
      this.$q
        .dialog({
          title: "警告",
          message: "设置全部未读消息为已读，可能会让你错过重要信息，请确认",
          ok: {
            push: true,
            color: "positive",
            label: "全部已读"
          },
          cancel: {
            push: true
          }
        })
        .onOk(() => {
          this.setAllRead();
        });
    },
    doDeleteAll() {
      this.$q
        .dialog({
          title: "警告",
          message: "将删除所有未标记的消息，全部删除后不可恢复，请确认",
          ok: {
            push: true,
            color: "negative",
            label: "全部删除"
          },
          cancel: {
            push: true
          }
        })
        .onOk(() => {
          this.deleteAll();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.my-card {
  min-width: 80%;
}
</style>
