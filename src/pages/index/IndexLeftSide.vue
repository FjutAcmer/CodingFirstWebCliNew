<template>
  <div>
    <q-card class="q-ma-sm">
      <q-card-section class="bg-blue">
        <div class="text-body1 text-white">
          <q-icon name="notifications"></q-icon>全站公告-自动化构建测试
        </div>
      </q-card-section>
      <q-card-section class="text-body">
        <div v-html="notifyInfo.value"></div>
        <q-separator></q-separator>
        <div class="row">
          <q-space></q-space>
          <div class="col-auto text-body1">—— 发布于 {{notifyInfo.insertTime}}</div>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="q-ma-sm">
      <q-card-section class="bg-blue">
        <div class="text-body1 text-white">
          <q-icon name="bar_chart"></q-icon>本站大数据
        </div>
      </q-card-section>
      <q-card-section class="text-body">
        <div id="submit-charts"></div>
      </q-card-section>
    </q-card>
    <q-card class="q-ma-sm">
      <q-card-section class="bg-blue">
        <div class="text-body1 text-white">
          <q-icon name="cloud_download"></q-icon>资源下载
        </div>
      </q-card-section>

      <q-list bordered class="rounded-borders">
        <q-expansion-item
          expand-separator
          icon="star"
          label="浏览器推荐"
          caption="使用合适的浏览器可以让自己的用户体验提高十倍哦"
        >
          <q-card>
            <q-card-section>
              <q-chip clickable square @click="toUrl('https://www.google.cn/chrome/')">
                <q-avatar color="green" text-color="white">100</q-avatar>谷歌浏览器
              </q-chip>
              <q-chip clickable square @click="toUrl('https://www.firefox.com.cn/')">
                <q-avatar color="red" text-color="white">100</q-avatar>火狐浏览器
              </q-chip>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item
          expand-separator
          icon="star"
          label="集成开发环境（IDE）"
          caption="还在用TXT写代码？都21世纪啦"
        >
          <q-card>
            <q-card-section>
              <q-chip clickable square @click="toUrl('http://www.codeblocks.org/')">
                <q-avatar color="green" text-color="white">100</q-avatar>Code::Blocks
              </q-chip>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-card>
  </div>
</template>

<script>
import { date } from "quasar";
import echarts from "echarts";
export default {
  data() {
    return {
      notifyInfo: "",
      statusCount: [],
      days: 100,
      myChart: ""
    };
  },
  mounted() {
    this.getNotifyInfo();
    this.initEcharts();
    this.getStatusCount();
  },
  methods: {
    toUrl(url) {
      window.open(url, "_blank");
    },
    async getNotifyInfo() {
      let params = new URLSearchParams();
      params.append("name", "homePageNotify");
      let dataNotify = await this.$axios.get("/system/info", params);
      if (dataNotify.code === 10000) {
        this.notifyInfo = dataNotify.datas[0];
        this.notifyInfo.insertTime = date.formatDate(
          this.notifyInfo.insertTime,
          "YYYY-MM-DD HH:mm:SS"
        );
      } else {
        this.notifyInfo.value = "【公告获取失败】";
        this.notifyInfo.insertTime = "-";
      }
    },
    async getStatusCount() {
      let params = new URLSearchParams();
      params.append("days", this.days);
      let dataStatusCount = await this.$axios.get(
        "/judge_status/count",
        params
      );
      this.statusCount = dataStatusCount.datas[0];
      this.loadEcharts();
    },
    initEcharts() {
      this.myChart = echarts.init(document.getElementById("submit-charts"));
      this.myChart.showLoading();
    },
    loadEcharts() {
      let submitDays = [];
      let totalCounts = [];
      let acCounts = [];
      for (let i of this.statusCount) {
        submitDays.push(date.formatDate(i.submitDay, "YYYY-MM-DD"));
        totalCounts.push(i.totalCount);
        acCounts.push(i.acCount);
      }
      let option = {
        title: {
          text: "本站最近" + this.days + "天提交记录"
        },
        tooltip: {},
        legend: {},
        grid: {
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: submitDays || "无"
        },
        yAxis: {
          type: "value"
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 50
          }
        ],
        series: [
          {
            name: "当天提交记录数",
            type: "line",

            data: totalCounts || 0
          },
          {
            name: "当天AC记录数",
            type: "line",
            data: acCounts || 0
          }
        ]
      };
      this.myChart.setOption(option);
      this.myChart.hideLoading();
    }
  }
};
</script>

<style lang="scss" scoped>
#submit-charts {
  width: 100%;
  height: 400px;
}
</style>
