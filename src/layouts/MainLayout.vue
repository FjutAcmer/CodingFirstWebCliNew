<template>
  <q-layout view="hHh lpR fff">
    <q-header class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar color="light-blue">CF</q-avatar>&emsp;一码当先 | CodingFirst
        </q-toolbar-title>
        <q-space/>
        <q-input
          @keydown.enter.native="doSearch()"
          dark
          dense
          standout
          v-model="searchText"
          input-class="text-right"
          class="q-mx-md"
          label="输入你想搜索的内容"
        >
          <template v-slot:append>
            <q-icon v-if="searchText === ''" name="search"/>
            <q-icon v-else name="clear" class="cursor-pointer" @click="searchText = ''"/>
          </template>
        </q-input>
        <div v-if="!this.$store.getters['global/getIsLogin']">
          <q-tabs inline-label>
            <q-route-tab icon="person_add" :to="{ name:'register' }" label="注册"/>
            <q-route-tab icon="person" :to="{ name:'login' }" label="登录"/>
          </q-tabs>
        </div>
        <div v-else>
          <q-btn glossy>
            <q-avatar size="30px">
              <img :src="$store.getters['global/getPrivateInfo'].avatarUrl"/>
            </q-avatar>
            <div class="q-ml-sm">{{fullNickname}}</div>
            <q-menu>
              <PersonInfoPane></PersonInfoPane>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>

      <q-tabs active-color="gold" class="glossy" align="left" inline-label>
        <q-route-tab icon="home" to="/" label="主 页"/>
        <q-route-tab icon="menu" :to="{ name:'localProblem' }" label="题 库"/>
        <q-route-tab icon="gavel" :to="{ name:'localStatus' }" label="评 测"/>
        <q-route-tab icon="receipt" to="/contest" label="比 赛"/>
        <q-route-tab icon="fitness_center" :to="{ name:'challenge' }" label="挑 战"/>
        <q-route-tab icon="format_list_numbered" :to="{ name:'honorBorder' }" label="排 名"/>
        <q-route-tab icon="chat_bubble" to="/discuss" label="讨 论"/>
        <q-route-tab icon="store_mall_directory" to="/mall" label="商 城"/>
      </q-tabs>
    </q-header>

    <q-page-container>
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
      <!-- 回到顶部组件 -->
      <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[9, 18]">
        <q-btn fab icon="keyboard_arrow_up" color="primary" class="z-top"/>
      </q-page-scroller>
    </q-page-container>

    <q-footer class="bg-grey-8 text-white my-footer">
      <div class="row justify-center">
        <div class="text-h4">
          CodingFirst
          <q-badge color="warning">{{version}}</q-badge>
        </div>
      </div>
      <div class="row justify-center">
        <q-btn-group outline>
          <q-btn outline color="white" label="Bug反馈" @click="openBugReport()"/>
          <q-btn outline color="white" label="FAQ"/>
          <q-btn outline color="white" label="项目简介" to="/project-introduction"/>
          <q-btn outline color="white" label="开发日志" to="/develop-log"/>
          <q-btn outline color="white" label="开发团队" to="/develop-team"/>
          <q-btn outline color="white" label="加入我们"/>
          <q-btn outline color="white" label="闽ICP备19024997号" @click="toBeiAn()"/>
        </q-btn-group>
      </div>
      <div class="row justify-center text-h7 text-amber-7">
        Power by&nbsp;
        <q-icon name="copyright"/>&nbsp;福建工程学院 - OJ项目组
      </div>
    </q-footer>
    <CleverRobot></CleverRobot>
  </q-layout>
</template>

<script>
  import PersonInfoPane from "./components/PersonInfoPane";
  import CleverRobot from "./components/CleverRobot";
  import BugReport from "components/common/BugReport";

  export default {
    components: {
      PersonInfoPane,
      CleverRobot
    },
    data() {
      return {
        searchText: "",
        version: "v1.0.1 TEST"
      };
    },
    computed: {
      fullNickname() {
        let info = this.$store.getters["global/getPrivateInfo"];
        let adjectiveTitle = info.adjectiveTitle ? info.adjectiveTitle : "";
        let articleTitle = info.articleTitle ? info.articleTitle : "";
        return adjectiveTitle + " " + articleTitle + " " + info.nickname;
      }
    },
    methods: {
      doSearch() {
        this.$q.notify({
          message: "暂不支持全站搜索",
          type: "warning"
        });
      },
      toBeiAn() {
        window.open("http://www.beian.miit.gov.cn/","_blank");
      },
      openBugReport() {
        this.$q.dialog({
          component: BugReport,
          parent: this
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .my-footer {
    min-height: 90px;
  }

  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    transition: opacity 0.5s;
  }

  .fade-leave {
    opacity: 1;
  }

  .fade-leave-active {
    opacity: 0;
    transition: opacity 0.5s;
  }
</style>
