<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  watch: {
    // 路由跳转时获取一次未读消息数量
    $route: "getNotReadMsgCount"
  },
  created() {
    // add by axiang [20190612] 每次刷新时，将sessionStorge内的内容还原到store内，解决刷新后数据丢失的问题
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    // add by axiang [20190612] 页面刷新后store内容会清空，这里在页面刷新前将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  methods: {
    // 获取用户的未读消息数量
    async getNotReadMsgCount() {
      if (this.$store.getters["global/getIsLogin"]) {
        let params = new URLSearchParams();
        params.append("username", this.$store.getters["global/getUsername"]);
        let data = await this.$axios.post("user/message/notRead/count", params);
        this.$store.commit("global/setNotReadMsgCount", data.datas[0]);
      }
    }
  }
};
</script>
