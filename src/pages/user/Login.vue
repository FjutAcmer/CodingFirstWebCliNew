<template>
  <q-page class="row">
    <q-space></q-space>
    <q-card class="q-my-xl shadow-6 my-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">欢迎登录！</div>
      </q-card-section>
      <q-form @submit="onSubmit" @reset="onReset">
        <q-card-section>
          <q-input
            v-model="data.loginName"
            class="q-mb-lg"
            color="blue"
            filled
            label="用户名"
            lazy-rules
            :rules="[
          val => val !== null && val !== '' || '请输入用户名',
          val => val.length > 4 && val.length < 16 || '4 - 16个字符',
          val => /^\w+$/.test(val) || '请输入数字、字母或者下划线']"
          />
          <q-input
            color="blue"
            v-model="data.loginPwd"
            filled
            :type="isPwd ? 'password' : 'text'"
            label="密码"
            :rules="[
          val => val !== null && val !== '' || '请输入密码',
          val => val.length > 4 && val.length < 16 || '4 - 16个字符',
          val => /^\w+$/.test(val) || '请输入数字、字母或者下划线']"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <!-- <div class="row q-gutter-x-md">
            <img @click="getCaptcha()" class="captcha-img" :src="captchaUrl" alt="验证码" />
            <q-input
              v-model="data.captcha"
              label="请输入验证码"
              :rules="[
              val => val !== null && val !== '' || '请输入验证码',
              val => /^\w+$/.test(val) || '请输入数字、字母']"
            ></q-input>
          </div>-->
          <q-checkbox v-model="rememberPwd" label="记住密码（请确保是本人的电脑）" />
        </q-card-section>
        <q-card-actions align="around">
          <q-btn glossy type="reset" color="secondary" size="lg" flat>重 置</q-btn>
          <q-btn glossy :loading="btnLoading" type="submit" color="primary" size="lg">登 录</q-btn>
        </q-card-actions>
        <div class="row justify-between">
          <q-btn size="md" class="col-4" flat color="red">忘记密码？</q-btn>
          <q-btn size="md" class="col-4" flat color="red" :to="{ name:'register' }">没有账号？注册一个</q-btn>
        </div>
      </q-form>
    </q-card>
    <q-space></q-space>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      data: {
        loginName: "",
        loginPwd: "",
        captcha: ""
      },
      captchaUrl: "",
      rememberPwd: false,
      isPwd: true,
      btnLoading: false
    };
  },
  mounted() {
    this.rememberPwd = this.$q.cookies.has("rememberPwd")
      ? this.$q.cookies.get("rememberPwd")
      : this.rememberPwd;
    this.data.loginName = this.$q.cookies.has("loginName")
      ? this.$q.cookies.get("loginName")
      : this.data.loginName;
    this.data.loginPwd = this.$q.cookies.has("loginPwd")
      ? this.$q.cookies.get("loginPwd")
      : this.data.loginPwd;
    // this.getGuestToken();
  },
  methods: {
    onSubmit() {
      this.btnLoading = true;
      this.$q.cookies.set("rememberPwd", this.rememberPwd);
      if (this.rememberPwd) {
        this.$q.cookies.set("loginName", this.data.loginName);
        this.$q.cookies.set("loginPwd", this.data.loginPwd);
      } else {
        this.$q.cookies.remove("loginName");
        this.$q.cookies.remove("loginPwd");
      }
      this.doLogin();
    },
    onReset() {
      this.data.loginName = "";
      this.data.loginPwd = "";
      this.rememberPwd = false;
    },
    async getGuestToken() {
      if (!this.$store.getters["global/getIsLogin"]) {
        let data = await this.$axios.post("/user/guest/token");
        this.$store.commit("global/setToken", data.datas[0]);
        this.getCaptcha();
      }
    },
    async getCaptcha() {
      let data = await this.$axios.post("/util/captcha");
      this.captchaUrl = process.env.API + data.datas[0];
    },
    async doLogin() {
      let params = new URLSearchParams({
        username: this.data.loginName,
        password: this.data.loginPwd
        // captcha: this.data.captcha
      });
      let data = await this.$axios.post("/user/login", params).catch(() => {
        this.btnLoading = false;
      });
      if (data.code === 10000) {
        this.$store.commit("global/setIsLogin", true);
        this.$store.commit("global/setUsername", data.datas[0]);
        this.$store.commit("global/setToken", data.datas[1]);
        this.$store.commit("global/setPrivateInfo", data.datas[2]);
        this.$router.back(-1);
        this.$q.notify({
          message: "登录成功",
          caption: "欢迎回来，多做点题，水水讨论区，又是美好的一天",
          type: "positive",
          timeout: 2000
        });
      } else if (data.code === 10005) {
        this.$q.notify({
          message: data.msg,
          type: "negative"
        });
        this.getCaptcha();
      }
      this.btnLoading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.my-card {
  min-width: 30%;
  .captcha-img {
    cursor: pointer;
    width: 180px;
    height: 60px;
  }
}
</style>
