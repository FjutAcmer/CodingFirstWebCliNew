<template>
  <div>
    <div class="row no-wrap q-pa-md">
      <div style="max-width: 200px">
        <div class="text-h6 q-mb-md">个人面板</div>
        <div class="q-gutter-x-sm q-gutter-y-sm">
          <q-btn color="positive" label="签到记录" :to="{ name:'checkIn' }">
            <!-- <q-badge color="orange" floating>1</q-badge> -->
          </q-btn>
          <q-btn color="primary" label="站内消息" :to="{ name:'message' }">
            <q-badge
              v-if="$store.getters['global/getNotReadMsgCount'] > 0"
              color="negative"
              floating
            >{{$store.getters['global/getNotReadMsgCount']}}</q-badge>
          </q-btn>
          <q-btn color="accent" label="个人信息" />

          <q-btn color="negative" label="系统设置" />
          <q-btn color="orange" label="身份认证" />
          <q-btn color="info" label="神秘代码" />
        </div>
      </div>
      <q-separator vertical inset class="q-mx-lg" />
      <div class="column items-center">
        <q-avatar size="84px">
          <img :src="this.$store.getters['global/getPrivateInfo'].avatarUrl" />
        </q-avatar>
        <div class="text-h6 q-mt-sm q-mb-xs">{{this.$store.getters['global/getUsername']}}</div>
        <q-btn color="primary" label="退出登录" glossy push size="md" @click="doLogOut()" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    doLogOut() {
      this.$q
        .dialog({
          title: "退出登录",
          message: "确定要退出登录吗？",
          ok: {
            push: true
          },
          cancel: {
            push: true,
            color: "negative"
          }
        })
        .onOk(() => {
          this.logout();
        });
    },
    async logout() {
      let params = new URLSearchParams();
      params.append("username", this.$store.getters["global/getUsername"]);
      await this.$axios.post("/user/logout", params);
      this.$store.commit("global/logout");
      this.$q.notify({
        message: "已退出登录",
        caption: "你已退出登录，欢迎再次回来哦",
        type: "warning",
        timeout: 2000
      });
      this.$router.push("/");
      this.getGuestToken();
    },
    async getGuestToken() {
      let data = await this.$axios.post("user/guest/token");
      this.$store.commit("global/setToken", data.datas[0]);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
