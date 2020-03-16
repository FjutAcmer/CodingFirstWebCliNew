<template>
  <q-page>
    <div class="q-ma-md row">
      <div class="q-pa-md">
        <q-date today-btn v-model="date" :events="events" :options="optionsFn" event-color="green" />
      </div>
      <q-separator vertical inset />
      <div style="width:25%">
        <q-tab-panels v-model="date" animated transition-prev="jump-up" transition-next="jump-up">
          <q-tab-panel v-for="item in checkInData" :key="item.id" :name="item.name">
            <div class="text-h5 q-mb-md">{{item.name}} 的签到状态：</div>
            <div class="text-subtitle1">
              签到类型：
              <q-chip color="positive" text-color="white">{{item.info}}</q-chip>
            </div>
            <div class="text-subtitle1">
              签到时间：
              <q-chip color="primary" text-color="white">{{formatDate(item.checkTime)}}</q-chip>
            </div>
            <div class="text-subtitle1">
              签到IP地址：
              <q-chip color="accent" text-color="white">{{item.ipAddress}}</q-chip>
            </div>
          </q-tab-panel>
          <q-tab-panel :name="today">
            <div class="text-h5 q-mb-md">今天的签到状态：</div>
            <q-chip text-color="white" color="accent" class="text-subtitle1">今天你还没有签到哦</q-chip>
            <q-btn color="positive" size="lg" @click="checkIn()">点我签到</q-btn>
          </q-tab-panel>
          <q-tab-panel :name="date">
            <div class="text-h5 q-mb-md">{{date}} 的签到状态：</div>
            <q-chip text-color="white" color="negative" class="text-subtitle1">当天你没有签到哦</q-chip>
          </q-tab-panel>
        </q-tab-panels>
      </div>

      <q-card class="col">
        <q-card-section>
          <q-parallax src="https://cdn.quasar.dev/img/parallax2.jpg">
            <h3 class="text-white">神秘内容，敬请期待</h3>
          </q-parallax>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { date } from "quasar";
import { Icon } from "element-ui";
export default {
  data() {
    return {
      today: "",
      date: "",
      checkInData: [],
      events: []
    };
  },
  mounted() {
    this.getCheckIn();
    this.date = date.formatDate(new Date(), "YYYY/MM/DD");
    this.today = date.formatDate(new Date(), "YYYY/MM/DD");
  },
  methods: {
    formatDate(val) {
      return date.formatDate(val, "YYYY-MM-DD HH:mm:ss");
    },
    optionsFn(date) {
      return "2020/01/01" <= date && date <= this.today;
    },
    async getCheckIn() {
      let params = new URLSearchParams();
      params.append("username", this.$store.getters["global/getUsername"]);
      let data = await this.$axios.post("/user/checkIn/list", params);
      this.checkInData = data.datas[0];
      this.events = [];
      for (let item of this.checkInData) {
        let tempName = date.formatDate(item.checkTime, "YYYY/MM/DD");
        item.name = tempName;
        this.events.push(tempName);
      }
    },
    async checkIn() {
      let params = new URLSearchParams();
      params.append("username", this.$store.getters["global/getUsername"]);
      let data = await this.$axios.post("/user/checkIn/check", params);
      if (data.code === 10000) {
        this.$q.notify({
          message: "签到成功",
          caption: "签到成功！今天又是美好的一天呢",
          color: "positive"
        });
      }
      this.getCheckIn();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
