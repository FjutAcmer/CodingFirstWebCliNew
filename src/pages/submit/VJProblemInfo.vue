<template>
  <q-page>
    <q-splitter v-model="splitterModel" class="probleminfo-splitter">
      <template v-slot:before>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">
            {{problemInfo.probTitle}}
            <q-chip
              text-color="white"
              color="green"
            >来自 {{ $route.query.OJId}} 第 {{$route.query.ProbNum}} 题</q-chip>
            <div v-if="$store.getters['global/getIsLogin']">
              <q-chip
                v-if="userSolved.solvedCount > 0"
                text-color="white"
                icon="check"
                color="positive"
              >最早于{{formatDate(userSolved.firstSolvedTime)}} Accepted</q-chip>
              <q-chip v-else text-color="white" icon="close" color="negative">未解决</q-chip>
            </div>
            <q-chip text-color="white" icon="local_activity" color="primary">
              VJ评测优先
              <q-tooltip>
                <div class="text-subtitle2">优先交由VJ平台进行评测</div>
              </q-tooltip>
            </q-chip>
            <q-chip
              text-color="white"
              icon="domain"
              color="accent"
            >VJ源：{{problemInfo.virtualJudgeUrl}}</q-chip>
            <q-chip text-color="white" icon="apartment" color="info">初始源：{{problemInfo.originUrl}}</q-chip>
            <q-chip
              text-color="white"
              icon="person"
              color="warning"
            >作者：{{problemInfo.author?problemInfo.author:"-"}}</q-chip>
          </div>
          <div class="q-mb-md q-gutter-x-md q-gutter-y-md text-weight-bold">
            <q-chip square>时间限制（TL）：{{problemInfo.timeLimit?problemInfo.timeLimit:'-'}}</q-chip>
            <q-chip square>
              内存限制（ML）：
              {{problemInfo.memoryLimit}}
            </q-chip>
            <q-chip square>操作系统（OS）：{{problemInfo.os?problemInfo.os:'-'}}</q-chip>
            <q-chip square>来自（SOURCE）：{{problemInfo.source?problemInfo.source:'-'}}</q-chip>
          </div>

          <iframe
            class="prob-des-iframe"
            :src="problemInfo.problemDescriptionUrl"
            width="100%"
            height="900px"
            frameborder="0"
            scrolling="yes"
          ></iframe>
        </div>
      </template>
      <template v-slot:separator>
        <q-avatar color="primary" text-color="white" size="40px" icon="drag_indicator" />
      </template>
      <template v-slot:after>
        <div class="q-pa-md" v-if="$store.getters['global/getIsLogin']">
          <div class="row q-gutter-x-sm q-mb-sm">
            <q-space />
            <q-chip color="warning" text-color="white">WARN：VJ题目下，编辑器默认样式为JAVA，暂不可更改</q-chip>
            <q-select
              dense
              class="width-select"
              v-model="data.language"
              emit-value
              map-options
              outlined
              label="选择语言"
              :options="languages"
            />
            <q-btn @click="clearCode()" icon="clear_all" color="negative">
              <q-tooltip>
                <div class="text-subtitle2">清空代码</div>
              </q-tooltip>
            </q-btn>
            <q-btn @click="goFullScreen()" icon="fullscreen" color="primary"></q-btn>
          </div>
          <AceEditor
            class="q-mb-md"
            :language="data.language"
            :readOnly="!$store.getters['global/getIsLogin']"
            :isFull="true"
            @input="getCode"
            :value="data.code"
          ></AceEditor>
          <!-- 使用dialog模拟全屏 -->
          <q-dialog maximized v-model="fullScreen">
            <q-card class="bg-white">
              <q-bar>
                <q-space />
                <q-btn color="primary" round icon="fullscreen_exit" v-close-popup>
                  <q-tooltip content-class="bg-white text-primary text-subtitle2">取消全屏</q-tooltip>
                </q-btn>
              </q-bar>
              <q-card-section>
                <AceEditor
                  language="default"
                  :readOnly="!$store.getters['global/getIsLogin']"
                  :isFull="true"
                  @input="getCode"
                  :value="data.code"
                ></AceEditor>
              </q-card-section>
            </q-card>
          </q-dialog>
          <div class="row q-gutter-x-sm items-center">
            <q-chip>所写代码共 {{data.code.replace(/\s+/g,"").length}} 个字符（不含空白）</q-chip>
            <div class="row" v-if="needCaptcha">
              <img @click="getCaptcha()" class="captcha-img" :src="captchaUrl" alt="验证码" />
              <q-input dense v-model="data.captcha" label="输入验证码"></q-input>
            </div>
            <q-btn glossy color="primary" text-color="white" @click="handleSubmit()">提交评测</q-btn>
          </div>
        </div>
        <div v-else>
          <div class="q-ml-md" style="width: 90% ">
            <q-chat-message :text="['龟龟，为什么我不能答题？']" sent />
            <q-chat-message :text="['因为你莫得登录了啦']" />
            <q-chat-message :text="['那我要咋整啊']" sent />
            <q-chat-message :text="['有账号不啦？']" />
            <q-chat-message :text="['木有']" sent />
            <q-chat-message :text="['注册一个，晓得不，那就能答题辽']" />
            <q-chat-message :text="['要得要得，那在哪注册呢？']" sent />
            <q-chat-message>
              点
              <q-btn @click="toRegister()" outline>注册</q-btn>喽，很快的，不耽误你几分钟
            </q-chat-message>
            <q-chat-message :text="['注册完了捏？']" sent />
            <q-chat-message>
              点
              <q-btn @click="toLogin()" outline>登录</q-btn>喽,
              登录完可以有更多玩法了啦
            </q-chat-message>
            <q-chat-message :text="['好的好的，明白辽']" sent />
          </div>
        </div>
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
import AceEditor from "components/submit/AceEditor";
import { date } from "quasar";
import { Icon } from "element-ui";
export default {
  props: {},
  components: {
    AceEditor
  },
  watch: {},
  data() {
    return {
      splitterModel: 50, // start at 50%
      fullScreen: false,
      needCaptcha: false,
      captchaUrl: "",
      problemInfo: "",
      userSolved: "",
      data: {
        language: "",
        code: "",
        captcha: ""
      },
      languages: []
    };
  },
  mounted() {
    this.getProblemInfo();
    this.getLanguages();
    if (this.$store.getters["global/getIsLogin"]) {
      this.getUserSolved();
    }
  },
  methods: {
    toRegister() {
      this.$router.push({ name: "register" });
    },
    toLogin() {
      this.$router.push({ name: "login" });
    },
    formatDate(val) {
      return date.formatDate(val, "YYYY-MM-DD");
    },
    getCode(code) {
      this.data.code = code;
    },
    clearCode() {
      this.$q
        .dialog({
          title: "警告",
          message: "您即将清空代码，请确认",
          cancel: true,
          ok: {
            push: true,
            label: "确认清空代码",
            color: "negative"
          },
          cancel: {
            push: true
          }
        })
        .onOk(() => {
          this.data.code = "";
        });
    },
    goFullScreen() {
      this.fullScreen = true;
    },
    handleSubmit() {
      if (this.data.code.replace(/\s+/g, "").length < 50) {
        this.$q.notify({
          message: "50个字符都不给我",
          caption: "假代码，拒绝评测！哼",
          color: "negative"
        });
      } else {
        this.doSubmit();
      }
    },
    async doSubmit() {
      if (this.data.language === "") {
        this.$q.notify({
          message: "选择评测语言",
          caption: "不选择评测语言我怎么评测呢？",
          color: "negative"
        });
        return;
      }
      this.$q.loading.show({
        message: "正在提交代码到服务端，服务端将把代码交由VJ平台评测，请稍等"
      });
      let params = new URLSearchParams();
      params.append("username", this.$store.getters["global/getUsername"]);
      params.append("oj", this.$route.query.OJId);
      params.append("probNum", this.$route.query.ProbNum);
      params.append("language", this.data.language);
      params.append("source", this.data.code);
      params.append("captcha", this.data.captcha);
      let data = await this.$axios
        .post("/vj/judge_result/submit", params)
        .catch(() => {
          this.$q.loading.hide();
        });
      if (data.code === 10000) {
        this.needCaptcha = false;
        this.$q
          .dialog({
            title: "提交成功",
            message: "VJ的评测姬需要一定的时间检查你的代码，等等哦",
            color: "primary",
            // persistent: true,
            ok: {
              label: "点我进入VJ评测结果列表查看",
              push: true,
              color: "primary"
            }
          })
          .onOk(() => {
            this.$router.push({
              name: "VJStatus"
            });
          });
      } else if (data.code === 10004) {
        this.$q.notify({
          message: "输入验证码",
          caption: "由于提交过多，VJ平台需要获取验证码",
          color: "warning"
        });
        this.needCaptcha = true;
        this.captchaUrl = process.env.API + data.datas[0];
      }
      this.$q.loading.hide();
    },
    async getCaptcha() {
      let params = new URLSearchParams();
      params.append("username", this.$store.getters["global/getUsername"]);
      let data = await this.$axios.post("/vj/util/captcha", params);

      this.captchaUrl = process.env.API + data.datas[0];
    },
    async getProblemInfo() {
      let params = new URLSearchParams();
      params.append("OJId", this.$route.query.OJId);
      params.append("probNum", this.$route.query.ProbNum);
      params.append("username", this.$store.getters["global/getUsername"]);
      let data = await this.$axios.post("/vj/problem/info", params);
      this.problemInfo = data.datas[0];
    },
    async getUserSolved() {
      // TODO：获取用户在VJ上的解答情况
      let params = new URLSearchParams();
      params.append("probNum", this.$route.query.ProbNum);
      params.append("OJId", this.$route.query.OJId);
      params.append("username", this.$store.getters["global/getUsername"]);
      let data = await this.$axios.post("/vj/problem/user_solved", params);
      if (data.datas[0].length === 0) {
        this.userSolved = {
          id: "",
          username: "",
          ojId: "",
          probNum: "",
          tryCount: 0,
          solvedCount: 0,
          lastTryTime: "",
          firstSolvedTime: ""
        };
      } else {
        this.userSolved = data.datas[0];
      }
    },
    // 拿到这个OJ对应的可提交语言集
    async getLanguages() {
      let params = new URLSearchParams();
      let data = await this.$axios.post("/vj/util/ojs", params);
      let OJs = data.datas[0];
      this.languages = [];
      let OJId = this.$route.query.OJId;
      let temp = OJs[OJId].languages;
      for (let key in temp) {
        let tempObj = {
          value: key,
          label: temp[key]
        };
        this.languages.push(tempObj);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.probleminfo-splitter {
  min-height: 500px;
  .width-select {
    width: 180px;
  }
  .captcha-img {
    &:hover {
      cursor: pointer;
    }
    width: 200px;
    height: 80px;
  }
}
</style>
