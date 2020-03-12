<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="dialog-card q-my-md">
      <q-card-section class="bg-secondary text-white">
        <div class="text-h5 q-mb-sm">
          #{{id}} {{msgInfo.title}}
          <q-chip color="positive" text-color="white" v-if="msgInfo.status===1">已读</q-chip>
          <q-chip color="negative" text-color="white" v-else-if="msgInfo.status===0">未读</q-chip>
          <q-chip color="orange" text-color="white" icon="star" v-else-if="msgInfo.status===2">已标记</q-chip>
        </div>
        <div class="justify-center">
          来自：
          <q-chip color="primary" text-color="white" v-if="msgInfo.fromUsername==='SYSTEM'">系统</q-chip>
          <q-chip color="amber-9" text-color="white" v-else-if="msgInfo.fromUsername==='admin'">管理员</q-chip>
          <q-btn outline v-else>{{msgInfo.fromUsername}}</q-btn>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6" v-html="msgInfo.text"></div>
      </q-card-section>
      <!-- 按钮示例 -->
      <q-card-actions align="right">
        <q-btn
          color="primary"
          :disable="msgInfo.fromUsername==='SYSTEM'"
          label="回复"
          @click="onOKClick()"
        />
        <q-btn color="negative" label="关闭" @click="onCancelClick()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    id: Number
    // ...你自定义的属性
  },
  data() {
    return {
      msgInfo: ""
    };
  },
  mounted() {
    this.getMessage();
  },
  methods: {
    async getMessage() {
      let params = new URLSearchParams();
      params.append("username", this.$store.getters["global/getUsername"]);
      params.append("messageId", this.id);
      let data = await this.$axios.post("/user/message/info", params);
      this.msgInfo = data.datas[0];
      if (this.msgInfo.status === 0) {
        this.setMessage();
      }
    },
    async setMessage() {
      let params = new URLSearchParams();
      params.append("username", this.$store.getters["global/getUsername"]);
      params.append("messageId", this.id);
      params.append("status", 1);
      let data = await this.$axios.post("/user/message/setStatus", params);
    },
    // 以下方法是必需的
    // (不要改变它的名称 --> "show")
    show() {
      this.$refs.dialog.show();
    },

    // 以下方法是必需的
    // (不要改变它的名称 --> "hide")
    hide() {
      this.$refs.dialog.hide();
    },

    onDialogHide() {
      // QDialog发出“hide”事件时
      // 需要发出
      this.$emit("hide");
    },

    onOKClick() {
      this.$router.push({ name: "replayMessage" });
      // 按OK，在隐藏QDialog之前
      // 发出“ok”事件（带有可选的有效负载）
      // 是必需的
      this.$emit("ok");
      // 或带有有效负载：this.$emit('ok', { ... })
      // 然后隐藏对话框
      this.hide();
    },
    onCancelClick() {
      // 我们只需要隐藏对话框
      this.hide();
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-card {
  width: 70%;
}
</style>
