<template>
  <q-page>
    <q-splitter v-model="splitterModel" class="probleminfo-splitter">
      <template v-slot:before>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">
            {{problemInfo.title}}
            <div v-if="$store.getters['global/getIsLogin']">
              <q-chip
                v-if="userSolved.solvedCount > 0"
                text-color="white"
                icon="check"
                color="positive"
              >最早于{{formatDate(userSolved.firstSolvedTime)}} Accepted
              </q-chip>
              <q-chip v-else text-color="white" icon="close" color="negative">未解决</q-chip>
            </div>
            <q-chip
              v-if="problemInfo.judgeOption === 0"
              text-color="white"
              icon="local_activity"
              color="info"
            >
              默认评测
              <q-tooltip>
                <div class="text-subtitle2">按照默认的评测顺序进行评测</div>
              </q-tooltip>
            </q-chip>
            <q-chip
              v-else-if="problemInfo.judgeOption === 1"
              text-color="white"
              icon="local_activity"
              color="primary"
            >
              本地评测优先
              <q-tooltip>
                <div class="text-subtitle2">优先交由本地评测机进行评测</div>
              </q-tooltip>
            </q-chip>
            <q-chip
              v-else-if="problemInfo.judgeOption === 2"
              text-color="white"
              icon="looks_3"
              color="warning"
            >
              第三方评测优先
              <q-tooltip>
                <div class="text-subtitle2">优先交由第三方进行评测</div>
              </q-tooltip>
            </q-chip>
            <q-chip
              v-if="problemView.spj === 1"
              text-color="white"
              icon="adjust"
              color="negative"
            >特判SPJ
            </q-chip>
            <q-chip
              v-else-if="problemView.spj === 0"
              text-color="white"
              icon="brightness_1"
              color="accent"
            >非特判SPJ
            </q-chip>
            <q-chip text-color="white" icon="person" color="warning">出题人：{{problemInfo.author}}</q-chip>
          </div>
          <div class="q-mb-md q-gutter-x-md q-gutter-y-md text-weight-bold">
            <q-chip square>时间限制：{{problemView.timeLimit}}</q-chip>
            <q-chip square>内存限制：{{problemView.memoryLimit}}</q-chip>
            <q-chip square>64位Integer的IO类型：{{problemView.intFormat}}</q-chip>
          </div>
          <q-card class="q-mb-md">
            <q-card-section class="bg-grey q-pa-sm">
              <div class="text-subtitle1 text-white text-weight-bold">题目描述</div>
            </q-card-section>
            <q-card-section>
              <div v-html="problemView.description"/>
            </q-card-section>
          </q-card>
          <q-card class="q-mb-md">
            <q-card-section class="bg-grey q-pa-sm">
              <div class="text-subtitle1 text-white text-weight-bold">输入</div>
            </q-card-section>
            <q-card-section>
              <div v-html="problemView.input"/>
            </q-card-section>
          </q-card>
          <q-card class="q-mb-md">
            <q-card-section class="bg-grey q-pa-sm">
              <div class="text-subtitle1 text-white text-weight-bold">输出</div>
            </q-card-section>
            <q-card-section>
              <div v-html="problemView.output"/>
            </q-card-section>
          </q-card>
          <div class="row" v-for="item in problemSamples" :key="item.id">
            <q-card class="col q-mb-md q-mr-xs">
              <q-card-section class="bg-grey q-pa-sm">
                <div
                  class="text-subtitle1 text-white text-weight-bold"
                >输入样例 {{String.fromCharCode(item.caseOrder+65)}}
                </div>
              </q-card-section>
              <q-card-section>
                <div v-html="item.inputCase"/>
              </q-card-section>
            </q-card>
            <q-card class="col q-mb-md q-ml-xs">
              <q-card-section class="bg-grey q-pa-sm">
                <div
                  class="text-subtitle1 text-white text-weight-bold"
                >输出样例 {{String.fromCharCode(item.caseOrder+65)}}
                </div>
              </q-card-section>
              <q-card-section>
                <div v-html="item.outputCase"/>
              </q-card-section>
            </q-card>
          </div>
          <q-card class="q-mb-md">
            <q-card-section class="bg-grey q-pa-sm">
              <div class="text-subtitle1 text-white text-weight-bold">提示</div>
            </q-card-section>
            <q-card-section>
              <div v-html="problemView.hint"/>
            </q-card-section>
          </q-card>
        </div>
      </template>
      <template v-slot:separator>
        <q-avatar color="primary" text-color="white" size="40px" icon="drag_indicator"/>
      </template>
      <template v-slot:after>
        <div class="q-pa-md" v-if="$store.getters['global/getIsLogin']">
          <div class="row q-gutter-x-sm q-mb-sm">
            <q-space/>
            <q-select
              dense
              class="width-select"
              v-model="data.language"
              emit-value
              map-options
              outlined
              label="选择语言"
              :options="langOptions"
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
                <q-space/>
                <q-btn color="primary" round icon="fullscreen_exit" v-close-popup>
                  <q-tooltip content-class="bg-white text-primary text-subtitle2">取消全屏</q-tooltip>
                </q-btn>
              </q-bar>
              <q-card-section>
                <AceEditor
                  :language="data.language"
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
            <q-btn glossy color="primary" text-color="white" @click="handleSubmit()">提交评测</q-btn>
          </div>
        </div>
        <div v-else>
          <div class="q-ma-md">
            <q-btn @click="toLogin()" outline>登录</q-btn>
            后才能作答，如果没有账号，请
            <q-btn @click="toRegister()" outline>注册</q-btn>
            一个
          </div>
        </div>
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
  import AceEditor from "components/common/AceEditor";
  import {date} from "quasar";
  import {Icon} from "element-ui";

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
        problemInfo: "",
        problemView: "",
        problemSamples: [],
        userSolved: "",
        data: {
          language: "GCC",
          code: ""
        },
        langOptions: [
          {
            value: "G++",
            label: "G++"
          },
          {
            value: "GCC",
            label: "GCC"
          },
          {
            value: "JAVA",
            label: "JAVA"
          },
          {
            value: "Python",
            label: "Python2"
          }
        ]
      };
    },
    mounted() {
      this.getProblemInfo();
      if (this.$store.getters["global/getIsLogin"]) {
        this.getUserSolved();
      } else {
        this.splitterModel = 70;
      }
    },
    methods: {
      toRegister() {
        this.$router.push({name: "register"});
      },
      toLogin() {
        this.$router.push({name: "login"});
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
            type: "negative"
          });
        } else {
          this.doSubmit();
        }
      },
      async doSubmit() {
        this.$q.loading.show({
          message: "正在提交代码到评测机，请稍等"
        });
        let params = new URLSearchParams();
        params.append("problemId", this.$route.query.id);
        params.append("code", this.data.code);
        params.append("language", this.data.language);
        params.append("username", this.$store.getters["global/getUsername"]);
        let data = await this.$axios
          .post("/judge_status/submit", params)
          .catch(() => {
            this.$q.loading.hide();
          });
        if (data.code === 10000) {
          this.$q
            .dialog({
              title: "提交成功",
              message: "评测姬需要一定的时间检查你的代码，等等哦",
              color: "primary",
              persistent: true,
              ok: {
                label: "点我进入评测结果列表查看",
                push: true,
                color: "primary"
              }
            })
            .onOk(() => {
              this.$router.push({
                name: "localStatus"
              });
            });
        }
        this.$q.loading.hide();
      },
      async getProblemInfo() {
        let params = new URLSearchParams();
        params.append("problemId", this.$route.query.id);
        params.append("username", this.$store.getters["global/getUsername"]);
        let data = await this.$axios.post("/problem/info", params);
        this.problemInfo = data.datas[0];
        this.problemView = data.datas[1];
        this.problemSamples = data.datas[2];
      },
      async getUserSolved() {
        let params = new URLSearchParams();
        params.append("problemId", this.$route.query.id);
        params.append("username", this.$store.getters["global/getUsername"]);
        let data = await this.$axios.post("/problem/userSolved", params);
        if (data.datas[0].length === 0) {
          this.userSolved = {
            id: "",
            username: "",
            problemId: "",
            tryCount: 0,
            solvedCount: 0,
            lastTryTime: "",
            firstSolvedTime: ""
          };
        } else {
          this.userSolved = data.datas[0];
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .probleminfo-splitter {
    min-height: 500px;

    .width-select {
      width: 200px;
    }
  }
</style>
